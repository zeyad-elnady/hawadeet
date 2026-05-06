import LoginClient from '@/components/LoginClient';

export const metadata = {
  title: 'Sign In | Hawadeet',
};

export default async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <LoginClient locale={locale} />;
}
