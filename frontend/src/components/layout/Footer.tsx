import { Link } from "react-router-dom";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { Logo } from "./Logo";

const QUICK_LINKS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
  { to: "/export-data", label: "WordPress XML Export" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0b132b] text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="[&_span]:!text-white">
            <Logo />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Dedicated to delivering quality and affordable healthcare equipment to hospitals,
            clinics and home-care patients across Delhi NCR and India.
          </p>
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-xs font-semibold text-teal-300">
            ISO 13485:2016 &amp; CE Certified
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
            Categories
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/products?category=icu-electric-beds" className="transition-colors hover:text-teal-300">ICU &amp; Electric Beds</Link></li>
            <li><Link to="/products?category=ot-equipment" className="transition-colors hover:text-teal-300">OT Equipment</Link></li>
            <li><Link to="/products?category=diagnostic-monitoring" className="transition-colors hover:text-teal-300">Diagnostic &amp; Monitoring</Link></li>
            <li><Link to="/products?category=hospital-furniture" className="transition-colors hover:text-teal-300">Hospital Furniture</Link></li>
            <li><Link to="/products?category=surgical-supplies" className="transition-colors hover:text-teal-300">Surgical Supplies</Link></li>
            <li><Link to="/products?category=emergency-mobility" className="transition-colors hover:text-teal-300">Emergency &amp; Mobility</Link></li>
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
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2.5 transition-colors hover:text-teal-300">
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
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} SPS Medcare · www.sps-medcare.com · All rights reserved</p>
          <p>GST invoices · Pan-India shipping · Delhi NCR same-day delivery</p>
        </div>
      </div>
    </footer>
  );
}
