"""Medical tourism models: specialties, treatments and patient inquiries."""

import uuid
from datetime import datetime, timezone

from pydantic import BaseModel, Field


def utcnow() -> datetime:
    """Aware UTC now — never compare against naive datetimes read from Mongo."""
    return datetime.now(timezone.utc)


class Specialty(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: str
    name: str
    sort_order: int = 0
    treatment_count: int = 0


class Treatment(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: str
    name: str
    specialty_slug: str
    specialty_name: str
    short_desc: str = ""
    description: str = ""
    cost_india_usd: str = ""
    cost_west_usd: str = ""
    savings_percent: int = 0
    hospital_stay: str = ""
    stay_in_india: str = ""
    success_rate: str = ""
    procedures: list[str] = []
    includes: list[str] = []
    top_hospitals: list[str] = []
    image_url: str = ""
    featured: bool = False
    created_at: datetime = Field(default_factory=utcnow)


class Inquiry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: str = ""
    country: str = ""
    treatment_name: str = ""
    message: str = ""
    created_at: datetime = Field(default_factory=utcnow)


class InquiryCreate(BaseModel):
    name: str
    phone: str
    email: str = ""
    country: str = ""
    treatment_name: str = ""
    message: str = ""
