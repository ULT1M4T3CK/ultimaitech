import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Syne } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const syne = Syne({ subsets: ['latin'], variable: '--font-syne' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });

export const metadata: Metadata = {
  title: 'ultimAItech',
  description: 'Reliable websites and custom software from Wanneperveen.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="nl"
      suppressHydrationWarning
      className={`${inter.variable} ${syne.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen bg-charcoal font-sans text-text antialiased">{children}</body>
    </html>
  );
}
