import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getOutreachIdeas } from "@/lib/outreach.functions";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "Outreach Planner — CHiMKORÈ" },
      { name: "description", content: "Private outreach experiment planner for CHiMKORÈ." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Outreach Planner — CHiMKORÈ" },
      { property: "og:description", content: "Private outreach experiment planner for CHiMKORÈ." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Planner,
});

function Planner() {
  const ask = useServerFn(getOutreachIdeas);
  const [passcode, setPasscode] = useState("");
  const [goal, setGoal] = useState("Get more Lagos waitlist sign-ups");
  const [results, setResults] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ideas, setIdeas] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await ask({ data: { passcode, goal, results } });
      if (res.ok) setIdeas(res.text);
      else setError(res.error);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const field = "w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground focus:border-primary focus:outline-none";

  return (
    <main className="min-h-screen bg-background py-14">
      <div className="container-site max-w-3xl">
        <p className="eyebrow text-primary">Private</p>
        <h1 className="font-display mt-2 text-4xl text-primary md:text-5xl">Outreach Planner</h1>
        <p className="mt-3 text-muted-foreground">
          Share your goal and how your campaigns went. You'll get a few small experiments to try next.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="passcode" className="mb-2 block text-sm font-semibold">Passcode</label>
            <input id="passcode" type="password" autoComplete="current-password" required className={field} value={passcode} onChange={(e) => setPasscode(e.target.value)} />
          </div>
          <div>
            <label htmlFor="goal" className="mb-2 block text-sm font-semibold">Goal</label>
            <input id="goal" required maxLength={500} className={field} value={goal} onChange={(e) => setGoal(e.target.value)} />
          </div>
          <div>
            <label htmlFor="results" className="mb-2 block text-sm font-semibold">Campaign results</label>
            <textarea
              id="results"
              rows={7}
              maxLength={4000}
              className={`${field} resize-y`}
              placeholder="e.g. Shared on WhatsApp status Mon–Wed: ~30 views, 2 replies. Instagram reel: 400 views, 4 site visits. Waitlist sign-ups this week: 0."
              value={results}
              onChange={(e) => setResults(e.target.value)}
            />
          </div>
          {error && <p className="rounded-xl border border-border bg-secondary px-4 py-3 text-sm" role="alert">{error}</p>}
          <Button type="submit" variant="brand" size="xl" disabled={busy}>
            {busy ? (<><Loader2 className="h-5 w-5 animate-spin" /> Thinking...</>) : "GET OUTREACH IDEAS"}
          </Button>
        </form>

        {ideas && (
          <section className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-display text-2xl text-primary">Experiments to try</h2>
            <div className="mt-4 whitespace-pre-wrap leading-relaxed text-foreground">{ideas}</div>
          </section>
        )}
      </div>
    </main>
  );
}
