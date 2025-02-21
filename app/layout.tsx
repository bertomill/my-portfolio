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
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
