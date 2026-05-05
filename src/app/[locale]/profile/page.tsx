import ProfileDashboard from '@/components/ProfileDashboard';

export const metadata = {
  title: 'My Profile | Hawadeet',
};

export default async function ProfilePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <ProfileDashboard locale={locale} />;
}
