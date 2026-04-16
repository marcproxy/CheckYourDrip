import HistoryList from "@/components/HistoryList";

export default function HistoryPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-10 flex flex-col gap-8">

      <div className="flex flex-col gap-1 border-b border-white/[0.06] pb-6">
        <div className="flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span className="text-[11px] font-semibold tracking-widest uppercase text-white/30">Base de données</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight">Historique des détections</h1>
        <p className="text-white/30 text-sm">
          Toutes les tenues validées et enregistrées — PostgreSQL · MongoDB · Cloudinary.
        </p>
      </div>

      <HistoryList />

    </main>
  );
}
