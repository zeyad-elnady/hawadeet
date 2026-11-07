import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import Link from 'next/link';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  const dict = await getDictionary(locale);
  const t = dict.home;

  const isAr = locale === 'ar';

  const audienceCategories = [
    {
      title: t.audience?.baby || (isAr ? 'الرضع (٠ - ٣ سنوات)' : 'Babies & Toddlers (0-3)'),
      subtitle: isAr ? 'تهويدات وقصص أولى' : 'Lullabies & First Stories',
      img: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=400&q=80',
      href: `/${locale}/shop?category=baby`,
    },
    {
      title: t.audience?.kids || (isAr ? 'الأطفال (٤ - ٧ سنوات)' : 'Kids (4-7)'),
      subtitle: isAr ? 'مغامرات وبطولات' : 'Adventures & Bravery',
      img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
      href: `/${locale}/shop?category=kids`,
    },
    {
      title: t.audience?.older || (isAr ? 'المغامرون (٨+ سنوات)' : 'Older Kids (8+)'),
      subtitle: isAr ? 'ألغاز واستكشاف' : 'Mysteries & Space',
      img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80',
      href: `/${locale}/shop?category=older`,
    },
    {
      title: t.audience?.family || (isAr ? 'الإخوة والعائلة' : 'Siblings & Family'),
      subtitle: isAr ? 'قصص تجمع الأخوة' : 'Cherished Bonds',
      img: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=400&q=80',
      href: `/${locale}/shop?category=family`,
    },
    {
      title: t.audience?.milestone || (isAr ? 'هدايا وأعياد ميلاد' : 'Birthdays & Gifts'),
      subtitle: isAr ? 'ذكرى تبقى للأبد' : 'Timeless Milestones',
      img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=400&q=80',
      href: `/${locale}/shop?category=gift`,
    },
  ];

  const bookShowcase = [
    {
      id: 'space',
      title: t.gallery.book1_title,
      desc: t.gallery.book1_desc,
      age: isAr ? 'الأعمار ٣ - ٨ سنوات' : 'Ages 3-8',
      reviews: '1,420',
      rating: '4.9',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfSi3Yx0ApRD_VfoKIkMS55DNQE7vEh3nBe-JwsXmxew_nZhePU79J4K8ITQMM4TSduQ4zNNDDhpjJdLjguapOJgT_bTSqmuKKU_E6y-8IjW2bk2v9SIehDrgxR_VgSPtC67D6t8ZHpShKVBwJJaUP8tQF_NXORwGC50UBM9E-MVUV-oi5nhjj8srB0zoxxDJU-HNj7tXKRk3Ytha7RG19mKv-Y3E7TqJ2qDXzFYeoi0UtIpnRjHuJODFb_t-6cLGmS2r74yFH9Kw',
    },
    {
      id: 'forest',
      title: t.gallery.book2_title,
      desc: t.gallery.book2_desc,
      age: isAr ? 'الأعمار ٤ - ٩ سنوات' : 'Ages 4-9',
      reviews: '980',
      rating: '5.0',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIzLtoLyLWAy_MgttECnYtAeoi_BxnOBREWT6C297aRKZK7G6x-l6_Ej8JFO9cc7TDkFgJc_3ADf_DSCtjRN-WwDA5xzFgfi6hb-PZVMcZJQscOIrWfFYhmzv5E64xt9fIWBK2XuCKQvEdR3KXJityrg8q28Wtl-rs9tTRvPzMcnbpSce3bpEB8r2uUTC30_S2AV0MQutoPJmvKTUoB6npuc4n94QfAu-XCm5StvO7yz2PjJj0kqJNkiyMwXgdfAQ7a8bHwwEkf78',
    },
    {
      id: 'ocean',
      title: t.gallery.book3_title,
      desc: t.gallery.book3_desc,
      age: isAr ? 'الأعمار ٢ - ٧ سنوات' : 'Ages 2-7',
      reviews: '850',
      rating: '4.9',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbcVGCSe_SH11boiFUDjbfbyF5LNRuyXbm5IeWqLhtQJfr0FlJ1JXncYWa-LXex0ZHjhuWSZq7FAPQPYXLYCWLIjWvv3d3tGy7mfy4Mx66U-fK8PBm5LTuOwRVlkWfdBgBCiDPqjoL7igpTvffIhKNVAgDyOU7e_seAR9XUZQeIrAjV4vhhMOgA6K22FrU1abLEE4v8D6tueD0VyhhMJzadIW7Z1P6x5eHIyfmoNCNlVR41a07il8ro4hSwCQ9OM4XqxgX_7VW6Wg',
    },
    {
      id: 'knights',
      title: t.gallery.book4_title,
      desc: t.gallery.book4_desc,
      age: isAr ? 'الأعمار ٥ - ١٠ سنوات' : 'Ages 5-10',
      reviews: '1,110',
      rating: '5.0',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4rKJjtAn_B1I28Ox4y_q5-kltgfOueiLUOQDD38KVJFo0J2p-1CxDUOXt72m7QzIoiGmdPQXGMqk6v6z02xQdYvqiBFxKwb2PdPRf6x83LBhwNhaVqOfRFWqaHwtPNvJ_3nsYZESc1lUDvM0Jf3gvvianzLzVKzjlb5vASoinANWExXNrSslcTM0bycYPIq4vwDYJwik5zLl9kKo2DcAMTfI7yl0GRSbU762f7pagVhKxdkn4sovE2lnd00lkO9-PEYEc892ht1I',
    },
  ];

  return (
    <main className="pt-16 sm:pt-18 pb-16 overflow-x-hidden">
      
      {/* 1. Wonderbly-Style Split Hero Section - Viewport Optimized */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-1 pb-8">
        <div className="bg-[#7D1B28] rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 lg:h-[430px] items-stretch text-white">
          
          {/* Text & Action Column */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-center text-start space-y-3.5">
            <div className="inline-flex items-center gap-1.5 bg-[#FAF8F5]/15 backdrop-blur-xs px-3 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase text-white/95 w-fit">
              <span className="material-symbols-outlined text-[14px] text-[#E5A93C]">star</span>
              <span>{t.hero.badge}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-[2.2rem] font-extrabold tracking-tight leading-tight font-headline">
              {t.hero.headline_1} <span className="text-[#E5A93C] underline decoration-wavy decoration-[#E5A93C]/40 underline-offset-4">{t.hero.headline_2}</span> {t.hero.headline_3}
            </h1>

            <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-body max-w-lg">
              {t.hero.description}
            </p>

            {/* Social Trust Line */}
            <div className="flex items-center gap-2 text-xs font-medium text-white/85 pt-0.5">
              <div className="flex text-[#E5A93C]">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <span className="text-[11px] sm:text-xs">{t.hero.rating_text}</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href={`/${locale}/shop`}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-[#FAF8F5] text-[#7D1B28] hover:bg-white transition-all shadow-md hover:scale-[1.02] active:scale-95"
              >
                <span>{t.hero.cta_primary}</span>
                <span className="material-symbols-outlined text-[16px]">
                  {isAr ? 'arrow_back' : 'arrow_forward'}
                </span>
              </Link>
              <Link
                href={`/${locale}/gallery`}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-transparent text-white border border-white/40 hover:border-white hover:bg-white/10 transition-colors"
              >
                <span>{t.hero.cta_secondary}</span>
              </Link>
            </div>
          </div>

          {/* Child & Book Spread Visual */}
          <div className="lg:col-span-5 relative h-64 sm:h-72 lg:h-full bg-[#62141F] flex items-center justify-center overflow-hidden">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDe4lkAcuooQb0cFG-RWHmFpg1GNcNzATsFRu6w6fOvHsqosV4RvY0jqwVPCqndynHmRdZCriYA5LXlXJpuf_4_5SKgZNngOq7s1PhJIjtk-d91lKLHZBbIGh33W43njPW_m4KIWzlVF_YZyIQzXBLH1H68yxhIlsn75kTIXrGJpJwP0dPgjiPNptqF9Hx1P1ttjhigNXiLjKhFlMnRyRTojdgkP1q6pttaESXZnK0Wer-L1eWL7_jIOSS62O2KG32v0ccTSi_ktHc"
              alt="Child reading bedtime personalized storybook"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Vignette Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
            
            {/* Floating quote badge */}
            <div className="absolute bottom-4 left-4 right-4 bg-[#FAF8F5]/95 backdrop-blur-md rounded-xl p-3 text-[#192520] shadow-lg border border-white/60">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#7D1B28] text-xl">auto_stories</span>
                <div>
                  <p className="text-xs font-bold text-[#192520] leading-tight">{t.hero.story_quote}</p>
                  <p className="text-[10px] text-[#566860] mt-0.5">{isAr ? 'غلاف مقوى فاخر مقاس A4 مطبوع بعناية' : 'Hardcover heirloom keepsake edition'}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Wonderbly's Signature: "Who do you want to make a book for today?" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-start">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#192520] tracking-tight font-headline">
              {t.audience?.title || (isAr ? 'لمن تصنع كتاباً اليوم؟' : 'Who do you want to make a book for today?')}
            </h2>
            <p className="text-sm sm:text-base text-[#566860] mt-1">
              {t.audience?.subtitle || (isAr ? 'اختر الفئة العمرية لنقترح عليك أفضل المغامرات المناسبة لطفلك' : 'Browse tailored storybooks created for each developmental milestone')}
            </p>
          </div>
          <Link
            href={`/${locale}/gallery`}
            className="text-sm font-bold text-[#154734] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>{isAr ? 'عرض جميع الفئات' : 'View All Categories'}</span>
            <span className="material-symbols-outlined text-[16px]">
              {isAr ? 'arrow_back' : 'arrow_forward'}
            </span>
          </Link>
        </div>

        {/* Circular Category Avatars */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {audienceCategories.map((cat, idx) => (
            <Link
              key={idx}
              href={cat.href}
              className="group bg-white rounded-2xl p-4 border border-[#E8E3D7] hover:border-[#154734] transition-all duration-300 hover:shadow-md flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-3 border-2 border-[#EFEBE0] group-hover:border-[#154734] transition-colors relative shadow-xs">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-sm font-bold text-[#192520] group-hover:text-[#154734] transition-colors mb-0.5">
                {cat.title}
              </h3>
              <p className="text-xs text-[#566860]">
                {cat.subtitle}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Bestselling Hardcover Books (Realistic 3D Volume Presentation) */}
      <section className="bg-[#F5F2EA] py-16 sm:py-20 border-y border-[#E8E3D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#154734] bg-[#E6F0EB] px-3 py-1 rounded-full inline-block mb-2">
                {isAr ? 'مجموعة الشتاء والقصص المميزة' : 'Featured Collection'}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#192520] tracking-tight font-headline">
                {t.gallery.title}
              </h2>
              <p className="text-sm sm:text-base text-[#566860] mt-1 max-w-2xl">
                {t.gallery.subtitle}
              </p>
            </div>
            <Link
              href={`/${locale}/gallery`}
              className="text-sm font-bold text-[#154734] hover:text-[#0E2E22] flex items-center gap-1 self-start sm:self-auto"
            >
              <span>{isAr ? 'استكشف المعرض بالكامل' : 'Explore All Storybooks'}</span>
              <span className="material-symbols-outlined text-[16px]">
                {isAr ? 'arrow_back' : 'arrow_forward'}
              </span>
            </Link>
          </div>

          {/* Book Cards Grid with Realistic Book Spine & Cover */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bookShowcase.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-2xl border border-[#E0D9C8] overflow-hidden flex flex-col editorial-card-hover group shadow-xs"
              >
                {/* 3D Book Cover Presentation */}
                <div className="p-6 bg-[#FAF8F5] border-b border-[#EFEBE0] flex justify-center">
                  <div className="w-[190px] h-[255px] rounded-r-md rounded-l-xs overflow-hidden book-3d-shadow book-spine relative group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={book.img}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-[#842232] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-xs">
                      {t.gallery.badge_popular}
                    </div>
                  </div>
                </div>

                {/* Book Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4 text-start">
                  <div>
                    {/* Age and Rating */}
                    <div className="flex items-center justify-between text-xs text-[#566860] mb-2">
                      <span className="font-semibold px-2.5 py-0.5 bg-[#F5F2EA] rounded-full text-[#192520]">
                        {book.age}
                      </span>
                      <div className="flex items-center gap-1 text-[#E5A93C] font-bold">
                        <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="text-[#192520]">{book.rating}</span>
                        <span className="text-[#7D8F86]">({book.reviews})</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-[#192520] group-hover:text-[#154734] transition-colors leading-snug font-headline">
                      {book.title}
                    </h3>
                    <p className="text-xs text-[#566860] leading-relaxed mt-1.5 line-clamp-2">
                      {book.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#EFEBE0] flex items-center justify-between gap-3">
                    <div>
                      <span className="block text-xs text-[#7D8F86]">{isAr ? 'غلاف مقوى فاخر' : 'Hardcover Book'}</span>
                      <span className="text-base font-extrabold text-[#154734]">{t.gallery.price || '1,050 ج.م'}</span>
                    </div>
                    <Link
                      href={`/${locale}/shop?book=${book.id}`}
                      className="px-4 py-2.5 rounded-full text-xs font-bold bg-[#154734] hover:bg-[#0E2E22] text-white transition-colors shadow-xs"
                    >
                      {t.gallery.cta}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. How It Works (Boutique Storybook Atelier) */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#154734] bg-[#E6F0EB] px-3.5 py-1.5 rounded-full inline-block mb-3">
            {isAr ? 'حرفية دار حواديت' : 'Our Artisan Process'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#192520] tracking-tight font-headline">
            {t.how_it_works.title}
          </h2>
          <p className="text-sm sm:text-base text-[#566860] mt-3 leading-relaxed">
            {t.how_it_works.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-start">
          
          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-8 border border-[#E8E3D7] shadow-xs relative flex flex-col justify-between">
            <span className="text-5xl font-black text-[#E8E3D7] absolute top-6 right-6 font-headline select-none">
              01
            </span>
            <div className="w-14 h-14 rounded-2xl bg-[#E6F0EB] text-[#154734] flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-3xl">auto_stories</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#192520] mb-2 font-headline">
                {t.how_it_works.step1_title}
              </h3>
              <p className="text-sm text-[#566860] leading-relaxed">
                {t.how_it_works.step1_desc}
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-8 border border-[#E8E3D7] shadow-xs relative flex flex-col justify-between">
            <span className="text-5xl font-black text-[#E8E3D7] absolute top-6 right-6 font-headline select-none">
              02
            </span>
            <div className="w-14 h-14 rounded-2xl bg-[#F6EAEB] text-[#842232] flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-3xl">face</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#192520] mb-2 font-headline">
                {t.how_it_works.step2_title}
              </h3>
              <p className="text-sm text-[#566860] leading-relaxed">
                {t.how_it_works.step2_desc}
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-8 border border-[#E8E3D7] shadow-xs relative flex flex-col justify-between">
            <span className="text-5xl font-black text-[#E8E3D7] absolute top-6 right-6 font-headline select-none">
              03
            </span>
            <div className="w-14 h-14 rounded-2xl bg-[#FEF7EC] text-[#C27803] flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-3xl">local_shipping</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#192520] mb-2 font-headline">
                {t.how_it_works.step3_title}
              </h3>
              <p className="text-sm text-[#566860] leading-relaxed">
                {t.how_it_works.step3_desc}
              </p>
            </div>
          </div>

        </div>

        <div className="mt-14">
          <Link
            href={`/${locale}/shop`}
            className="inline-flex items-center gap-2 px-9 py-4 rounded-full text-base font-bold bg-[#154734] hover:bg-[#0E2E22] text-white transition-all shadow-md hover:scale-105 active:scale-95"
          >
            <span>{t.how_it_works.cta}</span>
            <span className="material-symbols-outlined text-[18px]">
              {isAr ? 'arrow_back' : 'arrow_forward'}
            </span>
          </Link>
        </div>
      </section>

      {/* 5. The Hawadeet Promise / Publisher Standards */}
      <section className="bg-[#FAF8F5] py-20 border-y border-[#E8E3D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#192520] tracking-tight font-headline">
              {t.promise?.title || (isAr ? 'لماذا تثق العائلات بدار حواديت؟' : 'Why Families Love Hawadeet')}
            </h2>
            <p className="text-sm sm:text-base text-[#566860] mt-2">
              {t.promise?.subtitle || (isAr ? 'نصنع كل كتاب كتحفة أرشيفية تليق بأغلى ذكريات الطفولة' : 'Every volume is an heirloom keepsake built to last bedtime hugs')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#E8E3D7] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#E6F0EB] text-[#154734] flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">menu_book</span>
              </div>
              <h3 className="font-bold text-base text-[#192520]">
                {t.promise?.pillar1_title || (isAr ? 'غلاف مقوى يدوم لعقود' : 'Hardcover Built to Last')}
              </h3>
              <p className="text-xs text-[#566860] leading-relaxed">
                {t.promise?.pillar1_desc || (isAr ? 'تجليد قوي وورق معتمد صديق للبيئة مصمم للاستخدام اليومي.' : 'Durable reinforced binding and archival tear-resistant paper.')}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E8E3D7] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FEF7EC] text-[#C27803] flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">visibility</span>
              </div>
              <h3 className="font-bold text-base text-[#192520]">
                {t.promise?.pillar2_title || (isAr ? 'معاينة كاملة قبل الشراء' : '100% Free Full Preview')}
              </h3>
              <p className="text-xs text-[#566860] leading-relaxed">
                {t.promise?.pillar2_desc || (isAr ? 'تصفح كل صفحة من صفحات كتابك المخصص رقمياً لتطمئن قبل الدفع.' : 'Flip through every single page online before you purchase.')}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E8E3D7] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#F6EAEB] text-[#842232] flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">featured_seasonal_and_gifts</span>
              </div>
              <h3 className="font-bold text-base text-[#192520]">
                {t.promise?.pillar3_title || (isAr ? 'تغليف هدايا ملكي مجاني' : 'Free Deluxe Gift Box')}
              </h3>
              <p className="text-xs text-[#566860] leading-relaxed">
                {t.promise?.pillar3_desc || (isAr ? 'يصلك الكتاب في صندوق هدية أنيق مع شريط وبطاقة إهداء مخصصة.' : 'Arrives in a presentation gift package with dedication card.')}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E8E3D7] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#EAE5D9] text-[#192520] flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">verified</span>
              </div>
              <h3 className="font-bold text-base text-[#192520]">
                {t.promise?.pillar4_title || (isAr ? 'ضمان الرضا الكامل ١٠٠٪' : '100% Happiness Guarantee')}
              </h3>
              <p className="text-xs text-[#566860] leading-relaxed">
                {t.promise?.pillar4_desc || (isAr ? 'إذا لم تبهرك جودة الكتاب والطباعة، نعيد لك كامل المبلغ بكل سهولة.' : 'If you and your child are not spellbound, full refund guaranteed.')}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Real Parental Reviews & Testimonials */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex justify-center text-[#E5A93C] mb-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            ))}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#192520] tracking-tight font-headline">
            {t.testimonials.title}
          </h2>
          <p className="text-sm sm:text-base text-[#566860] mt-1">
            {t.testimonials.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-7 rounded-2xl border border-[#E8E3D7] shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex text-[#E5A93C]">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="text-sm text-[#2D3C35] italic leading-relaxed">
                {t.testimonials.review1_text}
              </p>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-[#EFEBE0]">
              <div className="w-10 h-10 rounded-full bg-[#E6F0EB] text-[#154734] font-bold flex items-center justify-center text-sm">
                {t.testimonials.review1_name?.charAt(0) || 'S'}
              </div>
              <div>
                <p className="font-bold text-xs text-[#192520]">{t.testimonials.review1_name}</p>
                <p className="text-[11px] text-[#7D8F86]">{t.testimonials.review1_role || (isAr ? 'مشتري موثق' : 'Verified Buyer')}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-[#E8E3D7] shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex text-[#E5A93C]">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="text-sm text-[#2D3C35] italic leading-relaxed">
                {t.testimonials.review2_text}
              </p>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-[#EFEBE0]">
              <div className="w-10 h-10 rounded-full bg-[#F6EAEB] text-[#842232] font-bold flex items-center justify-center text-sm">
                {t.testimonials.review2_name?.charAt(0) || 'A'}
              </div>
              <div>
                <p className="font-bold text-xs text-[#192520]">{t.testimonials.review2_name}</p>
                <p className="text-[11px] text-[#7D8F86]">{t.testimonials.review2_role || (isAr ? 'مشتري موثق' : 'Verified Buyer')}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-[#E8E3D7] shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex text-[#E5A93C]">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="text-sm text-[#2D3C35] italic leading-relaxed">
                {t.testimonials.review3_text}
              </p>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-[#EFEBE0]">
              <div className="w-10 h-10 rounded-full bg-[#FEF7EC] text-[#C27803] font-bold flex items-center justify-center text-sm">
                {t.testimonials.review3_name?.charAt(0) || 'N'}
              </div>
              <div>
                <p className="font-bold text-xs text-[#192520]">{t.testimonials.review3_name}</p>
                <p className="text-[11px] text-[#7D8F86]">{t.testimonials.review3_role || (isAr ? 'مشتري موثق' : 'Verified Buyer')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Final Call to Action */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <div className="bg-[#154734] rounded-3xl p-10 sm:p-16 text-center text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-headline">
              {t.cta_section.title}
            </h2>
            <p className="text-base sm:text-lg text-[#D5E4DC] leading-relaxed">
              {t.cta_section.subtitle}
            </p>
            <div className="pt-2">
              <Link
                href={`/${locale}/shop`}
                className="inline-flex items-center gap-2 px-9 py-4 rounded-full text-base font-bold bg-[#FAF8F5] text-[#154734] hover:bg-white transition-all shadow-md hover:scale-105 active:scale-95"
              >
                <span>{t.cta_section.button}</span>
                <span className="material-symbols-outlined text-[18px]">
                  {isAr ? 'arrow_back' : 'arrow_forward'}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
