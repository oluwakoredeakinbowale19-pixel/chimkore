import { z } from "zod";

export const TREAT_OPTIONS = [
  { value: "Glazed Puff-Puff", label: "Glazed Puff-Puff", note: "Launching First" },
  { value: "Donuts", label: "Donuts", note: "Coming Soon" },
  { value: "Shortbread Biscuits", label: "Shortbread Biscuits", note: "Coming Soon" },
  { value: "Cookies", label: "Cookies", note: "Coming Soon" },
] as const;

export const QUANTITY_OPTIONS = ["Single Box", "2–3 Boxes", "Event/Bulk Order"] as const;

const treatValues = TREAT_OPTIONS.map((t) => t.value) as [string, ...string[]];

export const waitlistSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(2, { message: "Please enter your full name" })
    .max(100, { message: "Name must be under 100 characters" }),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s\-()]{7,20}$/, { message: "Please enter a valid phone / WhatsApp number" }),
  email: z
    .string()
    .trim()
    .max(255, { message: "Email must be under 255 characters" })
    .email({ message: "Please enter a valid email address" })
    .optional()
    .or(z.literal("")),
  location: z
    .string()
    .trim()
    .min(2, { message: "Please tell us where in Lagos you are" })
    .max(120, { message: "Location must be under 120 characters" }),
  treats: z.array(z.enum(treatValues)).max(4).default([]),
  quantity: z.enum(QUANTITY_OPTIONS, {
    errorMap: () => ({ message: "Please choose a preferred quantity" }),
  }),
  requests: z
    .string()
    .trim()
    .max(500, { message: "Please keep requests under 500 characters" })
    .optional()
    .or(z.literal("")),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please agree to receive launch updates to join" }),
  }),
});

export type WaitlistInput = z.input<typeof waitlistSchema>;
export type WaitlistOutput = z.output<typeof waitlistSchema>;
