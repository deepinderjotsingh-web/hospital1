# SPS Medcare — App Spec

## What it is
Marketing + catalog website for **www.sps-medcare.com** (SPS Medcare — supplier of hospital
furniture, medical equipment and surgical supplies, Delhi NCR), styled after alvinmedcare.com.
Deliverables: (1) this live React/FastAPI site, (2) a WordPress WXR import file with all data.

## Business facts (shown across the site)
- Mobile / WhatsApp: **9920222362** → displayed as `+91 99202 22362`; links `tel:+919920222362`, `https://wa.me/919920222362`
- Email (placeholder): info@sps-medcare.com
- Address (placeholder): B-42, Okhla Industrial Area, Phase-II, New Delhi, Delhi NCR - 110020, India
- Certifications claimed: ISO 13485:2016 & CE
- Central constants: `frontend/src/lib/site.ts` (SITE, IMAGES, formatINR)

## Data model (backend/models/catalog.py)
- `Category`: slug (unique), name, tagline, description, image_url, sort_order, product_count (computed)
- `Product`: slug (unique), name, sku, category_slug, brand, short_desc, description, price (INR float),
  price_unit, moq, features[], specs{key:value}, warranty, certification, image_url, in_stock, featured
- `Inquiry`: name*, phone*, email, city, message, product_name (contact/RFQ form submissions)
- Collections seeded by `backend/seed.py` (idempotent, upsert on slug): 6 categories, 20 products
- Images: AI-generated product shots (20) on static.prod-images.emergentagent.com + Unsplash lifestyle shots

## API (all under /api, registered on api_router in server.py)
- `GET /api/categories` → Category[] with product_count
- `GET /api/products?category=&q=&featured=&limit=` → Product[]
- `GET /api/products/{slug}` → Product | 404
- `POST /api/inquiries` (201) → Inquiry | 422 on missing name/phone

## Pages (frontend/src/App.tsx)
- `/` Home — hero, stats band, categories grid, featured products, why-us, testimonials, CTA
- `/products` — catalog; category pills + search (client state → query params to API)
- `/products/:slug` — product detail: specs table, features, sticky quote panel (call/WhatsApp/quote), related products, Product JSON-LD
- `/services`, `/about` — static content
- `/contact` — contact cards + inquiry form (POST /api/inquiries, sonner toast on success/error, ?product= prefill)
- `/export-data` — downloads the WordPress import file, shows live catalog counts + import steps
- Unknown URLs redirect to `/`. Floating WhatsApp button site-wide (bottom-right).

## SEO
- `index.html`: title/description/OG/canonical + MedicalBusiness JSON-LD; `Seo.tsx` sets per-page
  title/description/canonical/JSON-LD (Product schema on detail pages)
- `frontend/public/robots.txt`, `frontend/public/sitemap.xml`

## WordPress deliverable
- `frontend/public/sps-medcare-wordpress-import.xml` (regenerate: `cd /app/backend && python make_wxr.py`)
- WXR 1.2: 5 pages (Home/About/Products/Services/Contact), 20 products (post_type=product, Woo meta:
  _sku, _regular_price, _price, _stock_status), 20 image attachments (sideloaded by URL),
  product_cat terms, Yoast + Rank Math SEO meta per item. Copy also at /app/sps-medcare-wordpress-import.xml.

## Auth
None — public marketing/catalog site. No credentials needed (nothing to log into).

## Verification notes for testers
- Backend runs on :8001 (supervisor `backend`), frontend on :3000 (supervisor `frontend`), Mongo in-pod.
- All 20 products have `in_stock: true`; 7 are `featured: true` (home page shows up to 8).
- Products grid default shows all 20; search "ICU" narrows to 3 items.
