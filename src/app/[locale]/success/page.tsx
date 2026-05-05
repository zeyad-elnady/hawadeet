import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import Link from 'next/link';


export default async function SuccessPage({ params, searchParams }: { params: Promise<{ locale: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const { locale } = await params;
  const { order_id } = await searchParams;
  const dict = await getDictionary(locale as Locale);
  const successDict = dict.success;

  return (
    <main className="pt-32 pb-36 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto min-h-screen relative overflow-visible flex items-center justify-center">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-[10%] w-[40%] h-[400px] bg-green-500/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[400px] bg-[#06b6d4]/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="bg-white border border-slate-200 rounded-3xl p-10 sm:p-16 shadow-xl max-w-2xl w-full text-center relative z-10">
        
        {/* Success Icon Animation */}
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce-slow shadow-sm">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30">
            <span className="material-symbols-outlined text-[40px]">check</span>
          </div>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">{successDict.title}</h1>
        <p className="text-slate-500 text-lg leading-relaxed max-w-md mx-auto mb-10">{successDict.subtitle}</p>
        
        {order_id && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 inline-block mx-auto mb-10 min-w-[250px]">
            <p className="text-sm font-semibold text-slate-500 mb-1">{successDict.order_number}</p>
            <p className="font-mono text-lg font-bold text-[#5630D1] uppercase">#{typeof order_id === 'string' ? order_id.split('-')[0] : order_id}</p>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href={`/${locale}`}
            className="w-full sm:w-auto px-8 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
          >
            {successDict.home_button}
          </Link>
          <Link 
            href={`/${locale}/gallery`}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#5630D1] hover:bg-[#4927b5] text-white rounded-xl font-bold transition-all shadow-lg shadow-[#5630D1]/20 flex items-center justify-center gap-2"
          >
            <span>{successDict.track_button}</span>
            <span className="material-symbols-outlined text-[20px]">local_shipping</span>
          </Link>
        </div>
      </div>
      
    </main>
  );
}
