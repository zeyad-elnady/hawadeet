import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import ShippingForm from '@/components/ShippingForm';

export default async function ShippingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const shopDict = dict.shop;
  const shippingDict = dict.shipping;

  return (
    <main className="pt-26 sm:pt-30 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-screen">
      
      {/* Editorial Stepper */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#E8E3D7] -z-10 -translate-y-1/2" />
          <div className="absolute top-1/2 start-0 w-2/3 h-[2px] bg-[#154734] -z-10 -translate-y-1/2" />

          {/* Step 1 Complete */}
          <div className="flex flex-col items-center gap-2 bg-[#FBF9F5] px-3">
            <div className="w-11 h-11 rounded-full bg-[#154734] text-white flex items-center justify-center font-bold text-sm shadow-xs">
              <span className="material-symbols-outlined text-[20px]">check</span>
            </div>
            <span className="text-xs font-bold text-[#154734]">
              {shopDict.steps.customization}
            </span>
          </div>

          {/* Step 2 Active */}
          <div className="flex flex-col items-center gap-2 bg-[#FBF9F5] px-3">
            <div className="w-11 h-11 rounded-full bg-[#154734] text-white flex items-center justify-center font-bold text-sm shadow-xs ring-4 ring-[#E6F0EB]">
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            </div>
            <span className="text-xs font-bold text-[#154734]">
              {shopDict.steps.shipping}
            </span>
          </div>

          {/* Step 3 Pending */}
          <div className="flex flex-col items-center gap-2 bg-[#FBF9F5] px-3">
            <div className="w-11 h-11 rounded-full bg-white border border-[#D7D0C0] text-[#7D8F86] flex items-center justify-center font-bold text-sm">
              <span className="material-symbols-outlined text-[20px]">credit_card</span>
            </div>
            <span className="text-xs font-semibold text-[#7D8F86]">
              {shopDict.steps.payment}
            </span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="mb-10 text-center max-w-xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#192520] tracking-tight font-headline">
          {shippingDict.title}
        </h1>
        <p className="text-[#566860] mt-2 text-sm sm:text-base leading-relaxed">
          {shippingDict.subtitle}
        </p>
      </div>

      <ShippingForm shippingDict={shippingDict} locale={locale} />
    </main>
  );
}
