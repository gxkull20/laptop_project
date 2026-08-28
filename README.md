# LaptopHub — Modern Laptop Shop

A responsive laptop e-commerce storefront built with React, Vite, Tailwind CSS,
and Supabase.

## Features

- Home, Products, Product Details, Categories, Brands, Offers, About, Contact,
  Cart, Login, Register, and 404 pages
- Sticky responsive navbar with mobile menu, live cart badge, and search
- Product search, filtering (category, brand, RAM, price), and sorting
- Shopping cart with quantity controls, persisted to `localStorage` for guests
  and synced to Supabase for logged-in users
- Supabase Authentication (email/password) for register, login, and logout
- Contact form that writes to a `contact_messages` table
- **Demo mode**: if no Supabase credentials are set, the app runs entirely on
  local mock data (`src/data/products.js`) and the cart falls back to
  `localStorage`, so the UI is fully explorable before Supabase is connected

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, React Router
- **Backend:** Supabase (PostgreSQL, Auth, Row Level Security)
- **Deployment:** Render (static site) + GitHub

## Local Installation

```bash
npm install
cp .env.example .env   # then fill in your Supabase values
npm run dev
```

The app runs at `http://localhost:5173`.

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon/public API key |

Leave both blank to run in demo mode with mock data.

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com).
2. Open the SQL editor and run `supabase/schema.sql` — it creates the
   `profiles`, `products`, `cart_items`, and `contact_messages` tables,
   enables Row Level Security with the correct policies, sets up a trigger
   that creates a `profiles` row on signup, and inserts 8 sample laptops.
3. Copy your Project URL and anon key into `.env`.
4. (Optional) In **Authentication → Providers**, confirm email/password sign-up
   is enabled.

### Row Level Security summary

- **profiles** — a user can read/update only their own row.
- **products** — publicly readable by anyone (no login required to browse).
- **cart_items** — a user can only read/write their own cart; no cross-user
  access is possible.
- **contact_messages** — anyone can insert a message; there is no public
  `select` policy, so submissions aren't readable via the client API.

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Deployment (Render)

1. Push this repo to GitHub.
2. In Render, create a new **Static Site** from the repo (or use the included
   `render.yaml` via a Blueprint deploy).
3. Build command: `npm install && npm run build`
4. Publish directory: `dist`
5. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment
   variables in the Render dashboard.
6. The included SPA rewrite rule (`/* → /index.html`) ensures React Router
   routes work correctly on refresh and direct links.

## Project Structure

```text
src/
├── components/   Navbar, Footer, Hero, ProductCard, FilterPanel, etc.
├── pages/        One file per route
├── context/      AuthContext, CartContext
├── services/     Supabase client
├── hooks/        useProducts (Supabase-or-demo-data)
├── utils/        formatPrice
├── data/         Mock product/category/brand data for demo mode
├── App.jsx
└── main.jsx
supabase/
└── schema.sql    Tables, RLS policies, triggers, sample data
```
