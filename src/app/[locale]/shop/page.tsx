import Image from 'next/image';
import Link from 'next/link';

export default async function Shop({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      {/* Progress Indicator */}
      <div className="flex flex-col items-center mb-16">
        <div className="flex items-center gap-4 md:gap-8 flex-row-reverse">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold shadow-lg shadow-primary/20">١</div>
            <span className="text-xs font-bold text-primary font-label uppercase tracking-widest">التخصيص</span>
          </div>
          <div className="w-12 md:w-24 h-[2px] bg-primary-fixed mb-6"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-bold">٢</div>
            <span className="text-xs font-medium text-on-surface-variant font-label uppercase tracking-widest">الشحن</span>
          </div>
          <div className="w-12 md:w-24 h-[2px] bg-surface-container-high mb-6"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-bold">٣</div>
            <span className="text-xs font-medium text-on-surface-variant font-label uppercase tracking-widest">الدفع</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-right">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-12 w-full">
          {/* Step 1: Customization */}
          <section>
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-on-surface tracking-tight">خصص مغامرة طفلك</h2>
              <p className="text-on-surface-variant mt-2">لنصنع شيئاً سحرياً وفريداً تماماً كما هو طفلك</p>
            </div>
            {/* Story Preview Card */}
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row-reverse items-center gap-6">
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-primary-container flex-shrink-0 shadow-md">
                <img alt="رائد فضاء في الفضاء" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVmu1uSm0SflcBeJGxhBkK7PUWEikLEsGUysgdbx7dyJB0_ExRt_r1O-x9Hnjj5Km6dNLq326WGpvasgSFYSql0bdQ_jp0rn_tNJXLHZJ9RtbQjUgIBXynPOQ1gijU9HwASWVzun46hsA1jFhmJm7hF8Oe8Hb3KLTxaQrYgWYHl_gVf9WubUBAodK4M--pnwVnjWpSyYt98bwqmvEkggNh9irWhcTArwf8dYCAw2bt2qU9DLcLkvz0qQ9WGpEB4gc4ogH_2vJQy4o" />
              </div>
              <div className="text-center sm:text-right">
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">القصة المختارة</p>
                <h3 className="text-2xl font-bold text-on-surface">رائد فضاء في الفضاء</h3>
                <p className="text-on-surface-variant text-sm">مغامرة كونية عبر النجوم والمجرات</p>
              </div>
              <div className="sm:mr-auto mt-4 sm:mt-0">
                <Link href={`/${locale}/gallery`} className="text-sm font-bold text-primary underline underline-offset-4 hover:text-primary-container transition-colors">تغيير القصة</Link>
              </div>
            </div>

            <div className="space-y-8">
              {/* Photo Upload Section */}
              <div className="bg-surface-container-low rounded-xl p-8">
                <div className="flex items-center gap-2 mb-6 flex-row-reverse justify-end">
                  <h4 className="text-xl font-bold text-on-surface">صور البطل الصغير</h4>
                  <span className="material-symbols-outlined text-primary">add_a_photo</span>
                </div>
                <p className="text-on-surface-variant text-sm mb-6">ارفع من ٣ إلى ٥ صور واضحة لوجه الطفل للحصول على أفضل النتائج في القصة.</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-row-reverse">
                  <button className="aspect-square rounded-xl border-2 border-dashed border-outline-variant hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-2 group">
                    <span className="material-symbols-outlined text-3xl text-outline-variant group-hover:text-primary transition-colors">cloud_upload</span>
                    <span className="text-xs font-bold text-on-surface-variant group-hover:text-primary transition-colors">رفع صور</span>
                  </button>
                  {/* Placeholder for uploaded slots */}
                  <div className="aspect-square rounded-xl bg-surface-container-highest border border-outline-variant flex items-center justify-center">
                    <span className="material-symbols-outlined text-outline-variant/50">image</span>
                  </div>
                  <div className="aspect-square rounded-xl bg-surface-container-highest border border-outline-variant flex items-center justify-center">
                    <span className="material-symbols-outlined text-outline-variant/50">image</span>
                  </div>
                  <div className="aspect-square rounded-xl bg-surface-container-highest border border-outline-variant flex items-center justify-center">
                    <span className="material-symbols-outlined text-outline-variant/50">image</span>
                  </div>
                </div>
              </div>

              {/* Child Details Form */}
              <div className="bg-surface-container-low rounded-xl p-8 space-y-8">
                <div className="flex items-center gap-2 mb-2 flex-row-reverse justify-end">
                  <h4 className="text-xl font-bold text-on-surface">تفاصيل الطفل</h4>
                  <span className="material-symbols-outlined text-primary">person_edit</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-row-reverse">
                  {/* Name */}
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-on-surface-variant flex items-center gap-2 flex-row-reverse justify-end" htmlFor="child-name">
                      <span>اسم الطفل</span>
                      <span className="text-error">*</span>
                    </label>
                    <input className="text-right w-full h-14 bg-surface-container-lowest border-outline-variant/30 rounded-xl focus:ring-primary focus:border-primary px-4 font-bold text-lg" id="child-name" placeholder="مثال: ليو" type="text" />
                  </div>
                  {/* Language Selection */}
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-on-surface-variant flex items-center gap-2 flex-row-reverse justify-end" htmlFor="language">
                      <span>لغة الكتاب</span>
                    </label>
                    <div className="relative">
                      <select className="text-right w-full h-14 bg-surface-container-lowest border-outline-variant/30 rounded-xl focus:ring-primary focus:border-primary px-4 font-bold appearance-none pl-10" id="language">
                        <option value="ar">العربية</option>
                        <option value="en">الإنجليزية (English)</option>
                        <option value="fr">الفرنسية (Français)</option>
                      </select>
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
                    </div>
                  </div>
                  {/* Gender Selection */}
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-sm font-bold text-on-surface-variant">نوع الطفل</label>
                    <div className="grid grid-cols-2 gap-4 flex-row-reverse">
                      <label className="relative cursor-pointer">
                        <input defaultChecked className="custom-radio hidden peer" name="gender" type="radio" value="boy" />
                        <div className="flex items-center justify-center gap-3 p-4 border-2 border-surface-container-highest rounded-xl peer-checked:border-primary peer-checked:bg-primary/5 hover:border-primary/50 transition-all flex-row-reverse">
                          <span className="material-symbols-outlined text-primary">face</span>
                          <span className="font-bold">ولد</span>
                        </div>
                      </label>
                      <label className="relative cursor-pointer">
                        <input className="custom-radio hidden peer" name="gender" type="radio" value="girl" />
                        <div className="flex items-center justify-center gap-3 p-4 border-2 border-surface-container-highest rounded-xl peer-checked:border-primary peer-checked:bg-primary/5 hover:border-primary/50 transition-all flex-row-reverse">
                          <span className="material-symbols-outlined text-secondary">face_3</span>
                          <span className="font-bold">بنت</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Book Format Section */}
              <div className="bg-surface-container-low rounded-xl p-8 text-right">
                <div className="flex items-center gap-2 mb-6 flex-row-reverse justify-end">
                  <h4 className="text-xl font-bold text-on-surface">اختر نوع الكتاب</h4>
                  <span className="material-symbols-outlined text-primary">auto_stories</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-row-reverse">
                  <label className="relative flex flex-col justify-center p-5 rounded-xl border-2 border-primary bg-primary/5 cursor-pointer">
                    <input defaultChecked className="hidden peer" name="format" type="radio" />
                    <div className="flex items-center gap-4 flex-row-reverse">
                      <span className="material-symbols-outlined text-primary text-3xl">menu_book</span>
                      <div>
                        <p className="font-bold text-on-surface text-lg">كتاب غلاف مقوى</p>
                        <p className="text-sm text-on-surface-variant">جودة طباعة ممتازة تدوم طويلاً</p>
                      </div>
                    </div>
                    <span className="mr-auto font-bold text-primary text-lg mt-2 inline-block ml-0 text-left">١٠٥٠ ج.م</span>
                  </label>
                  <label className="relative flex flex-col justify-center p-5 rounded-xl border-2 border-surface-container-highest hover:border-outline-variant transition-colors cursor-pointer">
                    <input className="hidden peer" name="format" type="radio" />
                    <div className="flex items-center gap-4 flex-row-reverse">
                      <span className="material-symbols-outlined text-on-surface-variant text-3xl peer-checked:text-primary">tablet_android</span>
                      <div>
                        <p className="font-bold text-on-surface text-lg">كتاب إلكتروني (PDF)</p>
                        <p className="text-sm text-on-surface-variant">تحميل فوري بصيغة عالية الجودة</p>
                      </div>
                    </div>
                    <span className="mr-auto font-bold text-on-surface-variant text-lg mt-2 inline-block ml-0 text-left">٤٠٠ ج.م</span>
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* Next Steps (Initially Greyed Out) */}
          <section className="opacity-40 grayscale pointer-events-none text-right">
            <div className="mb-6 flex items-center gap-4 flex-row-reverse justify-end">
              <h2 className="text-2xl font-bold text-on-surface">تفاصيل الشحن</h2>
              <span className="px-3 py-1 bg-surface-container-high text-xs font-bold rounded-full">الخطوة ٢</span>
            </div>
            <div className="bg-surface-container-low rounded-xl p-8 h-32 flex items-center justify-center">
              <p className="text-on-surface-variant">يرجى إكمال التخصيص أولاً</p>
            </div>
          </section>
        </div>

        {/* Sidebar Order Summary */}
        <aside className="lg:col-span-4 sticky top-24 w-full">
          <div className="bg-surface-container-high rounded-xl p-8 space-y-8">
            <h3 className="text-xl font-bold text-on-surface border-b border-outline-variant/30 pb-4 text-right">ملخص الطلب</h3>
            <div className="space-y-4">
              <div className="flex justify-between flex-row-reverse text-on-surface-variant">
                <span>كتاب غلاف مقوى</span>
                <span className="font-bold">١٠٥٠ ج.م</span>
              </div>
              <div className="flex justify-between flex-row-reverse text-on-surface-variant">
                <span>الشحن (مصر)</span>
                <span className="text-primary font-medium italic">يُحسب في الخطوة التالية</span>
              </div>
              <div className="flex justify-between flex-row-reverse text-on-surface-variant">
                <span>تغليف هدية</span>
                <span>٠ ج.م</span>
              </div>
              <div className="pt-6 border-t border-outline-variant/30 flex justify-between flex-row-reverse items-end">
                <span className="font-bold text-on-surface text-lg">الإجمالي</span>
                <div className="text-left">
                  <span className="block text-3xl font-extrabold text-on-surface tracking-tighter">١٠٥٠ ج.م</span>
                </div>
              </div>
            </div>
            <button className="w-full py-3 bg-primary text-on-primary rounded-full font-bold text-base hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/25 flex items-center justify-center gap-3 flex-row-reverse">
              <span>المتابعة للشحن</span>
              <span className="material-symbols-outlined text-sm transform scale-x-[-1]">arrow_forward</span>
            </button>
            {/* Trust Info */}
            <div className="pt-6 border-t border-outline-variant/30 space-y-4 text-right">
              <div className="flex items-center flex-row-reverse gap-3 text-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
                <span className="font-medium">دفع آمن ومُشفر SSL</span>
              </div>
              <div className="flex items-center flex-row-reverse gap-3 text-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <span className="font-medium">ضمان الجودة والرضا ١٠٠٪</span>
              </div>
            </div>
          </div>
          {/* Testimonial */}
          <div className="mt-8 p-6 bg-tertiary-fixed/20 rounded-2xl relative overflow-hidden text-right">
            <div className="relative z-10">
              <p className="text-tertiary font-medium italic text-sm leading-relaxed">"كانت جودة الطباعة تفوق توقعاتي. تشعر ابنتي حقاً بأنها نجمة في مجرتها الخاصة بفضل هذا التخصيص الرائع."</p>
              <p className="text-tertiary font-bold text-xs mt-4">— سارة م.، والدة موثقة</p>
            </div>
            <span className="material-symbols-outlined absolute -left-4 -bottom-4 text-7xl text-tertiary/10 -rotate-12">format_quote</span>
          </div>
        </aside>
      </div>
    </main>
  );
}
