import type { Metadata } from 'next'
import { Cairo, Be_Vietnam_Pro, Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google'
import '../globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import { Locale } from '@/i18n-config'
import { getDictionary } from '@/get-dictionary'
import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'

const cairo = Cairo({ subsets: ['arabic', 'latin'], variable: '--font-cairo' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const vietnam = Be_Vietnam_Pro({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-vietnam' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-jakarta' })

export const metadata: Metadata = {
  title: 'حواديت | Hawadeet — كتب وقصص مصورة مخصصة للأطفال',
  description: 'قصص وكتب أطفال مخصصة بالاسم والملامح بجودة طباعة فاخرة وغلاف مقوى يدوم للأبد. اجعل طفلك بطل الحكاية.',
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = (await params) as { locale: Locale };
  const dict = await getDictionary(locale);

  return (
    <html 
      lang={locale} 
      dir={locale === 'ar' ? 'rtl' : 'ltr'} 
      className={`light ${cairo.variable} ${playfair.variable} ${vietnam.variable} ${jakarta.variable}`} 
      suppressHydrationWarning
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-[#E6F0EB] selection:text-[#154734] flex flex-col min-h-screen bg-[#FBF9F5] text-[#192520] font-body" suppressHydrationWarning>
        <AuthProvider>
          <CartProvider>
            <Navbar dict={dict.navbar} locale={locale} />
            <CartDrawer locale={locale} />
            <div suppressHydrationWarning className="flex-grow">
              {children}
            </div>
            <Footer dict={dict.footer} locale={locale} />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
