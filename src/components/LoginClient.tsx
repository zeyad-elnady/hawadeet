'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import logoSrc from '../app/assets/logo-01.svg';

export default function LoginClient({ locale }: { locale: string }) {
  const { user, signInWithGoogle, loading } = useAuth();
  const router = useRouter();

  // If already logged in, redirect to profile
  useEffect(() => {
    if (!loading && user) {
      router.replace(`/${locale}/profile`);
    }
  }, [user, loading, locale, router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden" dir="ltr">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#5630D1]/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-fuchsia-400/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-400/5 rounded-full blur-[150px]" />
      </div>

      {/* Floating sparkles */}
      <div className="absolute top-[15%] right-[15%] w-3 h-3 bg-[#5630D1] rounded-full opacity-20 animate-bounce" style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-[20%] left-[12%] w-2 h-2 bg-fuchsia-500 rounded-full opacity-30 animate-pulse" />
      <div className="absolute top-[40%] left-[8%] w-4 h-4 bg-cyan-400 rounded-full opacity-15 animate-bounce" style={{ animationDuration: '4s' }} />

      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-10 relative">
          {/* Top accent bar */}
          <div className="absolute top-0 left-8 right-8 h-1 rounded-b-full" style={{ background: 'linear-gradient(90deg, #5630D1, #9333ea, #06b6d4)' }} />

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link href={`/${locale}`}>
              <Image src={logoSrc} alt="Hawadeet" className="w-32 h-auto" />
            </Link>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#5630D1]/8 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[36px] text-[#5630D1]">auto_stories</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Welcome to Hawadeet</h1>
            <p className="text-slate-500 text-sm leading-relaxed">Sign in to track your orders and create personalised storybooks for your little heroes.</p>
          </div>

          {/* Google Button */}
          <button
            onClick={() => signInWithGoogle(locale)}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 h-14 px-6 bg-white border-2 border-slate-200 hover:border-[#5630D1]/30 hover:bg-slate-50 rounded-2xl font-bold text-slate-700 text-base transition-all shadow-sm hover:shadow-md active:scale-95 group"
          >
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-xs text-slate-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          {/* Features list */}
          <div className="space-y-3 mb-8">
            {[
              { icon: 'history', text: 'View all your past orders' },
              { icon: 'local_shipping', text: 'Track your book delivery' },
              { icon: 'shopping_cart', text: 'Save your cart across devices' },
            ].map(({ icon, text }) => (
              <div key={icon} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#5630D1]/8 text-[#5630D1] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[18px]">{icon}</span>
                </div>
                <span className="text-sm text-slate-600 font-medium">{text}</span>
              </div>
            ))}
          </div>

          {/* Back link */}
          <div className="text-center">
            <Link
              href={`/${locale}`}
              className="text-sm text-slate-400 hover:text-[#5630D1] transition-colors font-medium"
            >
              ← Back to home
            </Link>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-slate-400 mt-6">
          By continuing, you agree to our{' '}
          <Link href="#" className="underline hover:text-slate-600">Terms of Service</Link>
          {' '}and{' '}
          <Link href="#" className="underline hover:text-slate-600">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
