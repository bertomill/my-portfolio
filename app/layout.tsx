import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: "Robert Mill - Portfolio",
  description: "Software developer portfolio for Robert Mill",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body>
        <Providers>
          <Navbar />
          <main>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
