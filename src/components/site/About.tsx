import aboutImage from "@/assets/about-lifestyle.jpg";

export function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-last lg:order-first">
          <div className="overflow-hidden rounded-[2rem] shadow-lift">
            <img
              src={aboutImage}
              alt="A hand lifting a glazed puff-puff from a gift box of treats"
              loading="lazy"
              width={1152}
              height={1408}
              className="aspect-[4/5] w-full object-cover transition-transform duration-[1.2s] hover:scale-[1.03]"
            />
          </div>
          <div className="absolute -right-3 -top-3 -z-10 h-full w-full rounded-[2rem] border-2 border-primary/20 md:-right-5 md:-top-5" aria-hidden="true" />
        </div>

        <div>
          <p className="eyebrow text-muted-foreground">Our Story</p>
          <h2 className="font-display mt-3 text-4xl leading-tight text-primary md:text-5xl">
            Good Treats. Beautiful Moments.
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              CHiMKORÈ is a contemporary treats and confectionery brand built around the simple joy of
              enjoying good food. We believe that little indulgences can make ordinary moments special.
            </p>
            <p>
              Our growing collection brings together delightful treats, with an emphasis on flavour,
              quality and thoughtful presentation. As we grow, we look forward to introducing more
              exciting creations and becoming part of your everyday celebrations, special occasions and
              sweetest memories.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-8">
            {["Flavour", "Quality", "Presentation"].map((v) => (
              <div key={v}>
                <p className="font-display text-lg text-primary md:text-xl">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
