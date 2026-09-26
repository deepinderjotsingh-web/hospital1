import { Link } from "react-router-dom";
import {
  Car,
  FileText,
  Home as HomeIcon,
  Languages,
  MessageCircle,
  Phone,
  Plane,
  Stethoscope,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Seo from "@/components/Seo";
import { IMAGES, LANGUAGES, SITE } from "@/lib/site";

const SERVICES = [
  {
    icon: FileText,
    title: "Medical Treatment Coordination",
    desc: "Free expert second opinions, written treatment plans and confirmed doctor appointments at premier hospitals including Fortis, Max, Medanta and Apollo. We match your diagnosis to the right specialist — not just the nearest hospital.",
  },
  {
    icon: Plane,
    title: "Medical Visa Assistance",
    desc: "Official medical visa invitation letters issued within 24 hours for both patient and attendant, plus step-by-step guidance for your Indian embassy or e-visa application.",
  },
  {
    icon: Car,
    title: "Airport Transportation",
    desc: "Complimentary airport pickup and drop at Delhi IGI in a patient-ready vehicle with a dedicated driver, plus every hospital transfer during your stay.",
  },
  {
    icon: HomeIcon,
    title: "Accommodation Assistance",
    desc: "Hygienic guest houses, serviced apartments with kitchen facilities, or 4/5-star hotels within minutes of your hospital — booked to your budget and family size.",
  },
  {
    icon: Languages,
    title: "Language Interpreter Support",
    desc: `Dedicated interpreters fluent in ${LANGUAGES.slice(1).join(", ")} accompany you through consultations, admission and discharge so nothing is lost in translation.`,
  },
  {
    icon: MessageCircle,
    title: "24/7 WhatsApp & Care Support",
    desc: `A named care manager on standby around the clock on ${SITE.phoneDisplay} for medicine refills, follow-up appointments, currency exchange and local SIM cards.`,
  },
];

const JOURNEY = [
  {
    step: "01",
    title: "Share your reports",
    desc: "Send your diagnosis, scans and reports on WhatsApp or email. There is no charge and no obligation at any stage.",
  },
  {
    step: "02",
    title: "Free opinion & cost estimate",
    desc: "Within 48 hours you receive a written opinion from a relevant specialist plus an itemised cost estimate.",
  },
  {
    step: "03",
    title: "Medical visa & travel",
    desc: "We issue your visa invitation letter within 24 hours and help you plan flights for patient and attendant.",
  },
  {
    step: "04",
    title: "Arrival & admission",
    desc: "We meet you at Delhi IGI, take you to your accommodation, and handle all hospital admission paperwork.",
  },
  {
    step: "05",
    title: "Treatment & recovery",
    desc: "Your interpreter and care manager stay with you through treatment, discharge and the recovery review.",
  },
  {
    step: "06",
    title: "Follow-up back home",
    desc: "You fly home with a complete discharge summary and medication plan, plus teleconsultation follow-up.",
  },
];

export default function Services() {
  return (
    <>
      <Seo
        title="Patient Services — Medical Visa, Airport Pickup, Interpreter & Stay | SPS Medcare"
        description="Complete support for international patients in India: treatment coordination, medical visa letters within 24 hours, airport pickup, accommodation, interpreters and 24/7 care. Call +91 99202 22362."
        path="/services"
      />

      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <p className="text-xs font-bold uppercase tracking-wider text-teal-700">Our Services</p>
          <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Complete Support for Your Health Journey
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Treatment is only part of the journey. These six services cover everything else — and all
            of them are included free when you travel through SPS Medcare.
          </p>
        </div>
      </section>

      <section data-testid="services-grid" className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                <h2 className="mt-4 font-heading text-base font-bold text-slate-900">
                  {service.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{service.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Journey */}
      <section data-testid="journey-timeline" className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Your Patient Journey, Step by Step
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

      {/* Travel support visual */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <img
            src={IMAGES.airport}
            alt="International patients arriving at the airport for treatment in India"
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl"
          />
          <div>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              You Are Never Alone in a Foreign Country
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              From the moment you land at Delhi IGI to the day you fly home, one named coordinator
              stays with your case. They meet you at arrivals, settle you into your accommodation,
              walk you through admission, translate every consultation and check in daily during
              recovery.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              <strong className="text-slate-900">Our facilitation service is free.</strong> We do not
              charge patients and we never mark up hospital bills — you pay the hospital directly at
              their own rates.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                data-testid="services-whatsapp-button"
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ size: "lg" }) + " bg-[#22c55e] text-white hover:bg-[#16a34a]"}
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Us
              </a>
              <a
                data-testid="services-call-button"
                href={SITE.phoneHref}
                aria-label="Contact SPS Medcare at +91 9920222362"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                <Phone className="h-4 w-4 text-primary" /> {SITE.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-testid="services-cta" className="mx-auto max-w-7xl px-4 pb-14">
        <div className="rounded-3xl bg-[#0f172a] px-6 py-12 text-center sm:px-12">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-teal-500/15 text-teal-300">
            <Stethoscope className="h-6 w-6" />
          </span>
          <h2 className="mt-4 font-heading text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Ready to Plan Your Treatment?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
            Send your reports for a free specialist opinion and an itemised estimate within 48 hours.
          </p>
          <Link
            to="/contact"
            data-testid="services-cta-contact"
            className={buttonVariants({ size: "lg" }) + " mt-7"}
          >
            Get My Free Opinion
          </Link>
        </div>
      </section>
    </>
  );
}
