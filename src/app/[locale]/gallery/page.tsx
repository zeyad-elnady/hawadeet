import Image from 'next/image';
import Link from 'next/link';

export default async function Gallery({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <header className="mb-10 text-right max-w-3xl ml-auto">
        <h1 className="font-headline text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight mb-6 leading-tight">
          كل طفل هو <span className="text-primary italic">بطل قصته الخاصة</span>.
        </h1>
        <p className="text-xl text-on-surface-variant leading-relaxed font-medium mt-4">
          اختر عالماً لمغامرتك القادمة. قصصنا المدعومة بالذكاء الاصطناعي مصممة خصيصاً لتثير الخيال والدهشة في قلوب الصغار.
        </p>
      </header>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 mb-12 overflow-x-auto pb-4 scrollbar-hide flex-row-reverse">
        <button className="px-6 py-2.5 rounded-xl text-sm font-bold bg-primary text-white shadow-md shadow-primary/20 transition-all duration-300">الكل</button>
        <button className="px-6 py-2.5 rounded-xl text-sm font-bold bg-white text-on-surface-variant border border-outline-variant/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">مغامرات</button>
        <button className="px-6 py-2.5 rounded-xl text-sm font-bold bg-white text-on-surface-variant border border-outline-variant/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">تعليمي</button>
        <button className="px-6 py-2.5 rounded-xl text-sm font-bold bg-white text-on-surface-variant border border-outline-variant/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">خيال</button>
        <button className="px-6 py-2.5 rounded-xl text-sm font-bold bg-white text-on-surface-variant border border-outline-variant/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">حيوانات</button>
      </div>

      {/* Gallery Grid: 4 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Astronaut Theme */}
        <div className="group cursor-pointer">
          <div className="h-[450px] relative overflow-hidden rounded-xl bg-surface-container-low flex flex-col p-0 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 border border-outline-variant/30 text-right">
            <div className="h-3/5 w-full relative overflow-hidden">
              <img alt="رائد فضاء في الفضاء" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3QMUzISfMLByJ7umzkEgDgwztTwGe4uNRYKjWy5GCLEUW-R_YDc0kauoCaDyvg0YCWphC-zAgXWna92cEtc44tc5iqGWhiO0rNw-NdIgq9YptnOjF6iClEzokIxGoiMiz5iBghRN7JvSZcmyB8KkN2FY53UD1SGy0_KshbgAwjxb4u9SUuD4tHl6Qp30HLRlv44NsJnDPNZkeXl2DE7Za2ZUV-tObKCGx_0SvBIkV7wKFkJaj8IHps8OcnKkffc9SEEHIjSnVe_M" />
              <div className="absolute top-4 right-4 z-20">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/80 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase">رحلة الفضاء</span>
              </div>
            </div>
            <div className="flex-1 p-6 flex flex-col items-end">
              <h2 className="font-headline text-xl font-bold text-on-surface mb-2">رائد فضاء في الفضاء</h2>
              <p className="text-on-surface-variant text-xs leading-relaxed mb-auto w-full">انطلق في رحلة خلف النجوم حيث الجاذبية هي ملعبك وكل سديم يحكي سراً.</p>
              <div className="mt-4 flex flex-row-reverse items-center justify-between w-full">
                <span className="text-lg font-extrabold text-primary font-headline">٩٩ ج.م</span>
                <Link href={`/${locale}/shop`} className="bg-primary text-white px-6 py-2 rounded-full font-bold text-xs hover:bg-primary-container transition-colors shadow-sm">
                  اطلب الآن
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Jungle Theme */}
        <div className="group cursor-pointer">
          <div className="h-[450px] relative overflow-hidden rounded-xl bg-surface-container-high flex flex-col p-0 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 border border-outline-variant/30 text-right">
            <div className="h-3/5 w-full relative overflow-hidden">
              <img alt="حيوانات الغابة" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbGv6OqCGr4rwt2bViyhyrMb7wR32fsUZg7ykjEEsNiz5iBaAn0MzYCrRQCvma_bP97mft4eWqIvvoi0y486A3wQ6h0wz_AFrYjMdXEi2U4DQxanpYxRwSHJhAY1p6mWA9tiJfmt-68eNgpqyM1U7O9n4hyNQi0JC4KyMyLOblUyhRyUUgE1komNBQ775sSOIwqsoEK0Oto6Y9aObaAJApv2Nk7ElYeDkxB0myVmDhPY0NaHDNa3NXOQxGMWoZZZGDV9CulhEEjUE" />
            </div>
            <div className="flex-1 p-6 flex flex-col items-end">
              <h2 className="font-headline text-xl font-bold text-on-surface mb-2">أصدقاء الغابة</h2>
              <p className="text-on-surface-variant text-xs leading-relaxed mb-auto w-full">قابل الأسد ليو وأصدقاءه في قلب الغابة المطيرة الزمردية.</p>
              <div className="mt-4 flex flex-row-reverse items-center justify-between w-full">
                <span className="text-lg font-extrabold text-primary font-headline">٩٩ ج.م</span>
                <Link href={`/${locale}/shop`} className="bg-primary text-white px-6 py-2 rounded-full font-bold text-xs hover:bg-primary-container transition-colors shadow-sm">
                  اطلب الآن
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Sea Life Theme */}
        <div className="group cursor-pointer">
          <div className="h-[450px] relative overflow-hidden rounded-xl bg-surface-container-low flex flex-col p-0 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 border border-outline-variant/30 text-right">
            <div className="h-3/5 w-full relative overflow-hidden">
              <img alt="مغامرة أعماق البحار" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxqEOcmAK52rds8pEh1-fWJex-F5qxPcx1iMAHWGwR1T1uGz8Q6CqEpcl2pH0aVf4QxDlwHjvTkIXvsTEo_RIJRx7e36bnpp2Acq6f2db8TAfK765QRI-sQ6dDe1RbMQNrdd6Kj05uHAebph7xSdAA3KxkFyE8E7lcqGualcgckBoOyMsXAbniPn9ezt0tqRqFiq8aX-dEEKkcmKfEsU78K-m2znIVcwKdMsVnCu5HYlyxkagNRNCAR2YGGg1IBcovX_qKmgVT_MQ" />
            </div>
            <div className="flex-1 p-6 flex flex-col items-end">
              <h2 className="font-headline text-xl font-bold text-on-surface mb-2">مغامرة أعماق البحار</h2>
              <p className="text-on-surface-variant text-xs leading-relaxed mb-auto w-full">اغص في مملكة المرجان للبحث عن كنز أتلانتس المفقود.</p>
              <div className="mt-4 flex flex-row-reverse items-center justify-between w-full">
                <span className="text-lg font-extrabold text-primary font-headline">٩٩ ج.م</span>
                <Link href={`/${locale}/shop`} className="bg-primary text-white px-6 py-2 rounded-full font-bold text-xs hover:bg-primary-container transition-colors shadow-sm">
                  اطلب الآن
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Whispering Woods */}
        <div className="group cursor-pointer">
          <div className="h-[450px] relative overflow-hidden rounded-xl bg-surface-container-low flex flex-col p-0 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 border border-outline-variant/30 text-right">
            <div className="h-3/5 w-full relative overflow-hidden">
              <img alt="الغابة الهامسة" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCW92aMh-WWnneHUQqThj5zSUeiO5PAKtbqfH-KrGCSTY4DrMR-zdb_1A0Kg7oldawSAASr9vFwDydR1qqzeVzQ4YLdlky7fUKsvh4iutdMIAHQGC2z4k6sHqANa9y8slQ2wiM75xDMLBm4LQSw8JqheuuiNklD-iRISYZ5wJJCY4lE9f62BkoX4BgOiYKGDw6HVBqasI-Y0EfKx0G3ZQ9aZczeJTt4Jp1_hLMjB1fZeaLPqI34o9E1hABTr9xzLU0ZKnVxvQ63A5E" />
              <div className="absolute top-4 right-4 z-20">
                <span className="text-[10px] font-bold text-primary bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">إصدار جديد</span>
              </div>
            </div>
            <div className="flex-1 p-6 flex flex-col items-end">
              <h2 className="font-headline text-xl font-bold text-on-surface mb-2">الغابة الهامسة</h2>
              <p className="text-on-surface-variant text-xs leading-relaxed mb-auto w-full">تحدث إلى الأشجار وتعلم سحر حراس الغابة القدامى.</p>
              <div className="mt-4 flex flex-row-reverse items-center justify-between w-full">
                <span className="text-lg font-extrabold text-primary font-headline">٩٩ ج.م</span>
                <Link href={`/${locale}/shop`} className="bg-primary text-white px-6 py-2 rounded-full font-bold text-xs hover:bg-primary-container transition-colors shadow-sm">
                  اطلب الآن
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Prehistoric Pals */}
        <div className="group cursor-pointer">
          <div className="h-[450px] relative overflow-hidden rounded-xl bg-surface-container-low flex flex-col p-0 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 border border-outline-variant/30 text-right">
            <div className="h-3/5 w-full relative overflow-hidden">
              <img alt="وادي الديناصورات" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDD_QEgc4bWOofo55L04VpZtnSL7l6jfdMz8EJkO92ITfPc86Ny_tnn4WDwaQsVAYkdDHxe8e0eUisC_kPmyDVxb_nO-eVfuxisCiodWi9XLHLY_i7paj2EkKyeYpYRC3j7RipxiE6w0zshgP-dKSuFHQsDTeiF89sXV832VVtN0JRFQVyUSAKO6Qlvr8wmsVaqv9err-kJCBXM1vp_zI1zfOSWCVcvXE5wIquJc8dAWxB9O0qBQylTy9ZbEYXMQB5d5sSiRAy6zY" />
              <div className="absolute top-4 right-4 z-20">
                <span className="text-[10px] font-bold text-secondary bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">الأكثر شعبية</span>
              </div>
            </div>
            <div className="flex-1 p-6 flex flex-col items-end">
              <h2 className="font-headline text-xl font-bold text-on-surface mb-2">رفاق ما قبل التاريخ</h2>
              <p className="text-on-surface-variant text-xs leading-relaxed mb-auto w-full">سافر عبر الزمن لتركب ديناصوراً ضخماً عبر الوادي العظيم.</p>
              <div className="mt-4 flex flex-row-reverse items-center justify-between w-full">
                <span className="text-lg font-extrabold text-primary font-headline">٩٩ ج.م</span>
                <Link href={`/${locale}/shop`} className="bg-primary text-white px-6 py-2 rounded-full font-bold text-xs hover:bg-primary-container transition-colors shadow-sm">
                  اطلب الآن
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="group cursor-pointer">
          <div className="h-[450px] relative overflow-hidden rounded-xl bg-surface-container-high p-8 flex flex-col items-center justify-center border-2 border-dashed border-outline-variant transition-all hover:bg-white/50 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
              <span className="material-symbols-outlined text-4xl">add_circle</span>
            </div>
            <h2 className="font-headline text-xl font-bold text-on-surface mb-2">عالم جديد قريباً</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">نحن نعمل على مغامرات سحرية جديدة كل أسبوع.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
