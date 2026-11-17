import { BellRing, Bike, TicketCheck } from "lucide-react";

const STEPS = [
  {
    icon: TicketCheck,
    title: "Join the Waitlist",
    copy: "Reserve your spot before Friday's batch opens.",
  },
  {
    icon: BellRing,
    title: "Get Priority Access",
    copy: "Receive your direct order link first when your batch opens.",
  },
  {
    icon: Bike,
    title: "Baked Fresh in Lagos",
    copy: "Hand-glazed to order and delivered straight to your door.",
  },
];

export function HowItWorks() {
  return (
    <div className="mt-16 border-t border-border pt-12 md:mt-20 md:pt-16">
      <p className="eyebrow text-center text-gold-deep">How It Works</p>

      <ol className="mt-10 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-border">
        {STEPS.map(({ icon: Icon, title, copy }, i) => (
          <li key={title} className="md:px-8 md:first:pl-0 md:last:pr-0">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/45 text-gold">
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <span className="eyebrow text-gold-deep">Step 0{i + 1}</span>
            </div>
            <h3 className="font-display mt-5 text-xl leading-tight text-primary md:text-2xl">
              {title}
            </h3>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-charcoal md:text-base">
              {copy}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
