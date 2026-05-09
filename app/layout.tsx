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
  title: "NoLimit Autos | Véhicules de Prestige et d'Exception",
  description:
    "Découvrez une collection inégalée de véhicules premium, de luxe et exotiques. Des supercars aux machines électriques de performance — la voiture de vos rêves vous attend chez NoLimit Autos.",
  keywords: [
    "voitures de luxe",
    "voitures exotiques",
    "supercars",
    "véhicules premium",
    "concessionnaire automobile",
    "acheter une supercar",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
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
