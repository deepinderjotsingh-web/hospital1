"""Regression: core patient journey endpoints still work after the downloads router change."""

import uuid


def test_specialties_returns_ten(client):
    resp = client.get("/specialties")
    assert resp.status_code == 200
    data = resp.json()
    assert len(data) == 10


def test_treatments_returns_ten(client):
    resp = client.get("/treatments")
    assert resp.status_code == 200
    data = resp.json()
    assert len(data) == 10


def test_treatment_detail_cardiac_has_savings(client):
    resp = client.get("/treatments/cardiac-treatment-in-india")
    assert resp.status_code == 200
    data = resp.json()
    assert data.get("savings_percent") == 88


def test_treatment_detail_missing_is_404(client):
    resp = client.get("/treatments/no-such-treatment")
    assert resp.status_code == 404


def test_inquiry_full_payload_created(client):
    unique_name = f"tscheck-inquiry-{uuid.uuid4().hex[:8]}"
    payload = {"name": unique_name, "phone": "9999999999", "country": "India"}
    resp = client.post("/inquiries", json=payload)
    assert resp.status_code == 201
    data = resp.json()
    assert data.get("country") == "India"
    assert data.get("name") == unique_name


def test_inquiry_missing_fields_is_422(client):
    unique_name = f"tscheck-inquiry-{uuid.uuid4().hex[:8]}"
    resp = client.post("/inquiries", json={"name": unique_name})
    assert resp.status_code == 422
