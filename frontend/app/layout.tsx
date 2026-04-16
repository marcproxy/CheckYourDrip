import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "CheckYourDrip — Détection de tenues",
  description: "Détection de vêtements en temps réel par YOLOv8 — ENSITECH",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={geist.variable}>
      <body className="min-h-screen bg-[#0a0f1e] text-white flex flex-col">
        <Navbar />
        <div className="flex-1">{children}</div>
        <footer className="border-t border-white/5 py-4 text-center text-xs text-white/30">
          ENSITECH Formation Professionnelle &mdash; Projet IA &copy; 2025
        </footer>
      </body>
    </html>
  );
}
