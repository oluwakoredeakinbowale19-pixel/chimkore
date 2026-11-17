ALTER TABLE public.products ADD COLUMN images text[] NOT NULL DEFAULT '{}';
UPDATE public.products SET images = ARRAY[image_url] WHERE image_url IS NOT NULL AND cardinality(images) = 0;
COMMENT ON COLUMN public.products.image_url IS 'DEPRECATED: replaced by images (first entry is the cover photo)';