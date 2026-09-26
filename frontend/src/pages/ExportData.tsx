import { useQuery } from "@tanstack/react-query";
import { Download, FileJson, PackageCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Seo from "@/components/Seo";
import { apiGet } from "@/lib/api";
import type { Category, Product } from "@/lib/api";

const STEPS = [
  "Install WordPress and (recommended) the WooCommerce plugin on your hosting.",
  "In WordPress admin, go to Tools → Import → WordPress and install the importer if asked.",
  "Upload sps-medcare-wordpress-import.xml, assign the posts to your admin user, and tick “Download and import file attachments”.",
  "Done — pages, categories, all 20 products with images, SKUs and prices import in one pass. Set your menu under Appearance → Menus.",
];

export default function ExportData() {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => apiGet<Category[]>("/categories"),
  });

  const { data: products } = useQuery({
    queryKey: ["products", "all"],
    queryFn: () => apiGet<Product[]>("/products"),
  });

  return (
    <>
      <Seo
        title="WordPress Import File — Export the SPS Medcare Catalog as WXR XML"
        description="Download the full SPS Medcare catalog as a WordPress WXR XML import file — 5 pages, 6 categories and 20 products with images, SKUs, prices and SEO meta."
        path="/export-data"
      />

      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <p className="text-xs font-bold uppercase tracking-wider text-teal-700">Data Export</p>
          <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            WordPress Import File (WXR XML)
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            The entire SPS Medcare website data — pages, product categories and every product with
            its image, price, SKU and SEO meta — packaged as a WordPress-compatible WXR 1.2 file.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <Card data-testid="export-card" className="border-teal-100">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-5">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-teal-50 text-primary">
                  <FileJson className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="font-heading text-base font-bold text-slate-900">
                    sps-medcare-wordpress-import.xml
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500">
                    WXR 1.2 · ~140 KB · images referenced by URL and sideloaded by the importer
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
                  {products ? products.length : "—"}
                </p>
                <p className="text-xs font-medium text-slate-500">Products</p>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 text-center">
                <p className="font-heading text-2xl font-extrabold text-primary">
                  {categories ? categories.length : "—"}
                </p>
                <p className="text-xs font-medium text-slate-500">Categories</p>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 text-center">
                <p className="font-heading text-2xl font-extrabold text-primary">5</p>
                <p className="text-xs font-medium text-slate-500">Pages (incl. Home, About, Contact)</p>
              </div>
            </div>
          </CardContent>
        </Card>

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
          <p className="mt-4 text-xs leading-relaxed text-slate-500">
            The file includes Yoast SEO and Rank Math meta keys (title + description) for every page
            and product, WooCommerce product meta (SKU, regular price, stock status), product
            categories as the <code>product_cat</code> taxonomy, and each product image as an
            attachment with alt text.
          </p>
        </div>

        {categories && (
          <div className="mt-10">
            <h2 className="flex items-center gap-2 font-heading text-xl font-bold tracking-tight text-slate-900">
              <PackageCheck className="h-5 w-5 text-primary" /> Catalog included in the file
            </h2>
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200/80">
              <Table data-testid="export-categories-table">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-2/3">Category</TableHead>
                    <TableHead className="text-right">Products</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((cat) => (
                    <TableRow key={cat.slug}>
                      <TableCell className="font-medium text-slate-900">{cat.name}</TableCell>
                      <TableCell className="text-right text-slate-500">{cat.product_count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
