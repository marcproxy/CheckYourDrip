import Link from "next/link";
import CameraDetector from "@/components/CameraDetector";

export default function CameraPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col p-6 gap-6">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
          ← Accueil
        </Link>
        <h1 className="text-2xl font-bold">
          Check<span className="text-indigo-400">Your</span>Drip — Détection live
        </h1>
      </div>

      <CameraDetector />

      <p className="text-center text-gray-600 text-xs">
        Les images ne sont envoyées aux serveurs que lorsque vous cliquez sur &ldquo;Envoyer&rdquo;
      </p>
    </main>
  );
}
