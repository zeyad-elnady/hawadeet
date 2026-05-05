'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { useCart } from '@/context/CartContext';
import kidHatImg from '../app/assets/kid_hat.png';
import kidSunglassesImg from '../app/assets/kid_sunglasses.png';

export default function ShopForm({ shopDict, locale }: { shopDict: any, locale: string }) {
  const [childName, setChildName] = useState('');
  const [language, setLanguage] = useState('ar');
  const [gender, setGender] = useState('boy');
  const [photos, setPhotos] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();
  const { addItem } = useCart();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (photos.length + newFiles.length > 5) {
        alert('يمكنك رفع 5 صور كحد أقصى.');
        return;
      }
      setPhotos([...photos, ...newFiles]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!childName.trim()) {
      alert('يرجى إدخال اسم الطفل');
      return;
    }
    if (photos.length < 3) {
      alert('يرجى رفع 3 صور على الأقل');
      return;
    }
    if (!privacyAccepted) {
      alert('يرجى الموافقة على سياسة الخصوصية للمتابعة / Please accept the privacy policy');
      return;
    }

    setLoading(true);
    try {
      const uploadedUrls: string[] = [];
      
      // Upload photos
      for (const file of photos) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('order_photos')
          .upload(filePath, file);

        if (uploadError) throw uploadError;
        
        const { data: urlData } = supabase.storage.from('order_photos').getPublicUrl(filePath);
        uploadedUrls.push(urlData.publicUrl);
      }
      
      // Insert order
      const totalPrice = 1050;
      
      const { data: order, error: insertError } = await supabase
        .from('orders')
        .insert([{
          child_name: childName,
          language: language,
          gender: gender,
          book_format: 'hardcover',
          total_price: totalPrice,
          photos: uploadedUrls,
          status: 'customization'
        }])
        .select()
        .single();
        
      if (insertError) throw insertError;
      
      window.location.href = `/${locale}/shipping?order_id=${order.id}`;
      
    } catch (error) {
      console.error('Error saving order:', error);
      alert('حدث خطأ أثناء حفظ الطلب. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!childName.trim()) { alert('يرجى إدخال اسم الطفل'); return; }
    if (photos.length < 3) { alert('يرجى رفع 3 صور على الأقل'); return; }
    if (!privacyAccepted) { alert('يرجى الموافقة على سياسة الخصوصية للمتابعة'); return; }
    const previewUrls = photos.map(f => URL.createObjectURL(f));
    addItem({
      childName,
      language: language as 'ar' | 'en',
      gender: gender as 'boy' | 'girl',
      photos,
      photoPreviewUrls: previewUrls,
      price: 1050,
    });
    // Reset form for next book
    setChildName('');
    setPhotos([]);
    setPrivacyAccepted(false);
  };

  const totalPrice = 1050;

  return (
    <>
      <div className="space-y-8 w-full relative z-10">
        
        {/* Story Preview Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-center gap-6 hover:shadow-md transition-shadow duration-300 text-start">
          <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 shadow-sm">
            <img alt={shopDict.story_preview.title} className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVmu1uSm0SflcBeJGxhBkK7PUWEikLEsGUysgdbx7dyJB0_ExRt_r1O-x9Hnjj5Km6dNLq326WGpvasgSFYSql0bdQ_jp0rn_tNJXLHZJ9RtbQjUgIBXynPOQ1gijU9HwASWVzun46hsA1jFhmJm7hF8Oe8Hb3KLTxaQrYgWYHl_gVf9WubUBAodK4M--pnwVnjWpSyYt98bwqmvEkggNh9irWhcTArwf8dYCAw2bt2qU9DLcLkvz0qQ9WGpEB4gc4ogH_2vJQy4o" />
          </div>
          <div className="text-center sm:text-start flex-1">
            <p className="text-[#5630D1] text-xs font-bold mb-1 uppercase tracking-wider">{shopDict.story_preview.badge}</p>
            <h3 className="text-xl font-bold text-slate-900 mb-1">{shopDict.story_preview.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed max-w-md me-auto">{shopDict.story_preview.description}</p>
          </div>
          <div className="sm:ms-auto mt-4 sm:mt-0">
            <Link href={`/${locale}/gallery`} className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-slate-50 text-slate-600 border border-slate-200 text-sm font-semibold hover:bg-slate-100 hover:text-slate-900 transition-colors">
              <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
              {shopDict.story_preview.change_story}
            </Link>
          </div>
        </div>

        {/* Child Details Form */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8 text-start">
            <div className="w-8 h-8 rounded-full bg-[#5630D1]/10 flex items-center justify-center text-[#5630D1]">
              <span className="material-symbols-outlined text-[18px]">person</span>
            </div>
            <h4 className="text-xl font-bold text-slate-900">{shopDict.child_details.title}</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Name */}
            <div className="space-y-2 text-start">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-1" htmlFor="child-name">
                <span>{shopDict.child_details.name_label}</span>
                <span className="text-red-500">*</span>
              </label>
              <input 
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                className="w-full h-12 bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#5630D1] focus:border-[#5630D1] px-4 font-medium text-slate-900 placeholder-slate-400 transition-shadow outline-none text-start" 
                id="child-name" 
                placeholder={shopDict.child_details.name_placeholder} 
                type="text" 
              />
            </div>
            
            {/* Language Selection */}
            <div className="space-y-2 text-start">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-1" htmlFor="language">
                <span>{shopDict.child_details.language_label}</span>
              </label>
              <div className="relative">
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full h-12 bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#5630D1] focus:border-[#5630D1] px-4 font-medium text-slate-900 appearance-none transition-shadow outline-none cursor-pointer text-start pe-10" 
                  id="language"
                >
                  <option value="ar">العربية</option>
                  <option value="en">الإنجليزية (English)</option>
                  <option value="fr">الفرنسية (Français)</option>
                </select>
                <div className="absolute end-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <span className="material-symbols-outlined text-slate-400 text-sm">expand_more</span>
                </div>
              </div>
            </div>
            
            {/* Gender Selection */}
            <div className="md:col-span-2 space-y-3 text-start">
              <label className="text-sm font-semibold text-slate-700 block">{shopDict.child_details.gender_label}</label>
              <div className="grid grid-cols-2 gap-4">
                <label className="relative cursor-pointer group">
                  <input 
                    checked={gender === 'boy'}
                    onChange={() => setGender('boy')}
                    className="custom-radio hidden peer" 
                    name="gender" 
                    type="radio" 
                    value="boy" 
                  />
                  <div className="flex items-center justify-center gap-3 p-4 bg-white border border-slate-200 rounded-lg peer-checked:border-[#06b6d4] peer-checked:bg-[#06b6d4]/5 hover:border-[#06b6d4]/30 transition-all">
                    <span className="material-symbols-outlined text-[20px] text-slate-400 peer-checked:text-[#06b6d4]">face</span>
                    <span className="font-semibold text-slate-600 peer-checked:text-[#06b6d4]">{shopDict.child_details.boy}</span>
                  </div>
                </label>
                <label className="relative cursor-pointer group">
                  <input 
                    checked={gender === 'girl'}
                    onChange={() => setGender('girl')}
                    className="custom-radio hidden peer" 
                    name="gender" 
                    type="radio" 
                    value="girl" 
                  />
                  <div className="flex items-center justify-center gap-3 p-4 bg-white border border-slate-200 rounded-lg peer-checked:border-[#9333ea] peer-checked:bg-[#9333ea]/5 hover:border-[#9333ea]/30 transition-all">
                    <span className="material-symbols-outlined text-[20px] text-slate-400 peer-checked:text-[#9333ea]">face_3</span>
                    <span className="font-semibold text-slate-600 peer-checked:text-[#9333ea]">{shopDict.child_details.girl}</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Upload Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6 text-start">
            <div className="w-8 h-8 rounded-full bg-[#5630D1]/10 flex items-center justify-center text-[#5630D1]">
              <span className="material-symbols-outlined text-[18px]">photo_camera</span>
            </div>
            <h4 className="text-xl font-bold text-slate-900">{shopDict.photo_upload.title}</h4>
          </div>
          
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-6 flex items-start gap-3">
            <span className="material-symbols-outlined text-[#5630D1] text-[20px] mt-0.5">info</span>
            <p className="text-sm text-slate-600 leading-relaxed text-start">
              {shopDict.photo_upload.info}
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              multiple 
              onChange={handleFileChange} 
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square rounded-xl border-2 border-dashed border-slate-300 hover:border-[#5630D1] hover:bg-[#5630D1]/5 transition-colors flex flex-col items-center justify-center gap-2 group"
            >
              <span className="material-symbols-outlined text-[28px] text-slate-400 group-hover:text-[#5630D1] transition-colors">add_photo_alternate</span>
              <span className="text-xs font-semibold text-slate-500 group-hover:text-[#5630D1] transition-colors">{shopDict.photo_upload.upload_button}</span>
            </button>
            
            {photos.map((photo, i) => (
              <div key={i} className="aspect-square rounded-xl bg-slate-50 border border-slate-200 relative overflow-hidden group">
                <img src={URL.createObjectURL(photo)} alt="preview" className="w-full h-full object-cover" />
                <button 
                  onClick={() => removePhoto(i)}
                  className="absolute top-1 right-1 w-6 h-6 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-50"
                >
                  <span className="material-symbols-outlined text-[16px] text-red-500">close</span>
                </button>
              </div>
            ))}
            
            {/* Empty Placeholders */}
            {Array.from({ length: Math.max(0, 3 - photos.length) }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-slate-300 text-2xl">image</span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <button 
              type="button"
              onClick={() => setPrivacyAccepted(!privacyAccepted)}
              className="flex items-center gap-3 text-start group w-full"
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${privacyAccepted ? 'bg-green-500 text-white shadow-sm' : 'bg-slate-50 border border-slate-300 text-transparent group-hover:border-green-400 group-hover:bg-green-50'}`}>
                <span className="material-symbols-outlined text-[16px]">check</span>
              </div>
              <span className="text-sm text-slate-600 font-medium">
                {shopDict.photo_upload.privacy_text} <Link href={`/${locale}/privacy`} className="text-[#5630D1] underline underline-offset-2 hover:text-[#4927b5]" onClick={(e) => e.stopPropagation()}>{shopDict.photo_upload.privacy_link}</Link>.
              </span>
            </button>
          </div>
        </div>

        {/* Photo Guidelines Section */}
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-6 text-start">
            <div className="w-1 h-6 bg-[#5630D1] rounded-full"></div>
            <h4 className="text-xl font-bold text-slate-900">{shopDict.photo_upload.guidelines_title}</h4>
          </div>
          
          <div className="bg-[#FCFAF8] border border-slate-200/60 rounded-2xl p-6 sm:p-8">
            {/* Avoid These */}
            <div className="mb-10 text-start">
              <div className="flex items-center gap-2 mb-6 text-red-500">
                <span className="material-symbols-outlined text-xl">cancel</span>
                <h5 className="font-bold text-lg">{shopDict.photo_upload.avoid}</h5>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-items-center">
                {/* Kid 1 - Hat */}
                <div className="relative">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-red-100 overflow-hidden bg-white shadow-sm">
                    <Image src={kidHatImg} alt="Avoid hat" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute top-0 end-0 sm:top-1 sm:end-1 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center border-2 border-white shadow-md">
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </div>
                </div>
                
                {/* Kid 2 - Sunglasses */}
                <div className="relative">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-red-100 overflow-hidden bg-white shadow-sm">
                    <Image src={kidSunglassesImg} alt="Avoid sunglasses" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute top-0 end-0 sm:top-1 sm:end-1 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center border-2 border-white shadow-md">
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </div>
                </div>
                
                {/* Kid 3 - Hand on face */}
                <div className="relative">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-red-100 overflow-hidden bg-white shadow-sm">
                    <img src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=150&h=150&fit=crop" alt="Avoid covered face" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute top-0 end-0 sm:top-1 sm:end-1 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center border-2 border-white shadow-md">
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </div>
                </div>
                
                {/* Kid 4 - Group */}
                <div className="relative">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-red-100 overflow-hidden bg-white shadow-sm">
                    <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=150&h=150&fit=crop" alt="Avoid groups" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute top-0 end-0 sm:top-1 sm:end-1 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center border-2 border-white shadow-md">
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Perfect Photos */}
            <div className="text-start">
              <div className="flex items-center gap-2 mb-6 text-green-500">
                <span className="material-symbols-outlined text-xl">check_circle</span>
                <h5 className="font-bold text-lg">{shopDict.photo_upload.perfect}</h5>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-items-center">
                {/* Perfect 1 */}
                <div className="relative">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-green-100 overflow-hidden bg-white shadow-sm">
                    <img src="https://images.unsplash.com/photo-1604004555489-723a93d6ce74?w=150&h=150&fit=crop" alt="Perfect photo" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute top-0 end-0 sm:top-1 sm:end-1 bg-green-500 text-white rounded-full w-7 h-7 flex items-center justify-center border-2 border-white shadow-md">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </div>
                </div>
                
                {/* Perfect 2 */}
                <div className="relative">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-green-100 overflow-hidden bg-white shadow-sm">
                    <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=150&h=150&fit=crop" alt="Perfect photo" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute top-0 end-0 sm:top-1 sm:end-1 bg-green-500 text-white rounded-full w-7 h-7 flex items-center justify-center border-2 border-white shadow-md">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </div>
                </div>
                
                {/* Perfect 3 */}
                <div className="relative">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-green-100 overflow-hidden bg-white shadow-sm">
                    <img src="https://images.unsplash.com/photo-1519456264917-42d0aa2e0625?w=150&h=150&fit=crop" alt="Perfect photo" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute top-0 end-0 sm:top-1 sm:end-1 bg-green-500 text-white rounded-full w-7 h-7 flex items-center justify-center border-2 border-white shadow-md">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </div>
                </div>
                
                {/* Perfect 4 */}
                <div className="relative">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-green-100 overflow-hidden bg-white shadow-sm">
                    <img src="https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=150&h=150&fit=crop" alt="Perfect photo" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute top-0 end-0 sm:top-1 sm:end-1 bg-green-500 text-white rounded-full w-7 h-7 flex items-center justify-center border-2 border-white shadow-md">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Modern Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 sm:p-6 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-start">
            <div className="text-start">
              <p className="text-sm font-medium text-slate-500">{shopDict.summary.total_label}</p>
              <p className="text-2xl font-extrabold text-slate-900">{totalPrice} {shopDict.summary.currency}</p>
            </div>
            
            <div className="hidden sm:flex items-center gap-4 text-xs text-slate-500 border-s border-slate-200 ps-6">
              <div className="flex flex-col items-start gap-1">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px] text-green-500">check_circle</span> {shopDict.summary.free_gift_wrap}</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px] text-[#06b6d4]">local_shipping</span> {shopDict.summary.shipping_later}</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleAddToCart}
            disabled={loading || addingToCart}
            className="w-full sm:w-auto px-6 py-3.5 bg-white border-2 border-[#5630D1] text-[#5630D1] hover:bg-[#5630D1]/5 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
            Add to Cart
          </button>

          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="w-full sm:w-auto px-10 py-3.5 bg-[#5630D1] hover:bg-[#4927b5] text-white rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#5630D1]/20 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="animate-spin material-symbols-outlined text-[18px]">progress_activity</span>
            ) : (
              <>
                <span>{shopDict.summary.button}</span>
                <span className="material-symbols-outlined text-[18px] rtl:-scale-x-100">arrow_forward</span>
              </>
            )}
          </button>
          
        </div>
      </div>
    </>
  );
}
