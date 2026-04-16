import HistoryList from "@/components/HistoryList";

export default function HistoryPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black">Historique des détections</h1>
        <p className="text-white/40 text-sm">
          Toutes les tenues validées et enregistrées dans la base de données.
        </p>
      </div>
      <HistoryList />
    </main>
  );
}
