from uuid import uuid4

from pydantic import BaseModel, constr, validator

class Signup(BaseModel):
    email: str
    password: constr(min_length=8)

class User(BaseModel):
    key: str = None
    email: str
    admin: bool = False
    disabled: bool = False

    @validator("key", pre=True, always=True)
    def set_key(cls, key):
        return key or str(uuid4())

class UserInDB(User):
    hashed_password: str