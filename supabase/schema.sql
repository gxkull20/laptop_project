-- LaptopHub Supabase schema
-- Run this in the Supabase SQL editor (or via `supabase db push`) to set up
-- tables, sample data, and Row Level Security policies.

-- 1. PROFILES ---------------------------------------------------------------
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  created_at timestamptz default now()
);

alter table profiles enable row level security;

create policy "Users can read own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert
  with check (auth.uid() = id);

-- Auto-create a profile row whenever a new auth user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. PRODUCTS -----------------------------------------------------------
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  brand text not null,
  category text not null,
  description text,
  price numeric(10,2) not null,
  original_price numeric(10,2),
  processor text,
  ram text,
  storage text,
  display text,
  graphics text,
  battery text,
  operating_system text,
  image_url text,
  rating numeric(2,1) default 4.5,
  stock integer default 10,
  created_at timestamptz default now()
);

alter table products enable row level security;

create policy "Anyone can read products"
  on products for select
  using (true);

-- 3. CART ITEMS ---------------------------------------------------------
create table if not exists cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  product_id uuid references products(id) on delete cascade not null,
  quantity integer not null default 1,
  created_at timestamptz default now(),
  unique (user_id, product_id)
);

alter table cart_items enable row level security;

create policy "Users can view own cart"
  on cart_items for select
  using (auth.uid() = user_id);

create policy "Users can insert into own cart"
  on cart_items for insert
  with check (auth.uid() = user_id);

create policy "Users can update own cart"
  on cart_items for update
  using (auth.uid() = user_id);

create policy "Users can delete from own cart"
  on cart_items for delete
  using (auth.uid() = user_id);

-- 4. CONTACT MESSAGES -----------------------------------------------------
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  created_at timestamptz default now()
);

alter table contact_messages enable row level security;

create policy "Anyone can submit a contact message"
  on contact_messages for insert
  with check (true);

-- Note: no select policy is added for contact_messages, so submitted
-- messages are not readable via the anon/public API (staff should
-- review them via the Supabase dashboard or a service-role tool).

-- 5. SAMPLE PRODUCTS ------------------------------------------------------
insert into products (name, brand, category, description, price, original_price, processor, ram, storage, display, graphics, battery, operating_system, image_url, rating, stock)
values
  ('ROG Strix G16', 'ASUS', 'Gaming Laptops', 'A high-refresh gaming laptop built for competitive play.', 1499.00, 1699.00, 'Intel Core i7-14650HX', '16GB DDR5', '1TB NVMe SSD', '16" QHD 240Hz', 'RTX 4070 8GB', 'Up to 8 hours', 'Windows 11 Home', '/images/rog-strix.svg', 4.7, 12),
  ('Pavilion Plus 14', 'HP', 'Business Laptops', 'A slim, business-ready laptop with all-day battery life.', 899.00, null, 'Intel Core i5-1335U', '16GB LPDDR5', '512GB NVMe SSD', '14" 2.2K OLED', 'Intel Iris Xe', 'Up to 11 hours', 'Windows 11 Home', '/images/pavilion-plus.svg', 4.4, 20),
  ('Legion Pro 5i', 'Lenovo', 'Gaming Laptops', 'Serious gaming power with a cooler, quieter chassis.', 1699.00, 1899.00, 'Intel Core i9-14900HX', '32GB DDR5', '1TB NVMe SSD', '16" WQXGA 240Hz', 'RTX 4070 8GB', 'Up to 6 hours', 'Windows 11 Home', '/images/legion-pro.svg', 4.8, 8),
  ('XPS 14', 'Dell', 'Creator Laptops', 'A premium creator laptop with a stunning InfinityEdge display.', 1899.00, null, 'Intel Core Ultra 7 155H', '32GB LPDDR5x', '1TB NVMe SSD', '14.5" 3.2K OLED Touch', 'Intel Arc Graphics', 'Up to 13 hours', 'Windows 11 Pro', '/images/xps-14.svg', 4.6, 10),
  ('MacBook Air 15"', 'Apple', 'Student Laptops', 'Thin, silent, and fast enough for everyday student life.', 1299.00, null, 'Apple M3', '16GB Unified Memory', '512GB SSD', '15.3" Liquid Retina', '10-core GPU', 'Up to 18 hours', 'macOS Sonoma', '/images/macbook-air.svg', 4.9, 25),
  ('Nitro V15', 'Acer', 'Student Laptops', 'An affordable gaming-capable laptop for students on a budget.', 799.00, 899.00, 'AMD Ryzen 5 7535HS', '16GB DDR5', '512GB NVMe SSD', '15.6" FHD 144Hz', 'RTX 4050 6GB', 'Up to 7 hours', 'Windows 11 Home', '/images/nitro-v15.svg', 4.3, 18),
  ('Katana 15', 'MSI', 'Gaming Laptops', 'Balanced gaming performance in a portable 15" frame.', 1099.00, 1249.00, 'Intel Core i7-13620H', '16GB DDR5', '1TB NVMe SSD', '15.6" FHD 144Hz', 'RTX 4060 8GB', 'Up to 6.5 hours', 'Windows 11 Home', '/images/katana-15.svg', 4.5, 14),
  ('ThinkPad X1 Carbon', 'Lenovo', 'High Performance Laptops', 'A legendary business laptop with military-grade durability.', 1799.00, null, 'Intel Core Ultra 7 155U', '32GB LPDDR5x', '1TB NVMe SSD', '14" 2.8K OLED', 'Intel Graphics', 'Up to 15 hours', 'Windows 11 Pro', '/images/thinkpad-x1.svg', 4.7, 9)
on conflict do nothing;
