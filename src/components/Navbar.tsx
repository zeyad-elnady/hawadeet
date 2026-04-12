'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

type NavbarDict = {
  home: string;
  gallery: string;
  about: string;
  shop: string;
  contact: string;
  cta: string;
};

export default function Navbar({ dict, locale }: { dict: NavbarDict; locale: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: dict.home, href: `/${locale}` },
    { label: dict.about, href: `/${locale}/about` },
    { label: dict.gallery, href: `/${locale}/gallery` },
    { label: dict.contact, href: `/${locale}/contact` },
  ];

  return (
    <>
      <nav
        suppressHydrationWarning
        className="fixed top-0 w-full z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(251,249,245,0.85)'
            : 'rgba(251,249,245,0.60)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '1px solid rgba(86,48,209,0.10)' : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 30px rgba(86,48,209,0.06)' : 'none',
        }}
      >
        <div suppressHydrationWarning className="flex flex-row justify-between items-center w-full px-5 py-3.5 max-w-7xl mx-auto">

          {/* Logo */}
          <div suppressHydrationWarning className="flex items-center gap-2.5">
            <div suppressHydrationWarning className="relative">
              <img
                alt="Hawadeet Logo"
                className="w-9 h-9 object-contain rounded-xl shadow-md"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxu4erPABnzFMzkps-zYl-mOtjub0Kcn8J-pwWv46NdsuvYYeRrSQWXQKjEkbVaZ5vgBuABnfPT0BQAuQzvWgdoY798l4pbElWSD9Ghz140woqApqcGvbbBgo0ds9y0h2zjLej3bcHPqybduqQoGOiQx5iP9yh9uVCSB3RANnGuQJoszL71BkDIbC9kizDE1OBOfZmT0BCS_y9X74PnhCvz_8rRylNTV9wWoA1Z_Uvjo6VKmpFmJ23dFVQTlPGGGgZg2KvMI98UJk"
              />
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-purple-400 to-indigo-600 border-2 border-white"></div>
            </div>
            <Link href={`/${locale}`} className="text-xl font-black tracking-tighter" style={{ color: '#5630D1' }}>
              حواديت
            </Link>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex flex-row items-center gap-8 text-sm font-medium">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-600 hover:text-[#5630D1] hover:scale-105 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side: language + CTA + hamburger */}
          <div suppressHydrationWarning className="flex items-center gap-3">
            <LanguageSwitcher />

            {/* CTA — hidden on very small mobile, shown md+ */}
            <Link
              href={`/${locale}`}
              className="hidden sm:flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-bold text-white shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200"
              style={{ background: 'linear-gradient(135deg, #5630D1, #9333ea)' }}
            >
              <span className="material-symbols-outlined text-base">edit_square</span>
              {dict.cta}
            </Link>

            {/* Hamburger — only on mobile */}
            <button
              id="mobile-menu-toggle"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden relative w-10 h-10 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-300"
              style={{
                background: menuOpen
                  ? 'linear-gradient(135deg, #5630D1, #9333ea)'
                  : 'rgba(86,48,209,0.08)',
              }}
            >
              <span
                className="block h-0.5 rounded-full transition-all duration-300 origin-center"
                style={{
                  width: '18px',
                  background: menuOpen ? '#fff' : '#5630D1',
                  transform: menuOpen ? 'translateY(4px) rotate(45deg)' : 'none',
                }}
              />
              <span
                className="block h-0.5 rounded-full transition-all duration-300"
                style={{
                  width: '14px',
                  background: menuOpen ? '#fff' : '#5630D1',
                  opacity: menuOpen ? 0 : 1,
                  alignSelf: 'flex-end',
                  marginRight: '0',
                }}
              />
              <span
                className="block h-0.5 rounded-full transition-all duration-300 origin-center"
                style={{
                  width: '18px',
                  background: menuOpen ? '#fff' : '#5630D1',
                  transform: menuOpen ? 'translateY(-4px) rotate(-45deg)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      <div
        suppressHydrationWarning
        className="fixed inset-0 z-40 md:hidden transition-all duration-300"
        style={{
          pointerEvents: menuOpen ? 'auto' : 'none',
          opacity: menuOpen ? 1 : 0,
          background: 'rgba(15,12,41,0.55)',
          backdropFilter: menuOpen ? 'blur(4px)' : 'blur(0px)',
        }}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile drawer */}
      <div
        suppressHydrationWarning
        className="fixed top-[64px] left-3 right-3 z-50 md:hidden rounded-3xl overflow-hidden transition-all duration-500"
        style={{
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? 'translateY(0) scale(1)' : 'translateY(-16px) scale(0.97)',
          pointerEvents: menuOpen ? 'auto' : 'none',
          background: 'rgba(251,249,255,0.95)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          border: '1px solid rgba(86,48,209,0.12)',
          boxShadow: '0 20px 60px rgba(86,48,209,0.18), 0 4px 16px rgba(0,0,0,0.08)',
        }}
      >
        {/* Accent top bar */}
        <div suppressHydrationWarning className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #5630D1, #9333ea, #06b6d4)' }} />

        <div suppressHydrationWarning className="px-5 py-5 flex flex-col gap-1">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3.5 rounded-2xl text-base font-semibold text-slate-700 hover:text-[#5630D1] transition-all duration-200 group"
              style={{
                transitionDelay: menuOpen ? `${i * 40}ms` : '0ms',
                background: 'transparent',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(86,48,209,0.06)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <span>{link.label}</span>
              <span className="material-symbols-outlined text-base opacity-30 group-hover:opacity-70 transition-opacity" style={{ transform: 'rotate(180deg)' }}>
                chevron_right
              </span>
            </Link>
          ))}

          {/* Divider */}
          <div suppressHydrationWarning className="my-2 h-px mx-4" style={{ background: 'rgba(86,48,209,0.10)' }} />

          {/* CTA inside drawer */}
          <Link
            href={`/${locale}`}
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-base font-bold text-white shadow-xl active:scale-95 transition-transform duration-150"
            style={{ background: 'linear-gradient(135deg, #5630D1, #9333ea)' }}
          >
            <span className="material-symbols-outlined text-lg">edit_square</span>
            {dict.cta}
          </Link>
        </div>
      </div>
    </>
  );
}
