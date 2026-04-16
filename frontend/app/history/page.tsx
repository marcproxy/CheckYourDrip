import HistoryList from "@/components/HistoryList";

export default function HistoryPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-6">
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-black text-gray-900">Historique des détections</h1>
        <p className="text-gray-500 text-sm mt-1">
          Toutes les tenues validées et enregistrées — PostgreSQL · MongoDB · Cloudinary.
        </p>
      </div>
      <HistoryList />
    </main>
  );
}
