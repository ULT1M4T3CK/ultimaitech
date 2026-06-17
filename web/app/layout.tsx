import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
const inter = localFont({
  src: "../public/assets/fonts/inter-latin.woff2",
  variable: "--font-inter",
  display: "swap",
});
const syne = localFont({
  src: "../public/assets/fonts/syne-latin.woff2",
  variable: "--font-syne",
  display: "swap",
});
const jetbrains = localFont({
  src: "../public/assets/fonts/jetbrains-mono-latin.woff2",
  variable: "--font-jetbrains",
  display: "swap",
});
export const metadata: Metadata = {
  title: "ultimAItech",
  description: "Reliable websites and custom software from Wanneperveen.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="nl"
      suppressHydrationWarning
      className={`${inter.variable} ${syne.variable} ${jetbrains.variable}`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-charcoal font-sans text-text antialiased"
      >
        {children}
      </body>
    </html>
  );
}
