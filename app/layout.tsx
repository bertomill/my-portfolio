import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import ChatWidget from "@/components/ui/chat-widget";
import { Suspense } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Berto Mill - Application Developer",
  description: "Portfolio and blog of Berto Mill, an application developer passionate about crafting intuitive user experiences.",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light" className="light" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="color-scheme" content="light" />
      </head>
      <body className={`${inter.className} ${jetbrainsMono.className} min-h-full flex flex-col bg-white text-black`} suppressHydrationWarning>
        <Providers>
          <Navbar />
          <main className="flex-1 bg-white">
            {children}
          </main>
          <Footer />
          <ChatWidget />
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
