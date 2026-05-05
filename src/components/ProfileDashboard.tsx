'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

const STATUS_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  customization:    { bg: 'bg-slate-100',   text: 'text-slate-600',   label: 'Incomplete' },
  payment_pending:  { bg: 'bg-orange-100',  text: 'text-orange-700',  label: 'Payment Pending' },
  paid_pending:     { bg: 'bg-blue-100',    text: 'text-blue-700',    label: 'Under Review' },
  processing:       { bg: 'bg-purple-100',  text: 'text-purple-700',  label: 'Being Made' },
  shipped:          { bg: 'bg-yellow-100',  text: 'text-yellow-700',  label: 'Shipped' },
  completed:        { bg: 'bg-green-100',   text: 'text-green-700',   label: 'Delivered ✓' },
  cancelled:        { bg: 'bg-red-100',     text: 'text-red-700',     label: 'Cancelled' },
};

export default function ProfileDashboard({ locale }: { locale: string }) {
  const { user, signOut, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

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
        <span className="material-symbols-outlined animate-spin text-[40px] text-[#5630D1]">progress_activity</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" dir="ltr">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-[#5630D1]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-[40px] text-[#5630D1]">account_circle</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Sign in to view your orders</h1>
          <p className="text-slate-500 mb-8">Log in with Google to access your order history and track your books.</p>
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#5630D1] hover:bg-[#4927b5] text-white rounded-xl font-bold transition-all shadow-lg shadow-[#5630D1]/20"
          >
            <span className="material-symbols-outlined text-[20px]">home</span>
            Go Home & Sign In
          </Link>
        </div>
      </div>
    );
  }

  const avatarUrl = user.user_metadata?.avatar_url;
  const fullName = user.user_metadata?.full_name || user.email;

  return (
    <div className="pt-28 pb-20 px-4 max-w-4xl mx-auto" dir="ltr">
      {/* Profile Header */}
      <div className="bg-white border border-slate-100 rounded-3xl p-8 mb-8 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
        <div className="flex-shrink-0">
          {avatarUrl ? (
            <img src={avatarUrl} alt={fullName} className="w-20 h-20 rounded-full object-cover shadow-md ring-4 ring-[#5630D1]/10" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-[#5630D1]/10 text-[#5630D1] flex items-center justify-center text-3xl font-black">
              {fullName?.charAt(0)?.toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl font-extrabold text-slate-900">{fullName}</h1>
          <p className="text-slate-500 text-sm mt-1">{user.email}</p>
          <div className="flex flex-wrap gap-3 mt-4 justify-center sm:justify-start">
            <Link
              href={`/${locale}/shop`}
              className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#5630D1] hover:bg-[#4927b5] text-white rounded-xl text-sm font-bold shadow-md shadow-[#5630D1]/20 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              New Order
            </Link>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-1.5 px-5 py-2 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 rounded-xl text-sm font-bold transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              Sign Out
            </button>
          </div>
        </div>
        <div className="flex-shrink-0 text-center">
          <p className="text-4xl font-black text-[#5630D1]">{orders.length}</p>
          <p className="text-xs text-slate-500 font-semibold mt-1">Total Orders</p>
        </div>
      </div>

      {/* Orders List */}
      <h2 className="text-xl font-extrabold text-slate-900 mb-5 flex items-center gap-2">
        <span className="material-symbols-outlined text-[22px] text-[#5630D1]">history</span>
        Order History
      </h2>

      {ordersLoading ? (
        <div className="flex justify-center py-20">
          <span className="material-symbols-outlined animate-spin text-[40px] text-[#5630D1]">progress_activity</span>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-sm">
          <span className="material-symbols-outlined text-[60px] text-slate-200 mb-4 block">auto_stories</span>
          <p className="font-bold text-slate-700 text-lg">No orders yet</p>
          <p className="text-slate-500 mt-2 mb-6">Create your first personalised storybook!</p>
          <Link
            href={`/${locale}/shop`}
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#5630D1] hover:bg-[#4927b5] text-white rounded-xl font-bold transition-all shadow-lg shadow-[#5630D1]/20"
          >
            <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
            Create a Story
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const statusInfo = STATUS_COLORS[order.status] || STATUS_COLORS['customization'];
            return (
              <div key={order.id} className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                {/* Photo */}
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 shadow-sm">
                  {order.photos?.[0] ? (
                    <img src={order.photos[0]} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <span className="material-symbols-outlined text-[24px]">child_care</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-extrabold text-slate-900">{order.child_name}</p>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${statusInfo.bg} ${statusInfo.text}`}>
                      {statusInfo.label}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 capitalize">{order.gender} · {order.language}</p>
                  <p className="text-xs text-slate-400 mt-1">{new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>

                {/* Price + ID */}
                <div className="text-right flex-shrink-0">
                  <p className="font-extrabold text-[#5630D1] text-lg">{order.total_price} EGP</p>
                  <p className="font-mono text-xs text-slate-400 uppercase mt-1">#{order.id.split('-')[0]}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
