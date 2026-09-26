"""GET /api/download/wordpress-xml returns the WordPress WXR import file."""

import xml.etree.ElementTree as ET


def test_download_wordpress_xml_returns_wxr(client):
    resp = client.get("/download/wordpress-xml")

    assert resp.status_code == 200
    assert resp.headers["content-type"].startswith("application/xml")
    cd = resp.headers.get("content-disposition", "")
    assert "attachment" in cd
    assert "sps-medcare-wordpress-import.xml" in cd
    assert len(resp.content) > 100000

    root = ET.fromstring(resp.content)
    assert root.tag == "rss"
    items = root.findall(".//item")
    assert len(items) == 36
