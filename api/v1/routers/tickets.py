import os
import random
from typing import List

from fastapi import APIRouter, status, Depends, HTTPException, Request

from deta import Base

from ..typedefs.tickets import TicketIn, TicketStatus, TicketInDB, TicketOut, CommentIn, CommentInDB, CommentOut
from ..typedefs.users import User
from ..utils.auth import get_current_active_user
from ... import email

router = APIRouter(
    prefix='/v1/tickets',
    tags=['v1', 'v1/tickets']
)

###############################################################################
# TICKETS AND COMMENTS
###############################################################################

@router.get("/", status_code=status.HTTP_200_OK)
async def all_tickets(current_user: User = Depends(get_current_active_user)):
    db = Base("dr-ticket-md-tickets")
    if current_user.admin:
        res = db.fetch(query=[
            {"assigned_to": current_user.email},
            {"submitted_by": current_user.email},
            {"assigned_to": None}
        ])
    else:
        res = db.fetch(query={"submitted_by": current_user.email})
    all_items = sorted(res.items, key=lambda x: x['status'][-1] + str(x['created_at']).split('.')[0], reverse=True)
    return all_items

@router.post("/", response_model=TicketOut)
async def post_ticket(ticket: TicketIn, request: Request, current_user: User = Depends(get_current_active_user)):
    admin = get_random_admin()
    try:
        ticket_in_db = TicketInDB(
            **ticket.dict(),
            submitted_by=current_user.email,
            assigned_to=admin.email
        )
        r_url_c = request.url.components
        ticket_in_db.url = f"{r_url_c.scheme}://{r_url_c.netloc}/ticket/{ticket_in_db.key}"
        email_stakeholders(ticket_in_db)
        ticketidb_dict = ticket_in_db.dict()
        db = Base("dr-ticket-md-tickets")
        db.put(ticketidb_dict)
        return TicketOut(**ticketidb_dict)
    except Exception as err:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(err)
        )

@router.get("/{key}", response_model=TicketOut)
async def get_ticket(key: str, current_user: User = Depends(get_current_active_user)):
    tdb = Base("dr-ticket-md-tickets")
    ticket = TicketOut(**tdb.get(key))
    cdb = Base("dr-ticket-md-comments")
    raw_comments = cdb.fetch(query={"ticket": key}).items
    comments: List[CommentOut] = list(map(lambda c: CommentOut(**c), raw_comments))
    ticket.comments = sorted(comments, key=lambda c: c.created_at, reverse=True)
    return ticket


@router.delete("/{key}")
async def delete_ticket(key: str, current_user: User = Depends(get_current_active_user)):
    if current_user.admin:
        db = Base("dr-ticket-md-tickets")
        db.delete(key)
        return {"message": "ticket deleted"}

# Comments ####################################################################

@router.post("/{key}/comments", response_model=CommentOut)
async def post_comment(key: str, comment: CommentIn, request: Request, current_user: User = Depends(get_current_active_user)):
    try:
        tdb = Base("dr-ticket-md-tickets")
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
        email_stakeholders(ticket_in_db, comment_in_db)
        commentidb_dict = comment_in_db.dict()
        cdb = Base("dr-ticket-md-comments")
        cdb.put(commentidb_dict)
        return CommentOut(**commentidb_dict)
    except Exception as err:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(err)
        )

# Helper Methods ##############################################################

def get_admins():
    db = Base("dr-ticket-md-users")
    res = db.fetch(query={
        "admin": True
    })
    admins: List[User] = list(map(lambda admin: User(**admin), res.items))
    return admins

def get_random_admin():
    admins = get_admins()
    rand_index = random.randint(0, len(admins) - 1)
    rand_admin: User = admins[rand_index]
    return rand_admin

def email_stakeholders(ticket: TicketInDB, comment: CommentInDB = None):
    try:
        to = []
        if not comment or comment.submitted_by == ticket.submitted_by:
            to.append({"email": ticket.assigned_to})
        else:
            to.append({"email": ticket.submitted_by})
        email.send(
            to_addrs=to,
            subject=f"Ticket has been updated: ({ticket.status}) {ticket.subject}" if comment else f"Ticket has been assigned to you: ({ticket.status}) {ticket.subject}",
            ticket_url=ticket.url,
            update_body=comment.body if comment else ticket.body
        )
    except Exception as err:
        print(str(err))