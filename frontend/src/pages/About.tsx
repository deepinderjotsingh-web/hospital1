import { Award, Building2, HeartPulse, ShieldCheck, Target, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Seo from "@/components/Seo";
import { IMAGES, SITE } from "@/lib/site";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Certified Quality",
    desc: "ISO 13485:2016 and CE certified equipment only — we reject grey-market stock at the receiving dock itself.",
  },
  {
    icon: Target,
    title: "Honest Pricing",
    desc: "Wholesale rates with GST invoices and written quotations. No hidden charges, no inflated MRP games.",
  },
  {
    icon: HeartPulse,
    title: "Service After Sale",
    desc: "Free installation, staff demo, on-site warranty and AMC options — we stay after the invoice.",
  },
  {
    icon: Building2,
    title: "Deep NCR Stock",
    desc: "A 10,000 sq ft Okhla warehouse means same-day delivery across Delhi, Noida, Gurugram, Ghaziabad and Faridabad.",
  },
];

export default function About() {
  return (
    <>
      <Seo
        title="About SPS Medcare — Medical Equipment Supplier in Delhi NCR Since 2011"
        description="SPS Medcare has equipped 500+ hospitals, clinics and home-care patients across Delhi NCR with certified medical equipment since 2011. ISO 13485:2016 & CE certified. Call +91 99202 22362."
        path="/about"
      />

      {/* Story */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-teal-700">About Us</p>
            <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Fifteen Years of Keeping Delhi NCR&apos;s Care Facilities Equipped
            </h1>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              <p>
                SPS Medcare began in 2011 with a simple goal: make dependable medical equipment
                accessible and affordable for every healthcare provider and family in Delhi NCR.
              </p>
              <p>
                What started as a two-person trading desk now supplies over 2,000 products — from
                five-function electric ICU beds to nitrile gloves — to more than{" "}
                <strong>500 hospitals, clinics, nursing homes, diagnostic labs and home-care
                patients</strong> across Delhi, Noida, Gurugram, Ghaziabad, Faridabad and beyond.
              </p>
              <p>
                Our Okhla warehouse stocks the equipment facilities reach for daily, and our
                technicians install and service everything we sell. When a family calls us at
                midnight for an oxygen concentrator, we answer — and deliver.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src={IMAGES.warehouse}
              alt="SPS Medcare warehouse stocked with medical supplies in Okhla, New Delhi"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl"
            />
            <Card className="absolute -bottom-6 left-6 w-60 border-teal-100 shadow-lg">
              <CardContent className="flex items-center gap-3 p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-teal-50 text-primary">
                  <Users className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-heading text-xl font-extrabold text-slate-900">2,000+</p>
                  <p className="text-xs font-medium text-slate-500">Products supplied</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section data-testid="about-values" className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="font-heading text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          What We Stand For
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value) => (
            <Card
              key={value.title}
              className="border-slate-200/80 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-lg"
            >
              <CardContent className="p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-teal-50 text-primary">
                  <value.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-heading text-base font-bold text-slate-900">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{value.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-slate-950 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-500/15 text-teal-300">
                <Award className="h-6 w-6" />
              </span>
              <div>
                <h2 className="font-heading text-xl font-bold text-white">
                  ISO 13485:2016 &amp; CE Certified Medical Supplier
                </h2>
                <p className="text-sm text-slate-400">
                  GMP-certified consumables · GST registered · CDSCO-compliant sourcing
                </p>
              </div>
            </div>
            <a
              data-testid="about-call-button"
              href={SITE.phoneHref}
              aria-label="Contact SPS Medcare at +91 9920222362"
              className="rounded-xl bg-teal-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-400"
            >
              Talk to our team · {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
