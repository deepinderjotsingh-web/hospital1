import { useQuery } from "@tanstack/react-query";
import { Download, FileCode2, FileSpreadsheet, Globe2, Package, Paintbrush } from "lucide-react";
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

const PACKAGE_FILES = [
  ["README.txt", "Step-by-step WordPress import guide with your contact details"],
  ["sps-medcare-wordpress-import.xml", "The full website content (WXR 1.2) — pages, treatments, blog posts, images"],
  ["treatments.csv", "All 10 treatments with costs and hospitals, as a spreadsheet"],
  ["sitemap.xml", "Ready-to-upload sitemap for Google Search Console"],
  ["robots.txt", "Search-engine crawl rules"],
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
        title="Download Website Content — WordPress Import Package | SPS Medcare"
        description="Download the complete SPS Medcare website content: WordPress WXR XML import file, import guide, treatment price list CSV, sitemap and robots.txt in one ZIP package."
        path="/export-data"
      />

      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <p className="text-xs font-bold uppercase tracking-wider text-teal-700">Download</p>
          <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Download Your Website Content
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Everything on this website — pages, treatment pages with cost comparisons, SEO blog
            posts, images and search-engine meta — packaged so you can move it onto WordPress
            hosting for sps-medcare.com whenever you are ready.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        {/* Primary: full package */}
        <Card data-testid="download-package-card" className="border-primary/30 bg-teal-50/40 shadow-sm">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
                  <Package className="h-6 w-6" />
                </span>
                <div>
                  <p className="inline-flex rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
                    Recommended
                  </p>
                  <h2 className="mt-1.5 font-heading text-lg font-bold text-slate-900">
                    Complete Website Package (.zip)
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    WordPress import file + import guide + treatment price list + sitemap + robots.txt
                  </p>
                  <p className="mt-1 font-mono text-xs text-slate-500">
                    sps-medcare-website-package.zip · ~20 KB · 5 files
                  </p>
                </div>
              </div>
              <a
                data-testid="download-package-button"
                href="/api/download/website-package"
                className={buttonVariants({ size: "lg" })}
              >
                <Download className="h-4 w-4" /> Download Full Package
              </a>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border border-slate-200/80 bg-white">
              <Table data-testid="package-files-table">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-2/5">File</TableHead>
                    <TableHead>What it is</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PACKAGE_FILES.map(([file, detail]) => (
                    <TableRow key={file}>
                      <TableCell className="font-mono text-xs font-semibold text-slate-900">
                        {file}
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">{detail}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* WordPress PHP theme */}
        <Card data-testid="theme-card" className="mt-6 border-teal-100">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-5">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-slate-900 text-white">
                  <Paintbrush className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="font-heading text-base font-bold text-slate-900">
                    WordPress Theme in PHP (.zip)
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    The exact design of this website as an installable WordPress theme — PHP
                    templates, a Treatments custom post type with cost fields, customizer settings
                    for your phone and address, enquiry form and SEO schema.
                  </p>
                  <p className="mt-1 font-mono text-xs text-slate-500">
                    sps-medcare-wordpress-theme.zip · Appearance → Themes → Add New → Upload
                  </p>
                </div>
              </div>
              <a
                data-testid="download-theme-button"
                href="/api/download/wordpress-theme"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                <Download className="h-4 w-4" /> Download Theme
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Secondary: XML only */}
        <Card data-testid="export-card" className="mt-6 border-teal-100">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-5">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-teal-50 text-primary">
                  <FileCode2 className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="font-heading text-base font-bold text-slate-900">
                    WordPress Import File only (.xml)
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500">
                    sps-medcare-wordpress-import.xml · WXR 1.2 · ~130 KB · images sideloaded by the
                    importer
                  </p>
                </div>
              </div>
              <a
                data-testid="export-download-button"
                href="/api/download/wordpress-xml"
                className={buttonVariants({ variant: "outline", size: "lg" })}
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

            <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-slate-100 pt-5 text-sm text-slate-600">
              <span>Just want the price list?</span>
              <a
                data-testid="download-csv-button"
                href="/api/download/treatments-csv"
                className="inline-flex items-center gap-1.5 font-semibold text-primary transition-colors hover:text-teal-700"
              >
                <FileSpreadsheet className="h-4 w-4" /> Download treatments.csv
              </a>
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
