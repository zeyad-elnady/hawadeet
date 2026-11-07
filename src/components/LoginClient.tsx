'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import logoSrc from '../app/assets/logo-01.svg';

export default function LoginClient({ locale }: { locale: string }) {
  const { user, signInWithGoogle, loading } = useAuth();
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);
  const [signingIn, setSigningIn] = useState(false);
  const isAr = locale === 'ar';

  useEffect(() => {
    if (!loading && user) {
      router.replace(`/${locale}/profile`);
    }
  }, [user, loading, locale, router]);

  const handleGoogleSignIn = async () => {
    setSigningIn(true);
    setAuthError(null);
    try {
      const error = await signInWithGoogle(locale);
      if (error) setAuthError(error);
    } catch {
      setAuthError(isAr ? 'تعذر تسجيل الدخول حالياً.' : 'Unable to sign in at the moment.');
    } finally {
      setSigningIn(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-26 sm:pt-28 pb-16 bg-[#FBF9F5]">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-lg border border-[#E8E3D7] p-8 sm:p-10 relative text-center space-y-6">
          
          {/* Logo */}
          <div className="flex justify-center">
            <Link href={`/${locale}`}>
              <Image src={logoSrc} alt="Hawadeet" className="w-32 h-auto" priority />
            </Link>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 bg-[#E6F0EB] text-[#154734] rounded-full flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-2xl">menu_book</span>
            </div>
            <h1 className="text-2xl font-bold text-[#192520] font-headline">
              {isAr ? 'مرحباً بك في دار حواديت' : 'Welcome to Hawadeet'}
            </h1>
            <p className="text-xs sm:text-sm text-[#566860] leading-relaxed max-w-xs mx-auto">
              {isAr
                ? 'سجل دخولك لمتابعة حالة طباعة كتاب طفلك وحفظ القصص السابقة.'
                : 'Sign in to track your personalized book orders and access past editions.'}
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-[#FFDAD6] text-[#BA1A1A] text-xs rounded-xl border border-[#BA1A1A]/20">
              {authError}
            </div>
          )}

          {/* Google Sign-in */}
          <div>
            <button
              onClick={handleGoogleSignIn}
              disabled={signingIn}
              className="w-full py-3.5 px-6 rounded-full border border-[#D7D0C0] hover:border-[#154734] bg-white text-[#192520] font-bold text-sm shadow-xs hover:shadow-sm transition-all flex items-center justify-center gap-3 disabled:opacity-60"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{signingIn ? (isAr ? 'جاري الاتصال...' : 'Connecting...') : (isAr ? 'المتابعة بحساب Google' : 'Continue with Google')}</span>
            </button>
          </div>

          <div className="pt-2 text-xs text-[#7D8F86]">
            {isAr ? 'أمان وسرية تامة لبيانات عائلتك' : '100% Secure & Confidential Family Data'}
          </div>

          <div className="pt-4 border-t border-[#EFEBE0]">
            <Link
              href={`/${locale}`}
              className="text-xs font-bold text-[#154734] hover:underline"
            >
              {isAr ? '← العودة للمتجر واستكشاف القصص' : '← Back to Stories & Books'}
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
