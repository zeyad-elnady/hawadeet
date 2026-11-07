import Link from 'next/link';
import { Locale } from '@/i18n-config';

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  const isAr = locale === 'ar';

  return (
    <main className="pt-26 sm:pt-30 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Hero Section */}
      <section className="mb-24">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 text-start space-y-6">
            <span className="inline-block px-3 py-1 bg-[#E6F0EB] text-[#154734] rounded-full text-xs font-bold uppercase tracking-wider">
              {isAr ? 'قصتنا وحرفيتنا' : 'Our Story & Craft'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#192520] leading-tight font-headline">
              {isAr ? (
                <>حيث يصبح كل طفل <br /><span className="text-[#842232] italic">بطل حكايته المطبوعة</span>.</>
              ) : (
                <>Where every child becomes the <br /><span className="text-[#842232] italic">hero of their own story</span>.</>
              )}
            </h1>
            <p className="text-base sm:text-lg text-[#566860] leading-relaxed font-body max-w-xl">
              {isAr
                ? 'تأسست دار حواديت بهدف بسيط ودافئ: إعادة السحر إلى وقت النوم. نحن نجمع بين حب القصص الكلاسيكية، والفن التشكيلي الراقي، وأحدث تقنيات التخصيص لنصنع كتباً مقواة تدوم لعقود في مكتبات العائلة.'
                : 'Hawadeet was founded with a single heartfelt mission: to bring timeless wonder back to bedtime. We combine classical children’s storytelling with bespoke portraiture to craft heirloom hardcovers that stay in families for generations.'}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#E8E3D7] text-xs font-bold text-[#154734]">
                <span className="material-symbols-outlined text-base">auto_stories</span>
                <span>{isAr ? 'أكثر من ١٠,٠٠٠ كتاب مطبوع' : '10,000+ Heirloom Books Printed'}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#E8E3D7] text-xs font-bold text-[#842232]">
                <span className="material-symbols-outlined text-base">verified</span>
                <span>{isAr ? 'ورق أرشيفي معتمد ١٠٠٪' : 'FSC-Certified Archival Paper'}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-[#E8E3D7] aspect-4/3 relative">
              <img
                alt="Child reading bedtime storybook"
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 4 Pillars of Excellence */}
      <section className="bg-[#FAF8F5] py-16 px-6 sm:px-12 rounded-3xl border border-[#E8E3D7] mb-24 text-start">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#192520] font-headline">
            {isAr ? 'ما الذي يجعل كتب حواديت استثنائية؟' : 'What Makes a Hawadeet Book Unique?'}
          </h2>
          <p className="text-sm text-[#566860] mt-2">
            {isAr ? 'معايير دار النشر للأطفال التي تضع الجودة في المقام الأول' : 'Publisher standards crafted with relentless attention to detail'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white p-8 rounded-2xl border border-[#E8E3D7] shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#E6F0EB] text-[#154734] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">palette</span>
            </div>
            <h3 className="text-lg font-bold text-[#192520] font-headline">
              {isAr ? 'رسم فني منسق بعناية' : 'Curated Artisanal Art'}
            </h3>
            <p className="text-xs text-[#566860] leading-relaxed">
              {isAr
                ? 'فريق من الفنانين ورسامي كتب الأطفال يشرف على كل تفصيلة لضمان ظهور ملامح طفلك كبطل مرسوم باحترافية في كل صفحة.'
                : 'Every single scene is tailored so your child naturally blends as the courageous illustrated star.'}
            </p>
          </div>

          <div className="bg-[#154734] text-white p-8 rounded-2xl shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#235843] text-[#E5A93C] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">book</span>
            </div>
            <h3 className="text-lg font-bold text-white font-headline">
              {isAr ? 'تجليد يدوي فاخر يدوم طويلاً' : 'True Hardcover Keepsake'}
            </h3>
            <p className="text-xs text-[#C8D6CF] leading-relaxed">
              {isAr
                ? 'أغلفة مقواة مقاومة للسوائل والخدش، مع ورق سميك فاخر صُمم ليتحمل قراءات ما قبل النوم المتكررة لسنوات.'
                : 'Reinforced smyth-sewn style hardback bindings designed to withstand eager little hands every evening.'}
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#E8E3D7] shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#F6EAEB] text-[#842232] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">favorite</span>
            </div>
            <h3 className="text-lg font-bold text-[#192520] font-headline">
              {isAr ? 'قيم تربوية ورسائل ملهمة' : 'Timeless Values & Empathy'}
            </h3>
            <p className="text-xs text-[#566860] leading-relaxed">
              {isAr
                ? 'كل حكاية تبني في الطفل الثقة بالنفس، الشجاعة، حب الاستكشاف، وتوطد الروابط العاطفية بين الطفل ووالديه.'
                : 'Narratives crafted with child psychologists to nurture resilience, curiosity, and family warmth.'}
            </p>
          </div>

        </div>
      </section>

      {/* Founder Callout & Promise */}
      <section className="bg-[#FAF8F5] rounded-3xl p-8 sm:p-14 border border-[#E8E3D7] text-start flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="space-y-4 max-w-2xl">
          <span className="material-symbols-outlined text-4xl text-[#154734]">format_quote</span>
          <p className="text-lg sm:text-xl font-medium text-[#192520] italic leading-relaxed font-headline">
            {isAr
              ? '«عندما يرى الطفل نفسه بطلاً في كتاب مطبوع، يتغير تصوره لذاته وللعالم. إنه يدرك أن كل حلم ممكن، وأن حكايته تستحق أن تُروى.»'
              : '“When a child sees themselves as the brave hero of a physical book, their whole world expands. They realize their story matters.”'}
          </p>
          <p className="text-xs font-bold text-[#7D8F86]">
            {isAr ? 'دار حواديت للطباعة والنشر المخصص' : 'Hawadeet Personalized Storybook Atelier'}
          </p>
        </div>

        <Link
          href={`/${locale}/shop`}
          className="px-8 py-4 rounded-full bg-[#154734] hover:bg-[#0E2E22] text-white font-bold text-sm shadow-md whitespace-nowrap transition-transform hover:scale-105"
        >
          {isAr ? 'أنشئ كتاب طفلك اليوم' : 'Create Your Storybook'}
        </Link>
      </section>

    </main>
  );
}
