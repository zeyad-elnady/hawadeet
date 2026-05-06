'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import logoSrc from '../app/assets/logo-01.svg';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

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
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, signInWithGoogle, signOut } = useAuth();
  const { totalItems, openCart } = useCart();

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

  if (pathname.includes('/admin')) return null;

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
        <div suppressHydrationWarning className="flex flex-row justify-between items-center w-full px-5 py-1.5 max-w-7xl mx-auto">

          {/* Logo */}
          <Link href={`/${locale}`} suppressHydrationWarning className="flex items-center -my-3">
            <Image
              alt="Hawadeet Logo"
              className="w-32 h-auto object-contain"
              src={logoSrc}
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex flex-row items-center gap-8 text-sm font-medium">
            {links.map((link) => {
              // check if it's the exact path or starts with it (for nested routes)
              const isActive = pathname === link.href || (link.href !== `/${locale}` && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`hover:text-[#5630D1] hover:scale-105 transition-all duration-200 ${isActive
                    ? 'text-[#5630D1] font-bold underline decoration-2 underline-offset-4'
                    : 'text-slate-600'
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right side: language + CTA + hamburger */}
          <div suppressHydrationWarning className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher />

            {/* Cart Icon */}
            <button
              onClick={openCart}
              className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white text-[#5630D1] border border-[#5630D1]/10 shadow-sm hover:bg-gradient-to-br hover:from-[#5630D1] hover:to-[#9333ea] hover:text-white hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
              aria-label="Cart"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#5630D1] text-white rounded-full text-[10px] font-black flex items-center justify-center shadow-md">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Auth */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#5630D1]/10 shadow-sm hover:shadow-md transition-all"
                >
                  {user.user_metadata?.avatar_url ? (
                    <img src={user.user_metadata.avatar_url} alt="" className="w-7 h-7 rounded-full object-cover" />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#5630D1] text-white flex items-center justify-center text-xs font-black">
                      {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0)}
                    </div>
                  )}
                  <span className="hidden sm:block text-sm font-bold text-slate-700 max-w-[80px] truncate">
                    {user.user_metadata?.full_name?.split(' ')[0] || 'Profile'}
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-slate-400">expand_more</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
                    <Link
                      href={`/${locale}/profile`}
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#5630D1]">person</span>
                      My Orders
                    </Link>
                    <button
                      onClick={() => { signOut(); setUserMenuOpen(false); }}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={`/${locale}/login`}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-bold shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <span className="material-symbols-outlined text-[18px] text-[#5630D1]">account_circle</span>
                Sign In
              </Link>
            )}

            {/* CTA — hidden on very small mobile, shown md+ */}
            <Link
              href={`/${locale}`}
              className="hidden sm:flex items-center gap-1.5 px-5 py-2.5 rounded-md text-sm font-bold text-white shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200"
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

          {/* Mobile Auth Links */}
          {user ? (
            <>
              <Link
                href={`/${locale}/profile`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3.5 rounded-2xl text-base font-semibold text-slate-700 hover:text-[#5630D1] transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#5630D1]">person</span>
                  <span>My Orders</span>
                </div>
              </Link>
              <button
                onClick={() => { signOut(); setMenuOpen(false); }}
                className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-base font-semibold text-red-500 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined">logout</span>
                  <span>Sign Out</span>
                </div>
              </button>
            </>
          ) : (
            <Link
              href={`/${locale}/login`}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3.5 rounded-2xl text-base font-semibold text-slate-700 hover:text-[#5630D1] transition-all duration-200 group"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#5630D1]">person_add</span>
                <span>Sign Up / Sign In</span>
              </div>
            </Link>
          )}

          {/* Divider */}
          <div suppressHydrationWarning className="my-2 h-px mx-4" style={{ background: 'rgba(86,48,209,0.10)' }} />

          {/* CTA inside drawer */}
          <Link
            href={`/${locale}`}
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-md text-base font-bold text-white shadow-xl active:scale-95 transition-transform duration-150"
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
