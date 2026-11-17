import logo from "@/assets/chimkore-logo.png.asset.json";
import { BRAND_NAME, NAV_LINKS, SOCIALS, TAGLINE } from "@/lib/brand";
import { EmailIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from "./SocialIcons";

const ICONS = [
  { ...SOCIALS.instagram, Icon: InstagramIcon, external: true },
  { ...SOCIALS.tiktok, Icon: TikTokIcon, external: true },
  { ...SOCIALS.whatsapp, Icon: WhatsAppIcon, external: true },
  { ...SOCIALS.email, Icon: EmailIcon, external: false },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-sand">
      <div className="container-site grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img src={logo.url} alt={`${BRAND_NAME} — ${TAGLINE}`} className="h-14 w-auto" loading="lazy" />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Contemporary treats &amp; confectionery. Lagos, Nigeria.
          </p>
        </div>

        <div>
          <p className="eyebrow text-primary">Explore</p>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#waitlist" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                Join the Waitlist
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-primary">Follow Us</p>
          <div className="mt-4 flex gap-3">
            {ICONS.map(({ label, href, Icon, external }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-card text-primary shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
          <p className="mt-5 text-sm text-muted-foreground">{SOCIALS.email.handle}</p>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="container-site py-6 text-center text-xs text-muted-foreground">
          © 2026 {BRAND_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
