import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Aside from "@/components/ui/Aside";
import { Providers } from "providers/sessionProvider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Chat Application",
  description:
    "An AI-powered chat application built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased `}
        >
          <div className="min-h-screen  w-full flex  md:flex-row relative">
            {/* Sticky sidebar */}
            <Aside />

            {/* Main content to the right */}
            <main className="flex-1 min-w-0">{children}</main>
          </div>
        </body>
      </Providers>
    </html>
  );
}
