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

  // The first path segment after the leading slash is the locale, e.g., /en/about or /ar/about
  const currentLocale = pathname.split('/')[1] || 'ar';
  
  const targetLocale = currentLocale === 'ar' ? 'en' : 'ar';
  const targetLabel = currentLocale === 'ar' ? 'En' : 'عربي';

  return (
    <Link
      href={redirectedPathName(targetLocale)}
      className="text-slate-600 border border-slate-300 hover:border-[#5630D1] hover:text-[#5630D1] hover:bg-slate-50 px-3 py-1 rounded-md font-medium transition-all"
      suppressHydrationWarning
    >
      {targetLabel}
    </Link>
  );
}
