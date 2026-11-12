import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/chimkore-logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { BRAND_NAME, NAV_LINKS } from "@/lib/brand";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-border/70 bg-background/90 backdrop-blur-md"
          : "border-b border-transparent bg-background/60 backdrop-blur-sm",
      )}
    >
      <nav className="container-site flex h-18 items-center justify-between gap-6 py-3">
        <a href="#home" className="shrink-0" aria-label={`${BRAND_NAME} home`}>
          <img src={logo.url} alt={`${BRAND_NAME} — Oops! too good`} className="h-11 w-auto md:h-12" />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-sm font-medium text-foreground/80 transition-colors hover:text-primary after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button asChild variant="brand" size="pill">
            <a href="#waitlist">Join the Waitlist</a>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-primary transition-colors hover:bg-secondary md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="container-site animate-in fade-in slide-in-from-top-2 pb-6 md:hidden">
          <ul className="flex flex-col gap-1 border-t border-border pt-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button asChild variant="brand" size="xl" className="mt-4 w-full">
            <a href="#waitlist" onClick={() => setOpen(false)}>
              Join the Waitlist
            </a>
          </Button>
        </div>
      )}
    </header>
  );
}
