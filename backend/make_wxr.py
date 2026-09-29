"""Generate the WordPress WXR import file for sps-medcare.com (medical tourism).

This mirrors EVERYTHING shown on the live preview: every page section (hero,
stats, countries, services, treatments, why India, patient journey, patient
stories, CTA), every treatment page with its cost table, procedures, hospitals,
inclusions and FAQ, one cost-guide blog post per treatment, all site imagery
(hero, doctor, patient care, operating theatre, airport, Taj Mahal) plus the 10
treatment photos as attachments, and the primary navigation menu.

Run:  cd /app/backend && python make_wxr.py
Writes: frontend/public/sps-medcare-wordpress-import.xml (+ a copy at /app)

Import in WordPress: Tools -> Import -> WordPress (install the importer plugin),
tick "Download and import file attachments" so all images are sideloaded.
"""

from datetime import datetime, timezone
from email.utils import format_datetime
from pathlib import Path
from xml.sax.saxutils import escape

from seed import COMMON_INCLUDES, SPECIALTIES, TREATMENTS

SITE = "https://www.sps-medcare.com"
PHONE = "+91 99202 22362"
LANDLINE = "011 41000493"
EMAIL = "info@spsattestation.com"
WHATSAPP = "https://wa.me/919920222362"
ADDRESS = (
    "#123, 1st Floor, Vishal Tower, Janakpuri District Centre, "
    "Near Janakpuri West Metro, New Delhi - 110058, India"
)
CERT = "JCI & NABH Accredited Partner Hospitals"
WXR_DATE = "2026-01-15 09:00:00"
PUB_DATE = format_datetime(datetime(2026, 1, 15, 9, 0, 0, tzinfo=timezone.utc))
YEAR = datetime.now().year

# ---------------------------------------------------------------- site imagery
# Mirrors frontend/src/lib/site.ts IMAGES. Attachment ids 401-406.
SITE_IMAGES = [
    {
        "id": 401,
        "key": "hero-consultation",
        "title": "Doctor consulting an international patient in India",
        "alt": "Doctor consulting an international patient at a hospital in India",
        "url": "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?crop=entropy&cs=srgb&fm=jpg&q=85",
    },
    {
        "id": 402,
        "key": "doctor-patient",
        "title": "Specialist reviewing treatment options with a patient",
        "alt": "Specialist doctor reviewing treatment options with a patient in India",
        "url": "https://images.unsplash.com/photo-1758691462878-6edc3d3da1be?crop=entropy&cs=srgb&fm=jpg&q=85",
    },
    {
        "id": 403,
        "key": "patient-care",
        "title": "Nursing care for an international patient in Delhi NCR",
        "alt": "Doctor caring for an international patient in a hospital in India",
        "url": "https://images.unsplash.com/photo-1581056771107-24ca5f033842?crop=entropy&cs=srgb&fm=jpg&q=85",
    },
    {
        "id": 404,
        "key": "operating-room",
        "title": "Surgical team in a JCI accredited operating theatre in India",
        "alt": "Surgical team in a JCI accredited operating theatre in India",
        "url": "https://images.unsplash.com/photo-1579684288452-b334934f845f?crop=entropy&cs=srgb&fm=jpg&q=85",
    },
    {
        "id": 405,
        "key": "airport-pickup",
        "title": "Airport pickup at Delhi IGI for medical travellers",
        "alt": "Complimentary airport pickup for medical travellers at Delhi IGI",
        "url": "https://images.unsplash.com/photo-1687992176093-6417a93fa3d0?crop=entropy&cs=srgb&fm=jpg&q=85",
    },
    {
        "id": 406,
        "key": "taj-mahal",
        "title": "Taj Mahal — recovery travel in India",
        "alt": "Taj Mahal, India — sightseeing during recovery for medical travellers",
        "url": "https://images.unsplash.com/photo-1564507592333-c60657eea523?crop=entropy&cs=srgb&fm=jpg&q=85",
    },
]
IMG = {i["key"]: i for i in SITE_IMAGES}

COUNTRIES = [
    ("Bangladesh", "\U0001F1E7\U0001F1E9"),
    ("Nepal", "\U0001F1F3\U0001F1F5"),
    ("Sri Lanka", "\U0001F1F1\U0001F1F0"),
    ("United Arab Emirates", "\U0001F1E6\U0001F1EA"),
    ("Nigeria", "\U0001F1F3\U0001F1EC"),
    ("Afghanistan", "\U0001F1E6\U0001F1EB"),
    ("Iraq", "\U0001F1EE\U0001F1F6"),
    ("Maldives", "\U0001F1F2\U0001F1FB"),
    ("Oman", "\U0001F1F4\U0001F1F2"),
    ("Kenya", "\U0001F1F0\U0001F1EA"),
    ("Yemen", "\U0001F1FE\U0001F1EA"),
    ("Tanzania", "\U0001F1F9\U0001F1FF"),
]
COUNTRY_NAMES = [c[0] for c in COUNTRIES]

LANGUAGES = ["English", "Arabic", "Bengali", "Dari / Pashto", "French", "Russian", "Swahili"]

STATS = [
    ("2,500+", "International patients guided"),
    ("12+", "Countries served"),
    ("60–90%", "Savings vs USA &amp; UK"),
    ("24/7", "Patient desk on WhatsApp"),
]

SERVICES = [
    ("Medical Treatment Coordination", "Free expert second opinions, written treatment plans and confirmed doctor appointments at premier hospitals including Fortis, Max, Medanta and Apollo. We match your diagnosis to the right specialist — not just the nearest hospital."),
    ("Medical Visa Assistance", "Official medical visa invitation letters issued within 24 hours for both patient and attendant, plus step-by-step guidance for your Indian embassy or e-visa application."),
    ("Airport Transportation", "Complimentary airport pickup and drop at Delhi IGI in a patient-ready vehicle with a dedicated driver, plus every hospital transfer during your stay."),
    ("Accommodation Assistance", "Hygienic guest houses, serviced apartments with kitchen facilities, or 4/5-star hotels within minutes of your hospital — booked to your budget and family size."),
    ("Language Interpreter Support", f"Dedicated interpreters fluent in {', '.join(LANGUAGES[1:])} accompany you through consultations, admission and discharge so nothing is lost in translation."),
    ("24/7 WhatsApp &amp; Care Support", f"A named care manager on standby around the clock on {PHONE} for medicine refills, follow-up appointments, currency exchange and local SIM cards."),
]

JOURNEY = [
    ("01", "Share your reports", "Send your diagnosis, scans and reports on WhatsApp or email. There is no charge and no obligation at any stage."),
    ("02", "Free opinion &amp; cost estimate", "Within 48 hours you receive a written opinion from a relevant specialist plus an itemised cost estimate."),
    ("03", "Medical visa &amp; travel", "We issue your visa invitation letter within 24 hours and help you plan flights for patient and attendant."),
    ("04", "Arrival &amp; admission", "We meet you at Delhi IGI, take you to your accommodation, and handle all hospital admission paperwork."),
    ("05", "Treatment &amp; recovery", "Your interpreter and care manager stay with you through treatment, discharge and the recovery review."),
    ("06", "Follow-up back home", "You fly home with a complete discharge summary and medication plan, plus teleconsultation follow-up."),
]

WHY_INDIA = [
    ("Save 60–90% on treatment", "A cardiac bypass costing $60,000 in the USA is $4,200–$7,000 in India — with outcomes at the same benchmarks."),
    ("No waiting lists", "Most treatments begin within days of arrival instead of months on a public waiting list."),
    ("JCI &amp; NABH accredited hospitals", "Internationally trained, English-speaking doctors, many with US, UK or European fellowships."),
    ("Easy medical visa", "India grants medical visas for the patient plus attendants, with e-visa options for many countries."),
]

TESTIMONIALS = [
    ("My father needed a liver transplant and we had no idea where to start. SPS Medcare arranged the donor workup, the visa for four of us, and an apartment near Medanta. He is home in Dhaka and well.", "Rahim H.", "Bangladesh · Liver Transplant"),
    ("I compared bypass surgery costs in the UK and India. SPS Medcare got me a written opinion in two days, and the total cost including flights was still a fraction of the UK price.", "Joseph A.", "Nigeria · Cardiac Bypass"),
    ("The interpreter made all the difference — my mother speaks only Arabic and never felt lost. Airport pickup, hotel, hospital appointments, everything was already arranged.", "Fatima M.", "Iraq · Knee Replacement"),
]

VALUES = [
    ("Zero Facilitation Fee", "Our service to patients is completely free. We never mark up hospital bills — you pay the hospital directly at their own rates."),
    ("Honest Opinions", "If travelling to India is not the right choice for your case, we tell you plainly. A second opinion should be advice, not a sales pitch."),
    ("Accredited Hospitals Only", "We work exclusively with JCI and NABH accredited partners whose outcomes and infection rates are published and audited."),
    ("One Named Coordinator", "The same coordinator handles your case from your first WhatsApp message until you land safely back home."),
]

HOSPITALS = [
    "Medanta – The Medicity, Gurugram",
    "Fortis Memorial Research Institute, Gurugram",
    "Apollo Hospitals, Delhi NCR",
    "Max Super Speciality Hospital, Saket",
    "Fortis Escorts Heart Institute, Delhi",
    "Indian Spinal Injuries Centre, Delhi",
]


# ------------------------------------------------------------------ XML helpers
def cdata(text: str) -> str:
    return f"<![CDATA[{text.replace(']]>', ']]]]><![CDATA[>')}]]>"


def meta(key: str, value: str) -> str:
    return f"<wp:postmeta><wp:meta_key>{cdata(key)}</wp:meta_key><wp:meta_value>{cdata(value)}</wp:meta_value></wp:postmeta>"


def seo_meta(title: str, desc: str) -> str:
    return (
        meta("_yoast_wpseo_title", title)
        + meta("_yoast_wpseo_metadesc", desc)
        + meta("_rank_math_title", title)
        + meta("_rank_math_description", desc)
    )


def item_header(post_id: int, title: str, link: str, guid: str) -> str:
    return (
        "<item>"
        f"<title>{cdata(title)}</title>"
        f"<link>{escape(link)}</link>"
        f"<pubDate>{PUB_DATE}</pubDate>"
        f"<dc:creator>{cdata('admin')}</dc:creator>"
        f'<guid isPermaLink="false">{escape(guid)}</guid>'
        "<description></description>"
        f"<wp:post_id>{post_id}</wp:post_id>"
        f"<wp:post_date>{cdata(WXR_DATE)}</wp:post_date>"
        f"<wp:post_date_gmt>{cdata(WXR_DATE)}</wp:post_date_gmt>"
        f"<wp:post_modified>{cdata(WXR_DATE)}</wp:post_modified>"
        f"<wp:post_modified_gmt>{cdata(WXR_DATE)}</wp:post_modified_gmt>"
        f"<wp:comment_status>{cdata('closed')}</wp:comment_status>"
        f"<wp:ping_status>{cdata('closed')}</wp:ping_status>"
    )


def item_footer(post_name: str, post_type: str, categories: str = "", menu_order: int = 0) -> str:
    return (
        f"<wp:post_name>{cdata(post_name)}</wp:post_name>"
        "<wp:status><![CDATA[publish]]></wp:status>"
        "<wp:post_parent>0</wp:post_parent>"
        f"<wp:menu_order>{menu_order}</wp:menu_order>"
        f"<wp:post_type>{cdata(post_type)}</wp:post_type>"
        "<wp:post_password><![CDATA[]]></wp:post_password>"
        "<wp:is_sticky>0</wp:is_sticky>"
        f"{categories}"
    )


# --------------------------------------------------------------- block helpers
def para(text: str) -> str:
    return f"<!-- wp:paragraph --><p>{text}</p><!-- /wp:paragraph -->"


def h1(text: str) -> str:
    return f'<!-- wp:heading {{"level":1}} --><h1>{text}</h1><!-- /wp:heading -->'


def h2(text: str) -> str:
    return f"<!-- wp:heading --><h2>{text}</h2><!-- /wp:heading -->"


def h3(text: str) -> str:
    return f'<!-- wp:heading {{"level":3}} --><h3>{text}</h3><!-- /wp:heading -->'


def ul(items: list[str]) -> str:
    return "<!-- wp:list --><ul>" + "".join(f"<li>{i}</li>" for i in items) + "</ul><!-- /wp:list -->"


# In-page images are served from the theme folder (root-relative), so they work
# on any domain, offline, without hotlinking. The same photos also arrive in the
# media library as attachments below, and are used as featured images.
THEME_IMG_BASE = "/wp-content/themes/sps-medcare/assets/img"


def image(key: str, caption: str = "") -> str:
    img = IMG[key]
    cap = f"<figcaption class=\"wp-element-caption\">{caption}</figcaption>" if caption else ""
    src = f"{THEME_IMG_BASE}/{img['key']}.jpg"
    return (
        f'<!-- wp:image {{"id":{img["id"]},"sizeSlug":"large","linkDestination":"none"}} -->'
        f'<figure class="wp-block-image size-large">'
        f'<img src="{escape(src)}" alt="{escape(img["alt"])}" class="wp-image-{img["id"]}"/>{cap}'
        "</figure><!-- /wp:image -->"
    )


def treatment_image(t: dict, att_id: int) -> str:
    src = f"{THEME_IMG_BASE}/treatments/{t['slug']}.jpg"
    return (
        f'<!-- wp:image {{"id":{att_id},"sizeSlug":"large","linkDestination":"none"}} -->'
        f'<figure class="wp-block-image size-large">'
        f'<img src="{escape(src)}" alt="{escape(t["name"] + " in India — SPS Medcare")}" class="wp-image-{att_id}"/>'
        "</figure><!-- /wp:image -->"
    )


def table(headers: list[str], rows: list[list[str]]) -> str:
    head = "".join(f"<th>{h}</th>" for h in headers)
    body = "".join("<tr>" + "".join(f"<td>{c}</td>" for c in r) + "</tr>" for r in rows)
    return (
        '<!-- wp:table {"hasFixedLayout":false} -->'
        '<figure class="wp-block-table"><table>'
        f"<thead><tr>{head}</tr></thead><tbody>{body}</tbody>"
        "</table></figure><!-- /wp:table -->"
    )


def quote(text: str, cite: str) -> str:
    return (
        "<!-- wp:quote --><blockquote class=\"wp-block-quote\">"
        f"<p>{text}</p><cite>{cite}</cite>"
        "</blockquote><!-- /wp:quote -->"
    )


def button(label: str, url: str) -> str:
    return (
        '<!-- wp:buttons --><div class="wp-block-buttons">'
        '<!-- wp:button --><div class="wp-block-button">'
        f'<a class="wp-block-button__link wp-element-button" href="{escape(url)}">{label}</a>'
        "</div><!-- /wp:button --></div><!-- /wp:buttons -->"
    )


def contact_block() -> str:
    return (
        h2("Talk to a Medical Coordinator")
        + para(
            f'Call or WhatsApp <strong><a href="tel:+919920222362">{PHONE}</a></strong>, our Delhi '
            f'office on <a href="tel:+911141000493">{LANDLINE}</a>, or email '
            f'<a href="mailto:{EMAIL}">{EMAIL}</a>. Our international patient desk is open 24/7 '
            "across every time zone."
        )
        + button("Get Free Opinion on WhatsApp", WHATSAPP)
    )


def stats_block() -> str:
    return table(["SPS Medcare in numbers", "Detail"], [[f"<strong>{v}</strong>", label] for v, label in STATS])


def countries_block() -> str:
    return (
        h2("Countries We Serve")
        + para("Patients travel to us from across South Asia, the Middle East and Africa:")
        + ul([f"{flag} {name}" for name, flag in COUNTRIES])
        + para(
            f"Travelling from somewhere not listed? We still help — WhatsApp <strong>{PHONE}</strong>."
        )
    )


def treatment_cost_table() -> str:
    return table(
        ["Treatment", "Cost in India", "Cost abroad", "You save", "Hospital stay", "Days in India"],
        [
            [
                f'<a href="/treatments/{t["slug"]}/">{t["name"]}</a>',
                t["cost_india_usd"],
                t["cost_west_usd"],
                f'{t["savings_percent"]}%',
                t["hospital_stay"],
                t["stay_in_india"],
            ]
            for t in TREATMENTS
        ],
    )


# ------------------------------------------------------------------ page bodies
HOME_CONTENT = (
    h1("World-Class Medical Treatment in India — At a Fraction of the Cost")
    + image("hero-consultation", f"{CERT} across Delhi NCR")
    + para(
        "We are dedicated to making your medical journey smooth, safe and stress-free. Trusted by "
        "<strong>2,500+ patients</strong> from Bangladesh, Nepal, Sri Lanka, UAE, Nigeria, "
        "Afghanistan, Iraq, Maldives, Oman and beyond."
    )
    + para(
        f"<strong>Our service is free for patients.</strong> Send your medical reports on WhatsApp to "
        f"<strong>{PHONE}</strong> and receive a written specialist opinion plus an itemised cost "
        "estimate within 48 hours — no charge, no obligation."
    )
    + button(f"WhatsApp {PHONE}", WHATSAPP)
    + h2("SPS Medcare at a Glance")
    + stats_block()
    + h2("Complete Support for Your Health Journey")
    + para(
        "Treatment is only part of the journey. Everything around it — visa, travel, stay, language, "
        "daily care — is arranged by us, free of charge."
    )
    + "".join(h3(title) + para(desc) for title, desc in SERVICES)
    + image("airport-pickup", "Complimentary airport pickup and drop at Delhi IGI")
    + h2("Most Requested Medical Treatments in India")
    + para(
        "Transparent USD estimates, expected hospital stay and total days in India — confirmed in "
        "writing after a specialist reviews your reports."
    )
    + treatment_cost_table()
    + h2("Why Patients Fly to India for Treatment")
    + "".join(h3(title) + para(desc) for title, desc in WHY_INDIA)
    + image("operating-room", "Surgical team in a JCI accredited operating theatre in India")
    + para(f"<strong>Interpreters available in:</strong> {' · '.join(LANGUAGES)}")
    + h2("Your Journey, Step by Step")
    + "".join(h3(f"{step} — {title}") + para(desc) for step, title, desc in JOURNEY)
    + h2("Trusted by Families Across 12+ Countries")
    + "".join(quote(text, f"{name} — {role}") for text, name, role in TESTIMONIALS)
    + countries_block()
    + contact_block()
)

ABOUT_CONTENT = (
    h1("Dedicated to Affordable Healthcare for Patients Around the World")
    + image("patient-care", "Nursing care for an international patient in Delhi NCR")
    + para(
        "SPS Medcare was founded in 2011 to solve a problem we watched families face again and "
        "again: excellent, affordable treatment existed in India, but reaching it from abroad meant "
        "navigating hospitals, visas, language, travel and accommodation entirely alone."
    )
    + para(
        "Since then we have guided more than <strong>2,500 international patients</strong> from over "
        "<strong>12 countries</strong> through treatment in Delhi NCR — from routine laparoscopic "
        "surgery to liver transplants and paediatric bone marrow transplants."
    )
    + para(
        "We are not a hospital and we are not a travel agency. We are the team that sits between the "
        "two, making sure the medicine is right and everything around it is handled — so a family "
        "arriving at Delhi airport at 3 AM with a sick child knows exactly who is meeting them."
    )
    + stats_block()
    + h2("Our Promise to Every Patient")
    + "".join(h3(title) + para(desc) for title, desc in VALUES)
    + h2("Our Hospital Network")
    + para(
        "Delhi NCR is India's densest cluster of accredited super-speciality hospitals, which is why "
        "we are based here — your specialist, your scans and your surgery are all within a short "
        "drive of your accommodation."
    )
    + ul(HOSPITALS)
    + countries_block()
    + h2("Languages We Support")
    + ul(LANGUAGES)
    + para(
        "Travelling from a country not listed, or speaking a language not shown? We still help — "
        "message us and we will arrange the right interpreter."
    )
    + image("taj-mahal", "Many patients add a short sightseeing trip during recovery")
    + contact_block()
)

TREATMENTS_CONTENT = (
    h1("Treatments We Coordinate in India")
    + para(
        "Transparent USD estimates, expected hospital stay and total days in India for every major "
        "specialty. Costs are indicative package ranges at our partner hospitals and are confirmed in "
        "writing after a specialist reviews your reports — free of charge."
    )
    + treatment_cost_table()
    + h2("Browse by Specialty")
    + ul([spec["name"] for spec in SPECIALTIES])
    + h2("Every Treatment Includes — Free of Charge")
    + ul(COMMON_INCLUDES)
    + image("doctor-patient", "A specialist reviews your reports before you travel")
    + para(f"For a personalised estimate, WhatsApp your reports to <strong>{PHONE}</strong>.")
    + contact_block()
)

SERVICES_CONTENT = (
    h1("Complete Support for Your Medical Journey")
    + para(
        "Treatment is only part of the journey. These six services cover everything else — and all of "
        "them are included free when you travel through SPS Medcare."
    )
    + "".join(h2(title) + para(desc) for title, desc in SERVICES)
    + image("airport-pickup", "Patient-ready vehicle and dedicated driver at Delhi IGI")
    + h2("Your Patient Journey, Step by Step")
    + "".join(h3(f"{step} — {title}") + para(desc) for step, title, desc in JOURNEY)
    + h2("Languages We Support")
    + ul(LANGUAGES)
    + contact_block()
)

CONTACT_CONTENT = (
    h1("Get a Free Medical Opinion &amp; Cost Estimate")
    + para(
        "Send us your diagnosis and recent reports — we will have a relevant specialist review them "
        "and reply with a written opinion and an itemised cost estimate within 48 hours. There is no "
        "charge and no obligation."
    )
    + h2("Contact Details")
    + table(
        ["Channel", "Detail"],
        [
            ["Phone / WhatsApp", f'<a href="tel:+919920222362">{PHONE}</a> (24/7 for international patients)'],
            ["Office landline", f'<a href="tel:+911141000493">{LANDLINE}</a>'],
            ["Email", f'<a href="mailto:{EMAIL}">{EMAIL}</a>'],
            ["Office address", ADDRESS],
            ["Hours", "24/7 international patient desk"],
            ["Languages", ", ".join(LANGUAGES)],
            ["Accreditation", CERT],
        ],
    )
    + button(f"WhatsApp {PHONE}", WHATSAPP)
    + h2("What to Send Us")
    + ul([
        "Your diagnosis or doctor's summary",
        "Recent scans and reports (CT, MRI, PET-CT, biopsy, blood work)",
        "Patient age and current medication list",
        "Your city and country of travel",
    ])
    + h2("Enquiry Form")
    + para(
        "Prefer a form? Add your contact form shortcode here (Contact Form 7, WPForms or the SPS "
        "Medcare theme's built-in enquiry form) to collect name, email, phone, country, treatment "
        "and message."
    )
    + image("patient-care", "Our patient desk in Janakpuri, New Delhi")
)

COUNTRIES_CONTENT = (
    h1("Countries We Serve")
    + para(
        "We assist patients and families travelling to India from across South Asia, the Middle East "
        "and Africa, with interpreters and coordinators familiar with each country's visa process and "
        "travel routes into Delhi."
    )
    + ul([f"{flag} {name}" for name, flag in COUNTRIES])
    + h2("Languages We Support")
    + ul(LANGUAGES)
    + image("taj-mahal", "India welcomes over half a million medical travellers each year")
    + contact_block()
)


PAGES = [
    {
        "id": 101,
        "title": "Home",
        "slug": "home",
        "menu": 1,
        "thumb": 401,
        "seo_title": "SPS Medcare — Medical Treatment in India for International Patients | Delhi NCR",
        "seo_desc": f"Affordable world-class medical treatment in India for foreign patients. Free second opinion, medical visa help, airport pickup, accommodation and interpreter. Call/WhatsApp {PHONE}.",
        "content": HOME_CONTENT,
    },
    {
        "id": 103,
        "title": "Treatments",
        "slug": "treatments",
        "menu": 2,
        "template": "page-treatments.php",
        "thumb": 402,
        "seo_title": "Treatments in India — Cost, Hospital Stay & Recovery | SPS Medcare",
        "seo_desc": "Compare 10 major treatments in India with USD cost estimates, hospital stay and days in India: cancer, cardiac, joint replacement, transplants, neurosurgery, BMT, IVF and more.",
        "content": TREATMENTS_CONTENT,
    },
    {
        "id": 104,
        "title": "Services",
        "slug": "services",
        "menu": 3,
        "template": "page-services.php",
        "thumb": 405,
        "seo_title": "Patient Services — Medical Visa, Airport Pickup, Interpreter & Stay | SPS Medcare",
        "seo_desc": f"Complete support for international patients in India: treatment coordination, medical visa letters in 24 hours, airport pickup, accommodation, interpreters and 24/7 care. Call {PHONE}.",
        "content": SERVICES_CONTENT,
    },
    {
        "id": 102,
        "title": "About Us",
        "slug": "about",
        "menu": 4,
        "thumb": 403,
        "seo_title": "About SPS Medcare — Medical Tourism Facilitator in India",
        "seo_desc": "SPS Medcare has guided 2,500+ international patients from 12+ countries through treatment in India since 2011. Zero facilitation fee, JCI/NABH partner hospitals.",
        "content": ABOUT_CONTENT,
    },
    {
        "id": 106,
        "title": "Countries We Serve",
        "slug": "countries-we-serve",
        "menu": 5,
        "thumb": 406,
        "seo_title": "Countries We Serve — Medical Treatment in India for Foreign Patients | SPS Medcare",
        "seo_desc": "SPS Medcare assists patients from Bangladesh, Nepal, Sri Lanka, UAE, Nigeria, Afghanistan, Iraq, Maldives, Oman, Kenya, Yemen and Tanzania with treatment in India.",
        "content": COUNTRIES_CONTENT,
    },
    {
        "id": 105,
        "title": "Contact Us",
        "slug": "contact",
        "menu": 6,
        "template": "page-contact.php",
        "thumb": 403,
        "seo_title": f"Contact SPS Medcare — Free Medical Opinion | WhatsApp {PHONE}",
        "seo_desc": f"Send your medical reports for a free specialist opinion and cost estimate. Call or WhatsApp {PHONE}, office {LANDLINE}, email {EMAIL}. Janakpuri, New Delhi.",
        "content": CONTACT_CONTENT,
    },
]


def treatment_faq(t: dict) -> str:
    return (
        h2("Frequently Asked Questions")
        + h3(f'How much does {t["name"].lower()} cost in India?')
        + para(
            f'The indicative package range at our partner hospitals is <strong>{t["cost_india_usd"]}</strong>, '
            f'against {t["cost_west_usd"]} for comparable care abroad — a saving of up to '
            f'{t["savings_percent"]}%. Your exact cost is confirmed in writing, free of charge, once a '
            "specialist reviews your reports."
        )
        + h3("How long will I need to stay in India?")
        + para(
            f'Plan for a hospital stay of {t["hospital_stay"]} and a total of {t["stay_in_india"]} in '
            "India, covering consultations, pre-operative workup, the procedure and the "
            "post-discharge review before you are cleared to fly."
        )
        + h3("What are the success rates?")
        + para(f'{t["success_rate"]}. All our partner hospitals are JCI or NABH accredited with audited outcomes.')
        + h3("Do you charge for your help?")
        + para(
            "No. Our facilitation service is free for patients — the second opinion, visa letter, "
            "airport pickup, accommodation booking, interpreter and 24/7 care manager cost you nothing, "
            "and we never mark up hospital bills."
        )
        + h3("What do I need to send to get an estimate?")
        + para(
            f'Your diagnosis or doctor summary, recent scans and reports, patient age and medication '
            f'list. WhatsApp them to {PHONE} or email {EMAIL}.'
        )
    )


def build() -> str:
    parts: list[str] = []
    parts.append(
        '<?xml version="1.0" encoding="UTF-8" ?>'
        '<rss version="2.0" '
        'xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/" '
        'xmlns:content="http://purl.org/rss/1.0/modules/content/" '
        'xmlns:wfw="http://wellformedweb.org/CommentAPI/" '
        'xmlns:dc="http://purl.org/dc/elements/1.1/" '
        'xmlns:wp="http://wordpress.org/export/1.2/">'
        "<channel>"
        "<title>SPS Medcare</title>"
        f"<link>{SITE}</link>"
        "<description>World-Class Medical Treatment in India for International Patients</description>"
        f"<pubDate>{PUB_DATE}</pubDate>"
        "<language>en-US</language>"
        "<wp:wxr_version>1.2</wp:wxr_version>"
        f"<wp:base_site_url>{SITE}</wp:base_site_url>"
        f"<wp:base_blog_url>{SITE}</wp:base_blog_url>"
        "<wp:author><wp:author_id>1</wp:author_id><wp:author_login><![CDATA[admin]]></wp:author_login>"
        f"<wp:author_email><![CDATA[{EMAIL}]]></wp:author_email>"
        "<wp:author_display_name><![CDATA[SPS Medcare]]></wp:author_display_name>"
        "<wp:author_first_name><![CDATA[]]></wp:author_first_name>"
        "<wp:author_last_name><![CDATA[]]></wp:author_last_name></wp:author>"
    )

    # Specialties as blog categories
    for i, spec in enumerate(SPECIALTIES, start=10):
        parts.append(
            f"<wp:category><wp:term_id>{i}</wp:term_id>"
            f"<wp:category_nicename>{spec['slug']}</wp:category_nicename>"
            "<wp:category_parent></wp:category_parent>"
            f"<wp:cat_name>{cdata(spec['name'])}</wp:cat_name></wp:category>"
        )

    # Specialty terms for the theme's sps_specialty taxonomy
    for i, spec in enumerate(SPECIALTIES, start=40):
        parts.append(
            f"<wp:term><wp:term_id>{i}</wp:term_id>"
            "<wp:term_taxonomy><![CDATA[sps_specialty]]></wp:term_taxonomy>"
            f"<wp:term_slug>{cdata(spec['slug'])}</wp:term_slug>"
            f"<wp:term_name>{cdata(spec['name'])}</wp:term_name></wp:term>"
        )

    # Navigation menu terms (header + footer)
    for term_id, slug, name in (
        (90, "primary-menu", "Primary Menu"),
        (91, "footer-quick-links", "Footer Quick Links"),
    ):
        parts.append(
            f"<wp:term><wp:term_id>{term_id}</wp:term_id>"
            "<wp:term_taxonomy><![CDATA[nav_menu]]></wp:term_taxonomy>"
            f"<wp:term_slug>{cdata(slug)}</wp:term_slug>"
            f"<wp:term_name>{cdata(name)}</wp:term_name></wp:term>"
        )

    def attachment(att_id: int, title: str, name: str, url: str, alt: str) -> str:
        return (
            item_header(att_id, title, f"{SITE}/?attachment_id={att_id}", url)
            + f"<content:encoded>{cdata('')}</content:encoded>"
            + "<excerpt:encoded><![CDATA[]]></excerpt:encoded>"
            + f"<wp:post_name>{cdata(name)}</wp:post_name>"
            + "<wp:status><![CDATA[inherit]]></wp:status>"
            + "<wp:post_parent>0</wp:post_parent><wp:menu_order>0</wp:menu_order>"
            + f"<wp:post_type>{cdata('attachment')}</wp:post_type>"
            + "<wp:post_password><![CDATA[]]></wp:post_password><wp:is_sticky>0</wp:is_sticky>"
            + f"<wp:attachment_url>{cdata(url)}</wp:attachment_url>"
            + meta("_wp_attachment_image_alt", alt)
            + "</item>"
        )

    # Site section imagery (hero, doctor, care, OT, airport, Taj Mahal)
    for img in SITE_IMAGES:
        parts.append(attachment(img["id"], img["title"], img["key"], img["url"], img["alt"]))

    # Treatment photos
    for i, t in enumerate(TREATMENTS):
        parts.append(
            attachment(
                501 + i,
                t["name"],
                f"{t['slug']}-image",
                t["image_url"],
                f"{t['name']} in India — SPS Medcare",
            )
        )

    # Pages
    for page in PAGES:
        parts.append(
            item_header(page["id"], page["title"], f"{SITE}/{page['slug']}/", f"{SITE}/?page_id={page['id']}")
            + f"<content:encoded>{cdata(page['content'])}</content:encoded>"
            + "<excerpt:encoded><![CDATA[]]></excerpt:encoded>"
            + item_footer(page["slug"], "page", menu_order=page["menu"])
            + meta("_thumbnail_id", str(page["thumb"]))
            + (meta("_wp_page_template", page["template"]) if page.get("template") else "")
            + seo_meta(page["seo_title"], page["seo_desc"])
            + "</item>"
        )

    # Menu items for both locations (header + footer), pointing at those pages
    for menu_slug, menu_name, base_id in (
        ("primary-menu", "Primary Menu", 900),
        ("footer-quick-links", "Footer Quick Links", 920),
    ):
        for page in PAGES:
            item_id = base_id + page["menu"]
            parts.append(
                item_header(item_id, page["title"], f"{SITE}/{page['slug']}/", f"{SITE}/?p={item_id}")
                + "<content:encoded><![CDATA[]]></content:encoded>"
                + "<excerpt:encoded><![CDATA[]]></excerpt:encoded>"
                + item_footer(
                    str(item_id),
                    "nav_menu_item",
                    categories=f'<category domain="nav_menu" nicename="{menu_slug}">{cdata(menu_name)}</category>',
                    menu_order=page["menu"],
                )
                + meta("_menu_item_type", "post_type")
                + meta("_menu_item_menu_item_parent", "0")
                + meta("_menu_item_object_id", str(page["id"]))
                + meta("_menu_item_object", "page")
                + meta("_menu_item_target", "")
                + meta("_menu_item_classes", "")
                + meta("_menu_item_xfn", "")
                + meta("_menu_item_url", "")
                + "</item>"
            )

    # Treatment pages under /treatments/
    for i, t in enumerate(TREATMENTS):
        post_id = 1001 + i
        thumb_id = 501 + i
        content = (
            para(f'<strong>{t["short_desc"]}</strong>')
            + para(t["description"])
            + treatment_faq(t)
        )
        seo_title = f"{t['name']} in India — Cost {t['cost_india_usd']} | SPS Medcare"
        parts.append(
            item_header(post_id, t["name"], f"{SITE}/treatments/{t['slug']}/", f"{SITE}/?post_type=sps_treatment&p={post_id}")
            + f"<content:encoded>{cdata(content)}</content:encoded>"
            + f"<excerpt:encoded>{cdata(t['short_desc'])}</excerpt:encoded>"
            + item_footer(
                t["slug"],
                "sps_treatment",
                categories=f'<category domain="sps_specialty" nicename="{t["specialty_slug"]}">{cdata(t["specialty_name"])}</category>',
                menu_order=i + 1,
            )
            + meta("_thumbnail_id", str(thumb_id))
            # Meta the SPS Medcare theme reads (Treatment Details box)
            + meta("_sps_cost_india", t["cost_india_usd"])
            + meta("_sps_cost_west", t["cost_west_usd"])
            + meta("_sps_savings", str(t["savings_percent"]))
            + meta("_sps_hospital_stay", t["hospital_stay"])
            + meta("_sps_stay_india", t["stay_in_india"])
            + meta("_sps_success_rate", t["success_rate"])
            + meta("_sps_procedures", "\n".join(t["procedures"]))
            + meta("_sps_hospitals", "\n".join(t["top_hospitals"]))
            + seo_meta(seo_title, t["short_desc"])
            + "</item>"
        )

    # Blog posts: one cost-guide article per treatment (SEO long-tail)
    for i, t in enumerate(TREATMENTS):
        post_id = 2001 + i
        thumb_id = 501 + i
        title = f"{t['name']} in India: Cost, Hospitals and Recovery Time ({YEAR} Guide)"
        content = (
            treatment_image(t, thumb_id)
            + para(
                f"If you are considering {t['name'].lower()} in India, here is what international "
                f"patients actually pay, how long to plan for, and how SPS Medcare arranges it."
            )
            + para(t["description"])
            + h2("Cost Comparison")
            + table(
                ["Country", "Typical cost"],
                [
                    ["India (partner hospitals)", f'<strong>{t["cost_india_usd"]}</strong>'],
                    ["Abroad", t["cost_west_usd"]],
                    ["Savings", f'up to <strong>{t["savings_percent"]}%</strong>'],
                ],
            )
            + h2("How Long Should You Plan to Stay?")
            + para(
                f'Expect a hospital stay of {t["hospital_stay"]}, and a total of {t["stay_in_india"]} '
                "in India including consultations, pre-operative workup and the post-discharge review "
                "before you are cleared to fly."
            )
            + h2("Procedures Covered")
            + ul(t["procedures"])
            + h2("Where It Is Done")
            + ul(t["top_hospitals"])
            + h2("What We Arrange For You")
            + ul(COMMON_INCLUDES)
            + treatment_faq(t)
            + h2("Next Step")
            + para(
                f'Send your reports on WhatsApp to <strong>{PHONE}</strong> for a free specialist opinion '
                "and an itemised estimate within 48 hours."
            )
            + button(f"WhatsApp {PHONE}", WHATSAPP)
            + para(f'Read the full treatment page: <a href="/treatments/{t["slug"]}/">{t["name"]} in India</a>.')
        )
        parts.append(
            item_header(post_id, title, f"{SITE}/{t['slug']}-cost-guide/", f"{SITE}/?p={post_id}")
            + f"<content:encoded>{cdata(content)}</content:encoded>"
            + f"<excerpt:encoded>{cdata(t['short_desc'])}</excerpt:encoded>"
            + item_footer(
                f"{t['slug']}-cost-guide",
                "post",
                categories=f'<category domain="category" nicename="{t["specialty_slug"]}">{cdata(t["specialty_name"])}</category>',
            )
            + meta("_thumbnail_id", str(thumb_id))
            + seo_meta(title, t["short_desc"])
            + "</item>"
        )

    parts.append("</channel></rss>")
    return "\n".join(parts)


def main() -> None:
    xml = build()
    out_public = Path(__file__).parent.parent / "frontend" / "public" / "sps-medcare-wordpress-import.xml"
    out_public.write_text(xml, encoding="utf-8")
    (Path(__file__).parent.parent / "sps-medcare-wordpress-import.xml").write_text(xml, encoding="utf-8")
    print(
        f"Wrote {out_public} ({len(xml)} bytes): {len(PAGES)} pages, "
        f"{len(TREATMENTS)} sps_treatment entries (with theme meta), {len(TREATMENTS)} blog posts, "
        f"{len(SITE_IMAGES) + len(TREATMENTS)} images, {len(SPECIALTIES)} specialties, "
        f"{len(PAGES) * 2} menu items (header + footer)"
    )


if __name__ == "__main__":
    main()
