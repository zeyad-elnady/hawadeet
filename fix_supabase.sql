-- 1. Add Shipping Columns
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS shipping_name TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS shipping_phone TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS shipping_city TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS shipping_address TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS shipping_building TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS shipping_notes TEXT;

-- 2. Add Payment Columns
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_method TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_receipt_url TEXT;

-- 3. Add Update Policy (Fixes the permission error when updating shipping/payment)
DROP POLICY IF EXISTS "Enable update for public" ON public.orders;
CREATE POLICY "Enable update for public" ON public.orders
    FOR UPDATE USING (true) WITH CHECK (true);
