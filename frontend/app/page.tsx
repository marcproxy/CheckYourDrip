import Link from "next/link";
import Image from "next/image";

const CLASSES = [
  "t-shirt", "jacket", "pants", "shorts", "skirt", "headwear",
  "denim", "sweats", "sandals", "sneakers", "dress", "coat",
];

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16 flex flex-col gap-20">

      {/* Hero */}
      <section className="flex flex-col items-center text-center gap-8">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase">
          Projet IA &mdash; ENSITECH
        </div>

        <div className="flex flex-col items-center gap-4">
          <Image
            src="/logo.png"
            alt="ENSITECH"
            width={200}
            height={67}
            className="object-contain brightness-0 invert opacity-90"
          />
          <h1 className="text-6xl font-black tracking-tight leading-none">
            Check<span className="text-blue-400">Your</span>Drip
          </h1>
          <p className="text-white/50 text-lg max-w-lg leading-relaxed">
            Détection de tenues vestimentaires en temps réel par intelligence artificielle.
            Propulsé par <span className="text-white/80">YOLOv8</span> et entraîné sur{" "}
            <span className="text-white/80">32 classes</span> de vêtements.
          </p>
        </div>

        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            href="/camera"
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/25 flex items-center gap-2"
          >
            <span>📷</span> Lancer la détection
          </Link>
          <Link
            href="/history"
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors flex items-center gap-2"
          >
            <span>📋</span> Voir l&apos;historique
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            icon: "🎯",
            title: "Détection temps réel",
            desc: "YOLOv8 analyse chaque frame de votre caméra et identifie les vêtements en moins de 350ms.",
          },
          {
            icon: "💾",
            title: "Sauvegarde multi-BDD",
            desc: "Chaque détection validée est enregistrée dans PostgreSQL, MongoDB, et la photo uploadée sur Cloudinary.",
          },
          {
            icon: "📊",
            title: "Historique complet",
            desc: "Consultez toutes les détections passées avec les photos capturées et les métadonnées associées.",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-3 hover:bg-white/8 transition-colors"
          >
            <span className="text-3xl">{f.icon}</span>
            <h3 className="font-bold text-white">{f.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Stack technique */}
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center">Stack technique</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "YOLOv8", sub: "Détection IA", color: "blue" },
            { label: "FastAPI", sub: "Backend Python", color: "green" },
            { label: "Next.js", sub: "Frontend", color: "white" },
            { label: "Supabase", sub: "PostgreSQL", color: "emerald" },
            { label: "MongoDB Atlas", sub: "Base documents", color: "green" },
            { label: "Cloudinary", sub: "Stockage images", color: "blue" },
            { label: "Railway", sub: "Hébergement API", color: "purple" },
            { label: "Vercel", sub: "Hébergement Web", color: "white" },
          ].map((t) => (
            <div
              key={t.label}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex flex-col gap-0.5"
            >
              <span className="font-semibold text-sm text-white">{t.label}</span>
              <span className="text-xs text-white/40">{t.sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Classes */}
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center">Classes détectées</h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {CLASSES.map((c) => (
            <span
              key={c}
              className="bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm px-3 py-1.5 rounded-full capitalize"
            >
              {c}
            </span>
          ))}
          <span className="bg-white/5 border border-white/10 text-white/40 text-sm px-3 py-1.5 rounded-full">
            +20 autres classes
          </span>
        </div>
      </section>

    </main>
  );
}
