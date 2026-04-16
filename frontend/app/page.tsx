import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-8 p-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-tight mb-3">
          Check<span className="text-indigo-400">Your</span>Drip
        </h1>
        <p className="text-gray-400 text-lg max-w-md">
          Détection de tenues vestimentaires en temps réel par intelligence artificielle
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
        <Link
          href="/camera"
          className="bg-indigo-600 hover:bg-indigo-500 transition-colors rounded-2xl p-6 flex flex-col gap-2"
        >
          <span className="text-3xl">📷</span>
          <span className="text-xl font-semibold">Détection live</span>
          <span className="text-indigo-200 text-sm">
            Utilisez votre caméra pour détecter vos vêtements en temps réel
          </span>
        </Link>

        <Link
          href="/history"
          className="bg-gray-800 hover:bg-gray-700 transition-colors rounded-2xl p-6 flex flex-col gap-2"
        >
          <span className="text-3xl">📋</span>
          <span className="text-xl font-semibold">Historique</span>
          <span className="text-gray-400 text-sm">
            Consultez les détections enregistrées
          </span>
        </Link>
      </div>

      <p className="text-gray-600 text-sm">
        Propulsé par YOLOv8 · 32 classes de vêtements
      </p>
    </main>
  );
}
