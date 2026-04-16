import Link from "next/link";
import Image from "next/image";

const STACK = [
  { name: "YOLOv8", desc: "Détection IA", dot: "bg-blue-500" },
  { name: "FastAPI", desc: "Backend Python", dot: "bg-green-500" },
  { name: "Next.js 15", desc: "Frontend React", dot: "bg-white" },
  { name: "PostgreSQL", desc: "Supabase", dot: "bg-emerald-400" },
  { name: "MongoDB", desc: "Atlas", dot: "bg-green-400" },
  { name: "Cloudinary", desc: "Stockage images", dot: "bg-blue-400" },
  { name: "Railway", desc: "API hosting", dot: "bg-violet-400" },
  { name: "Vercel", desc: "Web hosting", dot: "bg-white" },
];

const CLASSES = [
  "t-shirt", "jacket", "pants", "shorts", "skirt", "headwear",
  "denim", "sweats", "sandals", "dress", "longskirt", "miniskirt",
];

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-6 pt-20 pb-24 flex flex-col gap-28">

      {/* ── Hero ── */}
      <section className="flex flex-col items-center text-center gap-10">

        {/* Badge */}
        <span className="inline-flex items-center gap-2 border border-blue-500/30 bg-blue-500/[0.07] text-blue-400 text-[11px] font-semibold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 pulse-dot" />
          Projet IA — ENSITECH Formation Professionnelle
        </span>

        {/* Logo */}
        <Image
          src="/logo.png"
          alt="ENSITECH"
          width={180}
          height={60}
          className="object-contain brightness-0 invert opacity-70"
          priority
        />

        {/* Title */}
        <div className="flex flex-col gap-4">
          <h1 className="text-[72px] font-black leading-none tracking-tighter">
            <span className="text-white">Check</span>
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Your</span>
            <span className="text-white">Drip</span>
          </h1>
          <p className="text-white/40 text-lg max-w-md mx-auto leading-relaxed">
            Détection de tenues vestimentaires en temps réel.<br />
            Modèle YOLOv8 personnalisé &bull; 32 classes &bull; Multi-BDD.
          </p>
        </div>

        {/* CTA */}
        <div className="flex gap-3 flex-wrap justify-center">
          <Link
            href="/camera"
            className="group relative flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.361a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
            </svg>
            Lancer la détection
          </Link>
          <Link
            href="/history"
            className="flex items-center gap-2 border border-white/10 hover:border-white/20 hover:bg-white/[0.04] text-white/70 hover:text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Historique
          </Link>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-8 text-center border-t border-white/[0.06] pt-8 w-full justify-center">
          {[
            { value: "32", label: "Classes" },
            { value: "YOLOv8", label: "Modèle" },
            { value: "3", label: "Bases de données" },
            { value: "<350ms", label: "Latence" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col gap-0.5">
              <span className="text-2xl font-black text-white">{s.value}</span>
              <span className="text-xs text-white/30 font-medium">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold">Fonctionnalités</h2>
          <p className="text-white/30 text-sm">Ce que le système fait pour vous.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.361a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                </svg>
              ),
              title: "Détection temps réel",
              desc: "YOLOv8 analyse chaque frame de votre webcam et identifie les vêtements avec leurs bounding boxes.",
              accent: "blue",
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7C5 4 4 5 4 7zM8 12h8M8 8h8M8 16h4" />
                </svg>
              ),
              title: "Sauvegarde multi-BDD",
              desc: "PostgreSQL pour les logs structurés, MongoDB pour les métadonnées enrichies, Cloudinary pour les photos.",
              accent: "violet",
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              ),
              title: "Historique complet",
              desc: "Consultez toutes les détections passées avec les photos capturées et les scores de confiance.",
              accent: "emerald",
            },
          ].map((f) => {
            const border = f.accent === "blue" ? "border-blue-500/20 hover:border-blue-500/40" : f.accent === "violet" ? "border-violet-500/20 hover:border-violet-500/40" : "border-emerald-500/20 hover:border-emerald-500/40";
            const icon = f.accent === "blue" ? "bg-blue-500/10 text-blue-400" : f.accent === "violet" ? "bg-violet-500/10 text-violet-400" : "bg-emerald-500/10 text-emerald-400";
            return (
              <div key={f.title} className={`bg-white/[0.025] border ${border} rounded-2xl p-6 flex flex-col gap-4 transition-all duration-200`}>
                <span className={`w-9 h-9 rounded-xl flex items-center justify-center ${icon}`}>{f.icon}</span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-semibold text-white text-sm">{f.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Architecture ── */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold">Architecture</h2>
          <p className="text-white/30 text-sm">Flux de données de la webcam aux bases de données.</p>
        </div>
        <div className="bg-white/[0.025] border border-white/[0.07] rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            {[
              { label: "Webcam", sub: "getUserMedia", color: "bg-white/10 text-white/70" },
              { arrow: true },
              { label: "Next.js", sub: "Vercel", color: "bg-blue-500/10 text-blue-300" },
              { arrow: true },
              { label: "FastAPI + YOLO", sub: "Railway", color: "bg-violet-500/10 text-violet-300" },
              { arrow: true },
              { label: "PG · Mongo · Cloudinary", sub: "Multi-BDD", color: "bg-emerald-500/10 text-emerald-300" },
            ].map((item, i) =>
              "arrow" in item ? (
                <svg key={i} className="w-4 h-4 text-white/20 rotate-90 sm:rotate-0 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              ) : (
                <div key={i} className={`px-4 py-2.5 rounded-xl text-center ${item.color}`}>
                  <div className="font-semibold text-xs">{item.label}</div>
                  <div className="text-[10px] opacity-60 mt-0.5">{item.sub}</div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── Stack ── */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold">Stack technique</h2>
          <p className="text-white/30 text-sm">Technologies utilisées dans ce projet.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {STACK.map((t) => (
            <div key={t.name} className="flex items-center gap-3 bg-white/[0.025] border border-white/[0.06] rounded-xl px-4 py-3 hover:bg-white/[0.04] transition-colors">
              <span className={`w-2 h-2 rounded-full shrink-0 ${t.dot}`} />
              <div>
                <div className="text-xs font-semibold text-white/80">{t.name}</div>
                <div className="text-[10px] text-white/30">{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Classes ── */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold">Classes détectées</h2>
          <p className="text-white/30 text-sm">32 types de vêtements identifiables par le modèle.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {CLASSES.map((c) => (
            <span key={c} className="border border-blue-500/20 bg-blue-500/[0.06] text-blue-300/80 text-[11px] font-medium px-3 py-1 rounded-full capitalize">
              {c}
            </span>
          ))}
          <span className="border border-white/10 bg-white/[0.03] text-white/30 text-[11px] font-medium px-3 py-1 rounded-full">
            +20 autres…
          </span>
        </div>
      </section>

    </main>
  );
}
