import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "CheckYourDrip — Détection de tenues | ENSITECH",
  description: "Détection de vêtements en temps réel par YOLOv8 — Projet IA ENSITECH",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={geist.variable}>
      <body className="min-h-screen bg-[#f8f9fb] flex flex-col">
        <Navbar />
        <div className="flex-1">{children}</div>
        <footer className="border-t border-gray-200 py-5 bg-white">
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="text-xs text-gray-400">ENSITECH Formation Professionnelle &copy; {new Date().getFullYear()}</span>
            <span className="text-xs text-gray-400">CheckYourDrip &mdash; Projet IA &mdash; YOLOv8</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
