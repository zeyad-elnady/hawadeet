'use client';

import React, { useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function PaymentForm({ paymentDict, locale }: { paymentDict: any, locale: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id') || 'local_order';
  const isAr = locale === 'ar';
  
  const [method, setMethod] = useState<'cash' | 'wallet'>('cash');
  const [receipt, setReceipt] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      try {
        const supabase = createClient();
        let receiptUrl = null;
        
        if (method === 'wallet' && receipt) {
          const fileExt = receipt.name.split('.').pop();
          const fileName = `receipt_${orderId}_${Date.now()}.${fileExt}`;
          const filePath = `${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('order_photos')
            .upload(filePath, receipt);

          if (!uploadError) {
            const { data: urlData } = supabase.storage.from('order_photos').getPublicUrl(filePath);
            receiptUrl = urlData.publicUrl;
          }
        }

        if (orderId && orderId !== 'local_order') {
          await supabase
            .from('orders')
            .update({
              payment_method: method,
              payment_receipt: receiptUrl,
              status: 'confirmed',
            })
            .eq('id', orderId);
        }
      } catch (err) {
        console.warn('UI local flow fallback:', err);
      }
      
      router.push(`/${locale}/success?order_id=${orderId}`);
    } catch (error) {
      console.error('Error completing payment:', error);
      router.push(`/${locale}/success?order_id=${orderId}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E3D7] shadow-sm text-start max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Method 1: Cash on Delivery */}
        <div
          onClick={() => setMethod('cash')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            method === 'cash'
              ? 'border-[#154734] bg-[#E6F0EB]/50 ring-1 ring-[#154734]'
              : 'border-[#E8E3D7] bg-[#FAF8F5] hover:border-[#154734]'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center ${
              method === 'cash' ? 'border-[#154734]' : 'border-[#D7D0C0]'
            }`}>
              {method === 'cash' && <div className="w-2.5 h-2.5 rounded-full bg-[#154734]" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#154734] text-xl">payments</span>
                <h4 className="font-bold text-sm text-[#192520]">
                  {paymentDict.cash}
                </h4>
              </div>
              <p className="text-xs text-[#566860] mt-1 leading-relaxed">
                {paymentDict.cash_desc}
              </p>
            </div>
          </div>
        </div>

        {/* Method 2: Wallet / InstaPay */}
        <div
          onClick={() => setMethod('wallet')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            method === 'wallet'
              ? 'border-[#154734] bg-[#E6F0EB]/50 ring-1 ring-[#154734]'
              : 'border-[#E8E3D7] bg-[#FAF8F5] hover:border-[#154734]'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center ${
              method === 'wallet' ? 'border-[#154734]' : 'border-[#D7D0C0]'
            }`}>
              {method === 'wallet' && <div className="w-2.5 h-2.5 rounded-full bg-[#154734]" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#154734] text-xl">account_balance_wallet</span>
                <h4 className="font-bold text-sm text-[#192520]">
                  {paymentDict.wallet}
                </h4>
              </div>
              <p className="text-xs text-[#566860] mt-1 leading-relaxed">
                {paymentDict.wallet_desc}
              </p>

              {method === 'wallet' && (
                <div className="mt-4 pt-4 border-t border-[#D7D0C0]/60 space-y-4">
                  <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E8E3D7] text-xs text-[#192520] leading-relaxed">
                    <p className="font-bold mb-1">{isAr ? 'بيانات التحويل عبر إنستاباي / فودافون كاش:' : 'InstaPay & Wallet Details:'}</p>
                    <p className="font-mono text-sm text-[#154734] font-bold">01000000000</p>
                    <p className="text-[#566860] mt-1">{isAr ? 'القيمة الإجمالية: ١,٠٥٠ ج.م' : 'Total: 1,050 EGP'}</p>
                  </div>

                  {/* Upload Receipt */}
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-3 px-4 rounded-xl border border-dashed border-[#154734] bg-white text-[#154734] text-xs font-bold hover:bg-[#E6F0EB] transition-colors flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base">receipt_long</span>
                      <span>{receipt ? receipt.name : paymentDict.upload_receipt}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Total Box */}
        <div className="p-4 rounded-2xl bg-[#F5F2EA] border border-[#E8E3D7] flex items-center justify-between text-sm">
          <span className="text-[#566860] font-medium">{isAr ? 'المبلغ المستحق للدفع:' : 'Amount to Pay:'}</span>
          <span className="text-xl font-black text-[#154734]">1,050 ج.م</span>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-full bg-[#154734] hover:bg-[#0E2E22] text-white font-bold text-base transition-all shadow-md hover:scale-[1.01] active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>{paymentDict.processing}</span>
            ) : (
              <>
                <span>{paymentDict.submit}</span>
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
