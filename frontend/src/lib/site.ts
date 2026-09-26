export const SITE = {
  name: "SPS Medcare",
  domain: "https://www.sps-medcare.com",
  phoneDisplay: "+91 99202 22362",
  phoneRaw: "9920222362",
  phoneHref: "tel:+919920222362",
  whatsapp: "https://wa.me/919920222362?text=Hello%20SPS%20Medcare%2C%20I%20would%20like%20to%20inquire%20about%20hospital%20equipment",
  whatsappText: (message?: string) =>
    `https://wa.me/919920222362${message ? `?text=${encodeURIComponent(message)}` : ""}`,
  email: "info@sps-medcare.com",
  address: "B-42, Okhla Industrial Area, Phase-II, New Delhi, Delhi NCR - 110020, India",
  hours: "Mon–Sun, 9 AM – 9 PM",
  cert: "ISO 13485:2016 & CE Certified",
} as const;

export const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

// Section/lifestyle imagery (Unsplash). Product photos are AI-generated and stored per-product.
export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1710074213379-2a9c2653046a?crop=entropy&cs=srgb&fm=jpg&q=85",
  icuWard: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?crop=entropy&cs=srgb&fm=jpg&q=85",
  otRoom: "https://images.unsplash.com/photo-1762237798212-bcc000c00891?crop=entropy&cs=srgb&fm=jpg&q=85",
  monitors: "https://images.unsplash.com/photo-1766299892549-b56b257d1ddd?crop=entropy&cs=srgb&fm=jpg&q=85",
  otLights: "https://images.unsplash.com/photo-1770836037350-00139eb5df96?crop=entropy&cs=srgb&fm=jpg&q=85",
  warehouse: "https://images.unsplash.com/photo-1684695749267-233af13276d0?crop=entropy&cs=srgb&fm=jpg&q=85",
} as const;
