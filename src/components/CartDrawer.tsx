'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { createClient } from '@/utils/supabase/client';
import { useAuth } from '@/context/AuthContext';

export default function CartDrawer({ locale }: { locale: string }) {
  const { items, isOpen, closeCart, removeItem, clearCart, totalItems, totalPrice } = useCart();
  const { user } = useAuth();
  const [checkingOut, setCheckingOut] = useState(false);
  const isAr = locale === 'ar';

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setCheckingOut(true);
    try {
      let firstOrderId = `cart_${Date.now()}`;
      try {
        const supabase = createClient();
        const orderIds: string[] = [];

        for (const item of items) {
          const uploadedUrls: string[] = [];

          for (const file of item.photos) {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
            const { error: uploadError } = await supabase.storage.from('order_photos').upload(fileName, file);
            if (!uploadError) {
              const { data: urlData } = supabase.storage.from('order_photos').getPublicUrl(fileName);
              uploadedUrls.push(urlData.publicUrl);
            }
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

          if (order && !insertError) {
            orderIds.push(order.id);
          }
        }

        if (orderIds.length > 0) {
          firstOrderId = orderIds[0];
        }
      } catch (err) {
        console.warn('UI Local flow fallback:', err);
      }

      clearCart();
      closeCart();
      window.location.href = `/${locale}/shipping?order_id=${firstOrderId}`;
    } catch (err) {
      console.error('Checkout error:', err);
      window.location.href = `/${locale}/shipping?order_id=local_cart_order`;
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-[#0E2E22]/60 backdrop-blur-xs z-[200] transition-opacity duration-300"
        style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }}
      />

      {/* Slide-over Drawer */}
      <div
        className="fixed top-0 bottom-0 right-0 h-full w-full max-w-md bg-[#FAF8F5] shadow-2xl z-[201] flex flex-col transition-transform duration-300 text-start"
        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E3D7] bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#E6F0EB] text-[#154734] rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            </div>
            <div>
              <h2 className="font-extrabold text-[#192520] text-base font-headline">
                {isAr ? 'سلة كتب طفلك' : 'Your Book Basket'}
              </h2>
              <p className="text-xs text-[#566860]">
                {totalItems} {totalItems === 1 ? (isAr ? 'كتاب مخصص' : 'custom book') : (isAr ? 'كتب مخصصة' : 'custom books')}
              </p>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="w-9 h-9 rounded-full bg-[#FAF8F5] hover:bg-[#EAE5D9] flex items-center justify-center text-[#566860] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <div className="w-16 h-16 rounded-full bg-[#E6F0EB] text-[#154734] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[32px]">menu_book</span>
              </div>
              <p className="font-bold text-[#192520] text-base font-headline">
                {isAr ? 'سلة التسوق فارغة' : 'Your basket is empty'}
              </p>
              <p className="text-xs text-[#566860] mt-1 max-w-xs">
                {isAr ? 'اختر قصة من مكتبتنا وخصصها باسم وملامح بطلك الصغير!' : 'Personalize a keepsake storybook for your little one to get started.'}
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-4 flex gap-4 items-start border border-[#E8E3D7] shadow-2xs">
                <div className="w-16 h-20 rounded-md overflow-hidden bg-[#F5F2EA] flex-shrink-0 shadow-xs border border-[#E8E3D7]">
                  {item.photoPreviewUrls[0] ? (
                    <img src={item.photoPreviewUrls[0]} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#7D8F86]">
                      <span className="material-symbols-outlined text-[24px]">face</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#192520] text-sm truncate font-headline">{item.childName}</p>
                  <p className="text-xs text-[#566860] mt-0.5">
                    {item.gender === 'boy' ? (isAr ? 'ولد' : 'Boy') : (isAr ? 'بنت' : 'Girl')} · {item.language === 'ar' ? 'العربية' : 'English'}
                  </p>
                  <p className="text-xs font-semibold text-[#842232] mt-0.5">{isAr ? 'غلاف مقوى فاخر' : 'Hardcover Edition'}</p>
                  <p className="text-sm font-extrabold text-[#154734] mt-2">{item.price} ج.م</p>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="w-8 h-8 rounded-full bg-[#FAF8F5] hover:bg-[#F6EAEB] text-[#842232] flex items-center justify-center transition-colors flex-shrink-0"
                  aria-label="Remove item"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#E8E3D7] bg-white space-y-4">
            <div className="flex items-center justify-between text-xs text-[#566860]">
              <span>{isAr ? 'المجموع الجزئي' : 'Subtotal'}:</span>
              <span className="font-extrabold text-base text-[#192520]">{totalPrice} ج.م</span>
            </div>

            <div className="flex items-center gap-2 p-2.5 bg-[#E6F0EB] rounded-xl text-xs text-[#154734] font-medium">
              <span className="material-symbols-outlined text-sm">featured_seasonal_and_gifts</span>
              <span>{isAr ? 'تغليف هدية ملكي مجاني مشمول لكل الكتب' : 'Free presentation gift wrapping included'}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={checkingOut}
              className="w-full py-4 bg-[#154734] hover:bg-[#0E2E22] text-white rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {checkingOut ? (
                <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
              ) : (
                <>
                  <span>{isAr ? 'المتابعة للشحن والتوصيل' : 'Proceed to Checkout'}</span>
                  <span className="material-symbols-outlined text-[18px]">
                    {isAr ? 'arrow_back' : 'arrow_forward'}
                  </span>
                </>
              )}
            </button>

            <button
              onClick={clearCart}
              className="w-full text-center text-xs text-[#7D8F86] hover:text-[#842232] transition-colors"
            >
              {isAr ? 'تفريغ السلة' : 'Clear all items'}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
