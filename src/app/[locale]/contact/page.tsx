'use client';

import { use } from 'react';
import { Locale } from '@/i18n-config';

export default function Contact({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params) as { locale: Locale };
  const isAr = locale === 'ar';

  return (
    <main className="pt-26 sm:pt-30 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Editorial Header */}
      <div className="mb-14 text-start max-w-2xl">
        <span className="inline-block px-3 py-1 bg-[#E6F0EB] text-[#154734] rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          {isAr ? 'فريق خدمة العائلات' : 'Customer Concierge'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#192520] tracking-tight leading-tight font-headline">
          {isAr ? (
            <>نحن هنا لمساعدتك في صنع <span className="text-[#842232] italic">أجمل هدية</span>.</>
          ) : (
            <>We are here to help you create an <span className="text-[#842232] italic">unforgettable gift</span>.</>
          )}
        </h1>
        <p className="text-sm sm:text-base text-[#566860] mt-3 leading-relaxed font-body">
          {isAr
            ? 'لديك استفسار حول قصة مخصصة، مواعيد التوصيل، أو ترغب في مساعدة في رفع صور طفلك؟ فريقنا يسعد بالإجابة عليك فوراً.'
            : 'Have questions about story personalization, shipping times, or need assistance selecting the best photo? Our concierge team is ready to help.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start text-start">
        
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-7 sm:p-10 rounded-3xl border border-[#E8E3D7] shadow-xs">
          <form onSubmit={(e) => { e.preventDefault(); alert(isAr ? 'شكراً لتواصلك معنا! سنرد عليك في أقرب وقت.' : 'Thank you for reaching out! We will reply promptly.'); }} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#192520] uppercase tracking-wider mb-2">
                  {isAr ? 'الاسم بالكامل' : 'Your Full Name'} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={isAr ? 'سارة محمد' : 'e.g. Sarah Mohamed'}
                  className="w-full px-4 py-3 rounded-xl border border-[#D7D0C0] text-[#192520] bg-[#FAF8F5] focus:outline-hidden focus:border-[#154734] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#192520] uppercase tracking-wider mb-2">
                  {isAr ? 'البريد الإلكتروني' : 'Email Address'} *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-[#D7D0C0] text-[#192520] bg-[#FAF8F5] focus:outline-hidden focus:border-[#154734] text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#192520] uppercase tracking-wider mb-2">
                {isAr ? 'موضوع الرسالة أو رقم الطلب' : 'Subject or Order Reference'}
              </label>
              <input
                type="text"
                placeholder={isAr ? 'استفسار عن الشحن / طلب مخصص' : 'Shipping question / Custom dedication'}
                className="w-full px-4 py-3 rounded-xl border border-[#D7D0C0] text-[#192520] bg-[#FAF8F5] focus:outline-hidden focus:border-[#154734] text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#192520] uppercase tracking-wider mb-2">
                {isAr ? 'رسالتك' : 'Your Message'} *
              </label>
              <textarea
                rows={5}
                required
                placeholder={isAr ? 'اكتب استفسارك هنا وسنرد عليك في أقرب وقت...' : 'Write your note or question here...'}
                className="w-full px-4 py-3 rounded-xl border border-[#D7D0C0] text-[#192520] bg-[#FAF8F5] focus:outline-hidden focus:border-[#154734] text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              className="px-8 py-3.5 rounded-full bg-[#154734] hover:bg-[#0E2E22] text-white font-bold text-sm transition-all shadow-xs hover:scale-[1.02] active:scale-95"
            >
              {isAr ? 'إرسال الرسالة' : 'Send Message'}
            </button>

          </form>
        </div>

        {/* Sidebar Concierge Details */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-[#154734] text-white p-8 rounded-3xl space-y-4 shadow-xs">
            <span className="material-symbols-outlined text-3xl text-[#E5A93C]">support_agent</span>
            <h3 className="text-xl font-bold font-headline">
              {isAr ? 'تواصل معنا مباشرة عبر واتساب' : 'Direct WhatsApp Concierge'}
            </h3>
            <p className="text-xs text-[#C8D6CF] leading-relaxed">
              {isAr
                ? 'فريقنا متاح طوال أيام الأسبوع للمساعدة في مراجعة جودة الصور والتأكد من مطابقتها قبل الطباعة.'
                : 'Our concierge is available 7 days a week to help review photo resolution and advise on age-appropriate storylines.'}
            </p>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E5A93C] text-[#0E2E22] font-black text-xs hover:bg-[#F2BA55] transition-colors shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>{isAr ? 'محادثة عبر واتساب' : 'Chat on WhatsApp'}</span>
            </a>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-[#E8E3D7] shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-[#192520] uppercase tracking-wider">
              {isAr ? 'الأسئلة الأكثر تكراراً' : 'Frequently Asked Questions'}
            </h4>
            
            <div className="space-y-3 text-xs text-[#566860]">
              <div className="pb-3 border-b border-[#EFEBE0]">
                <p className="font-bold text-[#192520] mb-0.5">{isAr ? 'كم يستغرق تجهيز وشحن الكتاب؟' : 'How long does production take?'}</p>
                <p>{isAr ? 'من ٣ إلى ٥ أيام عمل للطباعة والتجليد والتوصيل لباب بيتك.' : '3 to 5 business days for printing, binding, and doorstep delivery.'}</p>
              </div>
              <div className="pb-3 border-b border-[#EFEBE0]">
                <p className="font-bold text-[#192520] mb-0.5">{isAr ? 'هل يمكنني رؤية الكتاب قبل الدفع؟' : 'Can I preview before paying?'}</p>
                <p>{isAr ? 'نعم! نوفر معاينة رقمية كاملة لجميع صفحات القصة مجاناً.' : 'Yes! We provide a complete digital page-by-page preview free.'}</p>
              </div>
              <div>
                <p className="font-bold text-[#192520] mb-0.5">{isAr ? 'ما نوع الورق والغلاف المستخدم؟' : 'What materials do you use?'}</p>
                <p>{isAr ? 'غلاف مقوى سميك ومقاوم للخدش، وورق فاخر معتمد صديق للبيئة.' : 'Thick scratch-proof hardcover and certified archival heavyweight paper.'}</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </main>
  );
}
