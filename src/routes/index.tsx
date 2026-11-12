import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Collection } from "@/components/site/Collection";
import { About } from "@/components/site/About";
import { Waitlist } from "@/components/site/Waitlist";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { productsQueryOptions } from "@/lib/products.functions";

const TITLE = "CHiMKORÈ — Oops! too good | Treats & Confectionery in Lagos";
const DESCRIPTION =
  "CHiMKORÈ is a contemporary treats and confectionery brand in Lagos, Nigeria. Debuting with signature glazed puff-puff — join the pre-order waitlist.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQueryOptions),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Collection />
        <About />
        <Waitlist />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
