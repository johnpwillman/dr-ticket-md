from uuid import uuid4
from typing import Union, List
from enum import Enum
from datetime import datetime

from pydantic import BaseModel

class TicketStatus(str, Enum):
    OPEN = 'open'
    PENDING_USER = 'pending'
    CLOSED = 'closed'

class Ticket(BaseModel):
    subject: str
    body: str
    status: TicketStatus = TicketStatus.OPEN

class Comment(BaseModel):
    body: Union[str, None] = None
    status: TicketStatus

class CommentInDB(Comment):
    key: str = str(uuid4())
    ticket: Union[str, None] = None
    submitted_by: Union[str, None] = None
    created_at: datetime = str(datetime.utcnow())

class TicketInDB(Ticket):
    key: str = str(uuid4())
    submitted_by: Union[str, None] = None
    assigned_to: Union[str, None] = None
    created_at: datetime = str(datetime.utcnow())
    comments: Union[List[CommentInDB], None] = None