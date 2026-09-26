import { Link } from "react-router-dom";
import { ArrowRight, BedDouble, CalendarDays, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Treatment } from "@/lib/api";
import { SITE } from "@/lib/site";

export default function TreatmentCard({ treatment }: { treatment: Treatment }) {
  const waHref = SITE.whatsappText(
    `Hello SPS Medcare, I would like a free opinion and cost estimate for ${treatment.name} in India.`,
  );

  return (
    <Card
      data-testid={`treatment-card-${treatment.slug}`}
      className="group flex flex-col overflow-hidden p-0 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-xl"
    >
      <Link
        to={`/treatments/${treatment.slug}`}
        data-testid={`treatment-card-image-${treatment.slug}`}
        className="relative block overflow-hidden"
        aria-label={`View ${treatment.name}`}
      >
        <img
          src={treatment.image_url}
          alt={`${treatment.name} in India — ${treatment.short_desc}`}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-teal-700 shadow-sm backdrop-blur-sm">
          {treatment.specialty_name}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-amber-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
          Save up to {treatment.savings_percent}%
        </span>
      </Link>

      <CardContent className="flex flex-1 flex-col p-5">
        <Link to={`/treatments/${treatment.slug}`}>
          <h3 className="font-heading text-lg font-bold tracking-tight text-slate-900 transition-colors group-hover:text-primary">
            {treatment.name}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">
          {treatment.short_desc}
        </p>

        <div className="mt-4 rounded-xl bg-teal-50/70 p-3.5">
          <p className="text-[11px] font-bold uppercase tracking-wide text-teal-700">
            Cost in India
          </p>
          <p className="font-heading text-xl font-extrabold text-primary">
            {treatment.cost_india_usd}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">
            vs <span className="line-through">{treatment.cost_west_usd}</span>
          </p>
        </div>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-medium text-slate-500">
          <span className="flex items-center gap-1.5">
            <BedDouble className="h-3.5 w-3.5 text-primary" /> {treatment.hospital_stay}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-primary" /> {treatment.stay_in_india} in India
          </span>
        </div>

        <div className="mt-auto flex gap-2 pt-4">
          <Link
            to={`/treatments/${treatment.slug}`}
            data-testid={`treatment-card-details-${treatment.slug}`}
            className={buttonVariants({ size: "sm" }) + " flex-1"}
          >
            View Details <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`treatment-card-whatsapp-${treatment.slug}`}
            aria-label={`WhatsApp SPS Medcare about ${treatment.name}`}
            className={buttonVariants({ variant: "outline", size: "icon-sm" })}
          >
            <MessageCircle className="h-4 w-4 text-[#128c4a]" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

export { Badge };
