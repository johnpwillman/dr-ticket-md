import os

from deta import Deta

from fastapi import APIRouter, status

from ..typedefs.tickets import Ticket


router = APIRouter(
    prefix='/v1',
    tags=['v1']
)

deta = Deta(os.getenv("DETA_PROJECT_KEY"))

@router.get("/", status_code=status.HTTP_200_OK)
async def root():
    return {"message": "v1 root"}

@router.get("/tickets", status_code=status.HTTP_200_OK)
async def all_tickets():
    db = deta.Base("dr-ticket-md-tickets")
    res = db.fetch()
    all_items = res.items
    return all_items

@router.post("/tickets")
async def post_ticket(ticket: Ticket):
    db = deta.Base("dr-ticket-md-tickets")
    db.put(ticket.dict())
    return {"message": "ticket posted"}

@router.delete("/ticket/{key}")
async def delete_ticket(key: str):
    db = deta.Base("dr-ticket-md-tickets")
    db.delete(key=key)
    return {"message": "ticket deleted"}