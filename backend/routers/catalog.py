"""Catalog routes: categories and products."""

from fastapi import APIRouter, HTTPException, Query

from lib.db import db
from models.catalog import Category, Product

router = APIRouter()


@router.get("/categories", response_model=list[Category])
async def list_categories():
    cats = await db.categories.find().sort("sort_order", 1).to_list(100)
    counts = await db.products.aggregate(
        [{"$group": {"_id": "$category_slug", "count": {"$sum": 1}}}]
    ).to_list(100)
    count_map = {c["_id"]: c["count"] for c in counts}
    return [Category(**c, product_count=count_map.get(c["slug"], 0)) for c in cats]


@router.get("/products", response_model=list[Product])
async def list_products(
    category: str | None = Query(default=None),
    q: str | None = Query(default=None),
    featured: bool | None = Query(default=None),
    limit: int = Query(default=60, le=200),
):
    query: dict = {}
    if category:
        query["category_slug"] = category
    if featured is not None:
        query["featured"] = featured
    if q:
        query["$or"] = [
            {"name": {"$regex": q, "$options": "i"}},
            {"sku": {"$regex": q, "$options": "i"}},
            {"short_desc": {"$regex": q, "$options": "i"}},
        ]
    docs = await db.products.find(query).sort("created_at", 1).to_list(limit)
    return [Product(**d) for d in docs]


@router.get("/products/{slug}", response_model=Product)
async def get_product(slug: str):
    doc = await db.products.find_one({"slug": slug})
    if not doc:
        raise HTTPException(status_code=404, detail="Product not found")
    return Product(**doc)
