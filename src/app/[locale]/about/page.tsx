import Link from 'next/link';

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <main className="pt-32">
      {/* Hero Section: Our Magical Journey */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center flex-row-reverse">
          <div className="order-2 lg:order-1 text-right">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">رحلتنا السحرية</span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-on-surface leading-[1.2] tracking-tight mb-8">
              حيث يجد كل حلم <br/> صوته الخاص.
            </h1>
            <p className="text-xl text-on-surface-variant leading-relaxed mb-10 max-w-xl mr-0 ml-auto">
              في حواديت، نؤمن أن كل طفل هو بطل قصته الخاصة. لقد دمجنا دفء القصص التقليدية مع سحر الذكاء الاصطناعي لنخلق عالماً لا تعرف فيه المخيلة حدوداً.
            </p>
            <div className="flex flex-wrap gap-4 justify-end flex-row-reverse">
              <div className="flex items-center flex-row-reverse gap-3 bg-surface-container-low px-5 py-3 rounded-full">
                <span className="material-symbols-outlined text-primary" data-icon="auto_awesome">auto_awesome</span>
                <span className="font-medium text-sm">ذكاء اصطناعي فائق</span>
              </div>
              <div className="flex items-center flex-row-reverse gap-3 bg-surface-container-low px-5 py-3 rounded-full">
                <span className="material-symbols-outlined text-tertiary" data-icon="menu_book">menu_book</span>
                <span className="font-medium text-sm">قصص مخصصة</span>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="absolute inset-0 bg-primary-container/10 blur-[100px] rounded-full -z-10 transform scale-75"></div>
            <div className="rounded-xl overflow-hidden aspect-[4/5] shadow-2xl">
              <img alt="Child reading a glowing book" className="w-full h-full object-cover" data-alt="a whimsical illustration of a young child sitting cross-legged reading a magical book that glows with soft purple and golden light in a cozy dark room" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCkeEUPmA1m4WMxhfzwbsP-abx8I1hB3HmSVKw8C8F2w1no2_kTpAwGAhB2uUdO_YPtqDXz9FqWCcdqX8ClfuNaem3fpyNz8UcSUMhEAyLZ_1S2bwoR6Jd4XUEOS7X7nF_bium09POJtKSn2rbmLJwsWkX4XoBeFjB8RL0-fBjy5uq6x2ZNnxJLyuN9H6L4PE3cBA1oVxcKKHXkUdur7WEqTPfvEd6j1mxwBR28_CJlC2NqlTSSRWCk6ua1oV9CaT-v9f6Tv9eZ2Q" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Hawadeet Section: Bento Grid Layout */}
      <section className="bg-surface-container-low py-32 rounded-xl mx-4 md:mx-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">لماذا حواديت؟</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">نحن لا نقوم فقط بتوليد النصوص؛ بل ننسج العواطف والذكريات في تحف رقمية تعتز بها العائلات للأبد.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-surface-container-lowest p-10 rounded-lg flex flex-col items-start hover:shadow-lg transition-shadow duration-300 text-right">
              <div className="w-14 h-14 bg-primary-container/10 rounded-full flex items-center justify-center mb-8 self-end">
                <span className="material-symbols-outlined text-primary text-3xl" data-icon="person_celebrate">person_celebrate</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 w-full">تخصيص عميق</h3>
              <p className="text-on-surface-variant leading-relaxed">اسم طفلك، ألعابه المفضلة، وحتى سماته الفريدة تصبح قلب كل حبكة روائية.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-primary-container text-on-primary p-10 rounded-lg flex flex-col items-end md:row-span-2 justify-center relative overflow-hidden text-right">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -translate-y-1/2 -translate-x-1/2"></div>
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-8">
                <span className="material-symbols-outlined text-white text-3xl" data-icon="palette">palette</span>
              </div>
              <h3 className="text-3xl font-bold mb-6 tracking-tight w-full">رسومات فنية مبدعة</h3>
              <p className="text-on-primary-container leading-relaxed mb-8">ينتج فنانونا من الذكاء الاصطناعي صوراً مخصصة تبدو وكأنها مرسومة يدوياً من قبل أمهر رسامي كتب القصص، مصممة لكل مشهد.</p>
              <div className="w-full h-48 rounded-md overflow-hidden bg-white/10 backdrop-blur-sm">
                <img className="w-full h-full object-cover opacity-80" data-alt="soft pastel abstract painting style illustration of a magical forest with bioluminescent plants and friendly creatures" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGzyNIIFzwvLtbaSs8Wza2heQsXAhQp5s2qn7MSdylwaYgqxIvuoCJmwKtAuHoj0Oe9SlXKxxTHNIeBBlwA34TBqtZlUKc5JQ1v_y112SQSXEHb4cUWrodMMFe3BrxDWUbh0QnVZGe8sq4ED-MpjhMtTd767mNct2_hsGbpsCdpe-9_s-fKm1NTQk8t40ZmbncVKOVOfFJ8PEBC7Jv4eNBsrjWKnWOss9ePPB-YTCQY_6-Qso3kHHbpQ5qVxBQtcMQT0GiqeTFGa8" />
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-surface-container-lowest p-10 rounded-lg flex flex-col items-start hover:shadow-lg transition-shadow duration-300 text-right">
              <div className="w-14 h-14 bg-tertiary-container/10 rounded-full flex items-center justify-center mb-8 self-end">
                <span className="material-symbols-outlined text-tertiary text-3xl" data-icon="volunteer_activism">volunteer_activism</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 w-full">بناء روابط المحبة</h3>
              <p className="text-on-surface-variant leading-relaxed">نركز على بناء علاقة تدوم مدى الحياة بين الأطفال والقراءة، محولين وقت الشاشة إلى وقت عائلي هادف.</p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-surface-container-lowest p-10 rounded-lg flex flex-col items-start hover:shadow-lg transition-shadow duration-300 text-right">
              <div className="w-14 h-14 bg-secondary-container/10 rounded-full flex items-center justify-center mb-8 self-end">
                <span className="material-symbols-outlined text-secondary text-3xl" data-icon="verified_user">verified_user</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 w-full">بيئة آمنة وسليمة</h3>
              <p className="text-on-surface-variant leading-relaxed">الأمان هو حجر الزاوية لدينا. يتم تصفية جميع المحتويات وصياغتها لتكون مناسبة للعمر وإيجابية من الناحية التنموية للعقول الشابة.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision/Team Section */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row gap-16 items-start flex-row-reverse">
          <div className="md:w-1/3 sticky top-32 text-right">
            <h2 className="text-4xl font-bold mb-6 tracking-tight">رؤيتنا للمستقبل</h2>
            <p className="text-on-surface-variant mb-8 leading-relaxed">
              بدأنا حواديت بهدف بسيط: جعل القراءة ممتعة مثل مشاهدة فيلم، ولكن حميمية مثل الهمس.
            </p>
            <div className="flex items-center gap-4 flex-row-reverse">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img data-alt="portrait of a smiling man with a warm expression, founder of Hawadeet" src="https://lh3.googleusercontent.com/aida-public/AB6AXuANldT01B5jA5b3GA3vWRSNxjbsdSX2vDRTHWAb6tJjByGAull6b0xXsKXOH_IkIBwchDyLXA9qj4xLLyjCj78Zgq18r7XW0c1YIbQB_u6IEJ20DAsmt3k8orj8ANmyy8pnC57AuMJtTV5C2YMpphZR5gGsSwPyp4CwYQmj51hTmj5vt7KVOMV-iql9MwEeAd0pXdtHtGgjb4AUNR3Qqa1gJjTd4v0yOP3_QQJAoMW302p69407tSjsXoTHHegYSdMtbpmCFdwlUok" />
              </div>
              <div>
                <p className="font-bold">عمر الفارسي</p>
                <p className="text-sm text-stone-500">المؤسس وكبير الرواة</p>
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3 space-y-12">
            <div className="group relative bg-surface-container p-12 rounded-lg border-r-4 border-primary text-right">
              <span className="material-symbols-outlined text-5xl text-primary/20 absolute top-8 right-8" data-icon="format_quote">format_quote</span>
              <p className="text-2xl font-medium leading-snug text-on-surface relative z-10 pt-4">
                "لا ينبغي أبداً للتكنولوجيا أن تحل محل صوت الوالدين، بل يجب أن تمنحهم نصوصاً أفضل للقراءة. نحن نبني أدوات تسد الفجوة بين قدرات الذكاء الاصطناعي والقلب البشري."
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-right flex-row-reverse">
              <div className="bg-surface-container-high p-8 rounded-lg">
                <h4 className="font-bold text-lg mb-4">قيمنا</h4>
                <ul className="space-y-3 text-on-surface-variant flex flex-col items-end">
                  <li className="flex items-center gap-2 flex-row-reverse"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> إبداع جذري</li>
                  <li className="flex items-center gap-2 flex-row-reverse"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> ذكاء أخلاقي</li>
                  <li className="flex items-center gap-2 flex-row-reverse"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> تعاطف عالمي</li>
                </ul>
              </div>
              <div className="bg-surface-container-high p-8 rounded-lg">
                <h4 className="font-bold text-lg mb-4">المجتمع</h4>
                <p className="text-on-surface-variant leading-relaxed">أكثر من 50,000 قصة تم إنشاؤها ومشاركتها من قبل أولياء الأمور عبر 12 دولة في العام الماضي وحده.</p>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="bg-tertiary text-on-tertiary p-12 rounded-xl flex flex-col md:flex-row items-center justify-between gap-8 flex-row-reverse text-right">
              <div>
                <h3 className="text-3xl font-bold mb-2">هل أنت مستعد لبدء حكايتك؟</h3>
                <p className="opacity-80">يستغرق الأمر دقيقة واحدة فقط لخلق ذكريات تدوم مدى الحياة.</p>
              </div>
              <Link href={`/${locale}/shop`} className="bg-white text-tertiary px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform text-base inline-block">
                انضم إلى المغامرة
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
