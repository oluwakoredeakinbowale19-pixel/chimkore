import { describe, expect, it } from "vitest";
import { waitlistSchema } from "@/lib/waitlist.schema";

const valid = {
  full_name: "Ada Obi",
  phone: "0802 400 9551",
  email: "",
  location: "Lekki",
  treats: ["Glazed Puff-Puff"],
  quantity: "Single Box",
  requests: "",
  consent: true,
};

describe("waitlist form rules", () => {
  it("accepts a submission without an email (email is optional)", () => {
    expect(waitlistSchema.safeParse(valid).success).toBe(true);
  });

  it("requires full name", () => {
    expect(waitlistSchema.safeParse({ ...valid, full_name: "" }).success).toBe(false);
  });

  it("requires phone / WhatsApp number", () => {
    expect(waitlistSchema.safeParse({ ...valid, phone: "" }).success).toBe(false);
  });

  it("requires location in Lagos", () => {
    expect(waitlistSchema.safeParse({ ...valid, location: "" }).success).toBe(false);
  });

  it("requires the consent box to be ticked", () => {
    expect(waitlistSchema.safeParse({ ...valid, consent: false }).success).toBe(false);
  });

  it("only allows the listed quantity options", () => {
    expect(waitlistSchema.safeParse({ ...valid, quantity: "Event/Bulk Order" }).success).toBe(true);
    expect(waitlistSchema.safeParse({ ...valid, quantity: "10 Boxes" }).success).toBe(false);
  });
});
