import os
from datetime import timedelta

from fastapi import APIRouter, status, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from deta import Deta

from ..typedefs.oauth import Token
from ..utils.auth import authenticate_user, create_access_token

router = APIRouter(
    prefix='/v1/token',
    tags=['v1', 'v1/token']
)

deta = Deta(os.getenv("DETA_PROJECT_KEY"))

###############################################################################
# USER AUTHENTICATION
###############################################################################

@router.post("/", response_model=Token)
async def get_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES', 30)))
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")