import Link from 'next/link';
import { Locale } from '@/i18n-config';

export default async function Gallery({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  const isAr = locale === 'ar';

  const categories = [
    { id: 'all', name: isAr ? 'جميع الكتب' : 'All Books' },
    { id: 'space', name: isAr ? 'مغامرات الفضاء' : 'Space & Galaxy' },
    { id: 'forest', name: isAr ? 'الغابة السحرية' : 'Magic Forest' },
    { id: 'sea', name: isAr ? 'أعماق البحار' : 'Ocean Explorer' },
    { id: 'knights', name: isAr ? 'الفرسان والأساطير' : 'Knights & Legends' },
    { id: 'dino', name: isAr ? 'عالم الديناصورات' : 'Dinosaurs' },
  ];

  const books = [
    {
      id: 'space-hero',
      title: isAr ? 'رحلة بطل الفضاء' : 'Space Hero Journey',
      tagline: isAr ? 'مغامرة كونية عبر النجوم' : 'Cosmic Odyssey Across the Stars',
      desc: isAr 
        ? 'انطلق في رحلة خلف المجرات حيث يكتشف بطلك الصغير الكواكب المضيئة وينقذ رواد الفضاء بروح الشجاعة والمرح.'
        : 'Blast off beyond galaxies where your little hero explores celestial worlds and discovers the wonder of the cosmos.',
      badge: isAr ? 'الأكثر مبيعاً' : 'Bestseller',
      badgeColor: 'bg-[#842232]',
      age: isAr ? 'الأعمار ٣ - ٨ سنوات' : 'Ages 3-8',
      rating: '4.9',
      reviews: '1,420',
      price: '1,050 ج.م',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3QMUzISfMLByJ7umzkEgDgwztTwGe4uNRYKjWy5GCLEUW-R_YDc0kauoCaDyvg0YCWphC-zAgXWna92cEtc44tc5iqGWhiO0rNw-NdIgq9YptnOjF6iClEzokIxGoiMiz5iBghRN7JvSZcmyB8KkN2FY53UD1SGy0_KshbgAwjxb4u9SUuD4tHl6Qp30HLRlv44NsJnDPNZkeXl2DE7Za2ZUV-tObKCGx_0SvBIkV7wKFkJaj8IHps8OcnKkffc9SEEHIjSnVe_M',
    },
    {
      id: 'lost-forest',
      title: isAr ? 'أصدقاء الغابة المفقودة' : 'Lost Forest Friends',
      tagline: isAr ? 'ألغاز وسحر الطبيعة الخضراء' : 'Enchanted Woodland Expedition',
      desc: isAr
        ? 'ساعد حيوانات الغابة الودودة في العثور على الكنز المخفي وفك ألغاز الشجرة العملاقة في حكاية دافئة عن التعاون.'
        : 'Help friendly forest creatures uncover the hidden treasure and solve ancient tree riddles in a heartwarming tale of teamwork.',
      badge: isAr ? 'قصة مميزة' : 'Editor’s Choice',
      badgeColor: 'bg-[#154734]',
      age: isAr ? 'الأعمار ٤ - ٩ سنوات' : 'Ages 4-9',
      rating: '5.0',
      reviews: '980',
      price: '1,050 ج.م',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbGv6OqCGr4rwt2bViyhyrMb7wR32fsUZg7ykjEEsNiz5iBaAn0MzYCrRQCvma_bP97mft4eWqIvvoi0y486A3wQ6h0wz_AFrYjMdXEi2U4DQxanpYxRwSHJhAY1p6mWA9tiJfmt-68eNgpqyM1U7O9n4hyNQi0JC4KyMyLOblUyhRyUUgE1komNBQ775sSOIwqsoEK0Oto6Y9aObaAJApv2Nk7ElYeDkxB0myVmDhPY0NaHDNa3NXOQxGMWoZZZGDV9CulhEEjUE',
    },
    {
      id: 'deep-sea',
      title: isAr ? 'مستكشف أعماق البحار' : 'Deep Sea Ocean Explorer',
      tagline: isAr ? 'أسرار المملكة المرجانية' : 'Secrets of the Coral Kingdom',
      desc: isAr
        ? 'اغطس مع الحيتان والدلافين لاكتشاف أطلال مدينة أتلانتس المفقودة والبحث عن لؤلؤة الصداقة السحرية.'
        : 'Dive alongside gentle whales and dolphins to discover underwater cities and unlock the magical pearl of friendship.',
      badge: isAr ? 'موصى به للتهويدة' : 'Bedtime Favorite',
      badgeColor: 'bg-[#0E2E22]',
      age: isAr ? 'الأعمار ٢ - ٧ سنوات' : 'Ages 2-7',
      rating: '4.9',
      reviews: '850',
      price: '1,050 ج.م',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxqEOcmAK52rds8pEh1-fWJex-F5qxPcx1iMAHWGwR1T1uGz8Q6CqEpcl2pH0aVf4QxDlwHjvTkIXvsTEo_RIJRx7e36bnpp2Acq6f2db8TAfK765QRI-sQ6dDe1RbMQNrdd6Kj05uHAebph7xSdAA3KxkFyE8E7lcqGualcgckBoOyMsXAbniPn9ezt0tqRqFiq8aX-dEEKkcmKfEsU78K-m2znIVcwKdMsVnCu5HYlyxkagNRNCAR2YGGg1IBcovX_qKmgVT_MQ',
    },
    {
      id: 'whispering-woods',
      title: isAr ? 'الغابة الهامسة والفرسان' : 'The Whispering Woods & Knights',
      tagline: isAr ? 'بطولة وشجاعة أسطورية' : 'Chivalry, Courage & Heart',
      desc: isAr
        ? 'تحدث إلى حراس الطبيعة وتعلم سحر الفروسية الحقيقية لإنقاذ القلعة الذهبية وإعادة النور إلى الوادي.'
        : 'Learn true chivalry from the guardians of the woods to protect the golden castle and bring light back to the kingdom.',
      badge: isAr ? 'إصدار حديث' : 'New Release',
      badgeColor: 'bg-[#C27803]',
      age: isAr ? 'الأعمار ٥ - ١٠ سنوات' : 'Ages 5-10',
      rating: '4.9',
      reviews: '640',
      price: '1,050 ج.م',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCW92aMh-WWnneHUQqThj5zSUeiO5PAKtbqfH-KrGCSTY4DrMR-zdb_1A0Kg7oldawSAASr9vFwDydR1qqzeVzQ4YLdlky7fUKsvh4iutdMIAHQGC2z4k6sHqANa9y8slQ2wiM75xDMLBm4LQSw8JqheuuiNklD-iRISYZ5wJJCY4lE9f62BkoX4BgOiYKGDw6HVBqasI-Y0EfKx0G3ZQ9aZczeJTt4Jp1_hLMjB1fZeaLPqI34o9E1hABTr9xzLU0ZKnVxvQ63A5E',
    },
    {
      id: 'dino-valley',
      title: isAr ? 'وادي الديناصورات العظيم' : 'Prehistoric Valley of Giants',
      tagline: isAr ? 'رحلة عبر الزمن السحيق' : 'Time Travel to the Jurassic Age',
      desc: isAr
        ? 'سافر عبر الزمن على ظهر تريسيراتوبس شجاع واكتشف أسرار كوكب الأرض في أمتع رحلة تعليمية وتاريخية.'
        : 'Travel back in time riding atop a gentle Triceratops to uncover the prehistoric secrets of our magnificent earth.',
      badge: isAr ? 'محبوب الصغار' : 'Crowd Favorite',
      badgeColor: 'bg-[#842232]',
      age: isAr ? 'الأعمار ٤ - ٩ سنوات' : 'Ages 4-9',
      rating: '5.0',
      reviews: '720',
      price: '1,050 ج.م',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDD_QEgc4bWOofo55L04VpZtnSL7l6jfdMz8EJkO92ITfPc86Ny_tnn4WDwaQsVAYkdDHxe8e0eUisC_kPmyDVxb_nO-eVfuxisCiodWi9XLHLY_i7paj2EkKyeYpYRC3j7RipxiE6w0zshgP-dKSuFHQsDTeiF89sXV832VVtN0JRFQVyUSAKO6Qlvr8wmsVaqv9err-kJCBXM1vp_zI1zfOSWCVcvXE5wIquJc8dAWxB9O0qBQylTy9ZbEYXMQB5d5sSiRAy6zY',
    },
    {
      id: 'magic-circus',
      title: isAr ? 'سيرك العجائب السحري' : 'The Wonder Circus',
      tagline: isAr ? 'خيال لا يعرف المستحيل' : 'Pure Imagination Under the Big Top',
      desc: isAr
        ? 'يقود بطلك الصغير فرقة السيرك الطائرة ويبهر الجمهور بألعاب خفة وألوان سحرية لا تُنسى.'
        : 'Lead the flying circus troop and dazzle the audience with magical acrobatics and rainbow lights that will never be forgotten.',
      badge: isAr ? 'إصدار فاخر' : 'Deluxe Print',
      badgeColor: 'bg-[#154734]',
      age: isAr ? 'الأعمار ٣ - ٨ سنوات' : 'Ages 3-8',
      rating: '4.8',
      reviews: '510',
      price: '1,050 ج.م',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVmu1uSm0SflcBeJGxhBkK7PUWEikLEsGUysgdbx7dyJB0_ExRt_r1O-x9Hnjj5Km6dNLq326WGpvasgSFYSql0bdQ_jp0rn_tNJXLHZJ9RtbQjUgIBXynPOQ1gijU9HwASWVzun46hsA1jFhmJm7hF8Oe8Hb3KLTxaQrYgWYHl_gVf9WubUBAodK4M--pnwVnjWpSyYt98bwqmvEkggNh9irWhcTArwf8dYCAw2bt2qU9DLcLkvz0qQ9WGpEB4gc4ogH_2vJQy4o',
    },
  ];

  return (
    <main className="pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Editorial Header */}
      <header className="mb-12 text-start max-w-3xl">
        <span className="inline-block px-3 py-1 bg-[#E6F0EB] text-[#154734] rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          {isAr ? 'مكتبة حواديت الكاملة' : 'The Hawadeet Library'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#192520] tracking-tight leading-tight font-headline">
          {isAr ? (
            <>كل طفل يستحق أن يكون <span className="text-[#842232] italic">بطل حكايته المطبوعة</span>.</>
          ) : (
            <>Every child deserves to be the <span className="text-[#842232] italic">hero of their own book</span>.</>
          )}
        </h1>
        <p className="text-base sm:text-lg text-[#566860] leading-relaxed mt-4 font-body">
          {isAr
            ? 'تصفح تشكيلتنا من الكتب المصورة الفاخرة. كل قصة مصممة بعناية وتطبع خصيصاً باسم وملامح طفلك بغلاف مقوى يدوم لأجيال.'
            : 'Browse our collection of personalized hardcover storybooks. Each volume is tailored with your child’s name and illustrated likeness.'}
        </p>
      </header>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-10 overflow-x-auto pb-3 scrollbar-hide text-start">
        {categories.map((cat, i) => (
          <button
            key={cat.id}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap shadow-xs ${
              i === 0
                ? 'bg-[#154734] text-white'
                : 'bg-white text-[#2D3C35] border border-[#E8E3D7] hover:border-[#154734] hover:bg-[#FAF8F5]'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-3xl border border-[#E0D9C8] overflow-hidden flex flex-col editorial-card-hover shadow-xs group"
          >
            {/* 3D Book Cover View */}
            <div className="p-8 bg-[#FAF8F5] border-b border-[#EFEBE0] flex justify-center items-center">
              <div className="w-[210px] h-[280px] rounded-r-md rounded-l-xs overflow-hidden book-3d-shadow book-spine relative group-hover:scale-105 transition-transform duration-300">
                <img
                  src={book.img}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute top-3 right-3 ${book.badgeColor} text-white text-[10px] font-black uppercase px-2.5 py-1 rounded shadow-xs`}>
                  {book.badge}
                </div>
              </div>
            </div>

            {/* Book Info */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-5 text-start">
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold px-2.5 py-1 bg-[#F5F2EA] text-[#192520] rounded-full">
                    {book.age}
                  </span>
                  <div className="flex items-center gap-1 text-[#E5A93C] font-bold">
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-[#192520]">{book.rating}</span>
                    <span className="text-[#7D8F86]">({book.reviews})</span>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-[#192520] group-hover:text-[#154734] transition-colors font-headline">
                  {book.title}
                </h2>
                <p className="text-xs font-semibold text-[#842232] mt-0.5">
                  {book.tagline}
                </p>
                <p className="text-xs text-[#566860] leading-relaxed mt-2.5">
                  {book.desc}
                </p>
              </div>

              {/* Bottom Price & Action */}
              <div className="pt-4 border-t border-[#EFEBE0] flex items-center justify-between gap-4">
                <div>
                  <span className="block text-[11px] text-[#7D8F86]">{isAr ? 'غلاف مقوى فاخر' : 'Deluxe Hardcover'}</span>
                  <span className="text-lg font-extrabold text-[#154734]">{book.price}</span>
                </div>
                <Link
                  href={`/${locale}/shop?book=${book.id}`}
                  className="px-6 py-2.5 rounded-full text-xs font-bold bg-[#154734] hover:bg-[#0E2E22] text-white transition-colors shadow-xs"
                >
                  {isAr ? 'تخصيص الكتاب' : 'Personalize Book'}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Craftsmanship Banner */}
      <div className="mt-20 bg-[#F5F2EA] rounded-3xl p-8 sm:p-12 border border-[#E8E3D7] text-start flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-[#154734] uppercase tracking-wider">
            <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
            <span>{isAr ? 'معايير جودة النشر الفاخر' : 'Publisher Keepsake Standards'}</span>
          </div>
          <h3 className="text-2xl font-bold text-[#192520] font-headline">
            {isAr ? 'مطبوعة بحب ومغلفة في صندوق هدية راقٍ' : 'Printed with love & delivered in a gift box'}
          </h3>
          <p className="text-xs sm:text-sm text-[#566860] leading-relaxed">
            {isAr
              ? 'كل كتاب يُطبع على ورق سميك غير لامع ويُغلف بغلاف مقوى متين ومقاوم للخدش، ومرفق معه كارت إهداء يحمل اسم من أهداه.'
              : 'Every book is printed on heavyweight non-reflective paper with durable scratch-resistant hardcover binding, delivered in presentation gift wrap.'}
          </p>
        </div>
        <Link
          href={`/${locale}/shop`}
          className="px-8 py-3.5 rounded-full bg-[#154734] hover:bg-[#0E2E22] text-white font-bold text-sm whitespace-nowrap shadow-xs"
        >
          {isAr ? 'ابدأ تخصيص كتابك الآن' : 'Start Personalizing Now'}
        </Link>
      </div>

    </main>
  );
}
