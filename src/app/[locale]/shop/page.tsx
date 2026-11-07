import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import ShopForm from '@/components/ShopForm';

export default async function Shop({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const shopDict = dict.shop;
  const isAr = locale === 'ar';

  return (
    <main className="pt-26 sm:pt-30 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      
      {/* Editorial Progress Stepper */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#E8E3D7] -z-10 -translate-y-1/2" />
          <div className="absolute top-1/2 start-0 w-1/3 h-[2px] bg-[#154734] -z-10 -translate-y-1/2" />

          {/* Step 1 */}
          <div className="flex flex-col items-center gap-2 bg-[#FBF9F5] px-3">
            <div className="w-11 h-11 rounded-full bg-[#154734] text-white flex items-center justify-center font-bold text-sm shadow-xs">
              <span className="material-symbols-outlined text-[20px]">auto_stories</span>
            </div>
            <span className="text-xs font-bold text-[#154734]">
              {shopDict.steps.customization}
            </span>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center gap-2 bg-[#FBF9F5] px-3">
            <div className="w-11 h-11 rounded-full bg-white border border-[#D7D0C0] text-[#7D8F86] flex items-center justify-center font-bold text-sm">
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            </div>
            <span className="text-xs font-semibold text-[#7D8F86]">
              {shopDict.steps.shipping}
            </span>
          </div>

          {/* Step 3 */}
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

      {/* Page Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <span className="inline-block px-3 py-1 bg-[#E6F0EB] text-[#154734] rounded-full text-xs font-bold uppercase tracking-wider mb-2">
          {isAr ? 'تخصيص يدوي فاخر' : 'Custom Atelier Binding'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#192520] tracking-tight font-headline">
          {shopDict.header.title_1} <span className="text-[#842232] italic">{shopDict.header.title_2}</span>
        </h1>
        <p className="text-[#566860] mt-2 text-sm sm:text-base font-body leading-relaxed">
          {shopDict.header.subtitle}
        </p>
      </div>

      {/* Main Interactive Form */}
      <ShopForm shopDict={shopDict} locale={locale} />
      
    </main>
  );
}
