import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Phone, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/treatments", label: "Treatments" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/export-data", label: "Download" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 shadow-xs backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" data-testid="nav-logo-link" aria-label="SPS Medcare home">
          <Logo />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              data-testid={`nav-${link.label.toLowerCase()}`}
              className={({ isActive }) =>
                `rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            data-testid="nav-call-button"
            href={SITE.phoneHref}
            aria-label="Contact SPS Medcare at +91 9920222362"
            className={buttonVariants({ variant: "outline", size: "sm" }) + " hidden sm:inline-flex"}
          >
            <Phone className="h-4 w-4 text-primary" />
            {SITE.phoneDisplay}
          </a>
          <Link
            to="/contact"
            data-testid="nav-quote-button"
            className={buttonVariants({ size: "sm" }) + " hidden sm:inline-flex"}
          >
            Get Free Opinion
          </Link>
          <Button
            variant="ghost"
            size="icon"
            data-testid="nav-mobile-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            className="lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {open && (
        <div
          data-testid="nav-mobile-menu"
          className="border-t border-slate-100 bg-white px-4 pb-4 pt-2 lg:hidden"
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              data-testid={`nav-mobile-${link.label.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2.5 text-sm font-semibold ${
                  isActive ? "bg-accent text-accent-foreground" : "text-slate-700"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href={SITE.phoneHref}
            data-testid="nav-mobile-call-button"
            className={buttonVariants({ size: "sm" }) + " mt-2 w-full"}
          >
            <Phone className="h-4 w-4" />
            Call {SITE.phoneDisplay}
          </a>
        </div>
      )}
    </header>
  );
}
