"""Seed the SPS Medcare medical-tourism catalog.

Run:  cd /app/backend && python seed.py
Idempotent — safe to re-run (upserts on slug). Not imported by server.py.
"""

import asyncio
from datetime import datetime, timezone

from lib.db import db

IMG = "https://static.prod-images.emergentagent.com/jobs/3a108caa-be4a-4f2c-8726-5c86201a2ba5/images"

SPECIALTIES = [
    {"slug": "oncology", "name": "Oncology", "sort_order": 1},
    {"slug": "cardiology", "name": "Cardiology", "sort_order": 2},
    {"slug": "orthopedics", "name": "Orthopedics", "sort_order": 3},
    {"slug": "transplants", "name": "Transplants", "sort_order": 4},
    {"slug": "neurology", "name": "Neurology & Spine", "sort_order": 5},
    {"slug": "hematology", "name": "Hematology", "sort_order": 6},
    {"slug": "cosmetic", "name": "Cosmetic Surgery", "sort_order": 7},
    {"slug": "urology", "name": "Urology", "sort_order": 8},
    {"slug": "fertility", "name": "Fertility & IVF", "sort_order": 9},
    {"slug": "general-surgery", "name": "General Surgery", "sort_order": 10},
]

COMMON_INCLUDES = [
    "Free expert second opinion and written treatment plan",
    "Medical visa invitation letter within 24 hours",
    "Complimentary airport pickup and drop at Delhi IGI",
    "Accommodation booking near your hospital",
    "Dedicated language interpreter during your stay",
    "24/7 WhatsApp care manager on +91 99202 22362",
]

TREATMENTS = [
    {
        "slug": "cancer-treatment-in-india",
        "name": "Cancer & Oncology Treatment",
        "specialty_slug": "oncology",
        "specialty_name": "Oncology",
        "short_desc": "Advanced CyberKnife, immunotherapy, PET-CT guided precision radiation and surgical oncology by internationally trained specialists.",
        "description": "India's leading cancer centres combine PET-CT and MRI-guided planning with CyberKnife and IMRT radiation, robotic surgical oncology, targeted therapy and immunotherapy — the same protocols followed in the US and Europe, at a fraction of the cost. SPS Medcare arranges your free expert second opinion, tumour board review, medical visa and complete stay so treatment can begin within days of your arrival rather than months on a waiting list.",
        "cost_india_usd": "$3,500 – $8,500",
        "cost_west_usd": "$45,000 – $90,000 (USA)",
        "savings_percent": 85,
        "hospital_stay": "3 – 7 days",
        "stay_in_india": "14 – 21 days",
        "success_rate": "Stage-dependent; 5-year survival on par with US centres",
        "procedures": [
            "CyberKnife & IMRT precision radiotherapy",
            "Robotic and open surgical oncology",
            "Chemotherapy and targeted therapy cycles",
            "Immunotherapy (checkpoint inhibitors)",
            "PET-CT staging and tumour board review",
        ],
        "top_hospitals": [
            "Apollo Cancer Centre, Delhi NCR",
            "Fortis Memorial Research Institute, Gurugram",
            "Medanta – The Medicity, Gurugram",
            "Max Super Speciality Hospital, Saket",
        ],
        "image_url": f"{IMG}/7dc584b1f7afcfe0a329cda12236009f100b6c122ab933121a782533f87d1d6f.jpeg",
        "featured": True,
    },
    {
        "slug": "cardiac-treatment-in-india",
        "name": "Cardiac Surgery & Cardiology",
        "specialty_slug": "cardiology",
        "specialty_name": "Cardiology",
        "short_desc": "Minimally invasive bypass (CABG), valve replacement, TAVI, angioplasty and paediatric heart surgery with world-class outcomes.",
        "description": "Indian cardiac surgeons are among the highest-volume operators in the world, and that experience shows in outcomes: success rates for bypass and valve surgery match or exceed Western benchmarks. From beating-heart minimally invasive CABG and TAVI to complex paediatric heart repair, SPS Medcare connects you to the right surgeon, arranges the medical visa for patient and attendant, and coordinates every step from the airport to your discharge summary.",
        "cost_india_usd": "$4,200 – $7,000",
        "cost_west_usd": "$60,000+ (USA)",
        "savings_percent": 88,
        "hospital_stay": "5 – 7 days",
        "stay_in_india": "12 – 16 days",
        "success_rate": "98%+ for elective CABG at partner centres",
        "procedures": [
            "Minimally invasive & beating-heart CABG (bypass)",
            "Heart valve repair and replacement",
            "TAVI / TAVR transcatheter valve implantation",
            "Angioplasty and stenting",
            "Paediatric and congenital heart surgery",
            "Pacemaker and ICD implantation",
        ],
        "top_hospitals": [
            "Medanta Heart Institute, Gurugram",
            "Fortis Escorts Heart Institute, Delhi",
            "Apollo Hospitals, Delhi NCR",
            "Max Heart & Vascular Institute, Saket",
        ],
        "image_url": f"{IMG}/51fc4f895ce4819948fa21a2b51d8469f6a8b5610fd29606fff949675cc0e5fd.jpeg",
        "featured": True,
    },
    {
        "slug": "joint-replacement-in-india",
        "name": "Orthopedics & Joint Replacement",
        "specialty_slug": "orthopedics",
        "specialty_name": "Orthopedics",
        "short_desc": "Robotic total knee and hip replacement, spine fusion and arthroscopic ligament reconstruction with rapid rehabilitation.",
        "description": "Robotic-assisted knee and hip replacement in India uses the same Stryker Mako and CUVIS platforms found in leading US hospitals, with implants from Zimmer, DePuy and Smith & Nephew. Most patients walk within 24 hours and fly home in under two weeks. SPS Medcare arranges your surgeon opinion from your X-rays and MRI before you travel, so you arrive with a confirmed plan, implant choice and fixed cost estimate.",
        "cost_india_usd": "$4,000 – $6,500",
        "cost_west_usd": "$40,000+ (USA/UK)",
        "savings_percent": 85,
        "hospital_stay": "3 – 5 days",
        "stay_in_india": "10 – 14 days",
        "success_rate": "97%+ implant survival at 10 years",
        "procedures": [
            "Robotic total knee replacement (TKR)",
            "Total hip replacement (THR) — cemented & uncemented",
            "Partial / unicompartmental knee replacement",
            "Spine fusion and endoscopic discectomy",
            "Arthroscopic ACL / PCL reconstruction",
            "Shoulder replacement and rotator cuff repair",
        ],
        "top_hospitals": [
            "Medanta Bone & Joint Institute, Gurugram",
            "Fortis Memorial Research Institute, Gurugram",
            "Max Institute of Musculoskeletal Sciences, Delhi",
            "Indian Spinal Injuries Centre, Delhi",
        ],
        "image_url": f"{IMG}/b683dd16152e4bb647a043bd7ee912beac0e032dc6a1be00cc39e2d0e847f2c0.jpeg",
        "featured": True,
    },
    {
        "slug": "organ-transplant-in-india",
        "name": "Organ Transplants (Liver & Kidney)",
        "specialty_slug": "transplants",
        "specialty_name": "Transplants",
        "short_desc": "High-success living-donor liver and kidney transplants in dedicated transplant ICUs, fully compliant with India's NOTTO legal framework.",
        "description": "India performs more living-donor liver transplants than almost any country, with graft survival rates above 90% at leading centres. Transplants for foreign nationals require a related donor and formal approval under India's NOTTO/THOA regulations — SPS Medcare guides you and your donor through every document, embassy attestation and hospital committee step, then coordinates the extended recovery stay and follow-up your case needs.",
        "cost_india_usd": "$12,000 – $28,000",
        "cost_west_usd": "$150,000 – $300,000 (USA)",
        "savings_percent": 90,
        "hospital_stay": "10 – 14 days",
        "stay_in_india": "30 – 45 days",
        "success_rate": "90%+ one-year graft survival",
        "procedures": [
            "Living-donor liver transplant (LDLT)",
            "Living-donor kidney transplant",
            "Paediatric liver transplant",
            "ABO-incompatible and swap transplants",
            "Pre-transplant workup and donor evaluation",
        ],
        "top_hospitals": [
            "Medanta Institute of Liver Transplantation, Gurugram",
            "Apollo Hospitals Transplant Institute, Delhi",
            "Fortis Organ Retrieval & Transplant, Gurugram",
            "Max Super Speciality Hospital, Saket",
        ],
        "image_url": f"{IMG}/cdf4db78ab1ae8a2185d322b3b0a795655f6d8101084a913a51ab26d2e6c837a.jpeg",
        "featured": True,
    },
    {
        "slug": "neurosurgery-in-india",
        "name": "Neurosurgery & Spine Care",
        "specialty_slug": "neurology",
        "specialty_name": "Neurology & Spine",
        "short_desc": "Brain tumour excision, deep brain stimulation, endoscopic spine surgery and aneurysm clipping with intraoperative MRI.",
        "description": "Delhi NCR's neurosurgical centres operate with intraoperative MRI, neuronavigation, awake craniotomy protocols and Gamma Knife radiosurgery. Whether it is a brain tumour, an aneurysm, epilepsy surgery or deep brain stimulation for Parkinson's, SPS Medcare arranges a written surgical opinion from your existing MRI before you spend anything on travel.",
        "cost_india_usd": "$5,000 – $9,000",
        "cost_west_usd": "$55,000+ (USA)",
        "savings_percent": 85,
        "hospital_stay": "4 – 8 days",
        "stay_in_india": "14 – 18 days",
        "success_rate": "Outcome parity with leading Western centres",
        "procedures": [
            "Brain tumour excision (awake & navigated craniotomy)",
            "Gamma Knife / stereotactic radiosurgery",
            "Deep brain stimulation (DBS) for Parkinson's",
            "Aneurysm clipping and coiling",
            "Endoscopic and minimally invasive spine surgery",
            "Epilepsy surgery",
        ],
        "top_hospitals": [
            "Medanta Institute of Neurosciences, Gurugram",
            "Fortis Memorial Research Institute, Gurugram",
            "Apollo Institute of Neurosciences, Delhi",
            "Indian Spinal Injuries Centre, Delhi",
        ],
        "image_url": f"{IMG}/159209f1661937727eeaf5618bfb74fa138116f2f1bcb1f68354da4e85554956.jpeg",
        "featured": True,
    },
    {
        "slug": "bone-marrow-transplant-in-india",
        "name": "Bone Marrow Transplant (BMT)",
        "specialty_slug": "hematology",
        "specialty_name": "Hematology",
        "short_desc": "Autologous and allogeneic BMT for leukaemia, thalassemia and lymphoma in HEPA-filtered clean-room units.",
        "description": "Bone marrow transplant for thalassemia, leukaemia, aplastic anaemia and lymphoma is one of the strongest reasons families travel to India — outcomes at leading Indian BMT units rival any in the world, at roughly a tenth of US pricing. Treatment needs a long, carefully managed stay; SPS Medcare handles HLA-matching coordination, the extended visa, long-stay accommodation for the family and a care manager throughout the isolation period.",
        "cost_india_usd": "$15,000 – $25,000",
        "cost_west_usd": "$180,000+ (USA)",
        "savings_percent": 88,
        "hospital_stay": "15 – 25 days",
        "stay_in_india": "45 – 60 days",
        "success_rate": "80–90% cure in matched-sibling thalassemia BMT",
        "procedures": [
            "Allogeneic BMT (matched sibling / haploidentical)",
            "Autologous stem cell transplant",
            "Thalassemia and sickle-cell BMT",
            "Leukaemia and lymphoma transplant protocols",
            "HLA typing and donor matching",
        ],
        "top_hospitals": [
            "Apollo BMT Centre, Delhi",
            "Fortis Memorial Research Institute, Gurugram",
            "Medanta Cancer Institute, Gurugram",
            "Max Institute of Haematology & BMT, Delhi",
        ],
        "image_url": f"{IMG}/7507b6520dba5be8aed435740ba125a6ce2a21bdab3f9116b3b7fb762e90b524.jpeg",
        "featured": False,
    },
    {
        "slug": "cosmetic-surgery-in-india",
        "name": "Cosmetic & Plastic Surgery",
        "specialty_slug": "cosmetic",
        "specialty_name": "Cosmetic Surgery",
        "short_desc": "Rhinoplasty, liposuction, breast surgery, hair transplantation and mommy makeovers by board-certified plastic surgeons.",
        "description": "India's board-certified plastic surgeons deliver aesthetic results at Western standards for a quarter of the price, with the discretion international patients expect. Most cosmetic procedures are day-care or single-night stays, so you can combine your procedure with a recovery stay in a comfortable serviced apartment — SPS Medcare arranges both, plus a follow-up review before you fly home.",
        "cost_india_usd": "$1,800 – $4,500",
        "cost_west_usd": "$12,000 – $25,000 (USA)",
        "savings_percent": 82,
        "hospital_stay": "1 – 2 days",
        "stay_in_india": "7 – 10 days",
        "success_rate": "High patient-satisfaction scores at partner centres",
        "procedures": [
            "Rhinoplasty (nose reshaping)",
            "Liposuction and body contouring",
            "Breast augmentation, reduction and lift",
            "FUE / FUT hair transplantation",
            "Tummy tuck (abdominoplasty) and mommy makeover",
            "Facelift and blepharoplasty",
        ],
        "top_hospitals": [
            "Fortis Memorial Research Institute, Gurugram",
            "Apollo Cosmetic Clinics, Delhi",
            "Max Super Speciality Hospital, Saket",
            "Medanta Institute of Plastic Surgery, Gurugram",
        ],
        "image_url": f"{IMG}/64f6f9de35a83dc0b206e8c9dc4524f96f17beb16d0d361cc40aa091dd1e5821.jpeg",
        "featured": False,
    },
    {
        "slug": "urology-treatment-in-india",
        "name": "Urology & Nephrology",
        "specialty_slug": "urology",
        "specialty_name": "Urology",
        "short_desc": "Robotic prostatectomy, laser kidney-stone removal (RIRS/PCNL), dialysis support and reconstructive urology.",
        "description": "From laser stone clearance that gets you home in a week to robotic prostatectomy and complex urinary reconstruction, India's urology units combine da Vinci robotic platforms with very high procedural volumes. SPS Medcare arranges pre-travel review of your CT/ultrasound reports so the surgical plan — and its cost — is fixed before you book a flight.",
        "cost_india_usd": "$2,200 – $5,000",
        "cost_west_usd": "$22,000+ (USA)",
        "savings_percent": 80,
        "hospital_stay": "2 – 4 days",
        "stay_in_india": "7 – 10 days",
        "success_rate": "95%+ stone-free rates for RIRS/PCNL",
        "procedures": [
            "Robotic radical prostatectomy",
            "RIRS and PCNL laser kidney-stone removal",
            "TURP for enlarged prostate (BPH)",
            "Reconstructive and paediatric urology",
            "Dialysis and nephrology management",
        ],
        "top_hospitals": [
            "Medanta Kidney & Urology Institute, Gurugram",
            "Apollo Institute of Urology, Delhi",
            "Fortis Memorial Research Institute, Gurugram",
            "Max Institute of Urology, Saket",
        ],
        "image_url": f"{IMG}/b29ae7271e69d5059564235419cd0e25584d31f4b16690b8973465d6b6acbfce.jpeg",
        "featured": False,
    },
    {
        "slug": "ivf-treatment-in-india",
        "name": "IVF & Fertility Treatment",
        "specialty_slug": "fertility",
        "specialty_name": "Fertility & IVF",
        "short_desc": "ICSI, IMSI, pre-implantation genetic screening, donor programs and advanced embryology labs with strong take-home baby rates.",
        "description": "India's fertility clinics offer IVF, ICSI and genetic screening at a fraction of Western pricing, with ART regulation under the 2021 ART Act giving couples a clear legal framework. A full cycle typically needs two to three weeks in India; SPS Medcare arranges the clinic, the couple's medical visa, comfortable accommodation and privacy throughout the cycle.",
        "cost_india_usd": "$2,500 – $4,200",
        "cost_west_usd": "$18,000 – $30,000 (USA)",
        "savings_percent": 85,
        "hospital_stay": "Day care / outpatient",
        "stay_in_india": "14 – 21 days",
        "success_rate": "40–55% per cycle (age dependent)",
        "procedures": [
            "IVF with ICSI / IMSI",
            "Pre-implantation genetic testing (PGT-A / PGS)",
            "Frozen embryo transfer (FET)",
            "Egg and sperm donor programs",
            "IUI and fertility preservation (egg/sperm freezing)",
        ],
        "top_hospitals": [
            "Apollo Fertility, Delhi NCR",
            "Fortis La Femme, Delhi",
            "Medanta Institute of Reproductive Medicine, Gurugram",
            "Max Institute of Reproductive Medicine, Delhi",
        ],
        "image_url": f"{IMG}/85d2587f2fc13a95dd7d5e05189857b952ac27d3ffd5646862ad5af47201615c.jpeg",
        "featured": False,
    },
    {
        "slug": "general-surgery-in-india",
        "name": "General & Laparoscopic Surgery",
        "specialty_slug": "general-surgery",
        "specialty_name": "General Surgery",
        "short_desc": "Gallbladder removal, hernia repair, bariatric weight-loss surgery and gastrointestinal procedures — mostly keyhole, quick recovery.",
        "description": "Routine but life-changing surgery — gallstones, hernia, piles, bariatric sleeve — done laparoscopically with one- to three-day stays and a one-week recovery before flying. These are the procedures where waiting lists abroad hurt most, and where India's combination of speed and price is hardest to beat. SPS Medcare fixes your date, surgeon and package cost before you travel.",
        "cost_india_usd": "$2,000 – $4,800",
        "cost_west_usd": "$16,000 – $30,000 (USA)",
        "savings_percent": 82,
        "hospital_stay": "2 – 3 days",
        "stay_in_india": "7 – 10 days",
        "success_rate": "99%+ for elective laparoscopic procedures",
        "procedures": [
            "Laparoscopic gallbladder removal (cholecystectomy)",
            "Hernia repair (inguinal, umbilical, incisional)",
            "Bariatric sleeve gastrectomy and gastric bypass",
            "Piles, fissure and fistula surgery (laser)",
            "Appendectomy and GI reconstructive surgery",
        ],
        "top_hospitals": [
            "Apollo Hospitals, Delhi NCR",
            "Fortis Memorial Research Institute, Gurugram",
            "Max Super Speciality Hospital, Saket",
            "Medanta – The Medicity, Gurugram",
        ],
        "image_url": f"{IMG}/6240975e823217b5f96c010a77880ca3ec232e9189caba6f56554b5be453d1c1.jpeg",
        "featured": False,
    },
]


async def seed() -> None:
    now = datetime.now(timezone.utc)
    # Drop legacy medical-equipment collections from the earlier positioning.
    await db.categories.drop()
    await db.products.drop()

    for spec in SPECIALTIES:
        await db.specialties.replace_one({"slug": spec["slug"]}, spec, upsert=True)
    for treatment in TREATMENTS:
        doc = {**treatment, "includes": COMMON_INCLUDES, "created_at": now}
        await db.treatments.replace_one({"slug": treatment["slug"]}, doc, upsert=True)

    print(f"Seeded {len(SPECIALTIES)} specialties and {len(TREATMENTS)} treatments")


if __name__ == "__main__":
    asyncio.run(seed())
