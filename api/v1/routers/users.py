import os

from fastapi import APIRouter, status, Depends, HTTPException

from deta import Deta

from ..typedefs.users import Signup, User, UserInDB
from ..utils.auth import get_password_hash, get_current_active_user

router = APIRouter(
    prefix='/v1/users',
    tags=['v1', 'v1/users']
)

deta = Deta(os.getenv("DETA_PROJECT_KEY"))

###############################################################################
# USER ADMINISTRATION
###############################################################################

@router.post("/")
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

@router.get("/me", response_model=User)
async def my_user(current_user: User = Depends(get_current_active_user)):
    return current_user