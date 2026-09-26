import { Globe2, MapPin, Phone, PhoneCall } from "lucide-react";
import { SITE } from "@/lib/site";

export default function TopBar() {
  return (
    <div className="bg-[#042f2e] text-xs text-teal-100 sm:text-[13px]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2">
        <div className="flex items-center gap-4">
          <a
            data-testid="topbar-phone-link"
            href={SITE.phoneHref}
            aria-label="Contact SPS Medcare at +91 9920222362"
            className="flex items-center gap-1.5 font-semibold text-teal-300 transition-colors hover:text-teal-200"
          >
            <Phone className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">24/7 Patient Desk:</span> {SITE.phoneDisplay}
          </a>
          <a
            data-testid="topbar-landline-link"
            href={SITE.landlineHref}
            aria-label={`Call SPS Medcare office at ${SITE.landlineDisplay}`}
            className="hidden items-center gap-1.5 transition-colors hover:text-white md:flex"
          >
            <PhoneCall className="h-3.5 w-3.5 text-teal-400" />
            {SITE.landlineDisplay}
          </a>
        </div>
        <div className="flex items-center gap-5">
          <span className="hidden items-center gap-1.5 lg:flex">
            <MapPin className="h-3.5 w-3.5 text-teal-400" />
            Janakpuri, New Delhi
          </span>
          <span className="flex items-center gap-1.5">
            <Globe2 className="h-3.5 w-3.5 text-teal-400" />
            Serving patients from 12+ countries
          </span>
        </div>
      </div>
    </div>
  );
}
