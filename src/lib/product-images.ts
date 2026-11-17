// Returns a product's photos in display order (first = cover).
// Falls back to the legacy single image_url when the images list is empty.
export function productImages(p: { images?: string[] | null; image_url?: string | null }): string[] {
  const list = (p.images ?? []).map((u) => u.trim()).filter(Boolean);
  if (list.length > 0) return list;
  return p.image_url ? [p.image_url] : [];
}
