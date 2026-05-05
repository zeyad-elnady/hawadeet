'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  const [activeTab, setActiveTab] = useState('orders'); // orders, stories, categories, users
  
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const supabase = useMemo(() => {
    try { return createClient(); } catch { return null; }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'hawadeetadmin') {
      setIsAuthenticated(true);
      fetchOrders();
    } else {
      alert('Invalid password');
    }
  };

  const fetchOrders = async () => {
    if (!supabase) { setLoading(false); return; }
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching orders:', error);
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    if (!supabase) return;
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);
      
    if (error) {
      alert('Failed to update status');
      console.error(error);
    } else {
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'customization': return 'bg-slate-100 text-slate-600';
      case 'payment_pending': return 'bg-orange-100 text-orange-700';
      case 'paid_pending': return 'bg-blue-100 text-blue-700';
      case 'processing': return 'bg-purple-100 text-purple-700';
      case 'shipped': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4" dir="ltr">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border border-slate-200">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#5630D1]/10 text-[#5630D1] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[32px]">admin_panel_settings</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
            <p className="text-slate-500 mt-2">Enter password to access dashboard</p>
          </div>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password" 
            className="w-full h-12 px-4 border border-slate-300 rounded-lg mb-4 focus:ring-2 focus:ring-[#5630D1] outline-none"
          />
          <button type="submit" className="w-full h-12 bg-[#5630D1] hover:bg-[#4927b5] text-white rounded-lg font-bold transition-colors">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50" dir="ltr">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-20">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#5630D1] to-[#9333ea] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md">
            H
          </div>
          <span className="font-extrabold text-slate-900 text-xl tracking-tight">Hawadeet</span>
        </div>
        
        <div className="p-4 flex flex-col gap-2 flex-1">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2 mt-4">Menu</div>
          
          <button 
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'orders' ? 'bg-[#5630D1]/10 text-[#5630D1]' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
            Orders Dashboard
          </button>
          
          <button 
            onClick={() => setActiveTab('stories')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'stories' ? 'bg-[#5630D1]/10 text-[#5630D1]' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <span className="material-symbols-outlined text-[20px]">auto_stories</span>
            Add New Story
          </button>
          
          <button 
            onClick={() => setActiveTab('categories')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'categories' ? 'bg-[#5630D1]/10 text-[#5630D1]' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <span className="material-symbols-outlined text-[20px]">category</span>
            Categories
          </button>
          
          <button 
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'users' ? 'bg-[#5630D1]/10 text-[#5630D1]' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <span className="material-symbols-outlined text-[20px]">group</span>
            Customers
          </button>
          
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2 mt-6">Settings</div>
          
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'settings' ? 'bg-[#5630D1]/10 text-[#5630D1]' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
            Site Settings
          </button>
        </div>
        
        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all w-full"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto w-full">
        <div className="max-w-7xl mx-auto">
          
          {/* ----------------- ORDERS TAB ----------------- */}
          {activeTab === 'orders' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold text-slate-900">Orders Dashboard</h1>
                  <p className="text-slate-500 mt-1">Manage and track all customer orders</p>
                </div>
                <button onClick={fetchOrders} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 shadow-sm transition-colors font-bold text-sm">
                  <span className="material-symbols-outlined text-[18px]">refresh</span>
                  Refresh Data
                </button>
              </div>

              <div className="mb-6 relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <input 
                  type="text" 
                  placeholder="Search by ID, child name, or phone number..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#5630D1] outline-none shadow-sm"
                />
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-sm text-slate-500 uppercase tracking-wider">
                        <th className="p-4 font-bold">Order ID / Date</th>
                        <th className="p-4 font-bold">Child Details</th>
                        <th className="p-4 font-bold">Payment</th>
                        <th className="p-4 font-bold">Status</th>
                        <th className="p-4 font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {loading ? (
                        <tr>
                          <td colSpan={5} className="p-12 text-center text-slate-500">
                            <span className="animate-spin material-symbols-outlined text-[32px] text-[#5630D1]">progress_activity</span>
                          </td>
                        </tr>
                      ) : orders.filter(order => {
                          if (!searchQuery) return true;
                          const q = searchQuery.toLowerCase();
                          const shortId = order.id.split('-')[0].toLowerCase();
                          const childName = (order.child_name || '').toLowerCase();
                          const phone = (order.shipping_phone || '').toLowerCase();
                          return shortId.includes(q) || childName.includes(q) || phone.includes(q) || order.id.toLowerCase().includes(q);
                        }).length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-12 text-center text-slate-500 font-medium">No orders found matching your search.</td>
                        </tr>
                      ) : (
                        orders.filter(order => {
                          if (!searchQuery) return true;
                          const q = searchQuery.toLowerCase();
                          const shortId = order.id.split('-')[0].toLowerCase();
                          const childName = (order.child_name || '').toLowerCase();
                          const phone = (order.shipping_phone || '').toLowerCase();
                          return shortId.includes(q) || childName.includes(q) || phone.includes(q) || order.id.toLowerCase().includes(q);
                        }).map((order) => (
                          <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-4">
                              <div className="font-mono text-sm font-bold text-[#5630D1] mb-1 uppercase">#{order.id.split('-')[0]}</div>
                              <div className="text-sm text-slate-500">{new Date(order.created_at).toLocaleString()}</div>
                            </td>
                            <td className="p-4">
                              <div className="font-bold text-slate-900">{order.child_name}</div>
                              <div className="text-xs text-slate-500 font-medium capitalize mt-0.5">{order.gender} • {order.language}</div>
                            </td>
                            <td className="p-4">
                              <div className="font-bold text-slate-700">{order.total_price} EGP</div>
                              <div className="text-xs text-slate-500 font-bold uppercase flex items-center gap-1 mt-0.5">
                                {order.payment_method === 'wallet' ? <span className="material-symbols-outlined text-[14px]">account_balance_wallet</span> : <span className="material-symbols-outlined text-[14px]">local_shipping</span>}
                                {order.payment_method || 'N/A'}
                              </div>
                            </td>
                            <td className="p-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(order.status)}`}>
                                {order.status.replace('_', ' ')}
                              </span>
                            </td>
                            <td className="p-4">
                              <button 
                                onClick={() => setSelectedOrder(order)}
                                className="px-4 py-2 bg-[#5630D1]/10 text-[#5630D1] hover:bg-[#5630D1] hover:text-white rounded-lg text-sm font-bold transition-colors"
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ----------------- ADD NEW STORY TAB ----------------- */}
          {activeTab === 'stories' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
              <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900">Add New Story</h1>
                <p className="text-slate-500 mt-1">Create a new customizable adventure for the shop</p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2 col-span-2 md:col-span-1">
                      <label className="text-sm font-bold text-slate-700">Story Title (English)</label>
                      <input type="text" placeholder="e.g. The Magical Forest" className="w-full h-12 px-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#5630D1] outline-none" />
                    </div>
                    <div className="space-y-2 col-span-2 md:col-span-1">
                      <label className="text-sm font-bold text-slate-700">Story Title (Arabic)</label>
                      <input type="text" placeholder="مثال: الغابة السحرية" dir="rtl" className="w-full h-12 px-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#5630D1] outline-none text-right" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Story Description</label>
                    <textarea rows={4} placeholder="Describe the adventure..." className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#5630D1] outline-none"></textarea>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Category</label>
                      <select className="w-full h-12 px-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#5630D1] outline-none bg-white">
                        <option>Fantasy</option>
                        <option>Space</option>
                        <option>Educational</option>
                        <option>Bedtime</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Price (EGP)</label>
                      <input type="number" defaultValue="1050" className="w-full h-12 px-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#5630D1] outline-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Cover Image</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-10 flex flex-col items-center justify-center text-slate-500 hover:border-[#5630D1] hover:bg-[#5630D1]/5 transition-colors cursor-pointer">
                      <span className="material-symbols-outlined text-[32px] mb-2">add_photo_alternate</span>
                      <p className="font-bold">Click to upload cover photo</p>
                      <p className="text-sm mt-1">Recommended size: 1080x1080</p>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end gap-3">
                    <button className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors">Cancel</button>
                    <button className="px-8 py-3 rounded-xl font-bold text-white bg-[#5630D1] hover:bg-[#4927b5] shadow-lg shadow-[#5630D1]/20 transition-all">Save Story</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ----------------- CATEGORIES TAB ----------------- */}
          {activeTab === 'categories' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-extrabold text-slate-900">Categories</h1>
                  <p className="text-slate-500 mt-1">Manage story genres and collections</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-[#5630D1] text-white rounded-xl font-bold shadow-lg shadow-[#5630D1]/20 hover:bg-[#4927b5] transition-all">
                  <span className="material-symbols-outlined text-[20px]">add</span>
                  New Category
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['Fantasy Adventures', 'Space Exploration', 'Bedtime Stories', 'Educational Journeys'].map((cat, i) => (
                  <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-[#5630D1]/10 text-[#5630D1] rounded-xl flex items-center justify-center mb-4">
                      <span className="material-symbols-outlined">category</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{cat}</h3>
                    <p className="text-slate-500 text-sm mb-4">12 active stories</p>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 bg-slate-50 text-slate-600 font-bold text-sm rounded-lg hover:bg-slate-100 transition-colors">Edit</button>
                      <button className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ----------------- CUSTOMERS TAB ----------------- */}
          {activeTab === 'users' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900">Customers</h1>
                <p className="text-slate-500 mt-1">View user database (Mockup)</p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
                <span className="material-symbols-outlined text-[64px] text-slate-200 mb-4">group</span>
                <h3 className="text-xl font-bold text-slate-700">Customer Database</h3>
                <p className="text-slate-500 mt-2 max-w-md mx-auto">This section would list all registered customers and their order history. For now, it's just a placeholder.</p>
              </div>
            </div>
          )}
          
          {/* ----------------- SETTINGS TAB ----------------- */}
          {activeTab === 'settings' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
              <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900">Site Settings</h1>
                <p className="text-slate-500 mt-1">Manage global preferences</p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Base Price (EGP)</h3>
                  <input type="number" defaultValue="1050" className="w-full max-w-xs h-12 px-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#5630D1] outline-none" />
                </div>
                <div className="border-t border-slate-100 pt-6">
                  <h3 className="font-bold text-slate-900 mb-2">Accepting Orders</h3>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className="relative">
                      <input type="checkbox" className="sr-only" defaultChecked />
                      <div className="w-10 h-6 bg-[#5630D1] rounded-full"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform translate-x-4"></div>
                    </div>
                    <span className="text-slate-600 font-medium">Store is open and accepting new orders</span>
                  </label>
                </div>
                <div className="border-t border-slate-100 pt-6">
                  <button className="px-6 py-3 rounded-xl font-bold text-white bg-[#5630D1] hover:bg-[#4927b5] shadow-lg shadow-[#5630D1]/20 transition-all">Save Changes</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* ----------------- ORDER DETAILS MODAL ----------------- */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-200">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between z-10">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  Order Details
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status.replace('_', ' ')}
                  </span>
                </h2>
                <p className="text-sm text-[#5630D1] font-mono font-bold mt-1 uppercase">#{selectedOrder.id.split('-')[0]}</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Left Column */}
              <div className="space-y-8">
                {/* Status Update */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Update Order Status</label>
                  <select 
                    value={selectedOrder.status}
                    onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                    className="w-full h-12 px-4 bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-[#5630D1] font-medium"
                  >
                    <option value="customization">Customization (Incomplete)</option>
                    <option value="payment_pending">Payment Pending (No Shipping)</option>
                    <option value="paid_pending">Paid Pending (Needs Review)</option>
                    <option value="processing">Processing (Making Book)</option>
                    <option value="shipped">Shipped</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Child Details */}
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">child_care</span> Child Details
                  </h3>
                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="grid grid-cols-2 divide-x divide-slate-100">
                      <div className="p-4">
                        <p className="text-xs text-slate-500 mb-1">Name</p>
                        <p className="font-bold text-slate-900">{selectedOrder.child_name}</p>
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-slate-500 mb-1">Language</p>
                        <p className="font-bold text-slate-900 capitalize">{selectedOrder.language}</p>
                      </div>
                      <div className="p-4 border-t border-slate-100">
                        <p className="text-xs text-slate-500 mb-1">Gender</p>
                        <p className="font-bold text-slate-900 capitalize">{selectedOrder.gender}</p>
                      </div>
                      <div className="p-4 border-t border-slate-100">
                        <p className="text-xs text-slate-500 mb-1">Format</p>
                        <p className="font-bold text-slate-900 capitalize">{selectedOrder.book_format}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Photos */}
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">photo_library</span> Uploaded Photos
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {selectedOrder.photos && selectedOrder.photos.length > 0 ? (
                      selectedOrder.photos.map((url: string, i: number) => (
                        <a key={i} href={url} target="_blank" rel="noreferrer" className="aspect-square rounded-xl overflow-hidden border border-slate-200 hover:ring-2 hover:ring-[#5630D1] transition-all">
                          <img src={url} alt={`Child photo ${i+1}`} className="w-full h-full object-cover" />
                        </a>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500 col-span-3">No photos uploaded.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Shipping Details */}
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">local_shipping</span> Shipping Details
                  </h3>
                  {selectedOrder.shipping_name ? (
                    <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-sm">
                      <div><span className="text-slate-500 text-sm">Name:</span> <span className="font-semibold text-slate-900 ml-1">{selectedOrder.shipping_name}</span></div>
                      <div><span className="text-slate-500 text-sm">Phone:</span> <span className="font-semibold text-slate-900 ml-1">{selectedOrder.shipping_phone}</span></div>
                      <div><span className="text-slate-500 text-sm">City:</span> <span className="font-semibold text-slate-900 ml-1">{selectedOrder.shipping_city}</span></div>
                      <div><span className="text-slate-500 text-sm">Address:</span> <span className="font-semibold text-slate-900 ml-1">{selectedOrder.shipping_address}</span></div>
                      <div><span className="text-slate-500 text-sm">Building/Apt:</span> <span className="font-semibold text-slate-900 ml-1">{selectedOrder.shipping_building}</span></div>
                      {selectedOrder.shipping_notes && (
                        <div className="pt-3 border-t border-slate-100 mt-2">
                          <span className="text-slate-500 text-sm block mb-1">Notes:</span>
                          <p className="text-sm bg-slate-50 p-3 rounded-lg text-slate-700">{selectedOrder.shipping_notes}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-orange-50 text-orange-600 p-4 rounded-xl text-sm font-medium border border-orange-100">
                      Shipping details not completed by customer yet.
                    </div>
                  )}
                </div>

                {/* Payment Details */}
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">payments</span> Payment Details
                  </h3>
                  {selectedOrder.payment_method ? (
                    <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-sm">Method:</span>
                        <span className="font-bold uppercase bg-slate-100 px-3 py-1 rounded-full text-xs text-slate-700">{selectedOrder.payment_method}</span>
                      </div>
                      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                        <span className="text-slate-500 text-sm">Total Price:</span>
                        <span className="font-bold text-lg text-[#5630D1]">{selectedOrder.total_price} EGP</span>
                      </div>
                      
                      {selectedOrder.payment_method === 'wallet' && (
                        <div>
                          <span className="text-slate-500 text-sm block mb-2">Payment Receipt:</span>
                          {selectedOrder.payment_receipt_url ? (
                            <a href={selectedOrder.payment_receipt_url} target="_blank" rel="noreferrer" className="block relative w-full aspect-video rounded-xl overflow-hidden border border-slate-200 hover:ring-2 hover:ring-[#5630D1] transition-all group shadow-sm">
                              <img src={selectedOrder.payment_receipt_url} alt="Receipt" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="bg-white text-slate-900 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2">
                                  <span className="material-symbols-outlined text-[18px]">open_in_new</span> View Full Image
                                </span>
                              </div>
                            </a>
                          ) : (
                            <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">No receipt uploaded.</p>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-orange-50 text-orange-600 p-4 rounded-xl text-sm font-medium border border-orange-100">
                      Payment details not completed by customer yet.
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
