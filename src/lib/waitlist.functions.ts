import { createServerFn } from "@tanstack/react-start";
import { waitlistSchema } from "./waitlist.schema";
import { createPublicSupabase } from "./public-supabase.server";

export const joinWaitlist = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => waitlistSchema.parse(data))
  .handler(async ({ data }) => {
    const supabase = createPublicSupabase();
    const { error } = await supabase.from("waitlist").insert({
      full_name: data.full_name,
      phone: data.phone,
      email: data.email ? data.email : null,
      location: data.location,
      treats: data.treats ?? [],
      quantity: data.quantity,
      requests: data.requests ? data.requests : null,
      consent: data.consent,
    });
    if (error) {
      console.error("Waitlist insert failed", error);
      return { ok: false as const, error: "We couldn't save your details. Please try again." };
    }
    return { ok: true as const, error: null };
  });
