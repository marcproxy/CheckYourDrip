import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "CheckYourDrip — Détection de tenues | ENSITECH",
  description: "Détection de vêtements en temps réel par YOLOv8 — Projet IA ENSITECH Formation Professionnelle",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={geist.variable}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1">{children}</div>
        <footer className="relative z-10 border-t border-white/[0.05] py-5">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="text-[11px] text-white/20">
              ENSITECH Formation Professionnelle &copy; {new Date().getFullYear()}
            </span>
            <span className="text-[11px] text-white/20">
              CheckYourDrip &mdash; Projet IA &mdash; YOLOv8
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
