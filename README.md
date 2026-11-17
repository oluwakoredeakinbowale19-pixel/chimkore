# Chimkore

PROJECT: CHiMKORÈ BRAND WEBSITE



Build a sophisticated, modern, and fully responsive website for CHiMKORÈ, a contemporary treats and confectionery brand based in Lagos, Nigeria.



BRAND POSITIONING & ARCHITECTURE

- CHiMKORÈ is a contemporary treats and confectionery brand (not just a single-item bakery).

- Always spell and style the brand name exactly as "CHiMKORÈ" (uppercase CH, lowercase i, uppercase MKORÈ).

- Brand Tagline: "Oops! too good" (exact capitalization: capital O, lowercase t).

- Launch Strategy: Debut with our signature Glazed Puff-Puff collection first, while keeping baked goods (Donuts, Shortbread Biscuits, Cookies) queued in the database as inactive (`is_active = false`) so I can toggle them live in Supabase later without editing code.

- Store the product catalog in a Supabase table (`products` with columns: `id`, `name`, `description`, `category`, `image_url`, `is_active`, `display_order`). Only display active products (`is_active = true`) on the site, and do not display prices.



BRAND IDENTITY, COLOURS & FONTS

- Brand Name: CHiMKORÈ | Location: Lagos, Nigeria.

- Brand Colours: Primary Deep Brown (#792F00), Secondary Grey (#737373), White (#FFFFFF), and subtle warm neutral backgrounds. Do not introduce unrelated colours.

- Typography: Use Google Font "Lilita One" for major headings, short promotional callouts, and key buttons. Use "DM Sans" for body text, descriptions, and forms.

- Official Logo: Use the official CHiMKORÈ logo file I have attached to this prompt as an image (`<img>`) in the Navigation bar and Footer. Do not recreate, redesign, or replace it with text—keep its exact original proportions.



WEBSITE SECTIONS



1. NAVIGATION BAR

- Clean, sticky, mobile-responsive navigation bar.

- Official CHiMKORÈ logo on the left.

- Links: Home, Our Collection, About Us, Contact.

- Prominent button: "Join the Waitlist" (smooth-scrolls to the waitlist form).



2. HERO SECTION

- Small badge/announcement: "COMING SOON | LAGOS, NIGERIA"

- Headline (Lilita One): "A Little Something for Every Craving."

- Subtext (DM Sans): "Discover a delightful collection of treats and confectionery, thoughtfully prepared to make everyday moments a little sweeter. Starting with our signature glazed puff-puff and expanding into a growing world of sweet indulgences, there's something for every craving."

- Two buttons: "EXPLORE OUR COLLECTION" and "JOIN THE WAITLIST".

- Visual: High-end, appetizing editorial food photography showcasing an assortment of beautifully glazed puff-puff (easy to swap with my own photo via Lovable's visual editor).



3. OUR COLLECTION (DYNAMIC FROM SUPABASE)

- Heading: "Discover Our Collection."

- Subtext: "A little indulgence, a lot of flavour. Explore our debut treats—with more sweet creations joining the lineup soon."

- Seed the Supabase `products` table with these items (only `is_active = true` items render on the page):

  - ACTIVE AT LAUNCH (`is_active = true`):

    1. SIGNATURE GLAZED PUFF-PUFF — "Soft, fluffy golden bites finished with a rich, glossy glaze."

    2. OREO MILK LOADED PUFF-PUFF — "Warm, pillowy puff-puff drizzled with creamy milk glaze and crushed Oreo."

    3. COCONUT MILK & FLAKES PUFF-PUFF — "Soft, golden puff-puff finished with creamy milk glaze and toasted coconut flakes."

    4. CHOCOLATE CHIP PUFF-PUFF — "Golden, soft puff-puff studded and finished with rich melted chocolate chips."

  - QUEUED FOR LATER (`is_active = false`, hidden until activated in Supabase):

    5. DONUTS — "Delightful, sweet creations made for your everyday cravings."

    6. SHORTBREAD BISCUITS — "Buttery, delicate and wonderfully satisfying."

    7. COOKIES — "Deliciously baked treats for moments worth enjoying."

- Clean, modern product cards showing photo, product name, and short description (no prices). Include a subtle note below the grid: "More treats—including donuts, shortbread biscuits, and cookies—joining the collection soon."



4. ABOUT CHiMKORÈ

- Heading: "Good Treats. Beautiful Moments."

- Copy: "CHiMKORÈ is a contemporary treats and confectionery brand built around the simple joy of enjoying good food. We believe that little indulgences can make ordinary moments special. Our growing collection brings together delightful treats, with an emphasis on flavour, quality and thoughtful presentation. As we grow, we look forward to introducing more exciting creations and becoming part of your everyday celebrations, special occasions and sweetest memories."

- Pair with an inviting lifestyle/confectionery photograph.



5. THE PRE-ORDER WAITLIST (SUPABASE CONNECTED)

- Distinct section with Deep Brown (#792F00) background and crisp white/warm neutral typography.

- Heading: "Something Good Is Coming."

- Subtext: "Be among the first to experience CHiMKORÈ. Join our pre-order waitlist for exclusive launch updates, first-batch access, and ordering announcements."

- Functional form saved directly to a Supabase `waitlist` table (do not simulate submissions; validate inputs and save to Supabase):

  - Full Name (required)

  - Phone Number / WhatsApp (required)

  - Email Address (optional)

  - Location in Lagos (required)

  - Treats You're Excited For (multi-select checkboxes: Glazed Puff-Puff (Launching First), Donuts (Coming Soon), Shortbread Biscuits (Coming Soon), Cookies (Coming Soon))

  - Preferred Quantity (dropdown or input, e.g., Single Box, 2–3 Boxes, Event/Bulk Order)

  - Any flavour or treat requests? (optional text input/textarea, placeholder: "e.g. Coconut flakes, Oreo milk glaze, chocolate chip, dessert boxes...")

  - Consent checkbox: "I agree to receive launch updates and ordering announcements from CHiMKORÈ." (required)

- Submit Button: "JOIN THE PRE-ORDER WAITLIST"

- Confirmation Screen: After saving to Supabase, display a warm thank-you confirmation message along with a prominent clickable button: "Chat with CHiMKORÈ on WhatsApp to Lock In Your Box" linking directly to https://wa.me/2348024009551.



6. CONTACT & SOCIAL MEDIA

- Heading: "Let's Stay Connected."

- Subtext: "Follow our journey and be part of everything delicious coming your way."

- Include clickable cards/buttons for all official channels (clicking should open the app/link directly):

  - Instagram: @chim_kore (https://instagram.com/chim_kore)

  - TikTok: @chim_kore (https://tiktok.com/@chim_kore)

  - WhatsApp: 0802 400 9551 (https://wa.me/2348024009551)

  - Business Email: chimkore@gmail.com (mailto:chimkore@gmail.com)



7. FOOTER

- Official CHiMKORÈ logo, tagline ("Oops! too good"), quick navigation links, clickable social icons (Instagram, TikTok, WhatsApp, Email), and copyright notice (© 2026 CHiMKORÈ. All rights reserved.).



DESIGN & QUALITY STANDARDS

- Premium, warm, modern aesthetic with generous spacing, subtle hover animations, and smooth scrolling.

- Avoid childish illustrations, generic restaurant templates, or clutter.

- Make all images easy to swap via Lovable's visual editor or Supabase image URLs.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://chimkore.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4af31ef1-be5b-48b3-a43d-d82dd0cbaaef).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
