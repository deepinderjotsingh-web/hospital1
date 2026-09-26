"""Generate the WordPress WXR import file for sps-medcare.com (medical tourism).

Run:  cd /app/backend && python make_wxr.py
Writes: frontend/public/sps-medcare-wordpress-import.xml (+ a copy at /app)

Import in WordPress: Tools -> Import -> WordPress (install the importer plugin),
tick "Download and import file attachments" so the treatment images are sideloaded.
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
ADDRESS = (
    "#123, 1st Floor, Vishal Tower, Janakpuri District Centre, "
    "Near Janakpuri West Metro, New Delhi - 110058, India"
)
WXR_DATE = "2026-01-15 09:00:00"
PUB_DATE = format_datetime(datetime(2026, 1, 15, 9, 0, 0, tzinfo=timezone.utc))

COUNTRIES = [
    "Bangladesh", "Nepal", "Sri Lanka", "United Arab Emirates", "Nigeria",
    "Afghanistan", "Iraq", "Maldives", "Oman", "Kenya", "Yemen", "Tanzania",
]

SERVICES = [
    ("Medical Treatment Coordination", "Free expert second opinions, written treatment plans and confirmed doctor appointments at JCI and NABH accredited hospitals including Fortis, Max, Medanta and Apollo."),
    ("Medical Visa Assistance", "Official medical visa invitation letters issued within 24 hours for both patient and attendant, with step-by-step guidance for your Indian embassy application."),
    ("Airport Transportation", "Complimentary airport pickup and drop at Delhi IGI in a patient-ready vehicle, plus all hospital transfers during your stay."),
    ("Accommodation Assistance", "Hygienic guest houses, serviced apartments with kitchens, or 4/5-star hotels within minutes of your hospital, booked to your budget."),
    ("Language Interpreter Support", "Dedicated interpreters fluent in Arabic, Bengali, Dari, Pashto, French, Russian and Swahili accompany you through consultations and admission."),
    ("24/7 WhatsApp Care Support", f"A named care manager on WhatsApp around the clock on {PHONE} for medicine refills, follow-up appointments, currency exchange and local SIM cards."),
]

JOURNEY = [
    ("Share your reports", "Send your diagnosis, scans and reports on WhatsApp. There is no charge and no obligation."),
    ("Get a free opinion & quote", "Within 48 hours you receive a written opinion from a relevant specialist plus an itemised cost estimate."),
    ("Medical visa & travel", "We issue your visa invitation letter within 24 hours and help you plan flights for patient and attendant."),
    ("Arrival & admission", "We meet you at Delhi IGI, take you to your accommodation, and handle hospital admission paperwork."),
    ("Treatment & recovery", "Your interpreter and care manager stay with you through treatment, discharge and recovery review."),
    ("Follow-up back home", "You fly home with a complete discharge summary and medication plan, with teleconsultation follow-up."),
]


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


def item_footer(post_name: str, post_type: str, categories: str = "") -> str:
    return (
        f"<wp:post_name>{cdata(post_name)}</wp:post_name>"
        "<wp:status><![CDATA[publish]]></wp:status>"
        "<wp:post_parent>0</wp:post_parent>"
        "<wp:menu_order>0</wp:menu_order>"
        f"<wp:post_type>{cdata(post_type)}</wp:post_type>"
        "<wp:post_password><![CDATA[]]></wp:post_password>"
        "<wp:is_sticky>0</wp:is_sticky>"
        f"{categories}"
    )


def ul(items: list[str]) -> str:
    return "<!-- wp:list --><ul>" + "".join(f"<li>{i}</li>" for i in items) + "</ul><!-- /wp:list -->"


def para(text: str) -> str:
    return f"<!-- wp:paragraph --><p>{text}</p><!-- /wp:paragraph -->"


def h2(text: str) -> str:
    return f"<!-- wp:heading --><h2>{text}</h2><!-- /wp:heading -->"


HOME_CONTENT = (
    '<!-- wp:heading {"level":1} --><h1>World-Class Medical Treatment in India for International Patients</h1><!-- /wp:heading -->'
    + para(
        "SPS Medcare is a Delhi NCR based medical tourism facilitator. We help patients and their "
        "families travel to India for affordable, world-class treatment at JCI and NABH accredited "
        "hospitals — and we handle everything around the treatment: the free second opinion, the "
        "medical visa letter, the airport pickup, the accommodation, the interpreter and a 24/7 care manager."
    )
    + para(
        f"<strong>Our facilitation service is free for patients.</strong> Send your medical reports on "
        f"WhatsApp to <strong>{PHONE}</strong> and receive a written specialist opinion and an itemised "
        "cost estimate within 48 hours — at no charge and with no obligation."
    )
    + h2("Why Patients Choose India")
    + ul([
        "<strong>Save 60–90%</strong> compared to treatment costs in the USA, UK and Europe",
        "<strong>No waiting lists</strong> — most treatments begin within days of arrival",
        "<strong>JCI &amp; NABH accredited hospitals</strong> with internationally trained, English-speaking doctors",
        "<strong>Outcomes at Western benchmarks</strong> in cardiac surgery, transplants, oncology and orthopedics",
        "<strong>Easy medical visa</strong> for patient plus attendant, with e-visa options for many countries",
    ])
    + h2("Treatments We Coordinate")
    + ul([
        f'<a href="/treatments/{t["slug"]}/">{t["name"]}</a> — from {t["cost_india_usd"]} '
        f'(vs {t["cost_west_usd"]})'
        for t in TREATMENTS
    ])
    + h2("Countries We Serve")
    + para(
        "We regularly assist patients travelling from " + ", ".join(COUNTRIES) + " and beyond."
    )
    + h2("Talk to a Medical Coordinator")
    + para(
        f'Call or WhatsApp <strong><a href="tel:+919920222362">{PHONE}</a></strong>, our Delhi office '
        f'on <a href="tel:+911141000493">{LANDLINE}</a>, or email '
        f'<a href="mailto:{EMAIL}">{EMAIL}</a>. Our desk is open 24/7 for '
        "international patients across every time zone."
    )
)

PAGES = [
    {
        "id": 101,
        "title": "Home",
        "slug": "home",
        "seo_title": "SPS Medcare — Medical Treatment in India for International Patients | Delhi NCR",
        "seo_desc": f"Affordable world-class medical treatment in India for foreign patients. Free second opinion, medical visa help, airport pickup, accommodation and interpreter. Call/WhatsApp {PHONE}.",
        "content": HOME_CONTENT,
    },
    {
        "id": 102,
        "title": "About Us",
        "slug": "about",
        "seo_title": "About SPS Medcare — Medical Tourism Facilitator in India",
        "seo_desc": "SPS Medcare has guided 2,500+ international patients from 12+ countries through treatment in India since 2011. Zero facilitation fee, JCI/NABH partner hospitals.",
        "content": (
            '<!-- wp:heading {"level":1} --><h1>About SPS Medcare</h1><!-- /wp:heading -->'
            + para(
                "SPS Medcare was founded in 2011 to solve a problem we watched families face again and "
                "again: excellent, affordable treatment existed in India, but reaching it from abroad "
                "meant navigating hospitals, visas, language, travel and accommodation entirely alone."
            )
            + para(
                "Since then we have guided more than <strong>2,500 international patients</strong> from "
                "over <strong>12 countries</strong> through treatment in Delhi NCR — from routine "
                "laparoscopic surgery to liver transplants and paediatric bone marrow transplants."
            )
            + h2("Our Promise")
            + ul([
                "<strong>Zero facilitation fee</strong> — our service to patients is free; we never mark up hospital bills",
                "<strong>Honest opinions</strong> — if travelling to India is not right for your case, we tell you",
                "<strong>Accredited hospitals only</strong> — JCI and NABH accredited partners with published outcomes",
                "<strong>One named coordinator</strong> from your first message until you land back home",
            ])
            + h2("Our Hospital Network")
            + para(
                "We work with Medanta – The Medicity, Fortis Memorial Research Institute, Apollo "
                "Hospitals, Max Super Speciality Hospitals, Fortis Escorts Heart Institute and the "
                "Indian Spinal Injuries Centre, among others across Delhi, Gurugram and Noida."
            )
            + h2("Contact")
            + para(
                f'Call or WhatsApp <strong>{PHONE}</strong>, our office on <strong>{LANDLINE}</strong>, email '
                f'<a href="mailto:{EMAIL}">{EMAIL}</a>, or visit our patient '
                f"desk at {ADDRESS}."
            )
        ),
    },
    {
        "id": 103,
        "title": "Treatments",
        "slug": "treatments",
        "seo_title": "Treatments in India — Cost, Hospital Stay & Recovery | SPS Medcare",
        "seo_desc": "Compare 10 major treatments in India with USD cost estimates, hospital stay and days in India: cancer, cardiac, joint replacement, transplants, neurosurgery, BMT, IVF and more.",
        "content": (
            '<!-- wp:heading {"level":1} --><h1>Treatments We Coordinate in India</h1><!-- /wp:heading -->'
            + para(
                "Transparent USD estimates, expected hospital stay and total days in India for every "
                "major specialty. Costs are indicative package ranges at our partner hospitals and are "
                "confirmed in writing after a specialist reviews your reports — free of charge."
            )
            + ul([
                f'<a href="/treatments/{t["slug"]}/">{t["name"]}</a> — {t["cost_india_usd"]} · '
                f'hospital stay {t["hospital_stay"]} · {t["stay_in_india"]} in India'
                for t in TREATMENTS
            ])
            + para(f"For a personalised estimate, WhatsApp your reports to <strong>{PHONE}</strong>.")
        ),
    },
    {
        "id": 104,
        "title": "Services",
        "slug": "services",
        "seo_title": "Patient Services — Medical Visa, Airport Pickup, Interpreter & Stay | SPS Medcare",
        "seo_desc": f"Complete support for international patients in India: treatment coordination, medical visa letters in 24 hours, airport pickup, accommodation, interpreters and 24/7 care. Call {PHONE}.",
        "content": (
            '<!-- wp:heading {"level":1} --><h1>Complete Support for Your Medical Journey</h1><!-- /wp:heading -->'
            + para(
                "Treatment is only part of the journey. These six services cover everything else — and "
                "all of them are included free when you travel through SPS Medcare."
            )
            + "".join(h2(title) + para(desc) for title, desc in SERVICES)
            + h2("Your Patient Journey, Step by Step")
            + ul([f"<strong>{title}:</strong> {desc}" for title, desc in JOURNEY])
        ),
    },
    {
        "id": 105,
        "title": "Contact Us",
        "slug": "contact",
        "seo_title": f"Contact SPS Medcare — Free Medical Opinion | WhatsApp {PHONE}",
        "seo_desc": f"Send your medical reports for a free specialist opinion and cost estimate. Call or WhatsApp {PHONE}, office {LANDLINE}, email {EMAIL}. Janakpuri, New Delhi.",
        "content": (
            '<!-- wp:heading {"level":1} --><h1>Get a Free Medical Opinion &amp; Cost Estimate</h1><!-- /wp:heading -->'
            + para(
                "Send us your diagnosis and recent reports — we will have a relevant specialist review "
                "them and reply with a written opinion and an itemised cost estimate within 48 hours. "
                "There is no charge and no obligation."
            )
            + ul([
                f'<strong>Phone / WhatsApp:</strong> <a href="tel:+919920222362">{PHONE}</a> (24/7 for international patients)',
                f'<strong>Email:</strong> <a href="mailto:{EMAIL}">{EMAIL}</a>',
                f"<strong>Office landline:</strong> <a href=\"tel:+911141000493\">{LANDLINE}</a>",
                f"<strong>Office address:</strong> {ADDRESS}",
                "<strong>Languages:</strong> English, Arabic, Bengali, Dari, Pashto, French, Russian, Swahili",
            ])
            + h2("What to Send Us")
            + ul([
                "Your diagnosis or doctor's summary",
                "Recent scans and reports (CT, MRI, PET-CT, biopsy, blood work)",
                "Patient age and current medication list",
                "Your city and country of travel",
            ])
        ),
    },
    {
        "id": 106,
        "title": "Countries We Serve",
        "slug": "countries-we-serve",
        "seo_title": "Countries We Serve — Medical Treatment in India for Foreign Patients | SPS Medcare",
        "seo_desc": "SPS Medcare assists patients from Bangladesh, Nepal, Sri Lanka, UAE, Nigeria, Afghanistan, Iraq, Maldives, Oman, Kenya, Yemen and Tanzania with treatment in India.",
        "content": (
            '<!-- wp:heading {"level":1} --><h1>Countries We Serve</h1><!-- /wp:heading -->'
            + para(
                "We assist patients and families travelling to India from across South Asia, the Middle "
                "East and Africa, with interpreters and coordinators familiar with each country's visa "
                "process and travel routes into Delhi."
            )
            + ul(COUNTRIES)
            + para(
                f"Travelling from somewhere not listed? We still help — WhatsApp <strong>{PHONE}</strong>."
            )
        ),
    },
]


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

    # Treatment images as attachments (sideloaded by the importer)
    for i, t in enumerate(TREATMENTS):
        att_id = 501 + i
        parts.append(
            item_header(att_id, t["name"], f"{SITE}/?attachment_id={att_id}", t["image_url"])
            + f"<content:encoded>{cdata('')}</content:encoded>"
            + "<excerpt:encoded><![CDATA[]]></excerpt:encoded>"
            + f"<wp:post_name>{cdata(t['slug'] + '-image')}</wp:post_name>"
            + "<wp:status><![CDATA[inherit]]></wp:status>"
            + "<wp:post_parent>0</wp:post_parent><wp:menu_order>0</wp:menu_order>"
            + f"<wp:post_type>{cdata('attachment')}</wp:post_type>"
            + "<wp:post_password><![CDATA[]]></wp:post_password><wp:is_sticky>0</wp:is_sticky>"
            + f"<wp:attachment_url>{cdata(t['image_url'])}</wp:attachment_url>"
            + meta("_wp_attachment_image_alt", f"{t['name']} in India — SPS Medcare")
            + "</item>"
        )

    # Pages
    for page in PAGES:
        parts.append(
            item_header(page["id"], page["title"], f"{SITE}/{page['slug']}/", f"{SITE}/?page_id={page['id']}")
            + f"<content:encoded>{cdata(page['content'])}</content:encoded>"
            + "<excerpt:encoded><![CDATA[]]></excerpt:encoded>"
            + item_footer(page["slug"], "page")
            + seo_meta(page["seo_title"], page["seo_desc"])
            + "</item>"
        )

    # Treatment pages (as WordPress pages under /treatments/, plus a post copy for blog themes)
    for i, t in enumerate(TREATMENTS):
        post_id = 1001 + i
        thumb_id = 501 + i
        content = (
            para(t["description"])
            + h2("Cost of " + t["name"] + " in India")
            + ul([
                f'<strong>Estimated cost in India:</strong> {t["cost_india_usd"]}',
                f'<strong>Comparable cost abroad:</strong> {t["cost_west_usd"]}',
                f'<strong>You save:</strong> up to {t["savings_percent"]}%',
                f'<strong>Hospital stay:</strong> {t["hospital_stay"]}',
                f'<strong>Total days in India:</strong> {t["stay_in_india"]}',
                f'<strong>Outcomes:</strong> {t["success_rate"]}',
            ])
            + h2("Procedures Covered")
            + ul(t["procedures"])
            + h2("Leading Hospitals for This Treatment")
            + ul(t["top_hospitals"])
            + h2("What SPS Medcare Includes — Free of Charge")
            + ul(COMMON_INCLUDES)
            + para(
                f'<strong>Get a free written opinion and exact cost for your case:</strong> WhatsApp your '
                f'reports to <a href="tel:+919920222362">{PHONE}</a> or email {EMAIL}.'
            )
        )
        seo_title = f"{t['name']} in India — Cost {t['cost_india_usd']} | SPS Medcare"
        parts.append(
            item_header(post_id, t["name"], f"{SITE}/treatments/{t['slug']}/", f"{SITE}/?page_id={post_id}")
            + f"<content:encoded>{cdata(content)}</content:encoded>"
            + f"<excerpt:encoded>{cdata(t['short_desc'])}</excerpt:encoded>"
            + item_footer(t["slug"], "page")
            + meta("_thumbnail_id", str(thumb_id))
            + seo_meta(seo_title, t["short_desc"])
            + "</item>"
        )

    # Blog posts: one cost-guide article per treatment (SEO long-tail)
    for i, t in enumerate(TREATMENTS):
        post_id = 2001 + i
        thumb_id = 501 + i
        title = f"{t['name']} in India: Cost, Hospitals and Recovery Time ({datetime.now().year} Guide)"
        content = (
            para(
                f"If you are considering {t['name'].lower()} in India, here is what international "
                f"patients actually pay, how long to plan for, and how SPS Medcare arranges it."
            )
            + para(t["description"])
            + h2("Cost Comparison")
            + ul([
                f'India: <strong>{t["cost_india_usd"]}</strong>',
                f'Abroad: {t["cost_west_usd"]}',
                f'Savings: up to <strong>{t["savings_percent"]}%</strong>',
            ])
            + h2("How Long Should You Plan to Stay?")
            + para(
                f'Expect a hospital stay of {t["hospital_stay"]}, and a total of {t["stay_in_india"]} '
                "in India including consultations, pre-operative workup and the post-discharge review "
                "before you are cleared to fly."
            )
            + h2("Next Step")
            + para(
                f'Send your reports on WhatsApp to <strong>{PHONE}</strong> for a free specialist opinion '
                "and an itemised estimate within 48 hours."
            )
        )
        spec_name = t["specialty_name"]
        spec_slug = t["specialty_slug"]
        parts.append(
            item_header(post_id, title, f"{SITE}/{t['slug']}-cost-guide/", f"{SITE}/?p={post_id}")
            + f"<content:encoded>{cdata(content)}</content:encoded>"
            + f"<excerpt:encoded>{cdata(t['short_desc'])}</excerpt:encoded>"
            + item_footer(
                f"{t['slug']}-cost-guide",
                "post",
                categories=f'<category domain="category" nicename="{spec_slug}">{cdata(spec_name)}</category>',
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
        f"{len(TREATMENTS)} treatment pages, {len(TREATMENTS)} blog posts, "
        f"{len(TREATMENTS)} images, {len(SPECIALTIES)} categories"
    )


if __name__ == "__main__":
    main()
