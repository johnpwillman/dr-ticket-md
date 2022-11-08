from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://127.0.0.1",
    "http://127.0.0.1:5173",
]

from api.v1.routers import (
        token as v1_token, 
        users as v1_users, 
        tickets as v1_tickets
    )

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(v1_token.router)
app.include_router(v1_users.router)
app.include_router(v1_tickets.router)

@app.get("/")
async def root():
    return {"message": "Hello World"}