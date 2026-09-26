"""Download routes — serve the WordPress deliverables generated on the fly.

These are generated in-memory on each request rather than served as static
files, so they are always available in production regardless of build
artifacts or .gitignore rules (ZIPs are gitignored repo-wide).
"""

from fastapi import APIRouter
from fastapi.responses import Response

from make_package import build_zip_bytes, treatments_csv
from make_wxr import build as build_wxr

router = APIRouter()

XML_FILENAME = "sps-medcare-wordpress-import.xml"
ZIP_FILENAME = "sps-medcare-website-package.zip"
CSV_FILENAME = "sps-medcare-treatments.csv"


def _attachment(filename: str) -> dict[str, str]:
    return {"Content-Disposition": f'attachment; filename="{filename}"'}


@router.get("/download/wordpress-xml")
async def download_wordpress_xml():
    """The WordPress WXR 1.2 import file for the whole site."""
    return Response(
        content=build_wxr(),
        media_type="application/xml",
        headers=_attachment(XML_FILENAME),
    )


@router.get("/download/website-package")
async def download_website_package():
    """ZIP bundle: WXR XML + README import guide + treatments CSV + sitemap + robots."""
    return Response(
        content=build_zip_bytes(),
        media_type="application/zip",
        headers=_attachment(ZIP_FILENAME),
    )


@router.get("/download/treatments-csv")
async def download_treatments_csv():
    """All treatments with costs and hospitals as a spreadsheet."""
    return Response(
        content=treatments_csv(),
        media_type="text/csv",
        headers=_attachment(CSV_FILENAME),
    )
