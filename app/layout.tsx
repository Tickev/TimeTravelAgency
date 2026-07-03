import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TimeTravel Agency | Voyages temporels premium",
  description:
    "La première agence de voyage temporel au monde. Explorez le Paris de 1889, le Crétacé, la Florence de la Renaissance et bien plus.",
  keywords: [
    "voyage temporel",
    "time travel",
    "agence",
    "Paris 1889",
    "Crétacé",
    "Florence 1504",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
