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
    key: str = str(uuid4())
    subject: str
    body: str
    status: TicketStatus = TicketStatus.OPEN
    submitted_by: Union[str, None] = None
    assigned_to: Union[str, None] = None
    created_at: datetime = datetime.utcnow()

class Comment(BaseModel):
    key: str = str(uuid4())
    body: Union[str, None] = None
    status: TicketStatus
    ticket: Union[str, None] = None
    submitted_by: Union[str, None] = None
    created_at: datetime = datetime.utcnow()

class TicketWithComments(Ticket):
    comments: Union[List[Comment], None] = None