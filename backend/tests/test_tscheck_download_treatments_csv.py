"""GET /api/download/treatments-csv returns the treatment price list CSV."""

import csv
import io


def test_download_treatments_csv_returns_price_list(client):
    resp = client.get("/download/treatments-csv")

    assert resp.status_code == 200
    assert resp.headers["content-type"].startswith("text/csv")
    cd = resp.headers.get("content-disposition", "")
    assert "attachment" in cd
    assert "sps-medcare-treatments.csv" in cd

    text = resp.content.decode("utf-8")
    reader = list(csv.reader(io.StringIO(text)))
    header = reader[0]
    assert header[0] == "Treatment"
    assert header[1] == "Specialty"
    assert header[2] == "Cost in India (USD)"

    data_rows = reader[1:]
    assert len(data_rows) == 10
