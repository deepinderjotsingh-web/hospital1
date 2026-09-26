export const SITE = {
  name: "SPS Medcare",
  domain: "https://www.sps-medcare.com",
  tagline: "World-Class Medical Treatment in India for International Patients",
  phoneDisplay: "+91 99202 22362",
  phoneRaw: "9920222362",
  phoneHref: "tel:+919920222362",
  whatsapp:
    "https://wa.me/919920222362?text=Hello%20SPS%20Medcare%2C%20I%20would%20like%20a%20free%20medical%20opinion%20and%20cost%20estimate.",
  whatsappText: (message?: string) =>
    `https://wa.me/919920222362${message ? `?text=${encodeURIComponent(message)}` : ""}`,
  email: "info@sps-medcare.com",
  address: "B-42, Okhla Industrial Area, Phase-II, New Delhi, Delhi NCR - 110020, India",
  hours: "24/7 international patient desk",
  cert: "JCI & NABH Accredited Partner Hospitals",
} as const;

export interface Country {
  name: string;
  flag: string;
}

export const COUNTRIES: Country[] = [
  { name: "Bangladesh", flag: "🇧🇩" },
  { name: "Nepal", flag: "🇳🇵" },
  { name: "Sri Lanka", flag: "🇱🇰" },
  { name: "United Arab Emirates", flag: "🇦🇪" },
  { name: "Nigeria", flag: "🇳🇬" },
  { name: "Afghanistan", flag: "🇦🇫" },
  { name: "Iraq", flag: "🇮🇶" },
  { name: "Maldives", flag: "🇲🇻" },
  { name: "Oman", flag: "🇴🇲" },
  { name: "Kenya", flag: "🇰🇪" },
  { name: "Yemen", flag: "🇾🇪" },
  { name: "Tanzania", flag: "🇹🇿" },
];

export const LANGUAGES = [
  "English",
  "Arabic",
  "Bengali",
  "Dari / Pashto",
  "French",
  "Russian",
  "Swahili",
];

// Section / lifestyle imagery (Unsplash). Treatment photos are AI-generated per treatment.
export const IMAGES = {
  heroConsultation:
    "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?crop=entropy&cs=srgb&fm=jpg&q=85",
  doctorPatient:
    "https://images.unsplash.com/photo-1758691462878-6edc3d3da1be?crop=entropy&cs=srgb&fm=jpg&q=85",
  patientCare:
    "https://images.unsplash.com/photo-1581056771107-24ca5f033842?crop=entropy&cs=srgb&fm=jpg&q=85",
  operatingRoom:
    "https://images.unsplash.com/photo-1579684288452-b334934f845f?crop=entropy&cs=srgb&fm=jpg&q=85",
  airport:
    "https://images.unsplash.com/photo-1687992176093-6417a93fa3d0?crop=entropy&cs=srgb&fm=jpg&q=85",
  tajMahal:
    "https://images.unsplash.com/photo-1564507592333-c60657eea523?crop=entropy&cs=srgb&fm=jpg&q=85",
} as const;
