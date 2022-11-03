from fastapi import APIRouter, status

router = APIRouter(
    prefix='/v1',
    tags=['v1']
)

@router.get("/", status_code=status.HTTP_200_OK)
def root():
    return {"message": "v1 root"}