from uuid import uuid4
from typing import Union

from pydantic import BaseModel

class Signup(BaseModel):
    email: str
    password: str

class User(BaseModel):
    key: str = str(uuid4())
    email: str
    admin: bool = False
    disabled: bool = False

class UserInDB(User):
    hashed_password: str