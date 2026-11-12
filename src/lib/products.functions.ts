import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";
import { createPublicSupabase } from "./public-supabase.server";

export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  image_url: string | null;
  display_order: number;
};

export const getActiveProducts = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ products: Product[]; error: string | null }> => {
    try {
      const supabase = createPublicSupabase();
      const { data, error } = await supabase
        .from("products")
        .select("id, name, description, category, image_url, display_order")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (error) {
        console.error("Failed to load products", error);
        return { products: [], error: "Our collection is taking a moment to load." };
      }
      return { products: data ?? [], error: null };
    } catch (e) {
      console.error("Failed to load products", e);
      return { products: [], error: "Our collection is taking a moment to load." };
    }
  },
);

export const productsQueryOptions = queryOptions({
  queryKey: ["products", "active"],
  queryFn: () => getActiveProducts(),
  staleTime: 60_000,
});
