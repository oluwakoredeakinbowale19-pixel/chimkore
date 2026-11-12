import { ArrowUpRight } from "lucide-react";
import { SOCIALS } from "@/lib/brand";
import { EmailIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from "./SocialIcons";

const CHANNELS = [
  { ...SOCIALS.instagram, Icon: InstagramIcon, external: true },
  { ...SOCIALS.tiktok, Icon: TikTokIcon, external: true },
  { ...SOCIALS.whatsapp, Icon: WhatsAppIcon, external: true },
  { ...SOCIALS.email, Icon: EmailIcon, external: false },
];

export function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-muted-foreground">Contact</p>
          <h2 className="font-display mt-3 text-4xl text-primary md:text-5xl">Let's Stay Connected.</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            Follow our journey and be part of everything delicious coming your way.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CHANNELS.map(({ label, handle, href, Icon, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group relative flex flex-col rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-6 w-6" />
              </span>
              <ArrowUpRight className="absolute right-6 top-7 h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              <p className="mt-6 text-sm font-medium text-muted-foreground">{label}</p>
              <p className="font-display mt-1 break-all text-xl text-primary">{handle}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
