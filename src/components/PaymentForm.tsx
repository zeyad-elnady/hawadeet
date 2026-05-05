'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function PaymentForm({ paymentDict, locale }: { paymentDict: any, locale: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  
  const [method, setMethod] = useState<'cash' | 'wallet' | null>(null);
  const [receipt, setReceipt] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const supabase = createClient();

  useEffect(() => {
    if (!orderId) {
      alert('Order ID is missing. Please restart the process.');
      router.push(`/${locale}/shop`);
    }
  }, [orderId, router, locale]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceipt(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!method) {
      alert(paymentDict.error_method);
      return;
    }
    
    if (method === 'wallet' && !receipt) {
      alert(paymentDict.error_receipt);
      return;
    }
    
    setLoading(true);
    try {
      let receiptUrl = null;
      
      if (method === 'wallet' && receipt) {
        const fileExt = receipt.name.split('.').pop();
        const fileName = `receipt_${orderId}_${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        // Upload to the existing order_photos bucket
        const { error: uploadError } = await supabase.storage
          .from('order_photos')
          .upload(filePath, receipt);

        if (uploadError) throw uploadError;
        
        const { data: urlData } = supabase.storage.from('order_photos').getPublicUrl(filePath);
        receiptUrl = urlData.publicUrl;
      }
      
      const { error } = await supabase
        .from('orders')
        .update({
          payment_method: method,
          payment_receipt_url: receiptUrl,
          status: 'paid_pending'
        })
        .eq('id', orderId);
        
      if (error) throw error;
      
      alert(paymentDict.success);
      // Redirect to home page or success page
      router.push(`/${locale}/success?order_id=${orderId}`);
      
    } catch (error) {
      console.error('Error saving payment details:', error);
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
            <span className="material-symbols-outlined text-[18px]">payments</span>
          </div>
          <h4 className="text-xl font-bold text-slate-900">{paymentDict.title}</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Cash on Delivery */}
          <label className="relative flex flex-col justify-start p-6 rounded-xl border-2 border-transparent bg-slate-50 cursor-pointer transition-all border-slate-200 [&:has(input:checked)]:border-[#5630D1] [&:has(input:checked)]:bg-[#5630D1]/5 text-start hover:shadow-sm">
            <input 
              checked={method === 'cash'}
              onChange={() => setMethod('cash')}
              className="hidden peer" 
              name="payment_method" 
              type="radio" 
              value="cash"
            />
            <div className="absolute top-4 start-4 opacity-0 peer-checked:opacity-100 transition-opacity">
              <div className="w-5 h-5 rounded-full bg-[#5630D1] text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[12px]">check</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-slate-400 peer-checked:text-[#5630D1] shadow-sm transition-colors border border-slate-100">
                <span className="material-symbols-outlined text-[24px]">local_shipping</span>
              </div>
              <div>
                <p className="font-bold text-slate-900 text-lg">{paymentDict.cash}</p>
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">{paymentDict.cash_desc}</p>
          </label>
          
          {/* Mobile Wallet */}
          <label className="relative flex flex-col justify-start p-6 rounded-xl border-2 border-transparent bg-slate-50 cursor-pointer transition-all border-slate-200 [&:has(input:checked)]:border-[#5630D1] [&:has(input:checked)]:bg-[#5630D1]/5 text-start hover:shadow-sm">
            <input 
              checked={method === 'wallet'}
              onChange={() => setMethod('wallet')}
              className="hidden peer" 
              name="payment_method" 
              type="radio" 
              value="wallet"
            />
            <div className="absolute top-4 start-4 opacity-0 peer-checked:opacity-100 transition-opacity">
              <div className="w-5 h-5 rounded-full bg-[#5630D1] text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[12px]">check</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-slate-400 peer-checked:text-[#5630D1] shadow-sm transition-colors border border-slate-100">
                <span className="material-symbols-outlined text-[24px]">account_balance_wallet</span>
              </div>
              <div>
                <p className="font-bold text-slate-900 text-lg">{paymentDict.wallet}</p>
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">{paymentDict.wallet_desc}</p>
          </label>
        </div>

        {/* Wallet Instructions & Upload */}
        <div className={`overflow-hidden transition-all duration-500 ${method === 'wallet' ? 'max-h-[800px] opacity-100 mt-8 pt-8 border-t border-slate-100' : 'max-h-0 opacity-0'}`}>
          <div className="text-start">
            <div className="bg-[#5630D1]/5 border border-[#5630D1]/20 rounded-xl p-5 mb-6 flex items-start gap-3">
              <span className="material-symbols-outlined text-[#5630D1] text-[20px] mt-0.5 flex-shrink-0">info</span>
              <p className="text-sm text-[#5630D1] font-medium leading-relaxed">
                {paymentDict.wallet_instructions}
              </p>
            </div>
            
            <div className="flex flex-col items-center justify-center w-full">
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange} 
              />
              
              {!receipt ? (
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full px-8 py-10 border-2 border-dashed border-slate-300 hover:border-[#5630D1] hover:bg-[#5630D1]/5 rounded-xl transition-all flex flex-col items-center justify-center gap-3 group bg-slate-50"
                >
                  <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined text-[28px] text-slate-400 group-hover:text-[#5630D1] transition-colors">upload_file</span>
                  </div>
                  <span className="text-sm font-bold text-slate-600 group-hover:text-[#5630D1] transition-colors">{paymentDict.upload_receipt}</span>
                </button>
              ) : (
                <div className="relative w-full max-w-[300px] aspect-[3/4] rounded-xl overflow-hidden border border-slate-200 shadow-sm group mx-auto">
                  <img src={URL.createObjectURL(receipt)} alt="Receipt preview" className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => setReceipt(null)}
                    className="absolute top-2 end-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-50"
                  >
                    <span className="material-symbols-outlined text-[18px] text-red-500">delete</span>
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md p-3 border-t border-slate-200 flex justify-between items-center">
                    <span className="text-xs font-bold text-green-600 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span> تم الإرفاق
                    </span>
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs text-[#5630D1] font-bold hover:underline"
                    >
                      تغيير
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Button */}
      <div className="flex justify-end pt-4">
        <button 
          type="submit"
          disabled={loading || !method || (method === 'wallet' && !receipt)}
          className="w-full sm:w-auto px-10 py-3.5 bg-[#5630D1] hover:bg-[#4927b5] text-white rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#5630D1]/20 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <span className="animate-spin material-symbols-outlined text-[18px]">progress_activity</span>
              <span>{paymentDict.processing}</span>
            </>
          ) : (
            <>
              <span>{paymentDict.submit}</span>
              <span className="material-symbols-outlined text-[18px] rtl:-scale-x-100">done_all</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
