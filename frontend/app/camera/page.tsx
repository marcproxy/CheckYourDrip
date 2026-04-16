import CameraDetector from "@/components/CameraDetector";

export default function CameraPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-10 flex flex-col gap-8">

      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-white/[0.06] pb-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 pulse-dot" />
          <span className="text-[11px] font-semibold tracking-widest uppercase text-green-400/80">En direct</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight">Détection live</h1>
        <p className="text-white/30 text-sm max-w-lg">
          Activez votre caméra. YOLOv8 analyse vos vêtements en continu.
          Cliquez sur <span className="text-green-400 font-medium">Envoyer</span> pour sauvegarder une détection dans les bases de données.
        </p>
      </div>

      <CameraDetector />

      {/* Info footer */}
      <div className="flex items-center gap-2 text-[11px] text-white/20 border-t border-white/[0.05] pt-4">
        <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Les images sont traitées localement. Aucune donnée n&apos;est envoyée sans votre confirmation.
      </div>

    </main>
  );
}
