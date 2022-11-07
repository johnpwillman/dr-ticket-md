from fastapi import FastAPI

from api.v1.routers import (
        token as v1_token, 
        users as v1_users, 
        tickets as v1_tickets
    )

app = FastAPI()

app.include_router(v1_token.router)
app.include_router(v1_users.router)
app.include_router(v1_tickets.router)

@app.get("/")
async def root():
    return {"message": "Hello World"}