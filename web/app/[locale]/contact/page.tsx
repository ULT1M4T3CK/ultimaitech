import { ContactPageContent } from "@/app/[locale]/contact/contact-page-content";
import { getDictionary, type Locale } from "@/lib/locales";
type PageProps = { params: Promise<{ locale: string }> };
export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  return <ContactPageContent dict={dict} />;
}
