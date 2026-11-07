'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import logoSrc from '../app/assets/logo-01.svg';

type FooterDict = {
  copyright: string;
  contact: string;
  help: string;
  terms: string;
  about?: string;
};

export default function Footer({ dict, locale }: { dict: FooterDict; locale: string }) {
  const pathname = usePathname();
  if (pathname.includes('/admin')) return null;

  return (
    <footer className="bg-[#0E2E22] text-[#EAE5D9] pt-16 pb-12 mt-24 border-t border-[#1C4736]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Top Newsletter & Storybook Promise Bar */}
        <div className="bg-[#154734] rounded-2xl p-8 sm:p-10 mb-16 border border-[#21654C] flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-start max-w-xl">
            <span className="inline-block px-3 py-1 bg-[#E5A93C] text-[#0E2E22] rounded-full text-xs font-black uppercase tracking-wider mb-3">
              {locale === 'ar' ? 'هدية الانضمام' : 'Welcome Gift'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-headline">
              {locale === 'ar' 
                ? 'انضم لعائلة حواديت واحصل على خصم ١٥٪' 
                : 'Join our family & get 15% off your first book'}
            </h3>
            <p className="text-sm text-[#D5CEBF] leading-relaxed">
              {locale === 'ar'
                ? 'قصص جديدة، نصائح للقراءة وقت النوم، وعروض حصرية لأعضاء نادي القراء الصغار.'
                : 'New adventure releases, bedtime reading inspiration, and member-only treats.'}
            </p>
          </div>

          <div className="w-full lg:w-auto flex-1 max-w-md">
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder={locale === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email address'}
                className="w-full px-4 py-3 rounded-full bg-[#0E2E22] text-white text-sm border border-[#256B52] placeholder:text-[#8FA59B] focus:outline-hidden focus:border-[#E5A93C]"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#E5A93C] text-[#0E2E22] font-black text-sm hover:bg-[#F2BA55] transition-colors whitespace-nowrap shadow-xs"
              >
                {locale === 'ar' ? 'اشترك' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* 4-Column Editorial Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-[#1C4736] text-start">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href={`/${locale}`} className="inline-block brightness-0 invert">
              <Image
                alt="Hawadeet Logo"
                className="w-32 h-auto object-contain"
                src={logoSrc}
              />
            </Link>
            <p className="text-sm text-[#B4C4BC] leading-relaxed">
              {locale === 'ar'
                ? 'دار نشر القصص المخصصة الأكثر محبة. نحول صور أطفالكم وأسماءهم إلى كتب مقواة فاخرة تدوم طوال العمر.'
                : 'The thoughtfully personalized children’s bookmaker. We turn your child’s photo and name into an heirloom hardcover to treasure forever.'}
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-[#E5A93C]">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>{locale === 'ar' ? 'أكثر من ١٠,٠٠٠ كتاب مطبوع بحب' : 'Over 10,000 heirloom books printed'}</span>
            </div>
          </div>

          {/* Column 2: Our Books */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              {locale === 'ar' ? 'قصصنا المفضلة' : 'Our Books'}
            </h4>
            <ul className="space-y-2.5 text-sm text-[#C8D6CF]">
              <li>
                <Link href={`/${locale}/gallery`} className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'رحلة بطل الفضاء' : 'Space Hero Journey'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/gallery`} className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'مغامرة الغابة المفقودة' : 'Lost Forest Adventure'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/gallery`} className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'مستكشف أعماق البحار' : 'Ocean Explorer'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/gallery`} className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'مملكة الفرسان العظيمة' : 'Kingdom of Knights'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/shop`} className="text-[#E5A93C] font-semibold hover:underline">
                  {locale === 'ar' ? 'تخصيص كتاب جديد ←' : 'Start a New Book →'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              {locale === 'ar' ? 'خدمة العملاء' : 'Customer Care'}
            </h4>
            <ul className="space-y-2.5 text-sm text-[#C8D6CF]">
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-white transition-colors">
                  {dict.contact}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="hover:text-white transition-colors">
                  {dict.about || (locale === 'ar' ? 'من نحن' : 'About Us')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'الشحن والتوصيل' : 'Shipping & Delivery'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'ضمان الجودة والإرجاع' : 'Our Quality Guarantee'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Trust & Guarantee */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              {locale === 'ar' ? 'ضمان حواديت' : 'The Hawadeet Promise'}
            </h4>
            <div className="bg-[#143E2E] rounded-xl p-4 border border-[#235843] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <span className="material-symbols-outlined text-[#E5A93C] text-[20px]">star</span>
                <span>{locale === 'ar' ? 'تقييم ٤.٩ / ٥ من أولياء الأمور' : 'Rated 4.9 / 5 by Parents'}</span>
              </div>
              <p className="text-xs text-[#B4C4BC] leading-relaxed">
                {locale === 'ar'
                  ? 'غلاف مقوى فائق الجودة، ورق غير عاكس معتمد، ومعاينة رقمية مجانية كاملة قبل الدفع.'
                  : 'FSC-certified archival heavyweight paper, durable hardcover binding, and complete digital preview.'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Payment Methods */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8EA297]">
          <p>
            © {new Date().getFullYear()} Hawadeet Publishing. {dict.copyright}
          </p>
          <div className="flex items-center gap-4 text-xs font-medium">
            <span>{locale === 'ar' ? 'طرق دفع آمنة:' : 'Secure Payment:'}</span>
            <span className="px-2.5 py-1 bg-[#154734] rounded text-white font-bold tracking-wider">InstaPay</span>
            <span className="px-2.5 py-1 bg-[#154734] rounded text-white font-bold tracking-wider">Vodafone Cash</span>
            <span className="px-2.5 py-1 bg-[#154734] rounded text-white font-bold tracking-wider">Cash on Delivery</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
