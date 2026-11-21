<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules

- Product catalog is read from the `products` table (only `is_active = true`, ordered by `display_order`) via a public server function; toggling rows in the database changes the site without code edits.
- Product photos live in the `images` text[] column (first entry = cover); entries are Lovable asset URLs, `public/` paths or full URLs, so photos can be swapped from the database. `image_url` is deprecated and only a fallback.
- Waitlist submissions are validated with the shared zod schema in `src/lib/waitlist.schema.ts` on both client and server, then inserted via a server function using the publishable key (anon insert-only RLS plus DB check constraints).
- The site is one scrolling page (sections anchored by id) because the brief asks for smooth-scroll navigation to the waitlist.
- Do not register `attachSupabaseAuth` in `src/start.ts` while the site has no sign-in — its browser-side session lookup blanked the page when the browser build lacked backend env vars.
- The `/planner` outreach page is gated by the server-only `PLANNER_PASSCODE` (checked in the server function on every request) so AI credits can't be spent by public visitors; it calls the AI gateway server-side only.
