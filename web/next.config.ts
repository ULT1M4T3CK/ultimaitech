import type { NextConfig } from 'next';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: __dirname,
  experimental: {
    webpackBuildWorker: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; frame-src https://challenges.cloudflare.com; object-src 'none'; base-uri 'self'; frame-ancestors 'self'",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'ultimaitech.com' }],
  },
  async redirects() {
    return [
      { source: '/web-development/', destination: '/diensten/websites/', permanent: true },
      { source: '/chatbots/', destination: '/diensten/ai-chatbots/', permanent: true },
      { source: '/ai-infrastructure/', destination: '/diensten/ai-chatbots/', permanent: true },
      { source: '/services/', destination: '/diensten/', permanent: true },
      { source: '/case-studies/', destination: '/projecten/', permanent: true },
      { source: '/about/', destination: '/over/', permanent: true },
      { source: '/security/', destination: '/over/', permanent: true },
      { source: '/demo/', destination: '/diensten/ai-chatbots/', permanent: true },
      { source: '/use-cases/', destination: '/diensten/', permanent: true },
      { source: '/install/', destination: '/', permanent: true },
      { source: '/pricing/', destination: '/diensten/', permanent: true },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [
        { source: '/', destination: '/nl' },
        { source: '/diensten/ai-chatbots', destination: '/nl/services/ai-chatbots' },
        { source: '/diensten/ai-chatbots/:path+', destination: '/nl/services/ai-chatbots/:path+' },
        { source: '/diensten/websites', destination: '/nl/services/websites' },
        { source: '/diensten/websites/:path+', destination: '/nl/services/websites/:path+' },
        { source: '/diensten/software', destination: '/nl/services/software' },
        { source: '/diensten/software/:path+', destination: '/nl/services/software/:path+' },
        { source: '/voorwaarden', destination: '/nl/terms' },
        { source: '/voorwaarden/:path+', destination: '/nl/terms/:path+' },
        { source: '/projecten', destination: '/nl/projects' },
        { source: '/projecten/:path+', destination: '/nl/projects/:path+' },
        { source: '/diensten', destination: '/nl/services' },
        { source: '/diensten/:path+', destination: '/nl/services/:path+' },
        { source: '/contact', destination: '/nl/contact' },
        { source: '/contact/:path+', destination: '/nl/contact/:path+' },
        { source: '/privacy', destination: '/nl/privacy' },
        { source: '/privacy/:path+', destination: '/nl/privacy/:path+' },
        { source: '/offer', destination: '/nl/offer' },
        { source: '/offer/:path+', destination: '/nl/offer/:path+' },
        { source: '/over', destination: '/nl/about' },
        { source: '/over/:path+', destination: '/nl/about/:path+' },
        { source: '/blog', destination: '/nl/blog' },
        { source: '/blog/:path+', destination: '/nl/blog/:path+' },
        { source: '/de', destination: '/de' },
        { source: '/de/leistungen/ki-chatbots', destination: '/de/services/ai-chatbots' },
        { source: '/de/leistungen/ki-chatbots/:path+', destination: '/de/services/ai-chatbots/:path+' },
        { source: '/de/leistungen/websites', destination: '/de/services/websites' },
        { source: '/de/leistungen/websites/:path+', destination: '/de/services/websites/:path+' },
        { source: '/de/leistungen/software', destination: '/de/services/software' },
        { source: '/de/leistungen/software/:path+', destination: '/de/services/software/:path+' },
        { source: '/de/datenschutz', destination: '/de/privacy' },
        { source: '/de/datenschutz/:path+', destination: '/de/privacy/:path+' },
        { source: '/de/leistungen', destination: '/de/services' },
        { source: '/de/leistungen/:path+', destination: '/de/services/:path+' },
        { source: '/de/projekte', destination: '/de/projects' },
        { source: '/de/projekte/:path+', destination: '/de/projects/:path+' },
        { source: '/de/kontakt', destination: '/de/contact' },
        { source: '/de/kontakt/:path+', destination: '/de/contact/:path+' },
        { source: '/de/ueber', destination: '/de/about' },
        { source: '/de/ueber/:path+', destination: '/de/about/:path+' },
        { source: '/de/offer', destination: '/de/offer' },
        { source: '/de/offer/:path+', destination: '/de/offer/:path+' },
        { source: '/de/blog', destination: '/de/blog' },
        { source: '/de/blog/:path+', destination: '/de/blog/:path+' },
        { source: '/de/agb', destination: '/de/terms' },
        { source: '/de/agb/:path+', destination: '/de/terms/:path+' },
        { source: '/en', destination: '/en' },
        { source: '/en/services/ai-chatbots', destination: '/en/services/ai-chatbots' },
        { source: '/en/services/ai-chatbots/:path+', destination: '/en/services/ai-chatbots/:path+' },
        { source: '/en/services/websites', destination: '/en/services/websites' },
        { source: '/en/services/websites/:path+', destination: '/en/services/websites/:path+' },
        { source: '/en/services/software', destination: '/en/services/software' },
        { source: '/en/services/software/:path+', destination: '/en/services/software/:path+' },
        { source: '/en/services', destination: '/en/services' },
        { source: '/en/services/:path+', destination: '/en/services/:path+' },
        { source: '/en/contact', destination: '/en/contact' },
        { source: '/en/contact/:path+', destination: '/en/contact/:path+' },
        { source: '/en/privacy', destination: '/en/privacy' },
        { source: '/en/privacy/:path+', destination: '/en/privacy/:path+' },
        { source: '/en/about', destination: '/en/about' },
        { source: '/en/about/:path+', destination: '/en/about/:path+' },
        { source: '/en/terms', destination: '/en/terms' },
        { source: '/en/terms/:path+', destination: '/en/terms/:path+' },
        { source: '/en/offer', destination: '/en/offer' },
        { source: '/en/offer/:path+', destination: '/en/offer/:path+' },
        { source: '/en/work', destination: '/en/projects' },
        { source: '/en/work/:path+', destination: '/en/projects/:path+' },
        { source: '/en/blog', destination: '/en/blog' },
        { source: '/en/blog/:path+', destination: '/en/blog/:path+' },
      ],
      fallback: [],
    };
  },
};

export default nextConfig;
