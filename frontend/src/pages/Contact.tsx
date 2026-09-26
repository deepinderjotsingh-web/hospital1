import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Seo from "@/components/Seo";
import { ApiError, apiPost } from "@/lib/api";
import type { Inquiry } from "@/lib/api";
import { SITE } from "@/lib/site";

const BLANK_FORM = {
  name: "",
  phone: "",
  email: "",
  city: "",
  message: "",
  product_name: "",
};

export default function Contact() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState(BLANK_FORM);

  useEffect(() => {
    const product = searchParams.get("product");
    if (product) setForm((f) => ({ ...f, product_name: product }));
  }, [searchParams]);

  const mutation = useMutation({
    mutationFn: (values: typeof BLANK_FORM) => apiPost<Inquiry>("/inquiries", values),
    onSuccess: () => {
      toast.success("Request received! Our team will call you back within minutes.", {
        description: `For anything urgent, call us on ${SITE.phoneDisplay}.`,
      });
      setForm(BLANK_FORM);
    },
    onError: (error) => {
      toast.error(
        error instanceof ApiError && error.status === 422
          ? "Please check your name and phone number and try again."
          : `Could not submit your request. Please call ${SITE.phoneDisplay} or WhatsApp us.`,
      );
    },
  });

  const set = (key: keyof typeof BLANK_FORM) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  return (
    <>
      <Seo
        title="Contact SPS Medcare — Call or WhatsApp +91 99202 22362 | Delhi NCR"
        description="Call or WhatsApp +91 99202 22362, email info@sps-medcare.com or visit B-42, Okhla Industrial Area Phase-II, New Delhi 110020. Same-day quotes, 24/7 support."
        path="/contact"
      />

      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <p className="text-xs font-bold uppercase tracking-wider text-teal-700">Contact Us</p>
          <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Get a Quote Within Minutes
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Call, WhatsApp or send the form — we answer within minutes during business hours, and
            always the same day.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Contact channels */}
        <div className="space-y-4">
          <Card data-testid="contact-phone-card" className="border-teal-100">
            <CardContent className="flex items-start gap-4 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal-50 text-primary">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-heading text-sm font-bold text-slate-900">Call / Missed Call</h2>
                <a
                  data-testid="contact-phone-link"
                  href={SITE.phoneHref}
                  aria-label="Contact SPS Medcare at +91 9920222362"
                  className="mt-1 block font-heading text-xl font-extrabold text-primary transition-colors hover:text-teal-700"
                >
                  {SITE.phoneDisplay}
                </a>
                <p className="mt-1 text-xs text-slate-500">Mobile · also on WhatsApp</p>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="contact-whatsapp-card">
            <CardContent className="flex items-start gap-4 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-[#128c4a]">
                <MessageCircle className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-heading text-sm font-bold text-slate-900">WhatsApp</h2>
                <a
                  data-testid="contact-whatsapp-link"
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block font-heading text-xl font-extrabold text-[#128c4a]"
                >
                  {SITE.phoneRaw}
                </a>
                <p className="mt-1 text-xs text-slate-500">24/7 — send photos or your requirement list</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-start gap-4 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal-50 text-primary">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-heading text-sm font-bold text-slate-900">Email</h2>
                <a
                  data-testid="contact-email-link"
                  href={`mailto:${SITE.email}`}
                  className="mt-1 block text-sm font-semibold text-slate-700"
                >
                  {SITE.email}
                </a>
                <p className="mt-1 text-xs text-slate-500">Formal quotations &amp; institutional orders</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-start gap-4 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal-50 text-primary">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-heading text-sm font-bold text-slate-900">Visit Our Warehouse</h2>
                <p data-testid="contact-address-text" className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
                  {SITE.address}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="h-3.5 w-3.5" /> {SITE.hours}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inquiry form */}
        <Card data-testid="contact-form-card">
          <CardContent className="p-6 sm:p-8">
            <h2 className="font-heading text-lg font-bold text-slate-900">Request a Callback / Quote</h2>
            <p className="mt-1 text-sm text-slate-500">
              Tell us what you need — a single item or a full ward list.
            </p>

            <form
              data-testid="contact-form"
              className="mt-6 grid gap-4 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                mutation.mutate(form);
              }}
            >
              <div className="grid gap-1.5">
                <Label htmlFor="contact-name">Your Name *</Label>
                <Input
                  id="contact-name"
                  data-testid="contact-form-name"
                  required
                  value={form.name}
                  onChange={(e) => set("name")(e.target.value)}
                  placeholder="e.g. Dr. R. Kapoor"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="contact-phone">Mobile Number *</Label>
                <Input
                  id="contact-phone"
                  data-testid="contact-form-phone"
                  required
                  type="tel"
                  inputMode="tel"
                  value={form.phone}
                  onChange={(e) => set("phone")(e.target.value)}
                  placeholder="10-digit mobile number"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="contact-email">Email (optional)</Label>
                <Input
                  id="contact-email"
                  data-testid="contact-form-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email")(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="contact-city">City (optional)</Label>
                <Input
                  id="contact-city"
                  data-testid="contact-form-city"
                  value={form.city}
                  onChange={(e) => set("city")(e.target.value)}
                  placeholder="e.g. Delhi, Noida, Gurugram"
                />
              </div>
              <div className="grid gap-1.5 sm:col-span-2">
                <Label htmlFor="contact-product">Product of Interest (optional)</Label>
                <Input
                  id="contact-product"
                  data-testid="contact-form-product"
                  value={form.product_name}
                  onChange={(e) => set("product_name")(e.target.value)}
                  placeholder="e.g. Apex 5-Function Electric ICU Bed"
                />
              </div>
              <div className="grid gap-1.5 sm:col-span-2">
                <Label htmlFor="contact-message">Your Requirement</Label>
                <Textarea
                  id="contact-message"
                  data-testid="contact-form-message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => set("message")(e.target.value)}
                  placeholder="Quantities, delivery location, timeline — anything that helps us quote accurately."
                />
              </div>
              <Button
                data-testid="contact-form-submit-button"
                type="submit"
                size="lg"
                className="sm:col-span-2"
                disabled={mutation.isPending}
              >
                <Send className="h-4 w-4" />
                {mutation.isPending ? "Sending…" : "Send Request"}
              </Button>
              <p className="text-center text-xs text-slate-400 sm:col-span-2">
                Prefer talking? Call {SITE.phoneDisplay} — we pick up.
              </p>
            </form>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
