import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  BadgeCheck,
  BedDouble,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  MessageCircle,
  Phone,
  TrendingDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Seo from "@/components/Seo";
import TreatmentCard from "@/components/catalog/TreatmentCard";
import { apiGet } from "@/lib/api";
import type { Treatment } from "@/lib/api";
import { SITE } from "@/lib/site";

export default function TreatmentDetail() {
  const { slug } = useParams<{ slug: string }>();

  const { data: treatment, isLoading, isError } = useQuery({
    queryKey: ["treatment", slug],
    queryFn: () => apiGet<Treatment>(`/treatments/${slug}`),
    retry: false,
  });

  const { data: related } = useQuery({
    queryKey: ["treatments", "related", treatment?.specialty_slug],
    queryFn: () => apiGet<Treatment[]>("/treatments"),
    enabled: !!treatment,
  });

  const waHref = treatment
    ? SITE.whatsappText(
        `Hello SPS Medcare, I would like a free opinion and cost estimate for ${treatment.name} in India.`,
      )
    : SITE.whatsapp;

  if (isLoading) {
    return (
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-2">
        <div className="aspect-[16/10] animate-pulse rounded-3xl bg-slate-100" />
        <div className="space-y-4">
          <div className="h-8 w-3/4 animate-pulse rounded bg-slate-100" />
          <div className="h-24 w-full animate-pulse rounded bg-slate-100" />
          <div className="h-12 w-1/2 animate-pulse rounded bg-slate-100" />
        </div>
      </div>
    );
  }

  if (isError || !treatment) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="font-heading text-2xl font-bold text-slate-900">Treatment not found</h1>
        <p className="mt-3 text-sm text-slate-500">
          This page may have moved. Browse all treatments, or WhatsApp us your diagnosis on{" "}
          {SITE.phoneDisplay} — we coordinate care across every major specialty.
        </p>
        <Link
          to="/treatments"
          data-testid="treatment-notfound-back"
          className={buttonVariants({ variant: "outline" }) + " mt-6"}
        >
          Back to all treatments
        </Link>
      </div>
    );
  }

  return (
    <>
      <Seo
        title={`${treatment.name} in India — Cost ${treatment.cost_india_usd} | SPS Medcare`}
        description={treatment.short_desc}
        path={`/treatments/${treatment.slug}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "MedicalProcedure",
          name: treatment.name,
          description: treatment.short_desc,
          image: [treatment.image_url],
          category: treatment.specialty_name,
          provider: {
            "@type": "MedicalBusiness",
            name: SITE.name,
            telephone: SITE.phoneDisplay,
            url: SITE.domain,
          },
        }}
      />

      {/* Hero banner */}
      <section className="relative overflow-hidden bg-[#0f172a]">
        <div className="absolute inset-0">
          <img
            src={treatment.image_url}
            alt={`${treatment.name} facility in India`}
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/95 to-[#0f172a]/60" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-12">
          <nav
            data-testid="treatment-breadcrumb"
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-sm text-slate-400"
          >
            <Link to="/" className="transition-colors hover:text-teal-300">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/treatments" className="transition-colors hover:text-teal-300">Treatments</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-slate-200">{treatment.name}</span>
          </nav>

          <Badge className="mt-5 border border-teal-400/30 bg-teal-500/15 text-teal-300 hover:bg-teal-500/15">
            {treatment.specialty_name}
          </Badge>
          <h1
            data-testid="treatment-detail-name"
            className="mt-3 max-w-3xl font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          >
            {treatment.name} in India
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            {treatment.short_desc}
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-[1.35fr_0.65fr]">
        {/* Main content */}
        <div>
          {/* Cost comparison */}
          <div data-testid="treatment-cost-cards" className="grid gap-4 sm:grid-cols-3">
            <Card className="border-teal-200 bg-teal-50/70">
              <CardContent className="p-5">
                <p className="text-[11px] font-bold uppercase tracking-wide text-teal-700">
                  Cost in India
                </p>
                <p
                  data-testid="treatment-cost-india"
                  className="mt-1 font-heading text-2xl font-extrabold text-primary"
                >
                  {treatment.cost_india_usd}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                  Cost Abroad
                </p>
                <p className="mt-1 font-heading text-lg font-bold text-slate-400 line-through">
                  {treatment.cost_west_usd}
                </p>
              </CardContent>
            </Card>
            <Card className="border-amber-200 bg-amber-50/70">
              <CardContent className="p-5">
                <p className="text-[11px] font-bold uppercase tracking-wide text-amber-700">
                  You Save
                </p>
                <p className="mt-1 flex items-center gap-1.5 font-heading text-2xl font-extrabold text-amber-600">
                  <TrendingDown className="h-5 w-5" /> {treatment.savings_percent}%
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Stay info */}
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="flex items-center gap-3 p-5">
                <BedDouble className="h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-xs text-slate-500">Hospital stay</p>
                  <p className="font-heading text-sm font-bold text-slate-900">
                    {treatment.hospital_stay}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-3 p-5">
                <CalendarDays className="h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-xs text-slate-500">Total days in India</p>
                  <p className="font-heading text-sm font-bold text-slate-900">
                    {treatment.stay_in_india}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-3 p-5">
                <BadgeCheck className="h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-xs text-slate-500">Outcomes</p>
                  <p className="font-heading text-sm font-bold text-slate-900">
                    {treatment.success_rate}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Overview */}
          <section className="mt-10">
            <h2 className="font-heading text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Overview
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              {treatment.description}
            </p>
          </section>

          {/* Procedures */}
          <section className="mt-10">
            <h2 className="font-heading text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Procedures Covered
            </h2>
            <ul data-testid="treatment-procedures" className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {treatment.procedures.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-2.5 rounded-xl border border-slate-200/80 bg-white p-3.5 text-sm text-slate-700"
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-50 text-primary">
                    <Check className="h-3 w-3" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </section>

          {/* Hospitals */}
          <section className="mt-10">
            <h2 className="font-heading text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Leading Hospitals for This Treatment
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              We work with JCI and NABH accredited hospitals across Delhi, Gurugram and Noida.
            </p>
            <ul data-testid="treatment-hospitals" className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {treatment.top_hospitals.map((h) => (
                <li
                  key={h}
                  className="flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white p-3.5 text-sm font-medium text-slate-700"
                >
                  <Building2 className="h-4 w-4 shrink-0 text-primary" />
                  {h}
                </li>
              ))}
            </ul>
          </section>

          {/* Included free */}
          <section className="mt-10">
            <h2 className="font-heading text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              What SPS Medcare Includes — Free of Charge
            </h2>
            <ul data-testid="treatment-includes" className="mt-4 space-y-2.5">
              {treatment.includes.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                    <Check className="h-3 w-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sticky inquiry panel */}
        <aside>
          <div className="lg:sticky lg:top-24">
            <Card className="border-teal-100 bg-teal-50/60">
              <CardContent className="p-6">
                <h2 className="font-heading text-lg font-bold text-slate-900">
                  Get a Free Opinion &amp; Exact Cost
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Send your diagnosis and recent reports. A specialist reviews your case and we reply
                  with a written opinion and itemised estimate within 48 hours — no charge, no
                  obligation.
                </p>
                <div className="mt-5 flex flex-col gap-2.5">
                  <a
                    data-testid="treatment-whatsapp-button"
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ size: "lg" }) + " w-full bg-[#22c55e] text-white hover:bg-[#16a34a]"}
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp My Reports
                  </a>
                  <a
                    data-testid="treatment-call-button"
                    href={SITE.phoneHref}
                    aria-label="Contact SPS Medcare at +91 9920222362"
                    className={buttonVariants({ variant: "outline", size: "lg" }) + " w-full"}
                  >
                    <Phone className="h-4 w-4 text-primary" /> {SITE.phoneDisplay}
                  </a>
                  <Link
                    to={`/contact?treatment=${encodeURIComponent(treatment.name)}`}
                    data-testid="treatment-inquiry-button"
                    className={buttonVariants({ variant: "secondary", size: "lg" }) + " w-full"}
                  >
                    Fill the Inquiry Form
                  </Link>
                </div>
                <p className="mt-4 text-center text-xs text-slate-500">
                  Zero facilitation fee · We never mark up hospital bills
                </p>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>

      {/* Related */}
      {related && related.filter((r) => r.slug !== treatment.slug).length > 0 && (
        <section data-testid="related-treatments" className="bg-white py-14">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="font-heading text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Other Treatments We Coordinate
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related
                .filter((r) => r.slug !== treatment.slug)
                .slice(0, 3)
                .map((r) => (
                  <TreatmentCard key={r.slug} treatment={r} />
                ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
