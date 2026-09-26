"""Catalog routes: medical specialties and treatments."""

from fastapi import APIRouter, HTTPException, Query

from lib.db import db
from models.catalog import Specialty, Treatment

router = APIRouter()


@router.get("/specialties", response_model=list[Specialty])
async def list_specialties():
    specs = await db.specialties.find().sort("sort_order", 1).to_list(100)
    counts = await db.treatments.aggregate(
        [{"$group": {"_id": "$specialty_slug", "count": {"$sum": 1}}}]
    ).to_list(100)
    count_map = {c["_id"]: c["count"] for c in counts}
    return [Specialty(**s, treatment_count=count_map.get(s["slug"], 0)) for s in specs]


@router.get("/treatments", response_model=list[Treatment])
async def list_treatments(
    specialty: str | None = Query(default=None),
    q: str | None = Query(default=None),
    featured: bool | None = Query(default=None),
    limit: int = Query(default=60, le=200),
):
    query: dict = {}
    if specialty:
        query["specialty_slug"] = specialty
    if featured is not None:
        query["featured"] = featured
    if q:
        query["$or"] = [
            {"name": {"$regex": q, "$options": "i"}},
            {"specialty_name": {"$regex": q, "$options": "i"}},
            {"short_desc": {"$regex": q, "$options": "i"}},
        ]
    docs = await db.treatments.find(query).sort("created_at", 1).to_list(limit)
    return [Treatment(**d) for d in docs]


@router.get("/treatments/{slug}", response_model=Treatment)
async def get_treatment(slug: str):
    doc = await db.treatments.find_one({"slug": slug})
    if not doc:
        raise HTTPException(status_code=404, detail="Treatment not found")
    return Treatment(**doc)
