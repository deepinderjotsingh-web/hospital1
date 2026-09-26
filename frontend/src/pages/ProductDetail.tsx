import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronRight, MessageCircle, Phone, ShieldCheck, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Seo from "@/components/Seo";
import ProductCard from "@/components/catalog/ProductCard";
import { apiGet } from "@/lib/api";
import type { Product } from "@/lib/api";
import { SITE, formatINR } from "@/lib/site";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => apiGet<Product>(`/products/${slug}`),
    retry: false,
  });

  const { data: related } = useQuery({
    queryKey: ["products", "related", product?.category_slug, product?.slug],
    queryFn: () => apiGet<Product[]>(`/products?category=${product?.category_slug}`),
    enabled: !!product,
  });

  const waHref = product
    ? SITE.whatsappText(`Hello SPS Medcare, I would like to inquire about ${product.name} (${product.sku})`)
    : SITE.whatsapp;

  if (isLoading) {
    return (
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-2">
        <div className="aspect-square animate-pulse rounded-3xl bg-slate-100" />
        <div className="space-y-4">
          <div className="h-8 w-3/4 animate-pulse rounded bg-slate-100" />
          <div className="h-24 w-full animate-pulse rounded bg-slate-100" />
          <div className="h-12 w-1/2 animate-pulse rounded bg-slate-100" />
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="font-heading text-2xl font-bold text-slate-900">Product not found</h1>
        <p className="mt-3 text-sm text-slate-500">
          This product may have been renamed or removed. Browse the full catalog or call us on{" "}
          {SITE.phoneDisplay} — we stock 2,000+ items.
        </p>
        <Link
          to="/products"
          data-testid="product-notfound-back"
          className={buttonVariants({ variant: "outline" }) + " mt-6"}
        >
          Back to all products
        </Link>
      </div>
    );
  }

  return (
    <>
      <Seo
        title={`${product.name} (${product.sku}) — Price in Delhi NCR | SPS Medcare`}
        description={product.short_desc}
        path={`/products/${product.slug}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          image: [product.image_url],
          description: product.short_desc,
          sku: product.sku,
          brand: { "@type": "Brand", name: product.brand },
          offers: {
            "@type": "Offer",
            url: `${SITE.domain}/products/${product.slug}`,
            priceCurrency: "INR",
            price: product.price,
            availability: product.in_stock
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          },
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Breadcrumb */}
        <nav
          data-testid="product-breadcrumb"
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500"
        >
          <Link to="/" className="transition-colors hover:text-primary">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/products" className="transition-colors hover:text-primary">Products</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-slate-700">{product.name}</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1fr]">
          {/* Left: image + specs */}
          <div>
            <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
              <img
                src={product.image_url}
                alt={`${product.name} — ${product.short_desc}`}
                className="aspect-square w-full object-cover"
              />
            </div>

            <Card className="mt-6">
              <CardContent className="p-6">
                <h2 className="font-heading text-lg font-bold text-slate-900">
                  Technical Specifications
                </h2>
                <Table data-testid="product-specs-table">
                  <TableBody>
                    {Object.entries(product.specs).map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell className="w-2/5 font-medium text-slate-500">{key}</TableCell>
                        <TableCell className="font-medium text-slate-900">{value}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell className="font-medium text-slate-500">Warranty</TableCell>
                      <TableCell className="font-medium text-slate-900">{product.warranty}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-slate-500">Certification</TableCell>
                      <TableCell className="font-medium text-slate-900">{product.certification}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-slate-500">MOQ</TableCell>
                      <TableCell className="font-medium text-slate-900">{product.moq}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Right: quote panel */}
          <div>
            <div className="lg:sticky lg:top-24">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="border border-teal-200 bg-teal-50 text-teal-700">
                  {product.category_slug
                    .split("-")
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" ")}
                </Badge>
                <Badge variant="outline" className="font-mono text-[11px] font-semibold text-slate-500">
                  {product.sku}
                </Badge>
                {product.in_stock && (
                  <Badge className="border border-emerald-200 bg-emerald-50 text-emerald-700">
                    In Stock
                  </Badge>
                )}
              </div>

              <h1
                data-testid="product-detail-name"
                className="mt-4 font-heading text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
              >
                {product.name}
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                {product.description}
              </p>

              <p data-testid="product-detail-price" className="mt-6 font-heading text-3xl font-extrabold text-primary">
                {formatINR(product.price)}
                <span className="text-sm font-medium text-slate-400"> / {product.price_unit}</span>
              </p>

              <ul className="mt-6 space-y-2.5">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="mt-0.5 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full bg-teal-50 text-primary">
                      <Check className="h-3 w-3" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Card className="mt-8 border-teal-100 bg-teal-50/60">
                <CardContent className="p-5">
                  <p className="font-heading text-sm font-bold text-slate-900">
                    Get today&apos;s best price
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Bulk orders, institutional quotes and home-care bundles answered within minutes.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    <a
                      data-testid="product-call-button"
                      href={SITE.phoneHref}
                      aria-label="Contact SPS Medcare at +91 9920222362"
                      className={buttonVariants({ size: "sm" })}
                    >
                      <Phone className="h-4 w-4" /> Call {SITE.phoneDisplay}
                    </a>
                    <a
                      data-testid="product-whatsapp-button"
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonVariants({ variant: "outline", size: "sm" })}
                    >
                      <MessageCircle className="h-4 w-4 text-[#128c4a]" /> WhatsApp
                    </a>
                    <Link
                      to={`/contact?product=${encodeURIComponent(product.name)}`}
                      data-testid="product-quote-button"
                      className={buttonVariants({ variant: "secondary", size: "sm" })}
                    >
                      Request Quote
                    </Link>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1.5"><Truck className="h-3.5 w-3.5 text-primary" /> Same-day NCR delivery</span>
                    <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> {product.warranty} warranty</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Related */}
        {related && related.filter((r) => r.slug !== product.slug).length > 0 && (
          <section data-testid="related-products" className="mt-16">
            <h2 className="font-heading text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              More in this category
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related
                .filter((r) => r.slug !== product.slug)
                .slice(0, 4)
                .map((r) => (
                  <ProductCard key={r.slug} product={r} />
                ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
