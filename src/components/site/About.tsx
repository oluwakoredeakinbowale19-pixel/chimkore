import { HowItWorks } from "./HowItWorks";

export function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container-site">
        <div className="mx-auto max-w-3xl text-center">
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
          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8">
            {["Flavour", "Quality", "Presentation"].map((v) => (
              <div key={v}>
                <p className="font-display text-lg text-primary md:text-xl">{v}</p>
              </div>
            ))}
          </div>
        </div>

        <HowItWorks />
      </div>
    </section>
  );
}
