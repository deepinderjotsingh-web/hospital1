# SPS Medcare — App Spec

## What it is
Marketing + treatment-catalog website for **www.sps-medcare.com** — SPS Medcare is a **medical
tourism facilitator** based in Delhi NCR that helps **international patients travel to India** for
affordable, world-class treatment (positioning and structure modeled on alvinmedcare.com).
Deliverables: (1) this live React/FastAPI site, (2) a WordPress WXR XML import file with all content.

> Note: an earlier iteration of this app was a hospital-equipment supplier. That positioning was
> replaced on user instruction; the `categories`/`products` Mongo collections are dropped by seed.py.

## Business facts (shown across the site) — REAL details, no placeholders
- Mobile / WhatsApp: **9920222362** → displayed `+91 99202 22362`; `tel:+919920222362`, `https://wa.me/919920222362`
- Office landline: **011 41000493** → `tel:+911141000493` (top bar, footer, Contact page card)
- Email: **info@spsattestation.com**
- Office address: **#123, 1st Floor, Vishal Tower, Janakpuri District Centre, Near Janakpuri West Metro, New Delhi - 110058**
  (rendered multi-line from `SITE.addressLines`)
- Positioning: zero facilitation fee, JCI & NABH accredited partner hospitals, 2,500+ patients, 12+ countries
- Countries served (12) and languages (7) live in `frontend/src/lib/site.ts` (SITE, COUNTRIES, LANGUAGES, IMAGES)

## Data model (backend/models/catalog.py)
- `Specialty`: slug (unique), name, sort_order, treatment_count (computed)
- `Treatment`: slug (unique), name, specialty_slug, specialty_name, short_desc, description,
  cost_india_usd, cost_west_usd, savings_percent, hospital_stay, stay_in_india, success_rate,
  procedures[], includes[], top_hospitals[], image_url, featured
- `Inquiry`: name*, phone*, email, country, treatment_name, message
- Seeded by `backend/seed.py` (idempotent, upsert on slug): **10 specialties, 10 treatments**
- Images: 10 AI-generated treatment/facility photos + Unsplash lifestyle shots

## API (all under /api, on api_router in server.py)
- `GET /api/specialties` → Specialty[] with treatment_count
- `GET /api/treatments?specialty=&q=&featured=&limit=` → Treatment[]
- `GET /api/treatments/{slug}` → Treatment | 404
- `POST /api/inquiries` (201) → Inquiry | 422 on missing name/phone

## Pages (frontend/src/App.tsx)
- `/` Home — dark hero (free opinion CTA), stats, countries marquee, 6 services, 6 treatments, why-India, 6-step journey, testimonials, CTA
- `/treatments` — catalog; specialty pills + search
- `/treatments/:slug` — dark hero + cost comparison cards (India vs abroad vs savings %), stay info, overview, procedures, hospitals, free inclusions, sticky WhatsApp/call/inquiry panel, MedicalProcedure JSON-LD
- `/services` — 6 facilitation services + patient journey timeline
- `/about` — story, promises, hospital network, countries + languages
- `/contact` — WhatsApp/phone/email/address cards + inquiry form with **country Select** (POST /api/inquiries, sonner toast, `?treatment=` prefill)
- `/export-data` — WordPress XML download + contents table + import steps
- Unknown URLs redirect to `/`. Floating WhatsApp pill site-wide.

## SEO
- `index.html`: title/description/keywords/OG/canonical + MedicalBusiness JSON-LD (areaServed = 12 countries, availableLanguage)
- `Seo.tsx` sets per-page title/description/canonical/JSON-LD
- `frontend/public/robots.txt`, `frontend/public/sitemap.xml` (includes all 10 treatment URLs)

## WordPress deliverable
- `frontend/public/sps-medcare-wordpress-import.xml` (regenerate: `cd /app/backend && python make_wxr.py`)
- WXR 1.2, 36 items: 6 pages (Home, About, Treatments, Services, Contact, Countries We Serve),
  10 treatment pages, 10 SEO cost-guide blog posts, 10 image attachments, 10 specialty categories,
  Yoast + Rank Math SEO meta on every item. Copy also at /app/sps-medcare-wordpress-import.xml.

## Auth
None — public marketing site. No credentials needed (nothing to log into).

## Verification notes for testers
- Backend :8001 (supervisor `backend`), frontend :3000 (`frontend`), Mongo in-pod.
- 5 of 10 treatments are `featured: true`; home page shows the first 6 treatments regardless.
- Search "cancer" → 1 result; specialty pill "Cardiology" → 1 result; all treatments → 10.
- Treatment slugs are SEO phrases, e.g. `/treatments/cardiac-treatment-in-india`.

## WordPress PHP Theme (v1.0.0)
Source: `/app/wordpress-theme/sps-medcare/` (28 files). Custom theme matching the React design:
templates (index, front-page, page, single, archive-sps_treatment, taxonomy-sps_specialty,
single-sps_treatment, page-treatments, page-contact, search, searchform, sidebar, 404, header, footer,
template-parts/treatment-card), `inc/` (post-types, meta-boxes, customizer, enquiry, seo, icons, helpers,
demo-content), `assets/js/theme.js`, `style.css`, `readme.txt`.
Delivered via `GET /api/download/wordpress-theme` (zipped in memory, rooted at `sps-medcare/`) and the
"Download Theme" button on /export-data. Never ship zips as static frontend files (.gitignore excludes them).

## WXR XML (rewritten, ~255 KB)
`backend/make_wxr.py` now mirrors the full preview: every home/about/services/treatments/contact/countries
section (hero, stats, countries with flags, 6 services, cost-comparison tables, why India, 6-step journey,
3 patient stories, CTAs), 10 treatment pages (description, cost table, procedures, hospitals, inclusions,
5-question FAQ, cross-links), 10 cost-guide posts, 16 image attachments (6 site photos from
frontend/src/lib/site.ts IMAGES + 10 treatment photos, with alt text), featured images on every item,
10 specialty categories and a ready-made "Primary Menu" of nav_menu_items.

## WP deliverables v3 (theme + XML aligned)
- Theme now ships 16 photos in `wordpress-theme/sps-medcare/assets/img/` (6 section + 10 per-treatment)
  + placeholder.svg. helpers.php: sps_asset_img/sps_asset_img_path/sps_bundled_treatment_image; thumbnail
  fallback = featured → bundled → placeholder. front-page hero/why/services/recovery images default to
  bundled assets; new page-services.php template; functions.php auto-assigns Primary Menu / Footer Quick
  Links via theme_mod_nav_menu_locations; setup seeder imports bundled photos into the media library,
  sets featured images, creates both menus and the Countries We Serve page.
- XML: treatments are now `sps_treatment` CPT items carrying `_sps_cost_india/_cost_west/_savings/
  _hospital_stay/_stay_india/_success_rate/_procedures/_hospitals` + sps_specialty terms, pages carry
  `_wp_page_template`, both menus are emitted, in-content images point at
  /wp-content/themes/sps-medcare/assets/img/... (no hotlinking); attachments still sideload for the media library.
- Verified by installing WordPress (sqlite) locally, activating the theme and running the real importer:
  home/treatments/services/about/contact/countries/treatment/specialty/blog all 200 with images and no
  remote image refs; php -l clean on all 30 theme files.

## Theme screenshot
`wordpress-theme/sps-medcare/screenshot.png` (1200x900, ~215 KB) — captured from the theme actually
rendering in a local WordPress install, shown in Appearance → Themes. While capturing it, fixed
`sps_stat()` in inc/customizer.php which returned '' instead of the registered defaults, leaving the
home page trust-stats band blank until the Customizer was saved.
