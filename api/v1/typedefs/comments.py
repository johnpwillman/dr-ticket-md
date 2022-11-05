from uuid import uuid4
from typing import Union
from datetime import datetime

from pydantic import BaseModel
from .tickets import TicketStatus

class Comment(BaseModel):
    key: str = str(uuid4())
    body: Union[str, None] = None
    status: TicketStatus
    ticket: Union[str, None] = None
    submitted_by: Union[str, None] = None
    created_at: datetime = datetime.utcnow()