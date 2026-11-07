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
  const [showBanner, setShowBanner] = useState(true);
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: locale === 'ar' ? 'كتبنا وقصصنا' : 'Our Books', href: `/${locale}/gallery` },
    { label: locale === 'ar' ? 'تخصيص كتاب' : 'Personalize', href: `/${locale}/shop` },
    { label: dict.about, href: `/${locale}/about` },
    { label: dict.contact, href: `/${locale}/contact` },
  ];

  if (pathname.includes('/admin')) return null;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full z-50 transition-all duration-200">
        
        {/* Slim Dismissible Announcement Bar */}
        {showBanner && (
          <div className="bg-[#0E2E22] text-white text-[11px] py-1 px-4 text-center font-medium tracking-normal flex items-center justify-between sm:justify-center relative border-b border-[#1C4736]/40">
            <div className="flex items-center justify-center gap-2 mx-auto">
              <span>
                {locale === 'ar'
                  ? 'اشترِ كتاباً واحصل على الثاني بنصف السعر مع كود'
                  : 'Buy one book, get a second half price with code'}
              </span>
              <span className="bg-[#E5A93C] text-[#0E2E22] font-black px-1.5 py-0.2 rounded text-[10px] tracking-wider uppercase shadow-2xs">
                BOGO50
              </span>
            </div>
            <button
              onClick={() => setShowBanner(false)}
              className="text-white/60 hover:text-white p-0.5 rounded transition-colors text-[14px] leading-none sm:absolute sm:right-4 sm:top-1/2 sm:-translate-y-1/2"
              aria-label="Close Announcement"
            >
              ✕
            </button>
          </div>
        )}

        {/* Compact, Sleek Navbar */}
        <nav
          suppressHydrationWarning
          className={`w-full transition-all duration-200 border-b ${
            scrolled
              ? 'bg-[#FFFFFF]/98 backdrop-blur-md shadow-xs border-[#E8E3D7]'
              : 'bg-[#FBF9F5] border-[#EFEBE0]'
          }`}
        >
          <div className="flex flex-row justify-between items-center w-full px-4 sm:px-8 py-1.5 sm:py-2 max-w-7xl mx-auto">
            
            {/* Logo & Navigation Links */}
            <div className="flex items-center gap-6 sm:gap-8">
              <Link href={`/${locale}`} className="flex items-center transition-opacity hover:opacity-90 py-0.5">
                <Image
                  alt="Hawadeet Logo"
                  className="h-7 sm:h-8 w-auto object-contain"
                  src={logoSrc}
                  priority
                />
              </Link>

              {/* Desktop Nav Links */}
              <div className="hidden lg:flex items-center gap-5 sm:gap-6 text-xs sm:text-[13px] font-semibold text-[#2D3C35]">
                {links.map((link) => {
                  const isActive = pathname === link.href || (link.href !== `/${locale}` && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`relative py-1 transition-colors hover:text-[#154734] ${
                        isActive ? 'text-[#154734] font-bold' : ''
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#154734] rounded-full" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right Side Icons & Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <LanguageSwitcher />

              {/* Cart Drawer Trigger */}
              <button
                onClick={openCart}
                className="relative flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#EAE5D9]/60 text-[#192520] transition-colors"
                aria-label="Shopping Cart"
              >
                <span className="material-symbols-outlined text-[19px]">shopping_bag</span>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 bg-[#842232] text-white rounded-full text-[10px] font-black flex items-center justify-center shadow-2xs leading-none">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Account / User Menu */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#D7D0C0] hover:border-[#154734] bg-white text-[#192520] transition-all text-xs"
                  >
                    {user.user_metadata?.avatar_url ? (
                      <img src={user.user_metadata.avatar_url} alt="" className="w-5 h-5 rounded-full object-cover" />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-[#154734] text-white flex items-center justify-center text-[10px] font-bold">
                        {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0)}
                      </div>
                    )}
                    <span className="hidden sm:block font-bold max-w-[70px] truncate text-[11px]">
                      {user.user_metadata?.full_name?.split(' ')[0] || 'Account'}
                    </span>
                    <span className="material-symbols-outlined text-[14px] text-stone-500">expand_more</span>
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-lg border border-[#E8E3D7] overflow-hidden z-50 py-1">
                      <Link
                        href={`/${locale}/profile`}
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-stone-700 hover:bg-[#F5F2EA] transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px] text-[#154734]">history_edu</span>
                        {locale === 'ar' ? 'طلباتي' : 'My Orders'}
                      </Link>
                      <button
                        onClick={() => { signOut(); setUserMenuOpen(false); }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-rose-700 hover:bg-rose-50 transition-colors text-start"
                      >
                        <span className="material-symbols-outlined text-[16px]">logout</span>
                        {locale === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={`/${locale}/login`}
                  className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-full border border-[#D7D0C0] hover:border-[#154734] bg-white text-[11px] font-bold text-[#192520] hover:text-[#154734] transition-colors"
                >
                  <span className="material-symbols-outlined text-[15px]">person</span>
                  <span>{locale === 'ar' ? 'تسجيل الدخول' : 'Sign In'}</span>
                </Link>
              )}

              {/* Main Call to Action Button */}
              <Link
                href={`/${locale}/shop`}
                className="hidden md:inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-bold text-white bg-[#154734] hover:bg-[#0E2E22] transition-colors shadow-2xs"
              >
                {dict.cta}
              </Link>

              {/* Mobile Menu Hamburger */}
              <button
                id="mobile-menu-toggle"
                aria-label="Toggle menu"
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-1.5 text-[#192520] hover:bg-[#EAE5D9]/50 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-xl">
                  {menuOpen ? 'close' : 'menu'}
                </span>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E8E3D7] shadow-lg px-6 py-5 space-y-3">
            <div className="flex flex-col space-y-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-bold text-[#192520] hover:text-[#154734] py-1.5 border-b border-[#EFEBE0]"
                >
                  {link.label}
                </Link>
              ))}
              {!user && (
                <Link
                  href={`/${locale}/login`}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-bold text-[#192520] hover:text-[#154734] py-1.5 border-b border-[#EFEBE0]"
                >
                  {locale === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
                </Link>
              )}
            </div>

            <Link
              href={`/${locale}/shop`}
              onClick={() => setMenuOpen(false)}
              className="w-full inline-flex items-center justify-center py-2.5 rounded-full text-sm font-bold text-white bg-[#154734] hover:bg-[#0E2E22] shadow-2xs"
            >
              {dict.cta}
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
