'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { createClient } from '@/utils/supabase/client';
import { useAuth } from '@/context/AuthContext';

export default function CartDrawer({ locale }: { locale: string }) {
  const { items, isOpen, closeCart, removeItem, clearCart, totalItems, totalPrice } = useCart();
  const { user } = useAuth();
  const [checkingOut, setCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setCheckingOut(true);
    try {
      const supabase = createClient();
      const orderIds: string[] = [];

      for (const item of items) {
        const uploadedUrls: string[] = [];

        for (const file of item.photos) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
          const { error: uploadError } = await supabase.storage.from('order_photos').upload(fileName, file);
          if (uploadError) throw uploadError;
          const { data: urlData } = supabase.storage.from('order_photos').getPublicUrl(fileName);
          uploadedUrls.push(urlData.publicUrl);
        }

        const { data: order, error: insertError } = await supabase
          .from('orders')
          .insert([{
            child_name: item.childName,
            language: item.language,
            gender: item.gender,
            book_format: 'hardcover',
            total_price: item.price,
            photos: uploadedUrls,
            status: 'customization',
            user_id: user?.id ?? null,
          }])
          .select()
          .single();

        if (insertError) throw insertError;
        orderIds.push(order.id);
      }

      clearCart();
      closeCart();
      // Redirect to shipping for the first order; in a real flow you'd handle multi-order shipping
      window.location.href = `/${locale}/shipping?order_id=${orderIds[0]}`;
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] transition-opacity duration-300"
        style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[201] flex flex-col transition-transform duration-300"
        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
        dir="ltr"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#5630D1]/10 text-[#5630D1] rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">shopping_cart</span>
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 text-lg">Your Cart</h2>
              <p className="text-xs text-slate-500">{totalItems} {totalItems === 1 ? 'book' : 'books'}</p>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <span className="material-symbols-outlined text-[60px] text-slate-200 mb-4">auto_stories</span>
              <p className="font-bold text-slate-700">Your cart is empty</p>
              <p className="text-sm text-slate-400 mt-1">Add a custom storybook to get started!</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="bg-slate-50 rounded-2xl p-4 flex gap-4 items-start border border-slate-100">
                {/* Photo preview */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-200 flex-shrink-0 shadow-sm">
                  {item.photoPreviewUrls[0] ? (
                    <img src={item.photoPreviewUrls[0]} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <span className="material-symbols-outlined text-[24px]">child_care</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 text-base truncate">{item.childName}</p>
                  <p className="text-xs text-slate-500 capitalize mt-0.5">{item.gender} · {item.language === 'ar' ? 'Arabic' : 'English'}</p>
                  <p className="text-sm font-bold text-[#5630D1] mt-2">{item.price} EGP</p>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-colors flex-shrink-0"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-slate-100 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 font-medium">Subtotal ({totalItems} books)</span>
              <span className="font-extrabold text-slate-900 text-lg">{totalPrice} EGP</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={checkingOut}
              className="w-full h-13 py-3.5 bg-[#5630D1] hover:bg-[#4927b5] text-white rounded-xl font-bold text-base transition-all shadow-lg shadow-[#5630D1]/20 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {checkingOut ? (
                <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                  Proceed to Checkout
                </>
              )}
            </button>
            <button
              onClick={clearCart}
              className="w-full text-sm text-slate-400 hover:text-red-500 transition-colors font-medium"
            >
              Clear all items
            </button>
          </div>
        )}
      </div>
    </>
  );
}
