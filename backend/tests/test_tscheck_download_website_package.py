"""Bug-fix verification: GET /api/download/website-package generates the ZIP on the fly.

Covers the primary bug fix criterion: the endpoint must return a valid, non-corrupt
ZIP archive with exactly the 5 expected members, correct headers, and a body large
enough to prove it isn't an empty/placeholder response.
"""

import io
import zipfile


def test_download_website_package_returns_valid_zip(client):
    resp = client.get("/download/website-package")

    assert resp.status_code == 200
    assert resp.headers["content-type"].startswith("application/zip")
    assert "attachment" in resp.headers.get("content-disposition", "")
    assert "sps-medcare-website-package.zip" in resp.headers.get("content-disposition", "")
    assert len(resp.content) > 10000

    zf = zipfile.ZipFile(io.BytesIO(resp.content))
    assert zf.testzip() is None  # None == no corrupt member
    names = set(zf.namelist())
    assert names == {
        "README.txt",
        "sps-medcare-wordpress-import.xml",
        "treatments.csv",
        "sitemap.xml",
        "robots.txt",
    }
