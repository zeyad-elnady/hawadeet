import type { Metadata } from 'next'
import { Cairo, Be_Vietnam_Pro, Plus_Jakarta_Sans } from 'next/font/google'
import '../globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Locale } from '@/i18n-config'
import { getDictionary } from '@/get-dictionary'

const cairo = Cairo({ subsets: ['arabic', 'latin'], variable: '--font-cairo' })
const vietnam = Be_Vietnam_Pro({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-vietnam' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-jakarta' })

export const metadata: Metadata = {
  title: 'حواديت | Hawadeet',
  description: 'سحر الذكاء الاصطناعي يحول صورك إلى قصص خيالية مصورة وجميلة. حول وقت النوم إلى رحلة سحرية.',
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={`light ${cairo.variable} ${vietnam.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-primary-fixed selection:text-primary flex flex-col min-h-screen font-body" suppressHydrationWarning>
        <Navbar dict={dict.navbar} locale={locale} />
        <div suppressHydrationWarning className="flex-grow pb-10">
          {children}
        </div>
        <Footer dict={dict.footer} locale={locale} />
      </body>
    </html>
  )
}
