from uuid import uuid4
from typing import Union

from pydantic import BaseModel

class Ticket(BaseModel):
    key: str = str(uuid4())
    subject: str
    body: str
    submitted_by: str
    assigned_to: Union[str, None] = None