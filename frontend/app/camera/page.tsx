import CameraDetector from "@/components/CameraDetector";

export default function CameraPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-10 flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black">Détection live</h1>
        <p className="text-white/40 text-sm">
          Activez votre caméra — YOLOv8 analyse vos vêtements en temps réel.
          Cliquez <span className="text-green-400">Envoyer</span> pour sauvegarder une détection.
        </p>
      </div>

      <CameraDetector />

      <p className="text-center text-white/20 text-xs">
        Les images ne sont envoyées aux serveurs que lorsque vous cliquez sur &ldquo;Envoyer&rdquo;
      </p>
    </main>
  );
}
