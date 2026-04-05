import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SmoothScrollProvider from "./components/SmoothScrollProvider";
import ApexAI from "./components/ApexAI";
import MobileBottomNav from "./components/MobileBottomNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NoLimit Autos | Premium & Exotic Vehicles",
  description:
    "Discover an unmatched collection of premium, luxury, and exotic vehicles. From supercars to electric performance machines — your dream car awaits at NoLimit Autos.",
  keywords: [
    "luxury cars",
    "exotic cars",
    "supercars",
    "premium vehicles",
    "car dealership",
    "buy supercar",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col antialiased">
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ApexAI />
          <MobileBottomNav />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
