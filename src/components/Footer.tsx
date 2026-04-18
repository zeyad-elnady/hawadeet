import Link from 'next/link';
import Image from 'next/image';
import logoSrc from '../app/assets/logo-01.svg';

type FooterDict = {
  copyright: string;
  contact: string;
  help: string;
  terms: string;
};

export default function Footer({ dict, locale }: { dict: FooterDict; locale: string }) {
  return (
    <footer className="bg-[#f5f3ef] dark:bg-slate-900 w-full py-12 mt-20 rounded-t-[3rem]">
      <div suppressHydrationWarning className="flex flex-col md:flex-row-reverse justify-between items-center gap-8 px-8 max-w-7xl mx-auto">
        <div suppressHydrationWarning className="flex flex-col items-center md:items-end gap-4 text-right">
          <Link href={`/${locale}`} suppressHydrationWarning className="flex items-center">
            <Image
              alt="Hawadeet Logo"
              className="w-28 h-auto object-contain"
              src={logoSrc}
            />
          </Link>
          <p className="font-['Plus_Jakarta_Sans'] text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} حواديت. {dict.copyright}
          </p>
        </div>
        <div suppressHydrationWarning className="flex flex-wrap justify-center gap-8 font-['Plus_Jakarta_Sans'] text-sm">
          <Link className="text-slate-500 dark:text-slate-400 hover:text-[#5630D1] dark:hover:text-white transition-colors duration-200 opacity-80 hover:opacity-100" href={`/${locale}/contact`}>{dict.contact}</Link>
          <Link className="text-slate-500 dark:text-slate-400 hover:text-[#5630D1] dark:hover:text-white transition-colors duration-200 opacity-80 hover:opacity-100" href="#">{dict.help}</Link>
          <Link className="text-slate-500 dark:text-slate-400 hover:text-[#5630D1] dark:hover:text-white transition-colors duration-200 opacity-80 hover:opacity-100" href="#">{dict.terms}</Link>
        </div>
        <div suppressHydrationWarning className="flex gap-6">
          <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary transition-colors">share</span>
          <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary transition-colors">alternate_email</span>
        </div>
      </div>
    </footer>
  );
}
