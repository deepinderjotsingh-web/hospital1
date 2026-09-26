import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MessageCircle, Search, SearchX } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Seo from "@/components/Seo";
import TreatmentCard from "@/components/catalog/TreatmentCard";
import { apiGet } from "@/lib/api";
import type { Specialty, Treatment } from "@/lib/api";
import { SITE } from "@/lib/site";

export default function Treatments() {
  const [searchParams, setSearchParams] = useSearchParams();
  const specialty = searchParams.get("specialty") ?? "";
  const [q, setQ] = useState("");

  const { data: specialties } = useQuery({
    queryKey: ["specialties"],
    queryFn: () => apiGet<Specialty[]>("/specialties"),
  });

  const params = new URLSearchParams();
  if (specialty) params.set("specialty", specialty);
  if (q.trim()) params.set("q", q.trim());
  const qs = params.toString();

  const { data: treatments, isLoading, isError } = useQuery({
    queryKey: ["treatments", "list", { specialty, q: q.trim() }],
    queryFn: () => apiGet<Treatment[]>(`/treatments${qs ? `?${qs}` : ""}`),
  });

  const selectSpecialty = (slug: string) =>
    setSearchParams(slug ? { specialty: slug } : {}, { replace: true });

  const active = specialties?.find((s) => s.slug === specialty);

  return (
    <>
      <Seo
        title="Treatments in India — Cost, Hospital Stay & Recovery Time | SPS Medcare"
        description="Compare major treatments in India with USD cost estimates, hospital stay and days in India: cancer, cardiac surgery, joint replacement, transplants, neurosurgery, BMT, IVF, cosmetic and general surgery."
        path="/treatments"
      />

      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <p className="text-xs font-bold uppercase tracking-wider text-teal-700">
            Treatments &amp; Costs
          </p>
          <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {active ? `${active.name} Treatment in India` : "Treatments We Coordinate in India"}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Transparent USD estimates, expected hospital stay and total days in India for every major
            specialty. Costs shown are indicative package ranges at our partner hospitals and are
            confirmed in writing after a specialist reviews your reports — free of charge.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              data-testid="treatments-search-input"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search cancer, heart, knee, transplant, IVF…"
              className="pl-9"
              aria-label="Search treatments"
            />
          </div>
          <div data-testid="specialty-pills" className="flex flex-wrap gap-2">
            <button
              data-testid="specialty-pill-all"
              onClick={() => selectSpecialty("")}
              className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
                specialty === ""
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-slate-200 bg-white text-slate-600 hover:border-teal-300 hover:text-primary"
              }`}
            >
              All
            </button>
            {specialties?.map((s) => (
              <button
                key={s.slug}
                data-testid={`specialty-pill-${s.slug}`}
                onClick={() => selectSpecialty(s.slug)}
                className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
                  specialty === s.slug
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-slate-200 bg-white text-slate-600 hover:border-teal-300 hover:text-primary"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        <div data-testid="treatments-grid" className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl bg-slate-100" style={{ height: 420 }} />
            ))}
          {treatments?.map((t) => (
            <TreatmentCard key={t.slug} treatment={t} />
          ))}
        </div>

        {treatments && treatments.length === 0 && (
          <div data-testid="treatments-empty" className="mx-auto max-w-md py-20 text-center">
            <SearchX className="mx-auto h-10 w-10 text-slate-300" />
            <h2 className="mt-4 font-heading text-lg font-bold text-slate-900">
              No treatment matched your search
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              We coordinate care across every major specialty. Tell us your diagnosis on WhatsApp and
              we will find the right specialist for you.
            </p>
            <a
              data-testid="treatments-empty-whatsapp"
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants() + " mt-5"}
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp {SITE.phoneDisplay}
            </a>
          </div>
        )}

        {isError && (
          <p className="py-10 text-center text-sm text-slate-500">
            Treatment information is momentarily unavailable — WhatsApp {SITE.phoneDisplay} and we
            will reply right away.
          </p>
        )}
      </section>
    </>
  );
}
