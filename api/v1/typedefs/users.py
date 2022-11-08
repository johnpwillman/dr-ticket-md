from uuid import uuid4

from pydantic import BaseModel, constr

class Signup(BaseModel):
    email: str
    password: constr(min_length=8)

class User(BaseModel):
    key: str = str(uuid4())
    email: str
    admin: bool = False
    disabled: bool = False

class UserInDB(User):
    hashed_password: str