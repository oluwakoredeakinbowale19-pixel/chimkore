import { describe, expect, it } from "vitest";
import { productImages } from "@/lib/product-images";

describe("product photos", () => {
  it("keeps the first photo in the list as the cover", () => {
    expect(productImages({ images: ["/cover.jpg", "/second.jpg"], image_url: "/old.jpg" })).toEqual([
      "/cover.jpg",
      "/second.jpg",
    ]);
  });

  it("falls back to the single legacy photo when the list is empty", () => {
    expect(productImages({ images: [], image_url: "/old.jpg" })).toEqual(["/old.jpg"]);
  });

  it("returns no photos when neither is set", () => {
    expect(productImages({ images: null, image_url: null })).toEqual([]);
  });
});
