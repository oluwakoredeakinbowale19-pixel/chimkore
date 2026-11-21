import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

const GATEWAY = "https://ai.gateway.lovable.dev/v1";
const RUN_HEADER = "X-Lovable-AIG-Run-ID";

async function digest(s: string) {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)));
}

// Constant-time passcode check on equal-length digests.
export async function passcodeMatches(input: string, expected: string) {
  const [a, b] = await Promise.all([digest(input), digest(expected)]);
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i]! ^ b[i]!;
  return diff === 0;
}

const SYSTEM = `You are a pragmatic growth advisor for CHiMKORÈ, a new treats and confectionery brand in Lagos, Nigeria (tagline "Oops! too good"). It is pre-launch, starting with glazed puff-puff (Signature Glazed, Oreo Milk Loaded, Chocolate Loaded); donuts, shortbread and cookies come later. The site collects a pre-order waitlist and points people to WhatsApp. Never mention prices.
Recommend 3 to 5 small, cheap outreach experiments tailored to Lagos (WhatsApp status/broadcasts, Instagram, TikTok, local creators, offices, estates, campuses, events, tasting boxes, referrals). Base them on the results given; do not invent numbers.
For each experiment write: a short title, why (tied to the results), exact steps for this week, a tagged link suggestion using https://chimkore.lovable.app/?utm_source=<source>&utm_medium=<medium>&utm_campaign=<name>, what to measure, and a success threshold. End with one line on which experiment to start first. Use plain text with simple headings and dashes, no tables.`;

export async function recommendExperiments(goal: string, results: string, apiKey: string) {
  let runId: string | undefined;
  const openai = createOpenAI({
    baseURL: GATEWAY,
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: async (input, init) => {
      const headers = new Headers(init?.headers);
      if (runId) headers.set(RUN_HEADER, runId);
      const res = await fetch(input, { ...init, headers });
      runId ??= res.headers.get(RUN_HEADER) ?? undefined;
      return res;
    },
  });
  const result = streamText({
    model: openai.responses("openai/gpt-6-astra"),
    maxRetries: 0,
    system: SYSTEM,
    prompt: `Goal: ${goal}\n\nCampaign results so far:\n${results || "(none provided yet)"}`,
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: "medium",
        reasoningSummary: "auto",
        store: false,
        include: ["reasoning.encrypted_content"],
      },
    },
  });
  return await result.text;
}
