import os
from typing import Union
from datetime import datetime, timedelta

from deta import Deta

from fastapi import APIRouter, status, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from jose import JWTError, jwt
from passlib.context import CryptContext

from ..typedefs.tickets import Ticket, TicketStatus
from ..typedefs.users import Signup, User, UserInDB
from ..typedefs.oauth import Token, TokenData

router = APIRouter(
    prefix='/v1',
    tags=['v1']
)

deta = Deta(os.getenv("DETA_PROJECT_KEY"))

###############################################################################
# USER AUTHENTICATION
###############################################################################

# to get a SECRET_KEY string run:
# openssl rand -hex 32
SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="v1/token")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def get_user(username: str):
    db = deta.Base("dr-ticket-md-users")
    res = db.fetch(query={"email": username})
    if res.count == 1:
        return UserInDB(**res.items[0])

def authenticate_user(username: str, password: str):
    user = get_user(username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )
    return current_user

@router.post("/token", response_model=Token)
async def get_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

###############################################################################
# USER ADMINISTRATION
###############################################################################

@router.post("/users")
async def signup(signup: Signup):
    db = deta.Base("dr-ticket-md-users")
    res = db.fetch(query={"email": signup.email})
    if res.count > 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists"
        )

    hashed_password = get_password_hash(signup.password)
    user = UserInDB(
        email=signup.email,
        hashed_password=hashed_password
    )
    db.put(user.dict())
    return {"message": "User created"}

@router.get("/users/me", response_model=User)
async def my_user(current_user: User = Depends(get_current_active_user)):
    return current_user


###############################################################################
# TICKETS AND COMMENTS
###############################################################################

@router.get("/", status_code=status.HTTP_200_OK)
async def root():
    return {"message": "v1 root"}

@router.get("/tickets", status_code=status.HTTP_200_OK)
async def all_tickets(current_user: User = Depends(get_current_active_user)):
    db = deta.Base("dr-ticket-md-tickets")
    if current_user.admin:
        res = db.fetch(query={"status?ne": TicketStatus.CLOSED})
    else:
        res = db.fetch(query={"submitted_by": current_user.email})
    all_items = res.items
    return all_items

@router.post("/tickets")
async def post_ticket(ticket: Ticket, current_user: User = Depends(get_current_active_user)):
    ticket.submitted_by = current_user.email
    db = deta.Base("dr-ticket-md-tickets")
    db.put(ticket.dict())
    return {"message": "ticket posted"}

@router.delete("/tickets/{key}")
async def delete_ticket(key: str, current_user: User = Depends(get_current_active_user)):
    if current_user.admin:
        db = deta.Base("dr-ticket-md-tickets")
        db.delete(key)
        return {"message": "ticket deleted"}