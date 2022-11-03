from fastapi import FastAPI

from api.v1.routers import v1 as v1_router

app = FastAPI()

app.include_router(v1_router.router)

@app.get("/")
async def root():
    return {"message": "Hello World"}