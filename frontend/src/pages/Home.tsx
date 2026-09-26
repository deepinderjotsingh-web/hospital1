import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BadgeCheck,
  Car,
  Clock,
  FileText,
  Globe2,
  Home as HomeIcon,
  Languages,
  MessageCircle,
  Phone,
  Plane,
  Quote,
  ShieldCheck,
  Stethoscope,
  TrendingDown,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Seo from "@/components/Seo";
import TreatmentCard from "@/components/catalog/TreatmentCard";
import { apiGet } from "@/lib/api";
import type { Treatment } from "@/lib/api";
import { COUNTRIES, IMAGES, LANGUAGES, SITE } from "@/lib/site";

const STATS = [
  { icon: Users, value: "2,500+", label: "International patients guided" },
  { icon: Globe2, value: "12+", label: "Countries served" },
  { icon: TrendingDown, value: "60–90%", label: "Savings vs USA & UK" },
  { icon: Clock, value: "24/7", label: "Patient desk on WhatsApp" },
];

const SERVICES = [
  {
    icon: FileText,
    title: "Medical Treatment Coordination",
    desc: "Free expert second opinions, written treatment plans and confirmed appointments at JCI & NABH accredited hospitals.",
  },
  {
    icon: Plane,
    title: "Medical Visa Assistance",
    desc: "Visa invitation letters issued within 24 hours for both patient and attendant, with embassy guidance.",
  },
  {
    icon: Car,
    title: "Airport Transportation",
    desc: "Complimentary pickup and drop at Delhi IGI in a patient-ready vehicle, plus all hospital transfers.",
  },
  {
    icon: HomeIcon,
    title: "Accommodation Assistance",
    desc: "Guest houses, serviced apartments or 4/5-star hotels minutes from your hospital, booked to your budget.",
  },
  {
    icon: Languages,
    title: "Interpreter Support",
    desc: "Interpreters fluent in Arabic, Bengali, Dari, Pashto, French, Russian and Swahili throughout your stay.",
  },
  {
    icon: MessageCircle,
    title: "24/7 Assistance",
    desc: "A named care manager on WhatsApp for medicine refills, follow-ups, currency exchange and SIM cards.",
  },
];

const WHY_INDIA = [
  {
    title: "Save 60–90% on treatment",
    desc: "A cardiac bypass costing $60,000 in the USA is $4,200–$7,000 in India — with outcomes at the same benchmarks.",
  },
  {
    title: "No waiting lists",
    desc: "Most treatments begin within days of arrival instead of months on a public waiting list.",
  },
  {
    title: "JCI & NABH accredited hospitals",
    desc: "Internationally trained, English-speaking doctors, many with US, UK or European fellowships.",
  },
  {
    title: "Easy medical visa",
    desc: "India grants medical visas for the patient plus attendants, with e-visa options for many countries.",
  },
];

const JOURNEY = [
  { step: "01", title: "Share your reports", desc: "Send your diagnosis and scans on WhatsApp — free, no obligation." },
  { step: "02", title: "Free opinion & quote", desc: "A specialist opinion and itemised estimate within 48 hours." },
  { step: "03", title: "Visa & travel", desc: "Visa invitation letter in 24 hours; we help plan your flights." },
  { step: "04", title: "Arrival & admission", desc: "We meet you at Delhi IGI and handle hospital admission." },
  { step: "05", title: "Treatment & recovery", desc: "Interpreter and care manager with you throughout." },
  { step: "06", title: "Follow-up at home", desc: "Discharge summary, medication plan and teleconsultations." },
];

const TESTIMONIALS = [
  {
    quote:
      "My father needed a liver transplant and we had no idea where to start. SPS Medcare arranged the donor workup, the visa for four of us, and an apartment near Medanta. He is home in Dhaka and well.",
    name: "Rahim H.",
    role: "Bangladesh · Liver Transplant",
  },
  {
    quote:
      "I compared bypass surgery costs in the UK and India. SPS Medcare got me a written opinion in two days, and the total cost including flights was still a fraction of the UK price.",
    name: "Joseph A.",
    role: "Nigeria · Cardiac Bypass",
  },
  {
    quote:
      "The interpreter made all the difference — my mother speaks only Arabic and never felt lost. Airport pickup, hotel, hospital appointments, everything was already arranged.",
    name: "Fatima M.",
    role: "Iraq · Knee Replacement",
  },
];

export default function Home() {
  const { data: treatments, isLoading } = useQuery({
    queryKey: ["treatments", "all"],
    queryFn: () => apiGet<Treatment[]>("/treatments"),
  });

  return (
    <>
      <Seo
        title="SPS Medcare — Medical Treatment in India for International Patients | Delhi NCR"
        description="Affordable world-class medical treatment in India for international patients. Free specialist second opinion, medical visa assistance, airport pickup, accommodation and interpreters. Call or WhatsApp +91 99202 22362."
        path="/"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0f172a]">
        <div className="absolute inset-0">
          <img
            src={IMAGES.heroConsultation}
            alt="Doctor consulting an international patient at a hospital in India"
            className="h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/95 to-[#0f172a]/70" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="animate-fade-up">
            <Badge className="border border-teal-400/30 bg-teal-500/15 text-teal-300 hover:bg-teal-500/15">
              <ShieldCheck className="mr-1 h-3.5 w-3.5" /> JCI &amp; NABH Accredited Partner Hospitals
            </Badge>
            <h1 className="mt-5 font-heading text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              World-Class Medical Treatment in India —{" "}
              <span className="text-teal-400">At a Fraction of the Cost</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              We are dedicated to making your medical journey smooth, safe and stress-free. Trusted
              by <strong className="text-white">2,500+ patients</strong> from Bangladesh, Nepal, Sri
              Lanka, UAE, Nigeria, Afghanistan, Iraq, Maldives, Oman and beyond.
            </p>
            <p className="mt-4 max-w-xl rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-teal-100">
              <strong className="text-white">Our service is free for patients.</strong> Send your
              medical reports and receive a written specialist opinion plus an itemised cost estimate
              within 48 hours — no charge, no obligation.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                data-testid="hero-whatsapp-button"
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ size: "lg" }) + " bg-[#22c55e] text-white hover:bg-[#16a34a]"}
              >
                <MessageCircle className="h-4 w-4" /> Get Free Opinion on WhatsApp
              </a>
              <a
                data-testid="hero-call-button"
                href={SITE.phoneHref}
                aria-label="Contact SPS Medcare at +91 9920222362"
                className={buttonVariants({ variant: "secondary", size: "lg" })}
              >
                <Phone className="h-4 w-4" /> {SITE.phoneDisplay}
              </a>
              <Link
                to="/treatments"
                data-testid="hero-browse-treatments"
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-teal-300 transition-colors hover:text-teal-200"
              >
                Browse treatments &amp; costs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <img
              src={IMAGES.doctorPatient}
              alt="Specialist doctor reviewing treatment options with a patient in India"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl"
            />
            <Card className="absolute -bottom-6 -left-8 w-64 border-teal-100 shadow-xl">
              <CardContent className="flex items-center gap-3 p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-teal-50 text-primary">
                  <TrendingDown className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-heading text-xl font-extrabold text-slate-900">60–90%</p>
                  <p className="text-xs font-medium text-slate-500">Lower than USA &amp; UK costs</p>
                </div>
              </CardContent>
            </Card>
            <Card className="absolute -top-5 -right-5 w-56 border-teal-100 shadow-xl">
              <CardContent className="flex items-center gap-3 p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-teal-50 text-primary">
                  <BadgeCheck className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-heading text-xl font-extrabold text-slate-900">48 hrs</p>
                  <p className="text-xs font-medium text-slate-500">Free written opinion</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section data-testid="stats-band" className="bg-primary">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex items-center gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/15 text-white">
                <stat.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-heading text-2xl font-extrabold text-white">{stat.value}</p>
                <p className="text-xs font-medium text-teal-50 sm:text-sm">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Countries marquee */}
      <section data-testid="countries-ribbon" className="border-b border-slate-100 bg-white py-6">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-center text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Patients travel to us from
          </p>
          <div className="mt-4 overflow-hidden">
            <div className="flex w-max animate-marquee gap-8">
              {[...COUNTRIES, ...COUNTRIES].map((c, i) => (
                <span
                  key={`${c.name}-${i}`}
                  className="flex shrink-0 items-center gap-2 text-sm font-semibold text-slate-600"
                >
                  <span className="text-lg" aria-hidden="true">{c.flag}</span>
                  {c.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section data-testid="services-section" className="mx-auto max-w-7xl px-4 py-16">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-wider text-teal-700">Our Services</p>
          <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Complete Support for Your Health Journey
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            Treatment is only part of the journey. Everything around it — visa, travel, stay,
            language, daily care — is arranged by us, free of charge.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <Card
              key={service.title}
              data-testid={`service-card-${service.title.toLowerCase().replace(/[^a-z]+/g, "-")}`}
              className="border-slate-200/80 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-lg"
            >
              <CardContent className="p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-teal-50 text-primary">
                  <service.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-heading text-base font-bold text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{service.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Treatments */}
      <section data-testid="treatments-section" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-wider text-teal-700">
                Popular Treatments
              </p>
              <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Most Requested Medical Treatments in India
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Transparent USD estimates, expected hospital stay and total days in India — confirmed
                in writing after a specialist reviews your reports.
              </p>
            </div>
            <Link
              to="/treatments"
              data-testid="treatments-view-all"
              className="text-sm font-semibold text-primary transition-colors hover:text-teal-700"
            >
              View all treatments →
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading &&
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-2xl bg-slate-100" style={{ height: 420 }} />
              ))}
            {treatments?.slice(0, 6).map((t) => (
              <TreatmentCard key={t.slug} treatment={t} />
            ))}
          </div>
          {treatments && treatments.length === 0 && (
            <p className="mt-8 text-center text-sm text-slate-500">
              Treatment information is being updated — WhatsApp {SITE.phoneDisplay} for an immediate
              response.
            </p>
          )}
        </div>
      </section>

      {/* Why India */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-teal-700">Why India</p>
            <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Why Patients Fly to India for Treatment
            </h2>
            <div className="mt-7 space-y-5">
              {WHY_INDIA.map((item) => (
                <div key={item.title} className="flex items-start gap-3.5">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-teal-50 text-primary">
                    <BadgeCheck className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src={IMAGES.operatingRoom}
              alt="Surgical team in a JCI accredited operating theatre in India"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl"
            />
            <div className="absolute inset-x-6 -bottom-6 rounded-2xl bg-primary p-5 shadow-xl">
              <p className="flex items-center gap-2 font-heading text-sm font-bold text-white">
                <Languages className="h-4 w-4" /> Interpreters available in
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-teal-50">{LANGUAGES.join(" · ")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Patient journey */}
      <section data-testid="journey-section" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-xs font-bold uppercase tracking-wider text-teal-700">How It Works</p>
          <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Your Journey, Step by Step
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {JOURNEY.map((item) => (
              <div
                key={item.step}
                className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/60 p-5"
              >
                <span className="absolute right-4 top-3 font-heading text-4xl font-extrabold text-teal-100">
                  {item.step}
                </span>
                <h3 className="font-heading text-base font-bold text-slate-900">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <p className="text-xs font-bold uppercase tracking-wider text-teal-700">Patient Stories</p>
        <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Trusted by Families Across 12+ Countries
        </h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} className="border-slate-200/80">
              <CardContent className="p-6">
                <Quote className="h-7 w-7 text-teal-200" />
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{t.quote}</p>
                <p className="mt-4 font-heading text-sm font-bold text-slate-900">{t.name}</p>
                <p className="text-xs text-slate-500">{t.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section data-testid="cta-band" className="mx-auto max-w-7xl px-4 pb-16">
        <div className="overflow-hidden rounded-3xl bg-[#0f172a] px-6 py-12 text-center sm:px-12">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-teal-500/15 text-teal-300">
            <Stethoscope className="h-6 w-6" />
          </span>
          <h2 className="mt-4 font-heading text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Get a Free Medical Opinion Today
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Send your diagnosis and reports on WhatsApp. A specialist reviews your case and we reply
            with a written opinion and itemised estimate within 48 hours — free of charge.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              data-testid="cta-band-whatsapp"
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ size: "lg" }) + " bg-[#22c55e] text-white hover:bg-[#16a34a]"}
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp {SITE.phoneDisplay}
            </a>
            <Link
              to="/contact"
              data-testid="cta-band-contact"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              Send My Reports
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
