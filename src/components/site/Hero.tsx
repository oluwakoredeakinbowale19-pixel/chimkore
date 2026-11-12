import heroImage from "@/assets/hero-puff-puff.jpg";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="container-site grid items-center gap-12 pb-20 pt-10 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-28">
        <div className="animate-rise">
          <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-2 text-primary shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Coming Soon | Lagos, Nigeria
          </span>

          <h1 className="font-display mt-7 text-5xl leading-[1.02] text-primary sm:text-6xl lg:text-7xl">
            A Little Something for Every Craving.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Discover a delightful collection of treats and confectionery, thoughtfully prepared to make
            everyday moments a little sweeter. Starting with our signature glazed puff-puff and
            expanding into a growing world of sweet indulgences, there's something for every craving.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="brand" size="xl">
              <a href="#collection">EXPLORE OUR COLLECTION</a>
            </Button>
            <Button asChild variant="brandOutline" size="xl">
              <a href="#waitlist">JOIN THE WAITLIST</a>
            </Button>
          </div>
        </div>

        <div className="relative animate-rise [animation-delay:150ms]">
          <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-sand md:-inset-6" aria-hidden="true" />
          <div className="overflow-hidden rounded-[2rem] shadow-lift">
            <img
              src={heroImage}
              alt="An assortment of glazed puff-puff topped with Oreo crumbs, coconut flakes and chocolate chips"
              width={1536}
              height={1152}
              className="aspect-[4/3] h-full w-full object-cover transition-transform duration-[1.2s] hover:scale-[1.03]"
            />
          </div>
          <div className="animate-float absolute -bottom-6 left-4 rounded-2xl bg-card px-5 py-4 shadow-lift md:-left-8">
            <p className="font-display text-xl text-primary">Oops! too good</p>
            <p className="text-xs text-muted-foreground">Signature glazed puff-puff</p>
          </div>
        </div>
      </div>
    </section>
  );
}
