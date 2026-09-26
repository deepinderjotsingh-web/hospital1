=== SPS Medcare ===
Contributors: SPS Medcare
Requires at least: 6.0
Tested up to: 6.7
Requires PHP: 7.4
Version: 1.0.0
License: GPLv2 or later
Tags: medical, healthcare, medical-tourism, custom-logo, custom-menu, featured-images, seo-friendly

A purpose-built WordPress theme for SPS Medcare (www.sps-medcare.com) — a medical
tourism facilitator helping international patients get treatment in India.

== Installation ==

1. In WordPress go to Appearance → Themes → Add New → Upload Theme.
2. Upload sps-medcare.zip and click Activate.
3. Go to Appearance → Import SPS Demo Content and click the import button. This
   creates the Home / Treatments / Services / About / Contact pages, the
   specialties, and all treatment entries with costs.
4. Settings → Reading → "Your homepage displays" → A static page → Home.
5. Appearance → Menus → create a menu with Home, Treatments, Services, About,
   Contact and assign it to "Primary Menu" (and optionally "Footer Quick Links").
6. Appearance → Customize → SPS Medcare Settings → confirm phone (9920222362),
   WhatsApp, landlines, email, address and hero image.
7. Settings → Permalinks → click Save (flushes rewrite rules for treatments).

== What's included ==

* Custom post type: Treatments (sps_treatment) + Specialty taxonomy (sps_specialty)
* Meta boxes: cost in India, cost abroad, savings %, hospital stay, stay in India,
  success rate, anaesthesia, hospital partners, inclusions
* Page templates: Treatments Listing, Contact / Enquiry
* Front page sections: hero, trust stats, countries served, services, featured
  treatments, why India, patient journey, CTA
* Enquiry form with nonce verification, honeypot, admin email notification and
  enquiries stored as a private post type
* SEO: title-tag support, meta description, canonical, Open Graph + Twitter cards,
  MedicalBusiness / MedicalProcedure / BreadcrumbList JSON-LD schema
* Accessible mobile nav, sticky header, reveal-on-scroll motion (reduced-motion safe)

== Templates ==

index.php, front-page.php, page.php, single.php, archive-sps_treatment.php,
taxonomy-sps_specialty.php, single-sps_treatment.php, page-treatments.php,
page-contact.php, search.php, searchform.php, sidebar.php, 404.php,
header.php, footer.php, template-parts/treatment-card.php

== Changelog ==

= 1.0.0 =
* Initial release.
