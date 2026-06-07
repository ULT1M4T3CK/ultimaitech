import { notFound } from 'next/navigation';
import { ImmersiveShell } from '@/components/immersive/immersive-shell';
import { getDictionary, locales, type Locale } from '@/lib/locales';
import { portalConfigFromDict } from '@/lib/portal-config';

type ImmersiveLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function ImmersiveLayout({ children, params }: ImmersiveLayoutProps) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const dict = getDictionary(locale);
  const portalConfig = portalConfigFromDict(dict);

  return <ImmersiveShell portalConfig={portalConfig}>{children}</ImmersiveShell>;
}
