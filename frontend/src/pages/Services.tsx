import { Link } from "react-router-dom";
import {
  Building2,
  ClipboardList,
  Handshake,
  Home,
  MessageCircle,
  PackageCheck,
  Phone,
  Truck,
  Wrench,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Seo from "@/components/Seo";
import { SITE } from "@/lib/site";

const SERVICES = [
  {
    icon: Building2,
    title: "Bulk & Institutional Supply",
    desc: "Ward-scale supply for hospitals, nursing homes, government tenders and CSR programs — with formal quotations, GST invoicing and staged delivery schedules.",
  },
  {
    icon: Wrench,
    title: "Free Installation & Commissioning",
    desc: "Electric beds, patient monitors and OT equipment are installed, calibrated and demonstrated on-site by our technicians — free of charge anywhere in Delhi NCR.",
  },
  {
    icon: ClipboardList,
    title: "AMC & After-Sales Service",
    desc: "Annual maintenance contracts with scheduled preventive visits and priority breakdown response for every product we supply.",
  },
  {
    icon: Home,
    title: "Home ICU Setup & Rentals",
    desc: "Hospital beds, oxygen concentrators, suction machines and monitors delivered, installed and serviced at home — with flexible rental plans.",
  },
  {
    icon: Truck,
    title: "Same-Day NCR Delivery",
    desc: "Order stock items by 2 PM and receive them the same day across Delhi, Noida, Gurugram, Ghaziabad and Faridabad. 2–4 days pan-India.",
  },
  {
    icon: MessageCircle,
    title: "24/7 WhatsApp Support",
    desc: "Product queries, service requests and re-orders — message +91 99202 22362 any time, day or night, and a human responds.",
  },
];

const STEPS = [
  { icon: Phone, title: "Consult", desc: "Call or WhatsApp your requirement — one item or a full ward." },
  { icon: ClipboardList, title: "Quote", desc: "Receive a formal GST quotation within minutes during business hours." },
  { icon: Truck, title: "Deliver", desc: "Same-day across Delhi NCR; 2–4 working days pan-India." },
  { icon: Wrench, title: "Install", desc: "On-site installation and staff demo, free of charge." },
  { icon: Handshake, title: "Support", desc: "Warranty service, AMC visits and lifetime advice on what you bought." },
];

export default function Services() {
  return (
    <>
      <Seo
        title="Services — Installation, AMC, Home ICU Setup & Bulk Supply | SPS Medcare"
        description="Free installation, AMC and after-sales service, home ICU setup, equipment rentals, bulk institutional supply and same-day delivery across Delhi NCR. Call +91 99202 22362."
        path="/services"
      />

      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <p className="text-xs font-bold uppercase tracking-wider text-teal-700">Our Services</p>
          <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Complete Support for Your Equipment, End to End
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            We do not just sell boxes — we install, calibrate, maintain and repair everything we
            supply, for hospitals and for families at home.
          </p>
        </div>
      </section>

      <section data-testid="services-grid" className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <Card
              key={service.title}
              className="border-slate-200/80 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-lg"
            >
              <CardContent className="p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-teal-50 text-primary">
                  <service.icon className="h-5 w-5" />
                </span>
                <h2 className="mt-4 font-heading text-base font-bold text-slate-900">{service.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{service.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            How Ordering Works
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((step, i) => (
              <div key={step.title} className="relative rounded-2xl border border-slate-200/80 bg-slate-50/60 p-5">
                <span className="absolute right-4 top-4 font-heading text-3xl font-extrabold text-teal-100">
                  {i + 1}
                </span>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal-50 text-primary">
                  <step.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-heading text-sm font-bold text-slate-900">{step.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-testid="services-cta" className="mx-auto max-w-7xl px-4 py-14">
        <div className="rounded-3xl bg-slate-950 px-6 py-12 text-center sm:px-12">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-teal-500/15 text-teal-300">
            <PackageCheck className="h-6 w-6" />
          </span>
          <h2 className="mt-4 font-heading text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Tell Us What You Need — We&apos;ll Handle the Rest
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
            From a single wheelchair to a fully equipped ward, our team quotes, delivers and
            installs so your staff can focus on patients.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              data-testid="services-cta-call"
              href={SITE.phoneHref}
              aria-label="Contact SPS Medcare at +91 9920222362"
              className={buttonVariants({ size: "lg" })}
            >
              <Phone className="h-4 w-4" /> Call {SITE.phoneDisplay}
            </a>
            <Link
              to="/contact"
              data-testid="services-cta-quote"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
