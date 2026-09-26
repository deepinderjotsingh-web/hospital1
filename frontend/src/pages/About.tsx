import { Link } from "react-router-dom";
import { Award, Building2, Globe2, HeartHandshake, ShieldCheck, Users } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Seo from "@/components/Seo";
import { COUNTRIES, IMAGES, LANGUAGES, SITE } from "@/lib/site";

const VALUES = [
  {
    icon: HeartHandshake,
    title: "Zero Facilitation Fee",
    desc: "Our service to patients is completely free. We never mark up hospital bills — you pay the hospital directly at their own rates.",
  },
  {
    icon: ShieldCheck,
    title: "Honest Opinions",
    desc: "If travelling to India is not the right choice for your case, we tell you plainly. A second opinion should be advice, not a sales pitch.",
  },
  {
    icon: Award,
    title: "Accredited Hospitals Only",
    desc: "We work exclusively with JCI and NABH accredited partners whose outcomes and infection rates are published and audited.",
  },
  {
    icon: Users,
    title: "One Named Coordinator",
    desc: "The same coordinator handles your case from your first WhatsApp message until you land safely back home.",
  },
];

const HOSPITALS = [
  "Medanta – The Medicity, Gurugram",
  "Fortis Memorial Research Institute, Gurugram",
  "Apollo Hospitals, Delhi NCR",
  "Max Super Speciality Hospital, Saket",
  "Fortis Escorts Heart Institute, Delhi",
  "Indian Spinal Injuries Centre, Delhi",
];

export default function About() {
  return (
    <>
      <Seo
        title="About SPS Medcare — Medical Tourism Facilitator in India Since 2011"
        description="SPS Medcare has guided 2,500+ international patients from 12+ countries through treatment in India since 2011. Zero facilitation fee, JCI & NABH partner hospitals in Delhi NCR."
        path="/about"
      />

      {/* Story */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-teal-700">About Us</p>
            <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Dedicated to Affordable Healthcare for Patients Around the World
            </h1>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              <p>
                SPS Medcare was founded in 2011 to solve a problem we watched families face again and
                again: excellent, affordable treatment existed in India, but reaching it from abroad
                meant navigating hospitals, visas, language, travel and accommodation entirely alone.
              </p>
              <p>
                Since then we have guided more than{" "}
                <strong className="text-slate-900">2,500 international patients</strong> from over{" "}
                <strong className="text-slate-900">12 countries</strong> through treatment in Delhi
                NCR — from routine laparoscopic surgery to liver transplants and paediatric bone
                marrow transplants.
              </p>
              <p>
                We are not a hospital and we are not a travel agency. We are the team that sits
                between the two, making sure the medicine is right and everything around it is
                handled — so a family arriving at Delhi airport at 3 AM with a sick child knows
                exactly who is meeting them.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src={IMAGES.patientCare}
              alt="Doctor caring for an international patient in a hospital in India"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl"
            />
            <Card className="absolute -bottom-6 left-6 w-60 border-teal-100 shadow-xl">
              <CardContent className="flex items-center gap-3 p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-teal-50 text-primary">
                  <Globe2 className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-heading text-xl font-extrabold text-slate-900">12+</p>
                  <p className="text-xs font-medium text-slate-500">Countries served</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section data-testid="about-values" className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="font-heading text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Our Promise to Every Patient
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
                <h3 className="mt-4 font-heading text-base font-bold text-slate-900">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{value.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Hospital network */}
      <section data-testid="about-hospitals" className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Our Hospital Network
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Delhi NCR is India's densest cluster of accredited super-speciality hospitals, which is
            why we are based here — your specialist, your scans and your surgery are all within a
            short drive of your accommodation.
          </p>
          <div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {HOSPITALS.map((h) => (
              <div
                key={h}
                className="flex items-center gap-2.5 rounded-xl border border-slate-200/80 p-4 text-sm font-medium text-slate-700"
              >
                <Building2 className="h-4 w-4 shrink-0 text-primary" />
                {h}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countries + languages */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Countries We Serve
            </h2>
            <div data-testid="about-countries" className="mt-5 flex flex-wrap gap-2">
              {COUNTRIES.map((c) => (
                <span
                  key={c.name}
                  className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700"
                >
                  <span aria-hidden="true">{c.flag}</span>
                  {c.name}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Languages We Support
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {LANGUAGES.map((l) => (
                <span
                  key={l}
                  className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-sm font-medium text-teal-800"
                >
                  {l}
                </span>
              ))}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-slate-600">
              Travelling from a country not listed, or speaking a language not shown? We still help —
              message us and we will arrange the right interpreter.
            </p>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-primary py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <h2 className="font-heading text-xl font-bold text-white sm:text-2xl">
                Talk to a medical coordinator today
              </h2>
              <p className="mt-1.5 text-sm text-teal-50">
                Free specialist opinion and cost estimate within 48 hours · {SITE.cert}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                data-testid="about-contact-button"
                className={buttonVariants({ variant: "secondary", size: "lg" })}
              >
                Get Free Opinion
              </Link>
              <a
                data-testid="about-call-button"
                href={SITE.phoneHref}
                aria-label="Contact SPS Medcare at +91 9920222362"
                className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-900"
              >
                {SITE.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
