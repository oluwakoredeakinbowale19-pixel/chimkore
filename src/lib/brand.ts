export const BRAND_NAME = "CHiMKORÈ";
export const TAGLINE = "Oops! too good";
export const WHATSAPP_URL = "https://wa.me/2348024009551";

export const SOCIALS = {
  instagram: { label: "Instagram", handle: "@chim_kore", href: "https://instagram.com/chim_kore" },
  tiktok: { label: "TikTok", handle: "@chim_kore", href: "https://tiktok.com/@chim_kore" },
  whatsapp: { label: "WhatsApp", handle: "0802 400 9551", href: WHATSAPP_URL },
  email: { label: "Business Email", handle: "chimkore@gmail.com", href: "mailto:chimkore@gmail.com" },
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Our Collection", href: "#collection" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;
