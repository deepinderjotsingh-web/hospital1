import { useQuery } from "@tanstack/react-query";
import { Download, FileCode2, Globe2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Seo from "@/components/Seo";
import { apiGet } from "@/lib/api";
import type { Specialty, Treatment } from "@/lib/api";
import { COUNTRIES } from "@/lib/site";

const STEPS = [
  "Install WordPress on your hosting for sps-medcare.com (any theme works; a medical or business theme suits best).",
  "In WordPress admin, go to Tools → Import → WordPress and install the importer plugin if prompted.",
  "Upload sps-medcare-wordpress-import.xml, assign posts to your admin user, and tick “Download and import file attachments”.",
  "Done — all pages, treatment pages, cost-guide blog posts, images and SEO meta import in one pass. Then set your menu under Appearance → Menus.",
];

const CONTENTS = [
  ["6 pages", "Home, About Us, Treatments, Services, Contact Us, Countries We Serve"],
  ["10 treatment pages", "One per specialty with cost comparison, procedures, hospitals and inclusions"],
  ["10 blog posts", "SEO cost-guide articles (e.g. “Cardiac Surgery in India: Cost, Hospitals and Recovery Time”)"],
  ["10 images", "Treatment images as attachments, sideloaded by the importer and set as featured images"],
  ["10 categories", "Medical specialties as WordPress categories"],
  ["SEO meta", "Yoast SEO and Rank Math title + description keys on every page and post"],
];

export default function ExportData() {
  const { data: specialties } = useQuery({
    queryKey: ["specialties"],
    queryFn: () => apiGet<Specialty[]>("/specialties"),
  });

  const { data: treatments } = useQuery({
    queryKey: ["treatments", "all"],
    queryFn: () => apiGet<Treatment[]>("/treatments"),
  });

  return (
    <>
      <Seo
        title="WordPress Import File — SPS Medcare Website Data as WXR XML"
        description="Download the complete SPS Medcare medical tourism website content as a WordPress WXR XML import file: pages, treatment pages, cost-guide blog posts, images and SEO meta."
        path="/export-data"
      />

      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <p className="text-xs font-bold uppercase tracking-wider text-teal-700">Data Export</p>
          <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            WordPress Import File (WXR XML)
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            The entire SPS Medcare website content — pages, treatment pages with cost comparisons,
            SEO cost-guide blog posts, images and search-engine meta — packaged as a
            WordPress-compatible WXR 1.2 file.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <Card data-testid="export-card" className="border-teal-100">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-5">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-teal-50 text-primary">
                  <FileCode2 className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="font-heading text-base font-bold text-slate-900">
                    sps-medcare-wordpress-import.xml
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500">
                    WXR 1.2 · ~130 KB · images sideloaded from URLs by the importer
                  </p>
                </div>
              </div>
              <a
                data-testid="export-download-button"
                href="/sps-medcare-wordpress-import.xml"
                download="sps-medcare-wordpress-import.xml"
                className={buttonVariants({ size: "lg" })}
              >
                <Download className="h-4 w-4" /> Download XML
              </a>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3" data-testid="export-counts">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 text-center">
                <p className="font-heading text-2xl font-extrabold text-primary">
                  {treatments ? treatments.length : "—"}
                </p>
                <p className="text-xs font-medium text-slate-500">Treatments</p>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 text-center">
                <p className="font-heading text-2xl font-extrabold text-primary">
                  {specialties ? specialties.length : "—"}
                </p>
                <p className="text-xs font-medium text-slate-500">Specialties</p>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 text-center">
                <p className="font-heading text-2xl font-extrabold text-primary">6</p>
                <p className="text-xs font-medium text-slate-500">Site pages</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contents */}
        <div data-testid="export-contents" className="mt-10">
          <h2 className="font-heading text-xl font-bold tracking-tight text-slate-900">
            What's inside the file
          </h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200/80">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3">Content</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {CONTENTS.map(([label, detail]) => (
                  <TableRow key={label}>
                    <TableCell className="font-semibold text-slate-900">{label}</TableCell>
                    <TableCell className="text-slate-600">{detail}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Steps */}
        <div data-testid="export-steps" className="mt-10">
          <h2 className="font-heading text-xl font-bold tracking-tight text-slate-900">
            How to import into WordPress
          </h2>
          <ol className="mt-4 space-y-3">
            {STEPS.map((step, i) => (
              <li key={i} className="flex items-start gap-3 rounded-xl border border-slate-200/80 p-4">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-teal-50 font-heading text-xs font-extrabold text-primary">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-slate-600">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Treatments listing */}
        {treatments && (
          <div className="mt-10">
            <h2 className="font-heading text-xl font-bold tracking-tight text-slate-900">
              Treatments included in the export
            </h2>
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200/80">
              <Table data-testid="export-treatments-table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Treatment</TableHead>
                    <TableHead>Specialty</TableHead>
                    <TableHead className="text-right">Cost in India</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {treatments.map((t) => (
                    <TableRow key={t.slug}>
                      <TableCell className="font-medium text-slate-900">{t.name}</TableCell>
                      <TableCell className="text-slate-500">{t.specialty_name}</TableCell>
                      <TableCell className="text-right font-semibold text-primary">
                        {t.cost_india_usd}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        <div className="mt-10 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-6">
          <h2 className="flex items-center gap-2 font-heading text-base font-bold text-slate-900">
            <Globe2 className="h-4 w-4 text-primary" /> Countries page included
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            The export contains a dedicated “Countries We Serve” page listing{" "}
            {COUNTRIES.length} countries — useful for local SEO on searches such as “medical
            treatment in India from Bangladesh”.
          </p>
        </div>
      </section>
    </>
  );
}
