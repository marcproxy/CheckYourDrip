import Link from "next/link";
import Image from "next/image";

const FEATURES = [
  {
    icon: (
      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.361a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
      </svg>
    ),
    title: "Détection temps réel",
    desc: "YOLOv8 analyse chaque frame de votre webcam et identifie les vêtements avec leurs scores de confiance.",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M16 3H8M12 12v5" />
      </svg>
    ),
    title: "Sauvegarde multi-BDD",
    desc: "PostgreSQL, MongoDB et Cloudinary pour stocker les détections validées avec photo et métadonnées.",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Historique complet",
    desc: "Consultez toutes les détections passées avec les photos capturées et les scores de confiance associés.",
  },
];

const STACK = [
  ["YOLOv8", "Modèle IA"],
  ["FastAPI", "Backend Python"],
  ["Next.js 15", "Frontend"],
  ["Supabase", "PostgreSQL"],
  ["MongoDB Atlas", "Documents"],
  ["Cloudinary", "Images"],
  ["Railway", "API Hosting"],
  ["Vercel", "Web Hosting"],
];

const CLASSES = ["t-shirt", "jacket", "pants", "shorts", "skirt", "headwear", "denim", "sweats", "sandals", "dress", "longskirt", "miniskirt"];

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6">

      {/* ── Hero ── */}
      <section className="py-20 flex flex-col items-center text-center gap-8 border-b border-gray-200">
        <Image src="/logo.png" alt="ENSITECH" width={160} height={54} className="object-contain" priority />

        <div className="flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-100">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 pulse-dot" />
            Projet IA — ENSITECH Formation Professionnelle
          </div>
          <h1 className="text-6xl font-black tracking-tight text-gray-900">
            Check<span className="text-blue-600">Your</span>Drip
          </h1>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            Détection de tenues vestimentaires en temps réel.<br />
            YOLOv8 · 32 classes · Multi-BDD
          </p>
        </div>

        <div className="flex gap-3 flex-wrap justify-center">
          <Link href="/camera" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors shadow-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.361a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
            </svg>
            Lancer la détection
          </Link>
          <Link href="/history" className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors border border-gray-200 shadow-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Voir l&apos;historique
          </Link>
        </div>

        <div className="flex gap-10 pt-4">
          {[["32", "classes"], ["YOLOv8", "modèle"], ["3", "bases de données"], ["< 350ms", "latence"]].map(([v, l]) => (
            <div key={l} className="text-center">
              <div className="text-2xl font-black text-gray-900">{v}</div>
              <div className="text-xs text-gray-400 mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-16 flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Fonctionnalités</h2>
          <p className="text-gray-500 text-sm mt-1">Ce que le système fait pour vous.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">{f.icon}</div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">{f.title}</h3>
                <p className="text-gray-500 text-xs mt-1.5 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Architecture ── */}
      <section className="py-10 border-t border-gray-200 flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Architecture</h2>
          <p className="text-gray-500 text-sm mt-1">Flux de données de la webcam aux bases de données.</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {[
              { label: "Webcam", sub: "Navigateur", bg: "bg-gray-100 text-gray-700" },
              null,
              { label: "Next.js", sub: "Vercel", bg: "bg-blue-50 text-blue-700" },
              null,
              { label: "FastAPI + YOLO", sub: "Railway", bg: "bg-violet-50 text-violet-700" },
              null,
              { label: "PG · Mongo · Cloudinary", sub: "Multi-BDD", bg: "bg-emerald-50 text-emerald-700" },
            ].map((item, i) =>
              item === null ? (
                <svg key={i} className="w-4 h-4 text-gray-300 rotate-90 sm:rotate-0 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              ) : (
                <div key={i} className={`px-4 py-2 rounded-xl text-center text-xs font-semibold ${item.bg}`}>
                  <div>{item.label}</div>
                  <div className="opacity-60 font-normal mt-0.5">{item.sub}</div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── Stack ── */}
      <section className="py-10 border-t border-gray-200 flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Stack technique</h2>
          <p className="text-gray-500 text-sm mt-1">Technologies utilisées dans ce projet.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {STACK.map(([name, desc]) => (
            <div key={name} className="bg-white border border-gray-200 rounded-xl px-4 py-3 hover:shadow-sm transition-shadow">
              <div className="text-sm font-semibold text-gray-800">{name}</div>
              <div className="text-xs text-gray-400 mt-0.5">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Classes ── */}
      <section className="py-10 border-t border-gray-200 flex flex-col gap-6 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Classes détectées</h2>
          <p className="text-gray-500 text-sm mt-1">32 types de vêtements identifiables par le modèle.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {CLASSES.map((c) => (
            <span key={c} className="bg-blue-50 text-blue-700 border border-blue-100 text-xs font-medium px-3 py-1.5 rounded-full capitalize">
              {c}
            </span>
          ))}
          <span className="bg-gray-100 text-gray-400 text-xs font-medium px-3 py-1.5 rounded-full">+20 autres…</span>
        </div>
      </section>

    </main>
  );
}
