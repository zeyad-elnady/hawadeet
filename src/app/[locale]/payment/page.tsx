import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import PaymentForm from '@/components/PaymentForm';

export default async function PaymentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const shopDict = dict.shop;
  const paymentDict = dict.payment;

  return (
    <main className="pt-32 pb-36 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto min-h-screen relative overflow-visible">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-[10%] w-[40%] h-[400px] bg-[#5630D1]/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[400px] bg-[#06b6d4]/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      {/* Progress Indicator - Sleek & Modern */}
      <div className="flex flex-col items-center mb-16 relative z-10 w-full max-w-2xl mx-auto">
        <div className="flex items-center justify-between w-full relative">
          {/* Connecting Line Background */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-slate-200 -z-10 -translate-y-1/2"></div>
          {/* Active Line Progress */}
          <div className="absolute top-1/2 start-0 w-full h-[2px] bg-[#5630D1] -z-10 -translate-y-1/2"></div>
          
          <div className="flex flex-col items-center gap-3 relative">
            <div className="w-12 h-12 rounded-full bg-[#5630D1] text-white flex items-center justify-center font-bold shadow-lg shadow-[#5630D1]/20">
              <span className="material-symbols-outlined text-[22px]">check</span>
            </div>
            <span className="text-sm font-bold text-[#5630D1]">{shopDict.steps.customization}</span>
          </div>
          
          <div className="flex flex-col items-center gap-3 relative">
            <div className="w-12 h-12 rounded-full bg-[#5630D1] text-white flex items-center justify-center font-bold shadow-lg shadow-[#5630D1]/20">
              <span className="material-symbols-outlined text-[22px]">check</span>
            </div>
            <span className="text-sm font-bold text-[#5630D1]">{shopDict.steps.shipping}</span>
          </div>
          
          <div className="flex flex-col items-center gap-3 relative">
            <div className="w-12 h-12 rounded-full bg-[#5630D1] text-white flex items-center justify-center font-bold shadow-lg shadow-[#5630D1]/20">
              <span className="material-symbols-outlined text-[22px]">credit_card</span>
            </div>
            <span className="text-sm font-bold text-[#5630D1]">{shopDict.steps.payment}</span>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          {paymentDict.title}
        </h1>
        <p className="text-slate-500 mt-3 text-lg">{paymentDict.subtitle}</p>
      </div>

      {/* Main Content Area - Form inside a Client Component */}
      <PaymentForm paymentDict={paymentDict} locale={locale} />
      
    </main>
  );
}
