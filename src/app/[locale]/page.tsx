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

  return (
    <main suppressHydrationWarning className="pt-24 overflow-x-hidden">
      {/* Hero Section with Storybook Whimsical Theme */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden">
        {/* Whimsical Background Elements */}
        <div suppressHydrationWarning className="absolute inset-0 z-0">
          <div className="absolute top-20 right-[10%] w-64 h-40 bg-white/60 blur-3xl cloud-shape floating"></div>
          <div className="absolute top-40 left-[5%] w-80 h-48 bg-primary-fixed/20 blur-3xl cloud-shape floating" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-[20%] w-96 h-56 bg-tertiary-fixed/30 blur-3xl cloud-shape floating" style={{ animationDelay: '2s' }}></div>
          
          <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 left-1/3 w-3 h-3 bg-primary rounded-full animate-bounce"></div>
          <div className="absolute bottom-1/4 right-1/3 w-5 h-5 bg-tertiary rounded-full animate-pulse" style={{ animationDuration: '4s' }}></div>
          
          <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-gradient-to-br from-primary-fixed/40 to-transparent rounded-full blur-[120px]"></div>
          <div className="absolute -bottom-40 -left-20 w-[700px] h-[700px] bg-gradient-to-tr from-secondary-fixed/40 to-transparent rounded-full blur-[140px]"></div>
          
          <div className="absolute top-[15%] left-[15%] opacity-20 floating" style={{ animationDelay: '0.5s' }}>
            <span className="material-symbols-outlined text-6xl text-primary">nights_stay</span>
          </div>
          <div className="absolute top-[40%] right-[5%] animate-pulse opacity-40">
            <span className="material-symbols-outlined text-2xl text-yellow-400">auto_awesome</span>
          </div>
          <div className="absolute bottom-[30%] left-[10%] animate-bounce opacity-30" style={{ animationDuration: '5s' }}>
            <span className="material-symbols-outlined text-3xl text-secondary">magic_button</span>
          </div>
          <div className="absolute top-[25%] left-[45%] animate-pulse opacity-20">
            <span className="material-symbols-outlined text-sm text-tertiary">grade</span>
          </div>
          <div className="absolute bottom-[15%] right-[20%] floating opacity-25" style={{ animationDelay: '1.5s' }}>
            <span className="material-symbols-outlined text-4xl text-primary-fixed-dim">star_rate</span>
          </div>
        </div>

        <div suppressHydrationWarning className="max-w-7xl mx-auto px-6 pt-4 pb-16 lg:pt-10 lg:pb-24 relative z-10 w-full">
          <div suppressHydrationWarning className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div suppressHydrationWarning className="lg:col-span-6 space-y-6 text-right lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-primary-fixed text-primary rounded-full text-sm font-bold shadow-sm">
                <span className="material-symbols-outlined text-lg" data-icon="auto_awesome">auto_awesome</span>
                {t.hero.badge}
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-on-background leading-tight tracking-tight">
                {t.hero.headline_1} <span className="text-primary relative inline-block mt-4 lg:mt-0">
                  {t.hero.headline_2}
                  <svg className="absolute -bottom-4 left-0 w-full h-3 text-tertiary-fixed-dim" preserveAspectRatio="none" viewBox="0 0 100 10">
                    <path d="M0 5 Q 25 0 50 5 T 100 5" fill="transparent" stroke="currentColor" strokeWidth="4"></path>
                  </svg>
                </span> {t.hero.headline_3}
              </h1>
              <p className="text-xl text-on-surface-variant max-w-lg leading-relaxed font-body">
                {t.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row-reverse gap-4 pt-4 justify-end">
                <Link href={`/${locale}/shop`} className="bg-primary text-white px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-[0_20px_40px_-10px_rgba(62,0,185,0.3)] active:scale-95 flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined" data-icon="edit_square">edit_square</span>
                  {t.hero.cta_primary}
                </Link>
                <Link href={`/${locale}/gallery`} className="bg-white/80 backdrop-blur-sm text-on-surface border-2 border-surface-container-highest px-8 py-4 flex items-center justify-center rounded-full text-lg font-bold hover:bg-white transition-colors active:scale-95">
                  {t.hero.cta_secondary}
                </Link>
              </div>
            </div>
            
            <div suppressHydrationWarning className="lg:col-span-6 relative lg:order-1">
              {/* Storybook Frame */}
              <div className="relative z-10 p-4 bg-white rounded-[2.5rem] shadow-2xl rotate-[-2deg] transition-transform duration-500 hover:rotate-0">
                <div className="rounded-[1.5rem] overflow-hidden group relative">
                  <img alt="Storybook Illustration" className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDe4lkAcuooQb0cFG-RWHmFpg1GNcNzATsFRu6w6fOvHsqosV4RvY0jqwVPCqndynHmRdZCriYA5LXlXJpuf_4_5SKgZNngOq7s1PhJIjtk-d91lKLHZBbIGh33W43njPW_m4KIWzlVF_YZyIQzXBLH1H68yxhIlsn75kTIXrGJpJwP0dPgjiPNptqF9Hx1P1ttjhigNXiLjKhFlMnRyRTojdgkP1q6pttaESXZnK0Wer-L1eWL7_jIOSS62O2KG32v0ccTSi_ktHc" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                    <p className="text-white font-medium italic text-center">{t.hero.story_quote}</p>
                  </div>
                </div>
                {/* Whimsical Stickers */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-yellow-300 rounded-full flex items-center justify-center text-primary font-bold shadow-lg rotate-12 animate-bounce">
                  <span className="material-symbols-outlined text-4xl" data-icon="star">star</span>
                </div>
              </div>
              
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-secondary-container/20 rounded-full blur-2xl -z-10"></div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-tertiary-fixed-dim/20 rounded-full blur-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Book Slider Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 overflow-hidden text-right">
        <div className="flex flex-row-reverse items-center justify-between mb-12">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-on-surface mb-2">{t.gallery.title}</h2>
            <p className="text-sm text-on-surface-variant">{t.gallery.subtitle}</p>
          </div>
          <div className="hidden sm:flex flex-row-reverse gap-4">
            <button className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary-container hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined" data-icon="chevron_right">chevron_right</span>
            </button>
            <button className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary-container hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined" data-icon="chevron_left">chevron_left</span>
            </button>
          </div>
        </div>

        <div className="flex gap-8 overflow-x-auto no-scrollbar pb-8 px-2 flex-row-reverse snap-x">
          {/* Card 1 */}
          <div className="min-w-[220px] sm:min-w-[260px] snap-start group text-right">
            <div className="bg-white rounded-xl editorial-shadow overflow-hidden p-4 transition-transform duration-300 group-hover:-translate-y-2">
              <div className="aspect-[3/4] rounded-lg overflow-hidden mb-6 relative">
                <img alt="Space Hero Book Cover" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfSi3Yx0ApRD_VfoKIkMS55DNQE7vEh3nBe-JwsXmxew_nZhePU79J4K8ITQMM4TSduQ4zNNDDhpjJdLjguapOJgT_bTSqmuKKU_E6y-8IjW2bk2v9SIehDrgxR_VgSPtC67D6t8ZHpShKVBwJJaUP8tQF_NXORwGC50UBM9E-MVUV-oi5nhjj8srB0zoxxDJU-HNj7tXKRk3Ytha7RG19mKv-Y3E7TqJ2qDXzFYeoi0UtIpnRjHuJODFb_t-6cLGmS2r74yFH9Kw" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary uppercase">{t.gallery.badge_popular}</div>
              </div>
              <h3 className="text-xl font-bold mb-2">{t.gallery.book1_title}</h3>
              <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">{t.gallery.book1_desc}</p>
              <Link href={`/${locale}/shop`} className="block text-center w-full py-3 bg-primary-container text-on-primary rounded-lg font-semibold hover:bg-primary transition-colors">{t.gallery.cta}</Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="min-w-[220px] sm:min-w-[260px] snap-start group text-right">
            <div className="bg-white rounded-xl editorial-shadow overflow-hidden p-4 transition-transform duration-300 group-hover:-translate-y-2">
              <div className="aspect-[3/4] rounded-lg overflow-hidden mb-6 relative">
                <img alt="Jungle Adventure Book Cover" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIzLtoLyLWAy_MgttECnYtAeoi_BxnOBREWT6C297aRKZK7G6x-l6_Ej8JFO9cc7TDkFgJc_3ADf_DSCtjRN-WwDA5xzFgfi6hb-PZVMcZJQscOIrWfFYhmzv5E64xt9fIWBK2XuCKQvEdR3KXJityrg8q28Wtl-rs9tTRvPzMcnbpSce3bpEB8r2uUTC30_S2AV0MQutoPJmvKTUoB6npuc4n94QfAu-XCm5StvO7yz2PjJj0kqJNkiyMwXgdfAQ7a8bHwwEkf78" />
                <div className="absolute inset-0 bg-gradient-to-t from-tertiary/40 to-transparent"></div>
              </div>
              <h3 className="text-xl font-bold mb-2">{t.gallery.book2_title}</h3>
              <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">{t.gallery.book2_desc}</p>
              <Link href={`/${locale}/shop`} className="block text-center w-full py-3 bg-primary-container text-on-primary rounded-lg font-semibold hover:bg-primary transition-colors">{t.gallery.cta}</Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="min-w-[220px] sm:min-w-[260px] snap-start group text-right">
            <div className="bg-white rounded-xl editorial-shadow overflow-hidden p-4 transition-transform duration-300 group-hover:-translate-y-2">
              <div className="aspect-[3/4] rounded-lg overflow-hidden mb-6 relative">
                <img alt="Sea Explorer Book Cover" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbcVGCSe_SH11boiFUDjbfbyF5LNRuyXbm5IeWqLhtQJfr0FlJ1JXncYWa-LXex0ZHjhuWSZq7FAPQPYXLYCWLIjWvv3d3tGy7mfy4Mx66U-fK8PBm5LTuOwRVlkWfdBgBCiDPqjoL7igpTvffIhKNVAgDyOU7e_seAR9XUZQeIrAjV4vhhMOgA6K22FrU1abLEE4v8D6tueD0VyhhMJzadIW7Z1P6x5eHIyfmoNCNlVR41a07il8ro4hSwCQ9OM4XqxgX_7VW6Wg" />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent"></div>
              </div>
              <h3 className="text-xl font-bold mb-2">{t.gallery.book3_title}</h3>
              <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">{t.gallery.book3_desc}</p>
              <Link href={`/${locale}/shop`} className="block text-center w-full py-3 bg-primary-container text-on-primary rounded-lg font-semibold hover:bg-primary transition-colors">{t.gallery.cta}</Link>
            </div>
          </div>

          {/* Card 4 */}
          <div className="min-w-[220px] sm:min-w-[260px] snap-start group text-right">
            <div className="bg-white rounded-xl editorial-shadow overflow-hidden p-4 transition-transform duration-300 group-hover:-translate-y-2">
              <div className="aspect-[3/4] rounded-lg overflow-hidden mb-6 relative">
                <img alt="Magic Kingdom Book Cover" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4rKJjtAn_B1I28Ox4y_q5-kltgfOueiLUOQDD38KVJFo0J2p-1CxDUOXt72m7QzIoiGmdPQXGMqk6v6z02xQdYvqiBFxKwb2PdPRf6x83LBhwNhaVqOfRFWqaHwtPNvJ_3nsYZESc1lUDvM0Jf3gvvianzLzVKzjlb5vASoinANWExXNrSslcTM0bycYPIq4vwDYJwik5zLl9kKo2DcAMTfI7yl0GRSbU762f7pagVhKxdkn4sovE2lnd00lkO9-PEYEc892ht1I" />
                <div className="absolute inset-0 bg-gradient-to-t from-on-tertiary-fixed-variant/40 to-transparent"></div>
              </div>
              <h3 className="text-xl font-bold mb-2">{t.gallery.book4_title}</h3>
              <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">{t.gallery.book4_desc}</p>
              <Link href={`/${locale}/shop`} className="block text-center w-full py-3 bg-primary-container text-on-primary rounded-lg font-semibold hover:bg-primary transition-colors">{t.gallery.cta}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 lg:py-32 mx-4 rounded-[3rem] overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' }}>
        {/* Decorative background blobs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]" style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }}></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-20 blur-[100px]" style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-10 blur-[80px]" style={{ background: 'radial-gradient(ellipse, #f59e0b, transparent)' }}></div>

        {/* Floating sparkles */}
        <div className="absolute top-16 right-[15%] w-2 h-2 bg-yellow-300 rounded-full animate-pulse opacity-70"></div>
        <div className="absolute top-32 left-[10%] w-3 h-3 bg-purple-400 rounded-full animate-bounce opacity-50" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-20 left-[25%] w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-32 right-[20%] w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce opacity-50" style={{ animationDuration: '2.5s' }}></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white/80 text-sm font-semibold mb-6">
              <span className="material-symbols-outlined text-base text-yellow-300">auto_awesome</span>
              <span>ثلاث خطوات بسيطة</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-5 drop-shadow-lg">{t.how_it_works.title}</h2>
            <p className="text-white/60 max-w-xl mx-auto text-lg leading-relaxed">{t.how_it_works.subtitle}</p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch relative">

            {/* Connector lines (desktop only) */}
            <div className="hidden md:block absolute top-[4.5rem] left-[33%] right-[33%] h-0.5 z-0" style={{ background: 'linear-gradient(90deg, rgba(168,85,247,0.6), rgba(6,182,212,0.6))' }}>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-400"></div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400"></div>
            </div>

            {/* Step 1 */}
            <div className="relative group flex flex-col items-center text-center p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:-translate-y-2 transition-all duration-500 cursor-default z-10">
              {/* Number badge */}
              <div className="absolute -top-4 right-1/2 translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #a855f7, #7c3aed)' }}>
                ١
              </div>
              {/* Icon */}
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.4), rgba(124,58,237,0.6))', border: '1px solid rgba(168,85,247,0.4)' }}>
                <span className="material-symbols-outlined text-4xl text-purple-200">cloud_upload</span>
              </div>
              {/* Step content */}
              <h3 className="text-xl font-bold text-white mb-3">{t.how_it_works.step1_title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{t.how_it_works.step1_desc}</p>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: '0 0 40px rgba(168,85,247,0.15) inset' }}></div>
            </div>

            {/* Step 2 */}
            <div className="relative group flex flex-col items-center text-center p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:-translate-y-2 transition-all duration-500 cursor-default z-10">
              <div className="absolute -top-4 right-1/2 translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                ٢
              </div>
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.4), rgba(217,119,6,0.6))', border: '1px solid rgba(245,158,11,0.4)' }}>
                <span className="material-symbols-outlined text-4xl text-amber-200">auto_stories</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t.how_it_works.step2_title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{t.how_it_works.step2_desc}</p>
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: '0 0 40px rgba(245,158,11,0.15) inset' }}></div>
            </div>

            {/* Step 3 */}
            <div className="relative group flex flex-col items-center text-center p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:-translate-y-2 transition-all duration-500 cursor-default z-10">
              <div className="absolute -top-4 right-1/2 translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #06b6d4, #0284c7)' }}>
                ٣
              </div>
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.4), rgba(2,132,199,0.6))', border: '1px solid rgba(6,182,212,0.4)' }}>
                <span className="material-symbols-outlined text-4xl text-cyan-200">local_library</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t.how_it_works.step3_title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{t.how_it_works.step3_desc}</p>
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: '0 0 40px rgba(6,182,212,0.15) inset' }}></div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
              <Link href={`/${locale}/shop`} className="inline-block relative px-10 py-4 rounded-full text-base font-bold text-white shadow-2xl hover:scale-105 active:scale-95 transition-transform duration-200 overflow-hidden group" style={{ background: 'linear-gradient(135deg, #a855f7, #06b6d4)' }}>
                <span className="relative z-10 flex items-center gap-2 justify-center">
                  <span className="material-symbols-outlined text-lg">magic_button</span>
                  {t.how_it_works.cta}
                </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, #7c3aed, #0284c7)' }}></div>
              </Link>
          </div>
        </div>
      </section>

      {/* What Parents Say Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 lg:py-32 text-right">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-on-surface mb-3">{t.testimonials.title}</h2>
          <p className="text-on-surface-variant">{t.testimonials.subtitle}</p>
        </div>
        <div suppressHydrationWarning className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div suppressHydrationWarning className="bg-surface-container-low p-8 rounded-2xl border border-surface-container-highest transition-all duration-300 hover:shadow-lg">
            <div suppressHydrationWarning className="flex items-center gap-4 mb-6">
              <div suppressHydrationWarning className="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center overflow-hidden">
                <span className="material-symbols-outlined text-primary text-3xl" data-icon="person_celebrate">person_celebrate</span>
              </div>
              <div suppressHydrationWarning>
                <h4 className="font-bold text-on-surface">{t.testimonials.review1_name}</h4>
                <div suppressHydrationWarning className="flex gap-0.5 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-primary text-sm font-fill" data-icon="star">star</span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-on-surface-variant leading-relaxed italic">{t.testimonials.review1_text}</p>
          </div>
          <div suppressHydrationWarning className="bg-surface-container-low p-8 rounded-2xl border border-surface-container-highest transition-all duration-300 hover:shadow-lg">
            <div suppressHydrationWarning className="flex items-center gap-4 mb-6">
              <div suppressHydrationWarning className="w-14 h-14 rounded-full bg-tertiary-fixed flex items-center justify-center overflow-hidden">
                <span className="material-symbols-outlined text-tertiary text-3xl" data-icon="mood">mood</span>
              </div>
              <div suppressHydrationWarning>
                <h4 className="font-bold text-on-surface">{t.testimonials.review2_name}</h4>
                <div suppressHydrationWarning className="flex gap-0.5 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-primary text-sm font-fill" data-icon="star">star</span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-on-surface-variant leading-relaxed italic">{t.testimonials.review2_text}</p>
          </div>
          <div suppressHydrationWarning className="bg-surface-container-low p-8 rounded-2xl border border-surface-container-highest transition-all duration-300 hover:shadow-lg">
            <div suppressHydrationWarning className="flex items-center gap-4 mb-6">
              <div suppressHydrationWarning className="w-14 h-14 rounded-full bg-secondary-fixed flex items-center justify-center overflow-hidden">
                <span className="material-symbols-outlined text-secondary text-3xl" data-icon="child_care">child_care</span>
              </div>
              <div suppressHydrationWarning>
                <h4 className="font-bold text-on-surface">{t.testimonials.review3_name}</h4>
                <div suppressHydrationWarning className="flex gap-0.5 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-primary text-sm font-fill" data-icon="star">star</span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-on-surface-variant leading-relaxed italic">{t.testimonials.review3_text}</p>
          </div>
        </div>
      </section>

      {/* Bento Showcase Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 lg:py-40">
        <div suppressHydrationWarning className="flex flex-col lg:flex-row gap-8">
          <div suppressHydrationWarning className="lg:w-2/3 bg-primary-container rounded-xl overflow-hidden relative group h-[500px]">
            <img alt="Dreamy illustration" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB84QvbvakD1lGmqwNi2gxWD8Vstw4jtWh1ZzuLgzV82SqU_hvKZ9at6EpmIU2hF5817eFkqrgEWRxrmd_keGAl9hrSkhGl-yLTjM7eXydSFJtWz1at3kKCYXws3-lfwBc0k-adpfjoKEnv-oZlzt0_aOZXAm9zDyNdgE71MLcAw-qeaxrGl5BuszdtoiKuOsz08VAIsTvJX2X2f_gTpxDebvTl4LTc8MKM_LQ2yWWCR2Y6zlL-WJELG281F_0wgFVsa5r2fpM_33E" />
            <div suppressHydrationWarning className="absolute inset-0 bg-gradient-to-t from-primary-container via-transparent to-transparent"></div>
            <div suppressHydrationWarning className="absolute bottom-0 right-0 p-12 w-full text-right">
              <h3 className="text-white text-4xl font-bold mb-4">{t.bento.art_title}</h3>
              <p className="text-on-primary-container text-lg max-w-md mr-0 ml-auto">{t.bento.art_desc}</p>
            </div>
          </div>
          <div suppressHydrationWarning className="lg:w-1/3 flex flex-col gap-8">
            <div suppressHydrationWarning className="bg-tertiary-container h-full rounded-xl p-8 flex flex-col justify-end text-right">
              <span className="material-symbols-outlined text-4xl mb-4 text-white" data-icon="auto_awesome">auto_awesome</span>
              <h4 className="text-2xl font-bold mb-2 text-white">{t.bento.ai_title}</h4>
              <p className="text-sm text-white/90">{t.bento.ai_desc}</p>
            </div>
            <div suppressHydrationWarning className="bg-surface-container-high h-full rounded-xl p-8 flex flex-col justify-end text-right">
              <span className="material-symbols-outlined text-4xl mb-4 text-primary" data-icon="local_shipping">local_shipping</span>
              <h4 className="text-2xl font-bold mb-2 text-on-surface">{t.bento.shipping_title}</h4>
              <p className="text-sm text-on-surface-variant">{t.bento.shipping_desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <div suppressHydrationWarning className="bg-gradient-to-br from-primary to-primary-container rounded-[2rem] p-12 lg:p-24 relative overflow-hidden">
          <div suppressHydrationWarning className="relative z-10">
            <h2 className="text-white text-3xl lg:text-5xl font-bold mb-6">{t.cta_section.title}</h2>
            <p className="text-on-primary-container mb-10 max-w-2xl mx-auto">{t.cta_section.subtitle}</p>
            <Link href={`/${locale}/shop`} className="inline-block bg-white text-primary px-8 py-4 rounded-full text-lg font-bold hover:bg-surface transition-colors shadow-2xl active:scale-95">
              {t.cta_section.button}
            </Link>
          </div>
          <div suppressHydrationWarning className="absolute top-0 left-0 w-64 h-64 bg-secondary-container/30 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div suppressHydrationWarning className="absolute bottom-0 right-0 w-64 h-64 bg-tertiary/20 blur-3xl rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
      </section>
    </main>
  );
}
