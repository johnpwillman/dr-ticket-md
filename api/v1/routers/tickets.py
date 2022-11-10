import os
from typing import List

from fastapi import APIRouter, status, Depends, HTTPException

from deta import Deta

from ..typedefs.tickets import TicketIn, TicketStatus, TicketInDB, TicketOut, CommentIn, CommentInDB, CommentOut
from ..typedefs.users import User
from ..utils.auth import get_current_active_user

router = APIRouter(
    prefix='/v1/tickets',
    tags=['v1', 'v1/tickets']
)

deta = Deta(os.getenv("DETA_PROJECT_KEY"))

###############################################################################
# TICKETS AND COMMENTS
###############################################################################

@router.get("/", status_code=status.HTTP_200_OK)
async def all_tickets(current_user: User = Depends(get_current_active_user)):
    db = deta.Base("dr-ticket-md-tickets")
    if current_user.admin:
        res = db.fetch(query=[
            {"assigned_to": current_user.email},
            {"assigned_to": None}
        ])
    else:
        res = db.fetch(query={"submitted_by": current_user.email})
    all_items = res.items
    return all_items

@router.post("/", response_model=TicketOut)
async def post_ticket(ticket: TicketIn, current_user: User = Depends(get_current_active_user)):
    try:
        ticket_in_db = TicketInDB(
            **ticket.dict(),
            submitted_by=current_user.email
        )
        db = deta.Base("dr-ticket-md-tickets")
        db.put(ticket_in_db.dict())
        return TicketOut(**ticket_in_db.dict())
    except Exception as err:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(err)
        )

@router.get("/{key}", response_model=TicketOut)
async def get_ticket(key: str, current_user: User = Depends(get_current_active_user)):
    tdb = deta.Base("dr-ticket-md-tickets")
    ticket = TicketOut(**tdb.get(key))
    cdb = deta.Base("dr-ticket-md-comments")
    raw_comments = cdb.fetch(query={"ticket": key}).items
    comments: List[CommentOut] = list(map(lambda c: CommentOut(**c), raw_comments))
    ticket.comments = comments
    return ticket


@router.delete("/{key}")
async def delete_ticket(key: str, current_user: User = Depends(get_current_active_user)):
    if current_user.admin:
        db = deta.Base("dr-ticket-md-tickets")
        db.delete(key)
        return {"message": "ticket deleted"}

# Comments ####################################################################

@router.post("/{key}/comments", response_model=CommentOut)
async def post_comment(key: str, comment: CommentIn, current_user: User = Depends(get_current_active_user)):
    try:
        tdb = deta.Base("dr-ticket-md-tickets")
        ticket_in_db = TicketInDB(**tdb.get(key))
        comment_in_db = CommentInDB(
            **comment.dict(),
            ticket=key,
            submitted_by=current_user.email
        )
        ticket_changed = False
        if not ticket_in_db.assigned_to and ticket_in_db.submitted_by != current_user.email:
            ticket_in_db.assigned_to = current_user.email
            ticket_changed = True
        if comment_in_db.status != ticket_in_db.status:
            ticket_in_db.status = comment_in_db.status
            ticket_changed = True
        if ticket_changed:
            tdb.put(ticket_in_db.dict())
        cdb = deta.Base("dr-ticket-md-comments")
        cdb.put(comment_in_db.dict())
        return CommentOut(**comment_in_db.dict())
    except Exception as err:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(err)
        )