import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Clock, FileHeart, Mail, MapPin, MessageCircle, Phone, PhoneCall, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Seo from "@/components/Seo";
import { ApiError, apiPost } from "@/lib/api";
import type { Inquiry } from "@/lib/api";
import { COUNTRIES, LANGUAGES, SITE } from "@/lib/site";

const BLANK_FORM = {
  name: "",
  phone: "",
  email: "",
  country: "",
  treatment_name: "",
  message: "",
};

const WHAT_TO_SEND = [
  "Your diagnosis or doctor's summary",
  "Recent scans and reports (CT, MRI, PET-CT, biopsy, blood work)",
  "Patient age and current medication list",
  "Your city and country of travel",
];

export default function Contact() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState(BLANK_FORM);

  useEffect(() => {
    const treatment = searchParams.get("treatment");
    if (treatment) setForm((f) => ({ ...f, treatment_name: treatment }));
  }, [searchParams]);

  const mutation = useMutation({
    mutationFn: (values: typeof BLANK_FORM) => apiPost<Inquiry>("/inquiries", values),
    onSuccess: () => {
      toast.success("Thank you — your request has reached our patient desk.", {
        description: `A coordinator will reply within 48 hours. For anything urgent, WhatsApp ${SITE.phoneDisplay}.`,
      });
      setForm(BLANK_FORM);
    },
    onError: (error) => {
      toast.error(
        error instanceof ApiError && error.status === 422
          ? "Please check your name and phone number and try again."
          : `Could not submit your request. Please WhatsApp us on ${SITE.phoneDisplay}.`,
      );
    },
  });

  const set = (key: keyof typeof BLANK_FORM) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  return (
    <>
      <Seo
        title="Contact SPS Medcare — Free Medical Opinion & Cost Estimate | WhatsApp +91 99202 22362"
        description="Send your medical reports for a free specialist opinion and itemised cost estimate within 48 hours. Call or WhatsApp +91 99202 22362, office 011 41000493, email info@spsattestation.com. Janakpuri, New Delhi."
        path="/contact"
      />

      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <p className="text-xs font-bold uppercase tracking-wider text-teal-700">Contact Us</p>
          <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Get a Free Medical Opinion &amp; Cost Estimate
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Send us your diagnosis and recent reports — a relevant specialist will review them and we
            reply with a written opinion and an itemised cost estimate within 48 hours. There is no
            charge and no obligation.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Channels */}
        <div className="space-y-4">
          <Card data-testid="contact-whatsapp-card" className="border-emerald-100 bg-emerald-50/50">
            <CardContent className="flex items-start gap-4 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-100 text-[#128c4a]">
                <MessageCircle className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-heading text-sm font-bold text-slate-900">
                  WhatsApp (fastest)
                </h2>
                <a
                  data-testid="contact-whatsapp-link"
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block font-heading text-xl font-extrabold text-[#128c4a]"
                >
                  {SITE.phoneDisplay}
                </a>
                <p className="mt-1 text-xs text-slate-500">
                  Send report photos directly · answered 24/7
                </p>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="contact-phone-card" className="border-teal-100">
            <CardContent className="flex items-start gap-4 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal-50 text-primary">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-heading text-sm font-bold text-slate-900">Call us</h2>
                <a
                  data-testid="contact-phone-link"
                  href={SITE.phoneHref}
                  aria-label="Contact SPS Medcare at +91 9920222362"
                  className="mt-1 block font-heading text-xl font-extrabold text-primary transition-colors hover:text-teal-700"
                >
                  {SITE.phoneDisplay}
                </a>
                <p className="mt-1 text-xs text-slate-500">
                  International patient desk · every time zone
                </p>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="contact-landline-card">
            <CardContent className="flex items-start gap-4 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal-50 text-primary">
                <PhoneCall className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-heading text-sm font-bold text-slate-900">Office landline</h2>
                <a
                  data-testid="contact-landline-link"
                  href={SITE.landlineHref}
                  aria-label={`Call SPS Medcare office at ${SITE.landlineDisplay}`}
                  className="mt-1 block font-heading text-lg font-extrabold text-slate-800 transition-colors hover:text-primary"
                >
                  {SITE.landlineDisplay}
                </a>
                <p className="mt-1 text-xs text-slate-500">Delhi office · business hours</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-start gap-4 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal-50 text-primary">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-heading text-sm font-bold text-slate-900">Email your reports</h2>
                <a
                  data-testid="contact-email-link"
                  href={`mailto:${SITE.email}`}
                  className="mt-1 block text-sm font-semibold text-slate-700"
                >
                  {SITE.email}
                </a>
                <p className="mt-1 text-xs text-slate-500">Attach scans, reports and prescriptions</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-start gap-4 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal-50 text-primary">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-heading text-sm font-bold text-slate-900">Our office</h2>
                <address
                  data-testid="contact-address-text"
                  className="mt-1 text-sm font-semibold not-italic leading-relaxed text-slate-700"
                >
                  {SITE.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="h-3.5 w-3.5" /> {SITE.hours}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/80 bg-slate-50/60">
            <CardContent className="p-5">
              <h2 className="flex items-center gap-2 font-heading text-sm font-bold text-slate-900">
                <FileHeart className="h-4 w-4 text-primary" /> What to send us
              </h2>
              <ul className="mt-3 space-y-2">
                {WHAT_TO_SEND.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-slate-500">
                We speak {LANGUAGES.join(", ")}.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Form */}
        <Card data-testid="contact-form-card">
          <CardContent className="p-6 sm:p-8">
            <h2 className="font-heading text-lg font-bold text-slate-900">
              Request a Free Opinion
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Fill this in and a coordinator will contact you within 48 hours.
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
                <Label htmlFor="contact-name">Patient / Your Name *</Label>
                <Input
                  id="contact-name"
                  data-testid="contact-form-name"
                  required
                  value={form.name}
                  onChange={(e) => set("name")(e.target.value)}
                  placeholder="Full name"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="contact-phone">Phone / WhatsApp *</Label>
                <Input
                  id="contact-phone"
                  data-testid="contact-form-phone"
                  required
                  type="tel"
                  inputMode="tel"
                  value={form.phone}
                  onChange={(e) => set("phone")(e.target.value)}
                  placeholder="With country code, e.g. +880 17…"
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
                <Label htmlFor="contact-country">Country</Label>
                <Select value={form.country} onValueChange={(value: string) => set("country")(value)}>
                  <SelectTrigger id="contact-country" data-testid="contact-form-country">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((c) => (
                      <SelectItem
                        key={c.name}
                        value={c.name}
                        data-testid={`contact-country-option-${c.name.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {c.flag} {c.name}
                      </SelectItem>
                    ))}
                    <SelectItem value="Other" data-testid="contact-country-option-other">
                      Other country
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5 sm:col-span-2">
                <Label htmlFor="contact-treatment">Treatment Needed (optional)</Label>
                <Input
                  id="contact-treatment"
                  data-testid="contact-form-treatment"
                  value={form.treatment_name}
                  onChange={(e) => set("treatment_name")(e.target.value)}
                  placeholder="e.g. Cardiac Surgery, Liver Transplant, Knee Replacement"
                />
              </div>
              <div className="grid gap-1.5 sm:col-span-2">
                <Label htmlFor="contact-message">Medical Details</Label>
                <Textarea
                  id="contact-message"
                  data-testid="contact-form-message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => set("message")(e.target.value)}
                  placeholder="Describe the diagnosis, patient age, how long the condition has existed, and any treatment already received. The more detail, the more accurate our estimate."
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
                {mutation.isPending ? "Sending…" : "Send My Request"}
              </Button>
              <p className="text-center text-xs text-slate-400 sm:col-span-2">
                Free of charge · No obligation · Your details stay confidential
              </p>
            </form>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
