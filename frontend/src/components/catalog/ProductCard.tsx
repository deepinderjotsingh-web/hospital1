import { Link } from "react-router-dom";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/lib/api";
import { SITE, formatINR } from "@/lib/site";

export default function ProductCard({ product }: { product: Product }) {
  const waHref = SITE.whatsappText(
    `Hello SPS Medcare, I would like to inquire about ${product.name} (${product.sku})`,
  );
  return (
    <Card
      data-testid={`product-card-${product.slug}`}
      className="group flex flex-col overflow-hidden transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-lg"
    >
      <Link
        to={`/products/${product.slug}`}
        data-testid={`product-card-image-${product.slug}`}
        className="block overflow-hidden bg-white"
        aria-label={`View ${product.name}`}
      >
        <img
          src={product.image_url}
          alt={`${product.name} — ${product.short_desc}`}
          loading="lazy"
          className="aspect-square w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />
      </Link>
      <CardContent className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="outline" className="font-mono text-[11px] font-semibold text-slate-500">
            {product.sku}
          </Badge>
          {product.featured && (
            <Badge className="border border-teal-200 bg-teal-50 text-[11px] text-teal-700">
              <ShieldCheck className="mr-1 h-3 w-3" /> Popular
            </Badge>
          )}
        </div>
        <Link to={`/products/${product.slug}`} className="mt-2 block">
          <h3 className="font-heading text-base font-bold tracking-tight text-slate-900 transition-colors group-hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate-500">
          {product.short_desc}
        </p>
        <div className="mt-auto pt-3">
          <p className="font-heading text-lg font-extrabold text-primary">
            {formatINR(product.price)}
            <span className="text-xs font-medium text-slate-400"> / {product.price_unit}</span>
          </p>
          <div className="mt-3 flex gap-2">
            <Link
              to={`/contact?product=${encodeURIComponent(product.name)}`}
              data-testid={`product-card-quote-${product.slug}`}
              className={buttonVariants({ size: "sm" }) + " flex-1"}
            >
              Get Quote
            </Link>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`product-card-whatsapp-${product.slug}`}
              aria-label={`WhatsApp about ${product.name}`}
              className={buttonVariants({ variant: "outline", size: "icon-sm" })}
            >
              <MessageCircle className="h-4 w-4 text-[#128c4a]" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
