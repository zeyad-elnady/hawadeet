import Link from 'next/link';

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
          <div suppressHydrationWarning className="flex items-center gap-2">
            <img
              alt="Logo Small"
              className="w-8 h-8 rounded-md"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZhw5k9Q6hkjbPFebLe7gNqHffeJuEZ83dAXMDkixx9nejvd4F6tJmOasoKxitOd0HMKz1hU917S5zrM8fmEGz2BmZmrmNpllHuNFGRhI1x6F6XKrSPhwYttLBYVuOuRPbMQAWJITfAOQjDtWYptyw4HvKBHztOH5uKmPqZss_E33bnrE7fzKURVq0ESD18JswydCae1M7PTe4MYb0vxnrQvoP906jLZUK7rwrNL3YociYwDsUBL25GVRQfkRsIS6_getkq69BdMpQ"
            />
            <span className="text-lg font-bold text-[#5630D1]">حواديت</span>
          </div>
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
