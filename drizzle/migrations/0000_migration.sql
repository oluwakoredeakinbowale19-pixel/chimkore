CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'puff-puff',
  image_url text,
  is_active boolean NOT NULL DEFAULT false,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.products TO anon, authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active products" ON public.products
  FOR SELECT TO anon, authenticated USING (is_active = true);

INSERT INTO public.products (name, description, category, image_url, is_active, display_order) VALUES
  ('Signature Glazed Puff-Puff', 'Soft, fluffy golden bites finished with a rich, glossy glaze.', 'puff-puff', '/images/products/signature-glazed.jpg', true, 1),
  ('Oreo Milk Loaded Puff-Puff', 'Warm, pillowy puff-puff drizzled with creamy milk glaze and crushed Oreo.', 'puff-puff', '/images/products/oreo-milk.jpg', true, 2),
  ('Coconut Milk & Flakes Puff-Puff', 'Soft, golden puff-puff finished with creamy milk glaze and toasted coconut flakes.', 'puff-puff', '/images/products/coconut-flakes.jpg', true, 3),
  ('Chocolate Chip Puff-Puff', 'Golden, soft puff-puff studded and finished with rich melted chocolate chips.', 'puff-puff', '/images/products/chocolate-chip.jpg', true, 4),
  ('Donuts', 'Delightful, sweet creations made for your everyday cravings.', 'baked-goods', '/images/products/donuts.jpg', false, 5),
  ('Shortbread Biscuits', 'Buttery, delicate and wonderfully satisfying.', 'baked-goods', '/images/products/shortbread.jpg', false, 6),
  ('Cookies', 'Deliciously baked treats for moments worth enjoying.', 'baked-goods', '/images/products/cookies.jpg', false, 7);

CREATE TABLE public.waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL CHECK (char_length(trim(full_name)) BETWEEN 2 AND 100),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 7 AND 20),
  email text CHECK (email IS NULL OR (char_length(email) <= 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')),
  location text NOT NULL CHECK (char_length(trim(location)) BETWEEN 2 AND 120),
  treats text[] NOT NULL DEFAULT '{}' CHECK (cardinality(treats) <= 4),
  quantity text NOT NULL CHECK (quantity IN ('Single Box', '2–3 Boxes', 'Event/Bulk Order')),
  requests text CHECK (requests IS NULL OR char_length(requests) <= 500),
  consent boolean NOT NULL CHECK (consent = true),
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.waitlist TO anon, authenticated;
GRANT ALL ON public.waitlist TO service_role;
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can join the waitlist" ON public.waitlist
  FOR INSERT TO anon, authenticated WITH CHECK (consent = true);