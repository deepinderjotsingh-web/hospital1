import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  Award,
  Headset,
  HeartPulse,
  MessageCircle,
  PackageCheck,
  Phone,
  ShieldCheck,
  Star,
  Truck,
  Users,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Seo from "@/components/Seo";
import ProductCard from "@/components/catalog/ProductCard";
import { apiGet } from "@/lib/api";
import type { Category, Product } from "@/lib/api";
import { IMAGES, SITE } from "@/lib/site";

const STATS = [
  { icon: Award, value: "15+", label: "Years in medical supplies" },
  { icon: Users, value: "500+", label: "Facilities served" },
  { icon: PackageCheck, value: "2,000+", label: "Products supplied" },
  { icon: Headset, value: "24/7", label: "WhatsApp support" },
];

const WHY = [
  {
    icon: ShieldCheck,
    title: "Certified Quality Only",
    desc: "Every product we stock is ISO 13485:2016 or CE certified — no grey-market imports, ever.",
  },
  {
    icon: Truck,
    title: "Same-Day NCR Delivery",
    desc: "Order by 2 PM and stock items reach your ward, clinic or home the same day across Delhi NCR.",
  },
  {
    icon: Wrench,
    title: "Free Installation & Demo",
    desc: "Electric beds, monitors and OT equipment are installed and demonstrated on-site by our technicians.",
  },
  {
    icon: HeartPulse,
    title: "Home ICU Expertise",
    desc: "Beds, oxygen concentrators and monitors set up at home with rentals and AMC options.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "SPS Medcare equipped our 20-bed nursing home in three days — ICU beds, monitors and trolleys, all installed with staff demo. Pricing beat every other vendor.",
    name: "Dr. A. Sharma",
    role: "Nursing Home Owner, Rohini",
  },
  {
    quote:
      "We needed an oxygen concentrator and a hospital bed for my father at home the same evening. They delivered, installed and explained everything patiently.",
    name: "Priya Nair",
    role: "Home-Care Customer, Noida",
  },
  {
    quote:
      "Gloves, masks and consumables at genuine wholesale rates with GST invoices, month after month. Their WhatsApp response time is unmatched.",
    name: "R. Mehta",
    role: "Purchase Manager, Diagnostic Lab, Gurugram",
  },
];

export default function Home() {
  const { data: categories, isLoading: loadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => apiGet<Category[]>("/categories"),
  });

  const { data: featured, isLoading: loadingFeatured } = useQuery({
    queryKey: ["products", "featured"],
    queryFn: () => apiGet<Product[]>("/products?featured=true"),
  });

  return (
    <>
      <Seo
        title="SPS Medcare — Hospital Furniture, Medical Equipment & Surgical Supplies | Delhi NCR"
        description="SPS Medcare supplies hospital furniture, ICU beds, medical equipment and surgical supplies across Delhi NCR and India. Call +91 99202 22362 for same-day quotes and free installation."
        path="/"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f0fdfa] via-white to-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div className="animate-fade-up">
            <Badge className="border border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-50">
              <ShieldCheck className="mr-1 h-3.5 w-3.5" /> ISO 13485:2016 &amp; CE Certified Supplier
            </Badge>
            <h1 className="mt-5 font-heading text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Hospital Furniture, Medical Equipment &amp; Surgical Supplies —{" "}
              <span className="text-primary">Delivered Across Delhi NCR</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Trusted by <strong>500+ hospitals, clinics and home-care patients</strong>. From
              five-function electric ICU beds to pulse oximeters and nitrile gloves — certified
              equipment, honest prices, free installation and same-day delivery.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                data-testid="hero-call-button"
                href={SITE.phoneHref}
                aria-label="Contact SPS Medcare at +91 9920222362"
                className={buttonVariants({ size: "lg" })}
              >
                <Phone className="h-4 w-4" /> Call {SITE.phoneDisplay}
              </a>
              <a
                data-testid="hero-whatsapp-button"
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                <MessageCircle className="h-4 w-4 text-[#128c4a]" /> WhatsApp Us
              </a>
              <Link
                to="/products"
                data-testid="hero-browse-products"
                className={buttonVariants({ variant: "ghost", size: "lg" })}
              >
                Browse Products <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-slate-500">
              <span className="flex items-center gap-1.5"><Truck className="h-4 w-4 text-primary" /> Same-day NCR delivery</span>
              <span className="flex items-center gap-1.5"><Wrench className="h-4 w-4 text-primary" /> Free installation</span>
              <span className="flex items-center gap-1.5"><PackageCheck className="h-4 w-4 text-primary" /> GST invoice &amp; warranty</span>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <img
              src={IMAGES.hero}
              alt="Modern hospital ward with an electric patient bed and medical equipment"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl"
            />
            <Card className="absolute -bottom-6 -left-6 w-56 border-teal-100 shadow-lg">
              <CardContent className="flex items-center gap-3 p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-teal-50 text-primary">
                  <Users className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-heading text-xl font-extrabold text-slate-900">500+</p>
                  <p className="text-xs font-medium text-slate-500">Facilities equipped</p>
                </div>
              </CardContent>
            </Card>
            <Card className="absolute -top-5 -right-4 w-52 border-teal-100 shadow-lg">
              <CardContent className="flex items-center gap-3 p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-teal-50 text-primary">
                  <Headset className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-heading text-xl font-extrabold text-slate-900">24/7</p>
                  <p className="text-xs font-medium text-slate-500">Support on WhatsApp</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section data-testid="stats-band" className="bg-slate-950">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex items-center gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal-500/15 text-teal-300">
                <stat.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-heading text-2xl font-extrabold text-white">{stat.value}</p>
                <p className="text-xs font-medium text-slate-400 sm:text-sm">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section data-testid="categories-section" className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-teal-700">Product Categories</p>
            <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Everything a Modern Facility Needs
            </h2>
          </div>
          <Link
            to="/products"
            data-testid="categories-view-all"
            className="text-sm font-semibold text-primary transition-colors hover:text-teal-700"
          >
            View all products →
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {loadingCategories &&
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] animate-pulse rounded-2xl bg-slate-100" />
            ))}
          {categories?.map((cat) => (
            <Link
              key={cat.slug}
              to={`/products?category=${cat.slug}`}
              data-testid={`category-card-${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl shadow-sm transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={cat.image_url}
                alt={`${cat.name} — ${cat.description}`}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white">{cat.name}</h3>
                    <p className="text-xs font-medium text-teal-200">{cat.tagline}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    {cat.product_count} items
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section data-testid="featured-products-section" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-teal-700">Most Requested</p>
              <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Featured Medical Equipment
              </h2>
            </div>
            <Link
              to="/products"
              data-testid="featured-view-all"
              className="text-sm font-semibold text-primary transition-colors hover:text-teal-700"
            >
              Browse full catalog →
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {loadingFeatured &&
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-2xl bg-slate-100" style={{ height: 340 }} />
              ))}
            {featured?.slice(0, 8).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          {featured && featured.length === 0 && (
            <p className="mt-8 text-center text-sm text-slate-500">
              Our catalog is being updated — call {SITE.phoneDisplay} for the latest stock list.
            </p>
          )}
        </div>
      </section>

      {/* Why choose us */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <p className="text-xs font-bold uppercase tracking-wider text-teal-700">Why SPS Medcare</p>
        <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Equipment You Can Trust, Service You Can Reach
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((item) => (
            <Card
              key={item.title}
              className="border-slate-200/80 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-lg"
            >
              <CardContent className="p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-teal-50 text-primary">
                  <item.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-heading text-base font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-xs font-bold uppercase tracking-wider text-teal-700">Testimonials</p>
          <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Trusted by Caregivers Across Delhi NCR
          </h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <Card key={t.name} className="border-slate-200/80 bg-slate-50/60">
                <CardContent className="p-6">
                  <div className="flex gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">“{t.quote}”</p>
                  <p className="mt-4 font-heading text-sm font-bold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section data-testid="cta-band" className="mx-auto max-w-7xl px-4 pb-16 pt-4">
        <div className="rounded-3xl bg-gradient-to-r from-teal-700 to-teal-500 px-6 py-12 text-center sm:px-12">
          <h2 className="font-heading text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Need Equipment for Your Facility or Home?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-teal-50 sm:text-base">
            Get a quote within minutes — call or WhatsApp us on {SITE.phoneDisplay}. Bulk and
            institutional orders welcome.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              data-testid="cta-band-call"
              href={SITE.phoneHref}
              aria-label="Contact SPS Medcare at +91 9920222362"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              <Phone className="h-4 w-4" /> Call Now
            </a>
            <a
              data-testid="cta-band-whatsapp"
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ size: "lg" }) + " bg-slate-950 text-white hover:bg-slate-900"}
            >
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
