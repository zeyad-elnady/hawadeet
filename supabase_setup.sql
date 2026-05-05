-- 1. Create the orders table
CREATE TABLE public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    child_name TEXT NOT NULL,
    language TEXT NOT NULL,
    gender TEXT NOT NULL,
    book_format TEXT NOT NULL,
    total_price INTEGER NOT NULL,
    status TEXT DEFAULT 'customization' NOT NULL,
    photos TEXT[] DEFAULT '{}'::TEXT[]
);

-- 2. Enable Row Level Security (RLS) on the table
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 3. Create policies for the orders table
-- Allow anyone to insert (since customers aren't authenticated yet)
CREATE POLICY "Enable insert for public" ON public.orders
    FOR INSERT WITH CHECK (true);

-- Allow anyone to read (so we can show them their order success screen if needed)
CREATE POLICY "Enable read for public" ON public.orders
    FOR SELECT USING (true);

-- 4. Create a storage bucket for the photos
-- Note: 'public' is set to true so the images can be viewed easily by the admin
INSERT INTO storage.buckets (id, name, public) 
VALUES ('order_photos', 'order_photos', true)
ON CONFLICT (id) DO NOTHING;

-- 5. Set up storage policies for the 'order_photos' bucket
-- Allow anyone to upload images
CREATE POLICY "Public Uploads" ON storage.objects
    FOR INSERT WITH CHECK ( bucket_id = 'order_photos' );

-- Allow anyone to view images
CREATE POLICY "Public Read" ON storage.objects
    FOR SELECT USING ( bucket_id = 'order_photos' );
