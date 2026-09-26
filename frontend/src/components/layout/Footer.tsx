import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Clock, Globe2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { apiGet } from "@/lib/api";
import type { Treatment } from "@/lib/api";
import { COUNTRIES, LANGUAGES, SITE } from "@/lib/site";
import { Logo } from "./Logo";

const QUICK_LINKS = [
  { to: "/", label: "Home" },
  { to: "/treatments", label: "Treatments" },
  { to: "/services", label: "Patient Services" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Free Opinion" },
  { to: "/export-data", label: "WordPress XML Export" },
];

export default function Footer() {
  const { data: treatments } = useQuery({
    queryKey: ["treatments", "all"],
    queryFn: () => apiGet<Treatment[]>("/treatments"),
  });

  return (
    <footer className="bg-[#091422] text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="[&_span]:!text-white">
            <Logo />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Dedicated to delivering quality and affordable healthcare to patients from around the
            world — with a free second opinion, medical visa support and a care manager at your side
            from arrival to recovery.
          </p>
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-xs font-semibold text-teal-300">
            JCI &amp; NABH Accredited Partner Hospitals
          </p>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {QUICK_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="transition-colors hover:text-teal-300"
                  data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
            Popular Treatments
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {(treatments ?? []).slice(0, 7).map((t) => (
              <li key={t.slug}>
                <Link
                  to={`/treatments/${t.slug}`}
                  className="transition-colors hover:text-teal-300"
                  data-testid={`footer-treatment-${t.slug}`}
                >
                  {t.name}
                </Link>
              </li>
            ))}
            {!treatments && (
              <li className="text-slate-500">
                <Link to="/treatments" className="hover:text-teal-300">
                  Browse all treatments
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                data-testid="footer-phone-link"
                href={SITE.phoneHref}
                aria-label="Contact SPS Medcare at +91 9920222362"
                className="flex items-center gap-2.5 font-semibold text-teal-300 transition-colors hover:text-teal-200"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                data-testid="footer-whatsapp-link"
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 transition-colors hover:text-teal-300"
              >
                <MessageCircle className="h-4 w-4 shrink-0 text-[#25d366]" />
                WhatsApp {SITE.phoneRaw}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-2.5 transition-colors hover:text-teal-300"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {SITE.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              {SITE.address}
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 shrink-0" />
              {SITE.hours}
            </li>
            <li className="flex items-start gap-2.5">
              <Globe2 className="mt-0.5 h-4 w-4 shrink-0" />
              <span className="text-slate-400">{LANGUAGES.join(" · ")}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Countries ribbon */}
      <div className="border-t border-white/10 py-5">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-center text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Patients we serve
          </p>
          <div
            data-testid="footer-countries"
            className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-slate-400"
          >
            {COUNTRIES.map((c) => (
              <span key={c.name} className="flex items-center gap-1.5">
                <span aria-hidden="true">{c.flag}</span>
                {c.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} SPS Medcare · www.sps-medcare.com · All rights reserved</p>
          <p>Zero facilitation fee · We never mark up hospital bills</p>
        </div>
      </div>
    </footer>
  );
}
