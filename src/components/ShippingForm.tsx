'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function ShippingForm({ shippingDict, locale }: { shippingDict: any, locale: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id') || 'local_order';
  const isAr = locale === 'ar';
  
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [building, setBuilding] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !phone || !city || !address || !building) {
      alert(shippingDict.error);
      return;
    }
    
    setLoading(true);
    try {
      try {
        const supabase = createClient();
        if (orderId && orderId !== 'local_order') {
          await supabase
            .from('orders')
            .update({
              shipping_name: fullName,
              shipping_phone: phone,
              shipping_city: city,
              shipping_address: address,
              shipping_building: building,
              shipping_notes: notes,
              status: 'payment_pending',
            })
            .eq('id', orderId);
        }
      } catch (err) {
        console.warn('UI local flow fallback:', err);
      }
      
      router.push(`/${locale}/payment?order_id=${orderId}`);
    } catch (error) {
      console.error('Error saving shipping details:', error);
      router.push(`/${locale}/payment?order_id=${orderId}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E3D7] shadow-sm text-start max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Recipient Full Name */}
        <div>
          <label className="block text-xs font-bold text-[#192520] uppercase tracking-wider mb-2">
            {shippingDict.full_name} *
          </label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder={isAr ? 'مثال: سارة محمد الشريف' : 'e.g. Sarah Mohamed'}
            className="w-full px-5 py-3.5 rounded-xl border border-[#D7D0C0] text-[#192520] bg-[#FAF8F5] focus:outline-hidden focus:border-[#154734] focus:bg-white text-sm font-medium transition-colors"
          />
        </div>

        {/* Phone & City */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#192520] uppercase tracking-wider mb-2">
              {shippingDict.phone} *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="010XXXXXXXX"
              className="w-full px-5 py-3.5 rounded-xl border border-[#D7D0C0] text-[#192520] bg-[#FAF8F5] focus:outline-hidden focus:border-[#154734] focus:bg-white text-sm font-medium transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#192520] uppercase tracking-wider mb-2">
              {shippingDict.city} *
            </label>
            <input
              type="text"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={isAr ? 'القاهرة، الجيزة، الإسكندرية...' : 'Cairo, Giza, Alexandria...'}
              className="w-full px-5 py-3.5 rounded-xl border border-[#D7D0C0] text-[#192520] bg-[#FAF8F5] focus:outline-hidden focus:border-[#154734] focus:bg-white text-sm font-medium transition-colors"
            />
          </div>
        </div>

        {/* Street Address */}
        <div>
          <label className="block text-xs font-bold text-[#192520] uppercase tracking-wider mb-2">
            {shippingDict.address} *
          </label>
          <input
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={isAr ? 'اسم الشارع، الحي، المعلم القريب' : 'Street name, district, landmark'}
            className="w-full px-5 py-3.5 rounded-xl border border-[#D7D0C0] text-[#192520] bg-[#FAF8F5] focus:outline-hidden focus:border-[#154734] focus:bg-white text-sm font-medium transition-colors"
          />
        </div>

        {/* Building & Apt */}
        <div>
          <label className="block text-xs font-bold text-[#192520] uppercase tracking-wider mb-2">
            {shippingDict.building} *
          </label>
          <input
            type="text"
            required
            value={building}
            onChange={(e) => setBuilding(e.target.value)}
            placeholder={isAr ? 'عمارة ١٢، الدور الثالث، شقة ٥' : 'Bldg 12, Floor 3, Apt 5'}
            className="w-full px-5 py-3.5 rounded-xl border border-[#D7D0C0] text-[#192520] bg-[#FAF8F5] focus:outline-hidden focus:border-[#154734] focus:bg-white text-sm font-medium transition-colors"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-bold text-[#192520] uppercase tracking-wider mb-2">
            {shippingDict.notes}
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={isAr ? 'أي تعليمات خاصة للمندوب عند التسليم' : 'Special courier instructions for delivery'}
            className="w-full px-5 py-3.5 rounded-xl border border-[#D7D0C0] text-[#192520] bg-[#FAF8F5] focus:outline-hidden focus:border-[#154734] focus:bg-white text-sm font-medium transition-colors resize-none"
          />
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-[#EFEBE0]">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-full bg-[#154734] hover:bg-[#0E2E22] text-white font-bold text-base transition-all shadow-md hover:scale-[1.01] active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>{shippingDict.saving}</span>
            ) : (
              <>
                <span>{shippingDict.submit}</span>
                <span className="material-symbols-outlined text-[18px]">
                  {isAr ? 'arrow_back' : 'arrow_forward'}
                </span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
