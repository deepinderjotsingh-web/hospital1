import { Mail, Phone, ShieldCheck, Truck } from "lucide-react";
import { SITE } from "@/lib/site";

export default function TopBar() {
  return (
    <div className="bg-slate-950 text-xs text-slate-300 sm:text-[13px]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2">
        <div className="flex items-center gap-4">
          <a
            data-testid="topbar-phone-link"
            href={SITE.phoneHref}
            aria-label="Contact SPS Medcare at +91 9920222362"
            className="flex items-center gap-1.5 font-semibold text-teal-300 transition-colors hover:text-teal-200"
          >
            <Phone className="h-3.5 w-3.5" />
            {SITE.phoneDisplay}
          </a>
          <a
            data-testid="topbar-email-link"
            href={`mailto:${SITE.email}`}
            className="hidden items-center gap-1.5 transition-colors hover:text-white sm:flex"
          >
            <Mail className="h-3.5 w-3.5" />
            {SITE.email}
          </a>
        </div>
        <div className="hidden items-center gap-5 md:flex">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-teal-300" />
            ISO 13485:2016 &amp; CE Certified
          </span>
          <span className="flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5 text-teal-300" />
            Same-day delivery in Delhi NCR
          </span>
        </div>
      </div>
    </div>
  );
}
