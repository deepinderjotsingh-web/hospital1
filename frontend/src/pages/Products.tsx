import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Phone, Search, SearchX } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Seo from "@/components/Seo";
import ProductCard from "@/components/catalog/ProductCard";
import { apiGet } from "@/lib/api";
import type { Category, Product } from "@/lib/api";
import { SITE } from "@/lib/site";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") ?? "";
  const [q, setQ] = useState("");

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => apiGet<Category[]>("/categories"),
  });

  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (q.trim()) params.set("q", q.trim());
  const qs = params.toString();

  const { data: products, isLoading, isError } = useQuery({
    queryKey: ["products", "list", { category, q: q.trim() }],
    queryFn: () => apiGet<Product[]>(`/products${qs ? `?${qs}` : ""}`),
  });

  const selectCategory = (slug: string) =>
    setSearchParams(slug ? { category: slug } : {}, { replace: true });

  const activeCategory = categories?.find((c) => c.slug === category);

  return (
    <>
      <Seo
        title="Products — ICU Beds, OT Equipment, Patient Monitors & Surgical Supplies | SPS Medcare"
        description="Browse certified hospital furniture, medical equipment and surgical supplies with prices. Electric ICU beds, LED OT lights, patient monitors, oxygen concentrators, wheelchairs and more. Call +91 99202 22362."
        path="/products"
      />

      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <p className="text-xs font-bold uppercase tracking-wider text-teal-700">Product Catalog</p>
          <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {activeCategory ? activeCategory.name : "All Medical Equipment & Supplies"}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            {activeCategory
              ? activeCategory.description
              : "Certified equipment for hospitals, clinics, labs and home care — every order includes a GST invoice, warranty support and free installation across Delhi NCR where applicable."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        {/* Search + category pills */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              data-testid="products-search-input"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search beds, monitors, gloves, SKU…"
              className="pl-9"
              aria-label="Search products"
            />
          </div>
          <div data-testid="category-pills" className="flex flex-wrap gap-2">
            <button
              data-testid="category-pill-all"
              onClick={() => selectCategory("")}
              className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
                category === ""
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-slate-200 bg-white text-slate-600 hover:border-teal-300 hover:text-primary"
              }`}
            >
              All
            </button>
            {categories?.map((cat) => (
              <button
                key={cat.slug}
                data-testid={`category-pill-${cat.slug}`}
                onClick={() => selectCategory(cat.slug)}
                className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
                  category === cat.slug
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-slate-200 bg-white text-slate-600 hover:border-teal-300 hover:text-primary"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div data-testid="products-grid" className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading &&
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl bg-slate-100" style={{ height: 340 }} />
            ))}
          {products?.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        {products && products.length === 0 && (
          <div data-testid="products-empty" className="mx-auto max-w-md py-20 text-center">
            <SearchX className="mx-auto h-10 w-10 text-slate-300" />
            <h2 className="mt-4 font-heading text-lg font-bold text-slate-900">
              No products matched your search
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              We stock over 2,000 items — if it is not listed here, call us on {SITE.phoneDisplay} and
              we will source it.
            </p>
            <a
              data-testid="products-empty-call"
              href={SITE.phoneHref}
              aria-label="Contact SPS Medcare at +91 9920222362"
              className={buttonVariants({ variant: "outline" }) + " mt-5"}
            >
              <Phone className="h-4 w-4 text-primary" /> Call {SITE.phoneDisplay}
            </a>
          </div>
        )}

        {isError && (
          <p className="py-10 text-center text-sm text-slate-500">
            The catalog is momentarily unavailable — please call {SITE.phoneDisplay} for assistance.
          </p>
        )}
      </section>
    </>
  );
}
