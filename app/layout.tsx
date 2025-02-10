import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Riviera Maya Adults-Only All-Inclusive Resort | Margaritaville",
  description:
    "Get ready for the ultimate adults-only getaway. Introducing Margaritaville Beach Resort Riviera Maya, the first adults-only all-inclusive property. Now Open!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://smtpjs.com/v3/smtp.js" strategy="lazyOnload" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
