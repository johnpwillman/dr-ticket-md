from uuid import uuid4
from typing import Union, List
from enum import Enum
from datetime import datetime

from pydantic import BaseModel, validator

class TicketStatus(str, Enum):
    OPEN = 'open'
    PENDING_USER = 'pending'
    CLOSED = 'closed'

class TicketIn(BaseModel):
    subject: str
    body: str
    status: TicketStatus = TicketStatus.OPEN

class TicketInDB(TicketIn):
    key: str = None
    submitted_by: str
    assigned_to: Union[str, None] = None
    created_at: float = None
    url: str = None

    @validator("key", pre=True, always=True)
    def set_key(cls, key):
        return key or str(uuid4())
    
    @validator("created_at", pre=True, always=True)
    def set_created_at(cls, created_at):
        return created_at or datetime.utcnow().timestamp()

class CommentIn(BaseModel):
    body: Union[str, None] = None
    status: TicketStatus

class CommentInDB(CommentIn):
    key: str = None
    ticket: Union[str, None] = None
    submitted_by: Union[str, None] = None
    created_at: float = None

    @validator("key", pre=True, always=True)
    def set_key(cls, key):
        return key or str(uuid4())
    
    @validator("created_at", pre=True, always=True)
    def set_created_at(cls, created_at):
        return created_at or datetime.utcnow().timestamp()

class CommentOut(CommentIn):
    key: str
    ticket: str
    submitted_by: str
    created_at: datetime

class TicketOut(TicketIn):
    key: str
    submitted_by: str
    assigned_to: Union[str, None] = None
    created_at: datetime
    comments: List[CommentOut] = []