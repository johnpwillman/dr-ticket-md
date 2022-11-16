import os

from fastapi import APIRouter, status

router = APIRouter(
    prefix='/v1/app',
    tags=['v1', 'v1/app']
)

###############################################################################
# App Info
###############################################################################

@router.get("/name", status_code=status.HTTP_200_OK)
async def app_name():
    return os.getenv('APP_NAME', 'Dr. Ticket M.D.')