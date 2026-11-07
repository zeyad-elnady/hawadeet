'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { useCart } from '@/context/CartContext';

export default function ShopForm({ shopDict, locale }: { shopDict: any, locale: string }) {
  const router = useRouter();
  const isAr = locale === 'ar';

  const [childName, setChildName] = useState('');
  const [language, setLanguage] = useState(isAr ? 'ar' : 'en');
  const [gender, setGender] = useState<'boy' | 'girl'>('boy');
  const [photos, setPhotos] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(true);
  const [format, setFormat] = useState<'hardcover' | 'pdf'>('hardcover');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addItem } = useCart();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (photos.length + newFiles.length > 5) {
        alert(isAr ? 'يمكنك رفع 5 صور كحد أقصى.' : 'You can upload up to 5 photos maximum.');
        return;
      }
      setPhotos([...photos, ...newFiles]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleAddToCart = () => {
    if (!childName.trim()) {
      alert(isAr ? 'يرجى إدخال اسم الطفل' : 'Please enter the child’s name');
      return;
    }
    if (photos.length < 3) {
      alert(isAr ? 'يرجى رفع 3 صور واضحة على الأقل لوجه الطفل' : 'Please upload at least 3 photos of the child’s face');
      return;
    }
    if (!privacyAccepted) {
      alert(isAr ? 'يرجى الموافقة على سياسة الخصوصية للمتابعة' : 'Please accept the privacy policy');
      return;
    }

    setAddingToCart(true);
    const previewUrls = photos.map((f) => URL.createObjectURL(f));
    addItem({
      childName,
      language: language as 'ar' | 'en',
      gender,
      photos,
      photoPreviewUrls: previewUrls,
      price: 1050,
    });

    setAddingToCart(false);
    alert(isAr ? 'تمت إضافة الكتاب إلى سلة التسوق بنجاح!' : 'Your custom book has been added to the cart!');
  };

  const handleSubmit = async () => {
    if (!childName.trim()) {
      alert(isAr ? 'يرجى إدخال اسم الطفل' : 'Please enter the child’s name');
      return;
    }
    if (photos.length < 3) {
      alert(isAr ? 'يرجى رفع 3 صور على الأقل لوجه الطفل' : 'Please upload at least 3 photos of the child’s face');
      return;
    }
    if (!privacyAccepted) {
      alert(isAr ? 'يرجى الموافقة على سياسة الخصوصية للمتابعة' : 'Please accept the privacy policy');
      return;
    }

    setLoading(true);
    try {
      let orderId = `ord_${Date.now()}`;
      try {
        const supabase = createClient();
        const uploadedUrls: string[] = [];

        for (const file of photos) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
          const filePath = `${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('order_photos')
            .upload(filePath, file);

          if (!uploadError) {
            const { data: urlData } = supabase.storage.from('order_photos').getPublicUrl(filePath);
            uploadedUrls.push(urlData.publicUrl);
          }
        }

        const { data: order, error: insertError } = await supabase
          .from('orders')
          .insert([
            {
              child_name: childName,
              language,
              gender,
              book_format: format,
              total_price: 1050,
              photos: uploadedUrls,
              status: 'customization',
            },
          ])
          .select()
          .single();

        if (order && !insertError) {
          orderId = order.id;
        }
      } catch (err) {
        console.warn('UI Local flow fallback:', err);
      }

      router.push(`/${locale}/shipping?order_id=${orderId}`);
    } catch (error) {
      console.error('Error saving order:', error);
      router.push(`/${locale}/shipping?order_id=local_order`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-start items-start">
      
      {/* Main Configuration Steps */}
      <div className="lg:col-span-8 space-y-8">
        
        {/* Step 1: Selected Book Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E3D7] shadow-xs">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-32 rounded-r-md rounded-l-xs overflow-hidden book-3d-shadow book-spine flex-shrink-0 bg-[#F5F2EA]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVmu1uSm0SflcBeJGxhBkK7PUWEikLEsGUysgdbx7dyJB0_ExRt_r1O-x9Hnjj5Km6dNLq326WGpvasgSFYSql0bdQ_jp0rn_tNJXLHZJ9RtbQjUgIBXynPOQ1gijU9HwASWVzun46hsA1jFhmJm7hF8Oe8Hb3KLTxaQrYgWYHl_gVf9WubUBAodK4M--pnwVnjWpSyYt98bwqmvEkggNh9irWhcTArwf8dYCAw2bt2qU9DLcLkvz0qQ9WGpEB4gc4ogH_2vJQy4o"
                alt="Book cover"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-center sm:text-start">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-[#E6F0EB] text-[#154734] mb-2">
                {shopDict.story_preview.badge}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#192520] font-headline">
                {shopDict.story_preview.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#566860] leading-relaxed mt-1 max-w-lg">
                {shopDict.story_preview.description}
              </p>
            </div>
            <Link
              href={`/${locale}/gallery`}
              className="text-xs font-bold text-[#154734] hover:text-[#0E2E22] px-4 py-2 rounded-full border border-[#D7D0C0] hover:border-[#154734] transition-colors whitespace-nowrap"
            >
              {shopDict.story_preview.change_story}
            </Link>
          </div>
        </div>

        {/* Step 2: Child Details */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E3D7] shadow-xs space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#EFEBE0]">
            <div className="w-10 h-10 rounded-full bg-[#154734] text-white flex items-center justify-center font-bold text-sm">
              1
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#192520] font-headline">
                {shopDict.child_details.title}
              </h3>
              <p className="text-xs text-[#566860]">
                {isAr ? 'سيتم طباعة هذا الاسم في القصة والغلاف' : 'This name will appear on the cover and throughout the story'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#192520] uppercase tracking-wider mb-2">
                {shopDict.child_details.name_label}
              </label>
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder={shopDict.child_details.name_placeholder}
                className="w-full px-5 py-3.5 rounded-xl border border-[#D7D0C0] text-[#192520] bg-[#FAF8F5] focus:outline-hidden focus:border-[#154734] focus:bg-white text-base font-semibold transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-[#192520] uppercase tracking-wider mb-2">
                  {shopDict.child_details.gender_label}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setGender('boy')}
                    className={`py-3 px-4 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                      gender === 'boy'
                        ? 'border-[#154734] bg-[#E6F0EB] text-[#154734]'
                        : 'border-[#E8E3D7] bg-[#FAF8F5] text-[#566860] hover:border-[#154734]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">boy</span>
                    <span>{shopDict.child_details.boy}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('girl')}
                    className={`py-3 px-4 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                      gender === 'girl'
                        ? 'border-[#842232] bg-[#F6EAEB] text-[#842232]'
                        : 'border-[#E8E3D7] bg-[#FAF8F5] text-[#566860] hover:border-[#842232]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">girl</span>
                    <span>{shopDict.child_details.girl}</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#192520] uppercase tracking-wider mb-2">
                  {shopDict.child_details.language_label}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setLanguage('ar')}
                    className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all ${
                      language === 'ar'
                        ? 'border-[#154734] bg-[#E6F0EB] text-[#154734]'
                        : 'border-[#E8E3D7] bg-[#FAF8F5] text-[#566860] hover:border-[#154734]'
                    }`}
                  >
                    العربية (Arabic)
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all ${
                      language === 'en'
                        ? 'border-[#154734] bg-[#E6F0EB] text-[#154734]'
                        : 'border-[#E8E3D7] bg-[#FAF8F5] text-[#566860] hover:border-[#154734]'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Photo Upload & Guidelines */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E3D7] shadow-xs space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#EFEBE0]">
            <div className="w-10 h-10 rounded-full bg-[#154734] text-white flex items-center justify-center font-bold text-sm">
              2
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#192520] font-headline">
                {shopDict.photo_upload.title}
              </h3>
              <p className="text-xs text-[#566860]">
                {shopDict.photo_upload.info}
              </p>
            </div>
          </div>

          {/* Photo Guideline Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#E6F0EB]/60 border border-[#C5DDD1] flex items-start gap-3">
              <span className="material-symbols-outlined text-[#154734] text-2xl">check_circle</span>
              <div className="text-xs">
                <span className="font-bold text-[#154734] block mb-0.5">{shopDict.photo_upload.perfect}</span>
                <p className="text-[#3A5C4F]">
                  {isAr ? 'وجه واضح مبتسم في ضوء النهار الطبيعي بدون فلاتر.' : 'Clear smiling face with natural lighting, no filters or hats.'}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F6EAEB]/60 border border-[#F1CCD1] flex items-start gap-3">
              <span className="material-symbols-outlined text-[#842232] text-2xl">cancel</span>
              <div className="text-xs">
                <span className="font-bold text-[#842232] block mb-0.5">{shopDict.photo_upload.avoid}</span>
                <p className="text-[#692A34]">
                  {isAr ? 'نظارات شمسية، إضاءة مظلمة، أو صور جماعية بعيدة.' : 'Sunglasses, hats, harsh shadows, or far-away group crops.'}
                </p>
              </div>
            </div>
          </div>

          {/* Upload Button & Dropzone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-[#D7D0C0] hover:border-[#154734] bg-[#FAF8F5] hover:bg-[#F5F2EA] rounded-2xl p-8 text-center cursor-pointer transition-colors"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept="image/*"
              className="hidden"
            />
            <div className="w-14 h-14 rounded-full bg-[#E6F0EB] text-[#154734] flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-3xl">add_photo_alternate</span>
            </div>
            <p className="text-sm font-bold text-[#192520]">
              {shopDict.photo_upload.upload_button}
            </p>
            <p className="text-xs text-[#7D8F86] mt-1">
              {isAr ? 'ارفع ٣ إلى ٥ صور (JPG أو PNG أو WebP)' : 'Upload 3 to 5 clear photos (JPG, PNG or WebP)'}
            </p>
          </div>

          {/* Uploaded Thumbnails */}
          {photos.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 pt-2">
              {photos.map((file, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-[#D7D0C0] shadow-xs group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(i)}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-[#842232] text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                  >
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Privacy Note */}
          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="privacy"
              checked={privacyAccepted}
              onChange={(e) => setPrivacyAccepted(e.target.checked)}
              className="w-4 h-4 text-[#154734] rounded border-stone-300 focus:ring-[#154734]"
            />
            <label htmlFor="privacy" className="text-xs text-[#566860] select-none">
              {shopDict.photo_upload.privacy_text}{' '}
              <span className="text-[#154734] font-bold underline cursor-pointer">
                {shopDict.photo_upload.privacy_link}
              </span>
            </label>
          </div>
        </div>

        {/* Step 4: Binding Selection */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E3D7] shadow-xs space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#EFEBE0]">
            <div className="w-10 h-10 rounded-full bg-[#154734] text-white flex items-center justify-center font-bold text-sm">
              3
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#192520] font-headline">
                {shopDict.book_format.title}
              </h3>
              <p className="text-xs text-[#566860]">
                {isAr ? 'مطبوع على ورق معتمد صديق للبيئة' : 'Printed on FSC-certified thick archival paper'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => setFormat('hardcover')}
              className={`p-5 rounded-2xl border cursor-pointer transition-all relative ${
                format === 'hardcover'
                  ? 'border-[#154734] bg-[#E6F0EB]/50 shadow-xs ring-1 ring-[#154734]'
                  : 'border-[#E8E3D7] bg-[#FAF8F5] hover:border-[#154734]'
              }`}
            >
              <div className="absolute top-3 right-3 bg-[#E5A93C] text-[#0E2E22] text-[10px] font-black uppercase px-2 py-0.5 rounded">
                {isAr ? 'موصى به' : 'Recommended'}
              </div>
              <span className="material-symbols-outlined text-2xl text-[#154734] mb-2">menu_book</span>
              <h4 className="font-bold text-sm text-[#192520]">
                {shopDict.book_format.hardcover_title}
              </h4>
              <p className="text-xs text-[#566860] mt-1 leading-relaxed">
                {shopDict.book_format.hardcover_desc}
              </p>
              <div className="mt-3 text-sm font-black text-[#154734]">
                1,050 ج.م
              </div>
            </div>

            <div
              onClick={() => setFormat('pdf')}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                format === 'pdf'
                  ? 'border-[#154734] bg-[#E6F0EB]/50 shadow-xs ring-1 ring-[#154734]'
                  : 'border-[#E8E3D7] bg-[#FAF8F5] hover:border-[#154734]'
              }`}
            >
              <span className="material-symbols-outlined text-2xl text-[#566860] mb-2">download_for_offline</span>
              <h4 className="font-bold text-sm text-[#192520]">
                {shopDict.book_format.pdf_title}
              </h4>
              <p className="text-xs text-[#566860] mt-1 leading-relaxed">
                {shopDict.book_format.pdf_desc}
              </p>
              <div className="mt-3 text-sm font-black text-[#566860]">
                450 ج.م
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Sticky Order Summary Sidebar */}
      <div className="lg:col-span-4 sticky top-28 space-y-6">
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E3D7] shadow-sm space-y-6">
          <h3 className="text-xl font-bold text-[#192520] font-headline pb-4 border-b border-[#EFEBE0]">
            {isAr ? 'ملخص كتابك المخصص' : 'Order Summary'}
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center text-[#566860]">
              <span>{isAr ? 'الكتاب:' : 'Story:'}</span>
              <span className="font-bold text-[#192520]">{shopDict.story_preview.title}</span>
            </div>
            <div className="flex justify-between items-center text-[#566860]">
              <span>{isAr ? 'بطل الحكاية:' : 'Hero Name:'}</span>
              <span className="font-bold text-[#154734]">{childName || (isAr ? '—' : '—')}</span>
            </div>
            <div className="flex justify-between items-center text-[#566860]">
              <span>{isAr ? 'التجليد:' : 'Format:'}</span>
              <span className="font-bold text-[#192520]">
                {format === 'hardcover' ? (isAr ? 'غلاف مقوى فاخر' : 'Hardcover') : 'PDF'}
              </span>
            </div>
            <div className="flex justify-between items-center text-[#566860]">
              <span>{isAr ? 'تغليف الهدايا:' : 'Gift Wrap:'}</span>
              <span className="font-bold text-[#154734]">{isAr ? 'مجاني مشمول' : 'Free Included'}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#EFEBE0] flex justify-between items-baseline">
            <span className="text-base font-bold text-[#192520]">{shopDict.summary.total_label}</span>
            <span className="text-2xl font-black text-[#154734]">
              {format === 'hardcover' ? '1,050' : '450'} {shopDict.summary.currency}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-4 rounded-full bg-[#154734] hover:bg-[#0E2E22] text-white font-bold text-base transition-all shadow-md hover:scale-[1.02] active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>{isAr ? 'جاري التجهيز...' : 'Preparing...'}</span>
              ) : (
                <>
                  <span>{shopDict.summary.button}</span>
                  <span className="material-symbols-outlined text-[18px]">
                    {isAr ? 'arrow_back' : 'arrow_forward'}
                  </span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={addingToCart}
              className="w-full py-3 rounded-full bg-white hover:bg-[#FAF8F5] text-[#154734] font-bold text-sm border-2 border-[#154734] transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
              <span>{isAr ? 'أضف للسلة وأنشئ كتاباً آخر' : 'Add to Cart & Create Another'}</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-4 border-t border-[#EFEBE0] space-y-2 text-xs text-[#566860]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#154734] text-[16px]">verified</span>
              <span>{isAr ? 'معاينة رقمية مجانية كاملة قبل الطباعة' : '100% digital preview before final print'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#154734] text-[16px]">local_shipping</span>
              <span>{isAr ? 'توصيل سريع حتى باب المنزل' : 'Fast doorstep delivery with tracking'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#154734] text-[16px]">sentiment_satisfied</span>
              <span>{isAr ? 'ضمان الرضا واسترداد المبلغ بالكامل' : '100% Happiness Money-back Guarantee'}</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
