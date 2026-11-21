import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { passcodeMatches, recommendExperiments } from "./outreach-ai.server";

const input = z.object({
  passcode: z.string().min(1).max(200),
  goal: z.string().trim().min(3).max(500),
  results: z.string().trim().max(4000).default(""),
});

export const getOutreachIdeas = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => input.parse(d))
  .handler(async ({ data }) => {
    const expected = process.env["PLANNER_PASSCODE"];
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!expected || !apiKey) return { ok: false as const, error: "The planner isn't set up yet." };
    if (!(await passcodeMatches(data.passcode, expected))) {
      return { ok: false as const, error: "Wrong passcode." };
    }
    try {
      const text = await recommendExperiments(data.goal, data.results, apiKey);
      if (!text.trim()) return { ok: false as const, error: "No ideas came back. Please try again later." };
      return { ok: true as const, text };
    } catch (e) {
      const err = e as { statusCode?: number; responseBody?: string; message?: string };
      console.error("Outreach AI failed", err.statusCode, err.responseBody ?? err.message);
      if (err.statusCode === 402) return { ok: false as const, error: "AI credits have run out. Add credits to keep using the planner." };
      if (err.statusCode === 429) return { ok: false as const, error: "Too many requests right now. Try again in a minute." };
      return { ok: false as const, error: "Couldn't get ideas right now. Please try again later." };
    }
  });
