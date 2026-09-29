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
3. Go to Appearance → Setup SPS Medcare and click "Create demo content now".
   This creates the Home / Treatments / Services / About Us / Countries We Serve /
   Contact Us pages, the 10 specialties, all 10 treatments with costs, imports the
   16 photos bundled with the theme into your media library as featured images,
   builds the header and footer menus and sets Home as the front page.
4. Settings → Reading → "Your homepage displays" → A static page → Home.
5. Appearance → Menus → Manage Locations — the setup step already assigns
   "Primary Menu" (header) and "Footer Quick Links" (footer).
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
* 16 royalty-free photos bundled in assets/img/ — 6 section photos (hero, doctor &
  patient, patient care, operating theatre, airport pickup, Taj Mahal) and one per
  treatment in assets/img/treatments/. They are used automatically as fallbacks, so
  no page is ever image-less, and they are imported into the media library by setup.

== Templates ==

index.php, front-page.php, page.php, single.php, archive-sps_treatment.php,
taxonomy-sps_specialty.php, single-sps_treatment.php, page-treatments.php,
page-services.php, page-contact.php, search.php, searchform.php, sidebar.php,
404.php, header.php, footer.php, template-parts/treatment-card.php

== Changelog ==

= 1.0.0 =
* Initial release.
