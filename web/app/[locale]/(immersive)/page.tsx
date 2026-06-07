import { HomePageContent } from '@/components/pages/home-page-content';
import { getDictionary, locales, type Locale } from '@/lib/locales';

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);

  return <HomePageContent dict={dict} />;
}
