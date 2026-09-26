"""Inquiry (request-for-quote / contact) routes."""

from fastapi import APIRouter

from lib.db import db
from models.catalog import Inquiry, InquiryCreate

router = APIRouter()


@router.post("/inquiries", response_model=Inquiry, status_code=201)
async def create_inquiry(input: InquiryCreate):
    inquiry = Inquiry(**input.model_dump())
    await db.inquiries.insert_one(inquiry.model_dump())
    return inquiry
