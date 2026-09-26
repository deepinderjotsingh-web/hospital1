"""Download routes — serve the WordPress deliverables generated on the fly.

These are generated in-memory on each request rather than served as static
files, so they are always available in production regardless of build
artifacts or .gitignore rules (ZIPs are gitignored repo-wide).
"""

import io
import zipfile
from pathlib import Path

from fastapi import APIRouter, HTTPException
from fastapi.responses import Response

from make_package import build_zip_bytes, treatments_csv
from make_wxr import build as build_wxr

router = APIRouter()

XML_FILENAME = "sps-medcare-wordpress-import.xml"
ZIP_FILENAME = "sps-medcare-website-package.zip"
CSV_FILENAME = "sps-medcare-treatments.csv"
THEME_FILENAME = "sps-medcare-wordpress-theme.zip"
THEME_DIR = Path(__file__).resolve().parents[2] / "wordpress-theme" / "sps-medcare"


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


def _build_theme_zip() -> bytes:
    """Zip the PHP theme directory in memory, rooted at sps-medcare/."""
    if not THEME_DIR.is_dir():
        raise HTTPException(status_code=404, detail="WordPress theme source not found")

    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as zf:
        for path in sorted(THEME_DIR.rglob("*")):
            if path.is_file() and "__pycache__" not in path.parts:
                zf.write(path, arcname=str(Path("sps-medcare") / path.relative_to(THEME_DIR)))
    return buf.getvalue()


@router.get("/download/wordpress-theme")
async def download_wordpress_theme():
    """Installable WordPress PHP theme (templates, CPTs, customizer, SEO schema)."""
    return Response(
        content=_build_theme_zip(),
        media_type="application/zip",
        headers=_attachment(THEME_FILENAME),
    )


@router.get("/download/treatments-csv")
async def download_treatments_csv():
    """All treatments with costs and hospitals as a spreadsheet."""
    return Response(
        content=treatments_csv(),
        media_type="text/csv",
        headers=_attachment(CSV_FILENAME),
    )
