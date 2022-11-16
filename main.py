from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

origins = [
    "http://127.0.0.1",
    "http://127.0.0.1:5173",
]

from api.v1.routers import (
        app as v1_app,
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

app.include_router(v1_app.router)
app.include_router(v1_token.router)
app.include_router(v1_users.router)
app.include_router(v1_tickets.router)

app.mount("/_app", StaticFiles(directory="web/build/_app"), name="_app")
app.mount("/static", StaticFiles(directory="web/build/static"), name="static")

templates = Jinja2Templates(directory="web/build")

@app.get("/", response_class=HTMLResponse)
@app.get("/login", response_class=HTMLResponse)
@app.get("/users", response_class=HTMLResponse)
@app.get("/ticket", response_class=HTMLResponse)
@app.get("/ticket/{id}", response_class=HTMLResponse)
async def forward_route(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})