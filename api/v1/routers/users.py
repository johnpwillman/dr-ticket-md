from typing import List

from fastapi import APIRouter, status, Depends, HTTPException

from deta import Base

from ..typedefs.users import Signup, User, UserInDB
from ..utils.auth import get_password_hash, get_current_active_user, get_current_active_admin, get_admins

router = APIRouter(
    prefix='/v1/users',
    tags=['v1', 'v1/users']
)

###############################################################################
# USER ADMINISTRATION
###############################################################################

@router.get("/", response_model=List[User])
async def all_users(current_user: User = Depends(get_current_active_admin)):
    db = Base("dr-ticket-md-users")
    res = db.fetch()
    all_users: List[User] = res.items
    while res.last:
        res = db.fetch(last=res.last)
        all_users.append(res.items)
    return all_users

@router.post("/")
async def signup(signup: Signup):
    db = Base("dr-ticket-md-users")
    res = db.fetch(query={"email": signup.email})
    if res.count > 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists"
        )
    admins = db.fetch(query={"admin": True}, limit=1)
    hashed_password = get_password_hash(signup.password)
    user = UserInDB(
        email=signup.email,
        hashed_password=hashed_password,
        admin=admins.count==0
    )
    db.put(user.dict())
    return {"message": "User created"}

@router.patch("/{key}", response_model=User)
async def edit_user(key: str, user: User, current_user: User = Depends(get_current_active_admin)):
    if not key == user.key:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Key from path does not match user being patched."
        )
    try:
        db = Base("dr-ticket-md-users")
        old_dict = user.dict()
        #key 'key' cannot be in update dict
        new_dict = {key: old_dict[key] for key in old_dict if key != 'key'}
        res = db.update(new_dict, key)
    except Exception as err:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="DB Error when updating user."
        )
    return user

@router.get("/me", response_model=User)
async def my_user(current_user: User = Depends(get_current_active_user)):
    return current_user

@router.get("/admins", response_model=List[User])
async def my_user(current_user: User = Depends(get_current_active_admin)):
    return get_admins()