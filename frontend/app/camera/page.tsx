import CameraDetector from "@/components/CameraDetector";

export default function CameraPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-10 flex flex-col gap-6">
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-green-500 pulse-dot" />
          <span className="text-xs font-semibold text-green-600 uppercase tracking-widest">En direct</span>
        </div>
        <h1 className="text-3xl font-black text-gray-900">Détection live</h1>
        <p className="text-gray-500 text-sm mt-1 max-w-lg">
          Activez votre caméra. YOLOv8 analyse vos vêtements en continu.
          Cliquez sur <span className="text-green-600 font-medium">Envoyer</span> pour sauvegarder une détection.
        </p>
      </div>

      <CameraDetector />

      <div className="flex items-center gap-2 text-xs text-gray-400 pt-2">
        <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Les images ne sont envoyées au serveur que lorsque vous cliquez sur &ldquo;Envoyer&rdquo;.
      </div>
    </main>
  );
}
