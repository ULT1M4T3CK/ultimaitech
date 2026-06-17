import { OfferTokenContent } from "@/app/[locale]/offer/[token]/offer-token-content";
import { getDictionary, type Locale } from "@/lib/locales";
type PageProps = { params: Promise<{ locale: string; token: string }> };
export default async function OfferTokenPage({ params }: PageProps) {
  const { locale, token } = await params;
  const dict = getDictionary(locale as Locale);
  return <OfferTokenContent dict={dict} token={token} />;
}
