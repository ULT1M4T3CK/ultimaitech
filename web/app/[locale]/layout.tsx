import { notFound } from 'next/navigation';
import { Nav } from '@/components/ui/nav';
import { ScrollRestore } from '@/components/ui/scroll-restore';
import { SiteFooter } from '@/components/layout/site-footer';
import { getDictionary, locales, type Locale } from '@/lib/locales';

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollRestore />
      <Nav dict={dict} />
      <main id="main" className="min-h-screen pt-[4.5rem]">
        {children}
      </main>
      <SiteFooter dict={dict} />
    </>
  );
}
