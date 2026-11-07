import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import Link from 'next/link';

export default async function SuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  const { order_id } = await searchParams;
  const dict = await getDictionary(locale as Locale);
  const successDict = dict.success;
  const isAr = locale === 'ar';

  return (
    <main className="pt-26 sm:pt-30 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-screen flex items-center justify-center">
      <div className="bg-white border border-[#E8E3D7] rounded-3xl p-8 sm:p-14 shadow-lg max-w-2xl w-full text-center relative z-10">
        
        {/* Celebration Seal */}
        <div className="w-20 h-20 bg-[#E6F0EB] rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-[#154734]/20 shadow-xs">
          <div className="w-14 h-14 bg-[#154734] rounded-full flex items-center justify-center text-white shadow-sm">
            <span className="material-symbols-outlined text-[32px]">check</span>
          </div>
        </div>
        
        <span className="inline-block px-3 py-1 bg-[#E6F0EB] text-[#154734] rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          {isAr ? 'تم استلام الطلب وتجهيز الطباعة' : 'Order Received & In Atelier'}
        </span>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#192520] mb-3 font-headline">
          {successDict.title}
        </h1>
        <p className="text-[#566860] text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-8 font-body">
          {successDict.subtitle}
        </p>
        
        {order_id && (
          <div className="bg-[#FAF8F5] border border-[#E8E3D7] rounded-2xl p-4 inline-block mx-auto mb-8 min-w-[240px]">
            <p className="text-xs font-bold text-[#7D8F86] uppercase tracking-wider mb-1">
              {successDict.order_number}
            </p>
            <p className="font-mono text-base font-bold text-[#154734]">
              #{typeof order_id === 'string' ? order_id.slice(-8).toUpperCase() : 'HWDT-8821'}
            </p>
          </div>
        )}

        <div className="p-5 rounded-2xl bg-[#F5F2EA] border border-[#E8E3D7] mb-8 text-start max-w-md mx-auto space-y-2 text-xs text-[#566860]">
          <div className="flex items-center gap-2 text-[#192520] font-bold">
            <span className="material-symbols-outlined text-[#154734] text-[18px]">verified</span>
            <span>{isAr ? 'ماذا سيحدث الآن؟' : 'What happens next?'}</span>
          </div>
          <p className="leading-relaxed">
            {isAr
              ? 'يقوم فريقنا بمراجعة جودة صور طفلك، ثم تجهيز الغلاف المقوى وإرسال معاينة نهائية لرقم الواتساب الخاص بك قبل الشحن.'
              : 'Our artists will curate your child’s likeness, prepare the hardcover binding proofs, and send shipping tracking directly to your mobile.'}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link 
            href={`/${locale}`}
            className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-[#FAF8F5] text-[#192520] border border-[#D7D0C0] rounded-full font-bold text-sm transition-colors"
          >
            {successDict.home_button}
          </Link>
          <Link 
            href={`/${locale}/gallery`}
            className="w-full sm:w-auto px-7 py-3.5 bg-[#154734] hover:bg-[#0E2E22] text-white rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>{successDict.track_button}</span>
            <span className="material-symbols-outlined text-[18px]">
              {isAr ? 'arrow_back' : 'arrow_forward'}
            </span>
          </Link>
        </div>

      </div>
    </main>
  );
}
