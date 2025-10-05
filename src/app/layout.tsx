import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { siteMetadata } from '@/constants/site-metadata';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.SITE_URL),
  title: {
    default: siteMetadata.SITE_NAME,
    /**
     * %s：子ページで設定されるタイトルが置換される場所
     * |以降：全ページ共通で表示されるサイト名
     */
    template: `%s | ${siteMetadata.SITE_NAME}`,
  },
  description: siteMetadata.SITE_DESCRIPTION,
  openGraph: {
    title: siteMetadata.SITE_NAME,
    description: siteMetadata.SITE_DESCRIPTION,
    siteName: siteMetadata.SITE_NAME,
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.SITE_NAME,
    description: siteMetadata.SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
