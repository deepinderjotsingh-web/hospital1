"""Catalog models: categories, products and inquiries."""

import uuid
from datetime import datetime, timezone

from pydantic import BaseModel, Field


def utcnow() -> datetime:
    """Aware UTC now — never compare against naive datetimes read from Mongo."""
    return datetime.now(timezone.utc)


class Category(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: str
    name: str
    tagline: str = ""
    description: str = ""
    image_url: str = ""
    sort_order: int = 0
    product_count: int = 0


class Product(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: str
    name: str
    sku: str
    category_slug: str
    brand: str = "SPS Medcare"
    short_desc: str = ""
    description: str = ""
    price: float = 0
    price_unit: str = "piece"
    moq: str = "1 Piece"
    features: list[str] = []
    specs: dict[str, str] = {}
    warranty: str = "1 Year"
    certification: str = "ISO 13485"
    image_url: str = ""
    in_stock: bool = True
    featured: bool = False
    created_at: datetime = Field(default_factory=utcnow)


class Inquiry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: str = ""
    city: str = ""
    message: str = ""
    product_name: str = ""
    created_at: datetime = Field(default_factory=utcnow)


class InquiryCreate(BaseModel):
    name: str
    phone: str
    email: str = ""
    city: str = ""
    message: str = ""
    product_name: str = ""
