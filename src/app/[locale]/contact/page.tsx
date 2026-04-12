import Image from 'next/image';

export default function Contact() {
  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center gap-12 mb-16 flex-row-reverse text-right">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl md:text-7xl font-extrabold text-on-surface tracking-tighter leading-[1.2]">
            نحب أن <span className="text-primary">نسمع منك!</span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-lg leading-relaxed font-body">
            سواء كان لديك سؤال حول قصصنا السحرية، أو ترغب في مشاركة تعليقاتك، أو مجرد إلقاء التحية، فنحن نصغي إليك. كائناتنا الودودة بانتظار استلام رسالتك.
          </p>
          <div className="flex items-center gap-4 p-6 bg-surface-container-low rounded-lg w-fit ml-auto flex-row-reverse">
            <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">mail</span>
            </div>
            <div>
              <p className="text-sm font-bold font-headline text-on-surface">راسلنا في أي وقت</p>
              <p className="text-sm text-on-surface-variant">hello@hawadeet.ai</p>
            </div>
          </div>
        </div>

        {/* Illustration Area */}
        <div className="md:w-1/2 relative w-full">
          <div className="aspect-square rounded-xl overflow-hidden bg-primary-container/10 flex items-center justify-center p-8">
            <img alt="مخلوق ودود وصندوق بريد" className="w-full h-full object-cover rounded-lg shadow-2xl shadow-primary/10" data-alt="Whimsical 3D illustration of a fluffy friendly blue creature standing next to a vintage wooden mailbox in a sunlit meadow with soft pastel colors" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_gr44D98mzwRS2oE6dkps3Ayk7gZHW_V-9vWPnpvzMIWKa_5HTnpoyYi4cYJ7gMISh2Ln2NHTb7nL8qfEZ48JSk4_j-hNDJDgAngbNcP8F-wdsxI1CmNqwoxjrDaihQvazMSWh01F8p9MObakzzooHSaa830INb3aMQF-EXRmW4ZSsadY9tXFSM21abLbeNny6Dot20XYLuoB-g7IHOZ9UJjgtk-0e65NNhCZ1hUW-hSXzuG5_LuZft37dok1k_CMdkaTWhnX3DE" />
          </div>
          {/* Decorative Elements */}
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-tertiary-fixed rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary-fixed rounded-full blur-3xl opacity-30"></div>
        </div>
      </div>

      {/* Contact Form Card */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-right">
        <div className="lg:col-span-8 bg-surface-container-low p-8 md:p-12 rounded-xl text-right w-full">
          <form className="space-y-8 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-row-reverse w-full">
              <div className="space-y-2">
                <label className="block text-sm font-bold font-headline text-on-surface-variant px-1" htmlFor="name">الاسم</label>
                <input className="text-right w-full px-6 py-4 bg-surface-container-lowest rounded-lg border-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 placeholder:text-outline-variant" id="name" placeholder="أخبرنا باسمك" type="text" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold font-headline text-on-surface-variant px-1" htmlFor="email">البريد الإلكتروني</label>
                <input className="text-right w-full px-6 py-4 bg-surface-container-lowest rounded-lg border-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 placeholder:text-outline-variant" id="email" placeholder="أين يمكننا الوصول إليك؟" type="email" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold font-headline text-on-surface-variant px-1" htmlFor="subject">الموضوع</label>
              <input className="text-right w-full px-6 py-4 bg-surface-container-lowest rounded-lg border-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 placeholder:text-outline-variant" id="subject" placeholder="عن ماذا تدور رسالتك؟" type="text" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold font-headline text-on-surface-variant px-1" htmlFor="message">الرسالة</label>
              <textarea className="text-right w-full px-6 py-4 bg-surface-container-lowest rounded-lg border-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 placeholder:text-outline-variant resize-none" id="message" placeholder="اكتب قصتك أو سؤالك هنا..." rows={6}></textarea>
            </div>
            <button className="w-full md:w-auto px-8 py-3 bg-primary-container text-on-primary-container rounded-full font-headline font-extrabold text-base hover:scale-[1.02] transition-transform duration-300 ease-out active:scale-95 shadow-xl shadow-primary/20" type="button">
              إرسال الرسالة
            </button>
          </form>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-8 w-full text-right">
          <div className="bg-primary text-on-primary p-8 rounded-xl space-y-6">
            <h3 className="text-2xl font-bold font-headline leading-tight">استجابة سريعة</h3>
            <p className="text-on-primary/80 font-body leading-relaxed">
              عادة ما نرد في غضون 24 ساعة. تساعدنا قصصك واقتراحاتك في جعل 'حواديت' أكثر سحراً كل يوم.
            </p>
            <div className="pt-4 border-t border-white/10 w-full text-right">
              <div className="flex items-center gap-3 mb-4 flex-row-reverse w-full">
                <span className="material-symbols-outlined text-primary-fixed">help</span>
                <span className="font-headline font-bold">مركز المساعدة</span>
              </div>
              <p className="text-sm text-on-primary/70 mb-4">تحقق من الأسئلة الشائعة للحصول على إجابات سريعة للأسئلة المتكررة.</p>
              <a className="inline-block px-6 py-2 bg-white/10 rounded-full text-sm font-bold hover:bg-white/20 transition-colors" href="#">زيارة مركز المساعدة</a>
            </div>
          </div>
          
          <div className="p-8 bg-surface-container-high rounded-xl text-right">
            <h4 className="font-headline font-bold text-lg mb-4">تابع رحلتنا</h4>
            <div className="flex gap-4 flex-row-reverse">
              <a className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all" href="#">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>share</span>
              </a>
              <a className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all" href="#">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>camera</span>
              </a>
              <a className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all" href="#">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
