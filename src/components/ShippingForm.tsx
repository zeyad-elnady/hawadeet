'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function ShippingForm({ shippingDict, locale }: { shippingDict: any, locale: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [building, setBuilding] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  
  const supabase = createClient();

  useEffect(() => {
    if (!orderId) {
      alert('Order ID is missing. Please restart the process.');
      router.push(`/${locale}/shop`);
    }
  }, [orderId, router, locale]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !phone || !city || !address || !building) {
      alert(shippingDict.error);
      return;
    }
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('orders')
        .update({
          shipping_name: fullName,
          shipping_phone: phone,
          shipping_city: city,
          shipping_address: address,
          shipping_building: building,
          shipping_notes: notes,
          status: 'payment_pending'
        })
        .eq('id', orderId);
        
      if (error) throw error;
      
      alert(shippingDict.success);
      // Proceed to payment page
      router.push(`/${locale}/payment?order_id=${orderId}`);
      
    } catch (error) {
      console.error('Error saving shipping details:', error);
      alert('حدث خطأ أثناء حفظ البيانات. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  if (!orderId) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full relative z-10 pb-20">
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8 text-start">
          <div className="w-8 h-8 rounded-full bg-[#5630D1]/10 flex items-center justify-center text-[#5630D1]">
            <span className="material-symbols-outlined text-[18px]">local_shipping</span>
          </div>
          <h4 className="text-xl font-bold text-slate-900">{shippingDict.title}</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Full Name */}
          <div className="space-y-2 text-start">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
              <span>{shippingDict.full_name}</span>
              <span className="text-red-500">*</span>
            </label>
            <input 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full h-12 bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#5630D1] focus:border-[#5630D1] px-4 font-medium text-slate-900 placeholder-slate-400 transition-shadow outline-none text-start" 
              type="text" 
              required
            />
          </div>
          
          {/* Phone Number */}
          <div className="space-y-2 text-start">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
              <span>{shippingDict.phone}</span>
              <span className="text-red-500">*</span>
            </label>
            <input 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-12 bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#5630D1] focus:border-[#5630D1] px-4 font-medium text-slate-900 placeholder-slate-400 transition-shadow outline-none text-start text-left" 
              type="tel" 
              dir="ltr"
              required
            />
          </div>
          
          {/* City */}
          <div className="space-y-2 text-start md:col-span-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
              <span>{shippingDict.city}</span>
              <span className="text-red-500">*</span>
            </label>
            <input 
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full h-12 bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#5630D1] focus:border-[#5630D1] px-4 font-medium text-slate-900 placeholder-slate-400 transition-shadow outline-none text-start" 
              type="text" 
              required
            />
          </div>
          
          {/* Street Address */}
          <div className="space-y-2 text-start md:col-span-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
              <span>{shippingDict.address}</span>
              <span className="text-red-500">*</span>
            </label>
            <input 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full h-12 bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#5630D1] focus:border-[#5630D1] px-4 font-medium text-slate-900 placeholder-slate-400 transition-shadow outline-none text-start" 
              type="text" 
              required
            />
          </div>
          
          {/* Building Details */}
          <div className="space-y-2 text-start">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
              <span>{shippingDict.building}</span>
              <span className="text-red-500">*</span>
            </label>
            <input 
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
              className="w-full h-12 bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#5630D1] focus:border-[#5630D1] px-4 font-medium text-slate-900 placeholder-slate-400 transition-shadow outline-none text-start" 
              type="text" 
              required
            />
          </div>
          
          {/* Notes */}
          <div className="space-y-2 text-start md:col-span-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
              <span>{shippingDict.notes}</span>
            </label>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#5630D1] focus:border-[#5630D1] p-4 font-medium text-slate-900 placeholder-slate-400 transition-shadow outline-none text-start min-h-[100px]" 
            />
          </div>
        </div>
      </div>
      
      {/* Action Button */}
      <div className="flex justify-end pt-4">
        <button 
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-10 py-3.5 bg-[#5630D1] hover:bg-[#4927b5] text-white rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#5630D1]/20 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="animate-spin material-symbols-outlined text-[18px]">progress_activity</span>
          ) : (
            <>
              <span>{shippingDict.submit}</span>
              <span className="material-symbols-outlined text-[18px] rtl:-scale-x-100">arrow_forward</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
