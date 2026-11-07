'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function LanguageSwitcher() {
  const pathname = usePathname();

  if (!pathname) return null;

  const redirectedPathName = (locale: string) => {
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const currentLocale = pathname.split('/')[1] || 'ar';
  const targetLocale = currentLocale === 'ar' ? 'en' : 'ar';
  const targetLabel = currentLocale === 'ar' ? 'English' : 'عربي';

  return (
    <Link
      href={redirectedPathName(targetLocale)}
      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#192520] hover:text-[#154734] px-2.5 py-1 rounded-full border border-[#D7D0C0] hover:border-[#154734] bg-white transition-all shadow-2xs"
      suppressHydrationWarning
    >
      <span className="material-symbols-outlined text-[14px] text-[#7D8F86]">language</span>
      <span>{targetLabel}</span>
    </Link>
  );
}
