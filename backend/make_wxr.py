"""Generate the WordPress WXR import file for sps-medcare.com from the same seed data.

Run:  cd /app/backend && python make_wxr.py
Writes: frontend/public/sps-medcare-wordpress-import.xml (+ a copy at /app)

Import in WordPress: Tools → Import → WordPress (install the importer plugin),
or with WooCommerce active the products import as real products with prices,
SKUs, categories and featured images (images are sideloaded from their URLs).
"""

from datetime import datetime, timezone
from email.utils import format_datetime
from pathlib import Path
from xml.sax.saxutils import escape

from seed import CATEGORIES, PRODUCTS

SITE = "https://www.sps-medcare.com"
WXR_DATE = "2026-01-15 09:00:00"
PUB_DATE = format_datetime(datetime(2026, 1, 15, 9, 0, 0, tzinfo=timezone.utc))

PAGES = [
    {
        "id": 101,
        "title": "Home",
        "slug": "home",
        "seo_title": "SPS Medcare — Hospital Furniture, Medical Equipment & Surgical Supplies | Delhi NCR",
        "seo_desc": "SPS Medcare supplies hospital furniture, ICU beds, medical equipment and surgical supplies across Delhi NCR. Call +91 99202 22362 for same-day quotes.",
        "content": """<!-- wp:heading {"level":1} --><h1>Hospital Furniture, Medical Equipment &amp; Surgical Supplies — Delivered Across Delhi NCR</h1><!-- /wp:heading -->
<!-- wp:paragraph --><p>SPS Medcare is a Delhi NCR based supplier of hospital furniture, medical equipment and surgical consumables. From five-function electric ICU beds to pulse oximeters and nitrile gloves, we equip hospitals, clinics, nursing homes, diagnostic labs and home-care patients with dependable equipment at honest prices.</p><!-- /wp:paragraph -->
<!-- wp:paragraph --><p><strong>Trusted by 500+ healthcare facilities</strong> — with free installation, on-site warranty support and same-day delivery across Delhi, Noida, Gurugram, Ghaziabad and Faridabad. Call <strong>+91 99202 22362</strong> or WhatsApp us for an instant quote.</p><!-- /wp:paragraph -->
<!-- wp:heading --><h2>Shop by Category</h2><!-- /wp:heading -->
<!-- wp:list -->
<ul><li><a href="/product-category/icu-electric-beds/">ICU &amp; Electric Beds</a> — electric ICU beds, fowler beds and manual ward beds</li><li><a href="/product-category/ot-equipment/">OT Equipment</a> — LED surgical lights, OT tables and electrosurgical generators</li><li><a href="/product-category/diagnostic-monitoring/">Diagnostic &amp; Monitoring</a> — patient monitors, ECG machines, oxygen concentrators</li><li><a href="/product-category/hospital-furniture/">Hospital Furniture</a> — lockers, trolleys, IV stands and overbed tables</li><li><a href="/product-category/surgical-supplies/">Surgical Supplies</a> — masks, gloves, gauze and instrument sets in bulk</li><li><a href="/product-category/emergency-mobility/">Emergency &amp; Mobility</a> — manual and electric wheelchairs</li></ul><!-- /wp:list -->
<!-- wp:heading --><h2>Why Buy from SPS Medcare?</h2><!-- /wp:heading -->
<!-- wp:list -->
<ul><li>ISO 13485:2016 &amp; CE certified equipment</li><li>Free installation and staff demo across Delhi NCR</li><li>On-site warranty and annual maintenance contracts (AMC)</li><li>Same-day delivery in Delhi NCR, 2–4 days pan-India</li><li>24/7 WhatsApp support on <strong>+91 99202 22362</strong></li></ul><!-- /wp:list -->""",
    },
    {
        "id": 102,
        "title": "About Us",
        "slug": "about",
        "seo_title": "About SPS Medcare — Medical Equipment Supplier in Delhi NCR",
        "seo_desc": "SPS Medcare has equipped 500+ hospitals, clinics and home-care patients across Delhi NCR with certified medical equipment since 2011. Learn about our story.",
        "content": """<!-- wp:heading {"level":1} --><h1>About SPS Medcare</h1><!-- /wp:heading -->
<!-- wp:paragraph --><p>SPS Medcare began in 2011 with a simple goal: make dependable medical equipment accessible and affordable for every healthcare provider and family in Delhi NCR. What started as a two-person trading desk now supplies over 2,000 products — from five-function ICU beds to consumables — to more than 500 hospitals, clinics, nursing homes, diagnostic labs and home-care patients.</p><!-- /wp:paragraph -->
<!-- wp:heading --><h2>Our Mission</h2><!-- /wp:heading -->
<!-- wp:paragraph --><p>To help healthcare facilities deliver better care by supplying certified equipment quickly, installing it correctly, and standing behind it for its whole service life.</p><!-- /wp:paragraph -->
<!-- wp:heading --><h2>What We Stand For</h2><!-- /wp:heading -->
<!-- wp:list -->
<ul><li><strong>Certified quality</strong> — ISO 13485:2016 and CE certified equipment only.</li><li><strong>Honest pricing</strong> — wholesale rates with GST invoices and transparent quotations.</li><li><strong>Service after sale</strong> — free installation, staff demo, on-site warranty and AMC options.</li><li><strong>Speed</strong> — same-day delivery across Delhi NCR and 2–4 day shipping pan-India.</li></ul><!-- /wp:list -->
<!-- wp:heading --><h2>Reach Us</h2><!-- /wp:heading -->
<!-- wp:paragraph --><p>Call or WhatsApp <strong>+91 99202 22362</strong>, email <a href="mailto:info@sps-medcare.com">info@sps-medcare.com</a>, or visit our Okhla warehouse at B-42, Okhla Industrial Area, Phase-II, New Delhi — 110020.</p><!-- /wp:paragraph -->""",
    },
    {
        "id": 103,
        "title": "Products",
        "slug": "products",
        "seo_title": "Products — ICU Beds, OT Equipment, Patient Monitors & Surgical Supplies | SPS Medcare",
        "seo_desc": "Browse 20+ certified products: electric ICU beds, LED OT lights, patient monitors, oxygen concentrators, wheelchairs and surgical consumables. Call +91 99202 22362.",
        "content": """<!-- wp:heading {"level":1} --><h1>Our Products</h1><!-- /wp:heading -->
<!-- wp:paragraph --><p>A curated catalog of hospital furniture, medical equipment and surgical supplies. Every product ships with a GST invoice, warranty and free installation (where applicable) across Delhi NCR. Importing this file with WooCommerce active creates every product below with images, prices, SKUs and categories.</p><!-- /wp:paragraph -->""",
    },
    {
        "id": 104,
        "title": "Services",
        "slug": "services",
        "seo_title": "Services — Installation, AMC, Home ICU Setup & Bulk Supply | SPS Medcare",
        "seo_desc": "Free installation, AMC & after-sales service, home ICU setup, equipment rentals, bulk institutional supply and same-day delivery across Delhi NCR. Call +91 99202 22362.",
        "content": """<!-- wp:heading {"level":1} --><h1>Our Services</h1><!-- /wp:heading -->
<!-- wp:heading --><h2>Bulk & Institutional Supply</h2><!-- /wp:heading --><!-- wp:paragraph --><p>Ward-scale supply for hospitals, nursing homes, government tenders and CSR programs — with quotation, GST invoicing and staged delivery.</p><!-- /wp:paragraph -->
<!-- wp:heading --><h2>Free Installation & Commissioning</h2><!-- /wp:heading --><!-- wp:paragraph --><p>Electric beds, monitors and OT equipment are installed and demonstrated on-site by our technicians, free of charge in Delhi NCR.</p><!-- /wp:paragraph -->
<!-- wp:heading --><h2>AMC & After-Sales Service</h2><!-- /wp:heading --><!-- wp:paragraph --><p>Annual maintenance contracts with scheduled preventive visits and priority breakdown response for all equipment we supply.</p><!-- /wp:paragraph -->
<!-- wp:heading --><h2>Home ICU Setup & Rentals</h2><!-- /wp:heading --><!-- wp:paragraph --><p>Hospital beds, oxygen concentrators, suction machines and monitors delivered, installed and serviced at home — rental plans available.</p><!-- /wp:paragraph -->
<!-- wp:heading --><h2>Same-Day NCR Delivery</h2><!-- /wp:heading --><!-- wp:paragraph --><p>Order by 2 PM and receive stock items the same day across Delhi, Noida, Gurugram, Ghaziabad and Faridabad.</p><!-- /wp:paragraph -->
<!-- wp:heading --><h2>24/7 WhatsApp Support</h2><!-- /wp:heading --><!-- wp:paragraph --><p>Equipment queries, service requests and re-orders — message <strong>+91 99202 22362</strong> any time, day or night.</p><!-- /wp:paragraph -->""",
    },
    {
        "id": 105,
        "title": "Contact Us",
        "slug": "contact",
        "seo_title": "Contact SPS Medcare — Call +91 99202 22362 | Delhi NCR",
        "seo_desc": "Call or WhatsApp +91 99202 22362, email info@sps-medcare.com or visit B-42, Okhla Industrial Area Phase-II, New Delhi 110020. Same-day quotes.",
        "content": """<!-- wp:heading {"level":1} --><h1>Contact Us</h1><!-- /wp:heading -->
<!-- wp:paragraph --><p>Get an instant quote, ask for a product demo, or schedule a free home-care consultation. We answer within minutes during business hours.</p><!-- /wp:paragraph -->
<!-- wp:list -->
<ul><li><strong>Phone / WhatsApp:</strong> <a href="tel:+919920222362">+91 99202 22362</a></li><li><strong>Email:</strong> <a href="mailto:info@sps-medcare.com">info@sps-medcare.com</a></li><li><strong>Address:</strong> B-42, Okhla Industrial Area, Phase-II, New Delhi, Delhi NCR — 110020, India</li><li><strong>Hours:</strong> Monday to Sunday, 9 AM – 9 PM</li></ul><!-- /wp:list -->""",
    },
]


def cdata(text: str) -> str:
    return f"<![CDATA[{text.replace(']]>', ']]]]><![CDATA[>')}]]>"


def meta(key: str, value: str) -> str:
    return f"<wp:postmeta><wp:meta_key>{cdata(key)}</wp:meta_key><wp:meta_value>{cdata(value)}</wp:meta_value></wp:postmeta>"


def item_header(post_id: int, title: str, link: str, guid: str) -> str:
    link, guid = escape(link), escape(guid)
    return (
        "<item>"
        f"<title>{cdata(title)}</title>"
        f"<link>{link}</link>"
        f"<pubDate>{PUB_DATE}</pubDate>"
        f"<dc:creator>{cdata('admin')}</dc:creator>"
        f"<guid isPermaLink=\"false\">{guid}</guid>"
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
        "</item>"
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
        f"<title>SPS Medcare</title>"
        f"<link>{SITE}</link>"
        "<description>Hospital Furniture, Medical Equipment and Surgical Supplies — Delhi NCR, India</description>"
        f"<pubDate>{PUB_DATE}</pubDate>"
        "<language>en-US</language>"
        "<wp:wxr_version>1.2</wp:wxr_version>"
        f"<wp:base_site_url>{SITE}</wp:base_site_url>"
        f"<wp:base_blog_url>{SITE}</wp:base_blog_url>"
        "<wp:author><wp:author_id>1</wp:author_id><wp:author_login><![CDATA[admin]]></wp:author_login>"
        "<wp:author_email><![CDATA[info@sps-medcare.com]]></wp:author_email>"
        "<wp:author_display_name><![CDATA[SPS Medcare]]></wp:author_display_name>"
        "<wp:author_first_name><![CDATA[]]></wp:author_first_name>"
        "<wp:author_last_name><![CDATA[]]></wp:author_last_name></wp:author>"
    )

    # Product categories (WooCommerce product_cat taxonomy) + classic categories
    for i, cat in enumerate(CATEGORIES, start=10):
        parts.append(
            f"<wp:term><wp:term_id>{i}</wp:term_id><wp:term_taxonomy>product_cat</wp:term_taxonomy>"
            f"<wp:term_slug>{cat['slug']}</wp:term_slug><wp:term_name>{cdata(cat['name'])}</wp:term_name>"
            f"<wp:term_description>{cdata(cat['description'])}</wp:term_description></wp:term>"
        )
        parts.append(
            f"<wp:category><wp:term_id>{i}</wp:term_id><wp:category_nicename>{cat['slug']}</wp:category_nicename>"
            "<wp:category_parent></wp:category_parent>"
            f"<wp:cat_name>{cdata(cat['name'])}</wp:cat_name></wp:category>"
        )

    # Product images as attachments (importer sideloads from the URL)
    for i, prod in enumerate(PRODUCTS):
        att_id = 501 + i
        parts.append(
            item_header(att_id, prod["name"], f"{SITE}/?attachment_id={att_id}", prod["image_url"])
            + f"<content:encoded>{cdata('')}</content:encoded>"
            + "<excerpt:encoded><![CDATA[]]></excerpt:encoded>"
            + f"<wp:post_type>{cdata('attachment')}</wp:post_type>"
            + f"<wp:attachment_url>{cdata(prod['image_url'])}</wp:attachment_url>"
            + meta("_wp_attachment_image_alt", f"{prod['name']} — SPS Medcare")
            + "</item>"
        )

    # Pages
    for page in PAGES:
        parts.append(
            item_header(page["id"], page["title"], f"{SITE}/{page['slug']}/", f"{SITE}/?page_id={page['id']}")
            + f"<content:encoded>{cdata(page['content'])}</content:encoded>"
            + "<excerpt:encoded><![CDATA[]]></excerpt:encoded>"
            + item_footer(page["slug"], "page")
            + meta("_yoast_wpseo_title", page["seo_title"])
            + meta("_yoast_wpseo_metadesc", page["seo_desc"])
            + meta("_rank_math_title", page["seo_title"])
            + meta("_rank_math_description", page["seo_desc"])
        )

    # Products
    for i, prod in enumerate(PRODUCTS):
        post_id = 1001 + i
        thumb_id = 501 + i
        cat = next((c for c in CATEGORIES if c["slug"] == prod["category_slug"]), CATEGORIES[0])
        price = f"{prod['price']:.2f}"
        specs_html = "".join(
            f"<li><strong>{k}:</strong> {v}</li>" for k, v in prod["specs"].items()
        )
        features_html = "".join(f"<li>{f}</li>" for f in prod["features"])
        content = (
            f"<!-- wp:paragraph --><p>{prod['description']}</p><!-- /wp:paragraph -->"
            "<!-- wp:heading --><h2>Key Features</h2><!-- /wp:heading -->"
            f"<!-- wp:list --><ul>{features_html}</ul><!-- /wp:list -->"
            "<!-- wp:heading --><h2>Technical Specifications</h2><!-- /wp:heading -->"
            f"<!-- wp:list --><ul>{specs_html}</ul><!-- /wp:list -->"
            f"<!-- wp:paragraph --><p><strong>Warranty:</strong> {prod['warranty']} &nbsp;|&nbsp; "
            f"<strong>Certification:</strong> {prod['certification']} &nbsp;|&nbsp; "
            f"<strong>MOQ:</strong> {prod['moq']}</p><!-- /wp:paragraph -->"
            "<!-- wp:paragraph --><p>To order, call or WhatsApp <strong>+91 99202 22362</strong>.</p><!-- /wp:paragraph -->"
        )
        cats_xml = (
            f'<category domain="product_type" nicename="simple"><![CDATA[simple]]></category>'
            f'<category domain="product_cat" nicename="{cat["slug"]}">{cdata(cat["name"])}</category>'
        )
        product_metas = (
            meta("_sku", prod["sku"])
            + meta("_regular_price", price)
            + meta("_price", price)
            + meta("_stock_status", "instock")
            + meta("_manage_stock", "no")
            + meta("_virtual", "no")
            + meta("_downloadable", "no")
            + meta("_thumbnail_id", str(thumb_id))
            + meta("_yoast_wpseo_title", f"{prod['name']} ({prod['sku']}) — Price in Delhi NCR | SPS Medcare")
            + meta("_yoast_wpseo_metadesc", prod["short_desc"])
            + meta("_rank_math_title", f"{prod['name']} — Best Price {prod['sku']} | SPS Medcare")
            + meta("_rank_math_description", prod["short_desc"])
        )
        parts.append(
            item_header(post_id, prod["name"], f"{SITE}/product/{prod['slug']}/", f"{SITE}/?post_type=product&p={post_id}")
            + f"<content:encoded>{cdata(content)}</content:encoded>"
            + f"<excerpt:encoded>{cdata(prod['short_desc'])}</excerpt:encoded>"
            + item_footer(prod["slug"], "product", categories=cats_xml)
            + product_metas
        )

    parts.append("</channel></rss>")
    return "\n".join(parts)


def main() -> None:
    xml = build()
    out_public = Path(__file__).parent.parent / "frontend" / "public" / "sps-medcare-wordpress-import.xml"
    out_public.write_text(xml, encoding="utf-8")
    out_root = Path(__file__).parent.parent / "sps-medcare-wordpress-import.xml"
    out_root.write_text(xml, encoding="utf-8")
    print(f"Wrote {out_public} ({len(xml)} bytes, {len(PRODUCTS)} products, {len(PAGES)} pages)")


if __name__ == "__main__":
    main()
