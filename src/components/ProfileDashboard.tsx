'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

const STATUS_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  customization:   { bg: 'bg-[#F5F2EA]',  text: 'text-[#566860]',  label: 'Incomplete' },
  payment_pending: { bg: 'bg-[#FEF7EC]',  text: 'text-[#C27803]',  label: 'Payment Pending' },
  paid_pending:    { bg: 'bg-[#E6F0EB]',  text: 'text-[#154734]',  label: 'Under Review' },
  processing:      { bg: 'bg-[#E6F0EB]',  text: 'text-[#154734]',  label: 'In Atelier Production' },
  shipped:         { bg: 'bg-[#FEF7EC]',  text: 'text-[#C27803]',  label: 'Shipped with Courier' },
  completed:       { bg: 'bg-[#E6F0EB]',  text: 'text-[#154734]',  label: 'Delivered ✓' },
  cancelled:       { bg: 'bg-[#F6EAEB]',  text: 'text-[#842232]',  label: 'Cancelled' },
};

export default function ProfileDashboard({ locale }: { locale: string }) {
  const { user, signOut, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const isAr = locale === 'ar';

  const supabase = useMemo(() => {
    try { return createClient(); } catch { return null; }
  }, []);

  useEffect(() => {
    if (!user || !supabase) { setOrdersLoading(false); return; }
    supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setOrders(data || []);
        setOrdersLoading(false);
      });
  }, [user, supabase]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="material-symbols-outlined animate-spin text-[36px] text-[#154734]">progress_activity</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-24 pb-16">
        <div className="bg-white rounded-3xl shadow-sm border border-[#E8E3D7] p-8 sm:p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-[#E6F0EB] text-[#154734] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-[32px]">account_circle</span>
          </div>
          <h1 className="text-xl font-bold text-[#192520] mb-2 font-headline">
            {isAr ? 'سجل الدخول لمشاهدة طلباتك' : 'Sign in to view your orders'}
          </h1>
          <p className="text-xs text-[#566860] mb-6">
            {isAr ? 'تابع مراحل تجهيز وطباعة كتب أطفالك المخصصة.' : 'Track the craft and delivery status of your custom storybooks.'}
          </p>
          <Link
            href={`/${locale}/login`}
            className="inline-flex items-center gap-2 px-7 py-3 bg-[#154734] hover:bg-[#0E2E22] text-white rounded-full font-bold text-sm transition-all shadow-xs"
          >
            <span>{isAr ? 'تسجيل الدخول' : 'Sign In'}</span>
          </Link>
        </div>
      </div>
    );
  }

  const avatarUrl = user.user_metadata?.avatar_url;
  const fullName = user.user_metadata?.full_name || user.email;

  return (
    <div className="pt-26 sm:pt-30 pb-20 px-4 max-w-4xl mx-auto text-start">
      
      {/* Profile Header */}
      <div className="bg-white border border-[#E8E3D7] rounded-3xl p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-center gap-6 shadow-xs">
        <div className="flex-shrink-0">
          {avatarUrl ? (
            <img src={avatarUrl} alt={fullName} className="w-16 h-16 rounded-full object-cover shadow-xs border-2 border-[#154734]" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-[#E6F0EB] text-[#154734] flex items-center justify-center text-2xl font-black">
              {fullName?.charAt(0)?.toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex-1 text-center sm:text-start">
          <h1 className="text-2xl font-bold text-[#192520] font-headline">{fullName}</h1>
          <p className="text-xs text-[#566860] mt-0.5">{user.email}</p>
          <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
            <Link
              href={`/${locale}/shop`}
              className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#154734] hover:bg-[#0E2E22] text-white rounded-full text-xs font-bold transition-all shadow-xs"
            >
              <span className="material-symbols-outlined text-base">add</span>
              <span>{isAr ? 'تخصيص كتاب جديد' : 'New Storybook'}</span>
            </Link>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FAF8F5] hover:bg-[#F6EAEB] hover:text-[#842232] text-[#566860] rounded-full text-xs font-bold transition-all border border-[#E8E3D7]"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              <span>{isAr ? 'تسجيل الخروج' : 'Sign Out'}</span>
            </button>
          </div>
        </div>
        <div className="flex-shrink-0 text-center px-4 py-2 bg-[#FAF8F5] rounded-2xl border border-[#E8E3D7]">
          <p className="text-3xl font-black text-[#154734]">{orders.length}</p>
          <p className="text-[11px] text-[#7D8F86] font-bold uppercase">{isAr ? 'إجمالي الكتب' : 'Total Books'}</p>
        </div>
      </div>

      {/* Orders List */}
      <h2 className="text-xl font-bold text-[#192520] mb-5 flex items-center gap-2 font-headline">
        <span className="material-symbols-outlined text-[22px] text-[#154734]">auto_stories</span>
        <span>{isAr ? 'سجل الكتب المطبوعة' : 'Your Keepsake Orders'}</span>
      </h2>

      {ordersLoading ? (
        <div className="flex justify-center py-16">
          <span className="material-symbols-outlined animate-spin text-[36px] text-[#154734]">progress_activity</span>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white border border-[#E8E3D7] rounded-3xl p-10 text-center shadow-xs">
          <div className="w-16 h-16 rounded-full bg-[#E6F0EB] text-[#154734] flex items-center justify-center mx-auto mb-3">
            <span className="material-symbols-outlined text-[32px]">menu_book</span>
          </div>
          <p className="font-bold text-[#192520] text-base font-headline">
            {isAr ? 'لم تقم بطلب أي كتب بعد' : 'No books crafted yet'}
          </p>
          <p className="text-xs text-[#566860] mt-1 mb-5">
            {isAr ? 'اختر قصة من مكتبتنا واجعل طفلك بطل الحكاية!' : 'Personalize your child’s very first heirloom hardcover.'}
          </p>
          <Link
            href={`/${locale}/shop`}
            className="inline-flex items-center gap-2 px-7 py-3 bg-[#154734] hover:bg-[#0E2E22] text-white rounded-full font-bold text-xs shadow-xs"
          >
            <span>{isAr ? 'أنشئ أول كتاب الآن' : 'Create First Book'}</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const statusInfo = STATUS_COLORS[order.status] || STATUS_COLORS['customization'];
            return (
              <div key={order.id} className="bg-white border border-[#E8E3D7] rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-xs hover:border-[#154734] transition-colors">
                <div className="w-16 h-20 rounded-md overflow-hidden bg-[#FAF8F5] flex-shrink-0 border border-[#E8E3D7] shadow-xs">
                  {order.photos?.[0] ? (
                    <img src={order.photos[0]} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#7D8F86]">
                      <span className="material-symbols-outlined text-[24px]">face</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-[#192520] text-base font-headline">{order.child_name}</p>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${statusInfo.bg} ${statusInfo.text}`}>
                      {statusInfo.label}
                    </span>
                  </div>
                  <p className="text-xs text-[#566860] mt-1 capitalize">
                    {order.gender === 'boy' ? (isAr ? 'ولد' : 'Boy') : (isAr ? 'بنت' : 'Girl')} · {order.book_format || 'Hardcover'}
                  </p>
                  <p className="text-[11px] text-[#7D8F86] mt-1 font-mono">
                    {new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>

                <div className="text-end flex-shrink-0">
                  <p className="font-black text-[#154734] text-base">{order.total_price || 1050} ج.م</p>
                  <p className="font-mono text-[10px] text-[#7D8F86] uppercase mt-0.5">#{order.id.slice(-6).toUpperCase()}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
