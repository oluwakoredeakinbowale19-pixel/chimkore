import { useState, type ReactNode } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { joinWaitlist } from "@/lib/waitlist.functions";
import {
  QUANTITY_OPTIONS,
  TREAT_OPTIONS,
  waitlistSchema,
  type WaitlistInput,
  type WaitlistOutput,
} from "@/lib/waitlist.schema";
import { WHATSAPP_URL } from "@/lib/brand";
import { WhatsAppIcon } from "./SocialIcons";
import { cn } from "@/lib/utils";

function FieldError({ message }: { message?: string | undefined }) {
  if (!message) return null;
  return <p className="mt-1.5 text-sm text-error-on-brand">{message}</p>;
}

function Label({ htmlFor, children, optional }: { htmlFor?: string | undefined; children: ReactNode; optional?: boolean | undefined }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-on-brand">
      {children}
      {optional ? <span className="ml-1 font-normal text-on-brand-muted">(optional)</span> : <span className="ml-0.5 text-on-brand-muted">*</span>}
    </label>
  );
}

export function Waitlist() {
  const submit = useServerFn(joinWaitlist);
  const [done, setDone] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<WaitlistInput, unknown, WaitlistOutput>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      full_name: "",
      phone: "",
      email: "",
      location: "",
      treats: ["Glazed Puff-Puff"],
      requests: "",
      consent: false as unknown as true,
    },
  });

  const onSubmit = async (values: WaitlistOutput) => {
    setServerError(null);
    try {
      const res = await submit({ data: values });
      if (res.ok) {
        setDone(values.full_name.trim().split(" ")[0] ?? "");
        document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
      } else {
        setServerError(res.error);
      }
    } catch (e) {
      console.error(e);
      setServerError("Something went wrong. Please check your details and try again.");
    }
  };

  return (
    <section id="waitlist" className="relative overflow-hidden bg-primary py-20 text-on-brand md:py-28">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary-deep" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-primary-deep" aria-hidden="true" />

      <div className="container-site relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow text-on-brand-muted">Pre-Order Waitlist</p>
          <h2 className="font-display mt-3 text-4xl leading-tight md:text-6xl">Something Good Is Coming.</h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-on-brand-muted md:text-lg">
            Be among the first to experience CHiMKORÈ. Join our pre-order waitlist for exclusive launch
            updates, first-batch access, and ordering announcements.
          </p>
          <ul className="mt-8 space-y-3 text-on-brand-muted">
            {["Exclusive launch updates", "First-batch access", "Ordering announcements"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-field-on-brand">
                  <Check className="h-3.5 w-3.5 text-on-brand" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[2rem] border border-field-border-on-brand bg-primary-deep/60 p-6 backdrop-blur-sm md:p-10">
          {done !== null ? (
            <div className="animate-rise py-8 text-center" role="status">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-on-brand text-primary">
                <Check className="h-8 w-8" />
              </div>
              <h3 className="font-display mt-6 text-3xl md:text-4xl">
                Thank you{done ? `, ${done}` : ""}!
              </h3>
              <p className="mx-auto mt-4 max-w-md leading-relaxed text-on-brand-muted">
                You're officially on the CHiMKORÈ pre-order waitlist. We can't wait to share our first
                batch with you — keep an eye out for launch updates and ordering announcements.
              </p>
              <Button asChild variant="onBrand" size="xl" className="mt-8 h-auto min-h-14 whitespace-normal py-3">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="h-5 w-5 shrink-0" />
                  Chat with CHiMKORÈ on WhatsApp to Lock In Your Box
                </a>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="full_name">Full Name</Label>
                  <input id="full_name" autoComplete="name" className="field-brand" placeholder="Your full name" {...register("full_name")} />
                  <FieldError message={errors.full_name?.message} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number / WhatsApp</Label>
                  <input id="phone" type="tel" autoComplete="tel" className="field-brand" placeholder="e.g. 0802 000 0000" {...register("phone")} />
                  <FieldError message={errors.phone?.message} />
                </div>
                <div>
                  <Label htmlFor="email" optional>Email Address</Label>
                  <input id="email" type="email" autoComplete="email" className="field-brand" placeholder="you@example.com" {...register("email")} />
                  <FieldError message={errors.email?.message} />
                </div>
                <div>
                  <Label htmlFor="location">Location in Lagos</Label>
                  <input id="location" className="field-brand" placeholder="e.g. Lekki, Yaba, Ikeja" {...register("location")} />
                  <FieldError message={errors.location?.message} />
                </div>
              </div>

              <fieldset>
                <legend className="mb-3 block text-sm font-semibold text-on-brand">Treats You're Excited For</legend>
                <Controller
                  control={control}
                  name="treats"
                  render={({ field }) => {
                    const value = field.value ?? [];
                    return (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {TREAT_OPTIONS.map((opt) => {
                          const checked = value.includes(opt.value);
                          return (
                            <label
                              key={opt.value}
                              className={cn(
                                "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all",
                                checked
                                  ? "border-on-brand bg-field-on-brand"
                                  : "border-field-border-on-brand hover:border-on-brand-muted",
                              )}
                            >
                              <input
                                type="checkbox"
                                className="sr-only"
                                checked={checked}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.checked ? [...value, opt.value] : value.filter((v) => v !== opt.value),
                                  )
                                }
                              />
                              <span
                                className={cn(
                                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                                  checked ? "border-on-brand bg-on-brand text-primary" : "border-field-border-on-brand",
                                )}
                                aria-hidden="true"
                              >
                                {checked && <Check className="h-3.5 w-3.5" />}
                              </span>
                              <span className="text-sm">
                                <span className="font-medium text-on-brand">{opt.label}</span>{" "}
                                <span className="text-on-brand-muted">({opt.note})</span>
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    );
                  }}
                />
              </fieldset>

              <div>
                <Label htmlFor="quantity">Preferred Quantity</Label>
                <select id="quantity" className="field-brand appearance-none bg-no-repeat" defaultValue="" {...register("quantity")}>
                  <option value="" disabled className="text-foreground">
                    Select a quantity
                  </option>
                  {QUANTITY_OPTIONS.map((q) => (
                    <option key={q} value={q} className="text-foreground">
                      {q}
                    </option>
                  ))}
                </select>
                <FieldError message={errors.quantity?.message} />
              </div>

              <div>
                <Label htmlFor="requests" optional>Any flavour or treat requests?</Label>
                <textarea
                  id="requests"
                  rows={3}
                  className="field-brand resize-none"
                  placeholder="e.g. Coconut flakes, Oreo milk glaze, chocolate chip, dessert boxes..."
                  {...register("requests")}
                />
                <FieldError message={errors.requests?.message} />
              </div>

              <div>
                <label className="flex cursor-pointer items-start gap-3">
                  <input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-on-brand" {...register("consent")} />
                  <span className="text-sm leading-relaxed text-on-brand-muted">
                    I agree to receive launch updates and ordering announcements from CHiMKORÈ.
                    <span className="text-on-brand"> *</span>
                  </span>
                </label>
                <FieldError message={errors.consent?.message} />
              </div>

              {serverError && (
                <p className="rounded-xl border border-field-border-on-brand bg-field-on-brand px-4 py-3 text-sm text-on-brand" role="alert">
                  {serverError}
                </p>
              )}

              <Button type="submit" variant="onBrand" size="xl" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Saving your spot...
                  </>
                ) : (
                  "JOIN THE PRE-ORDER WAITLIST"
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
