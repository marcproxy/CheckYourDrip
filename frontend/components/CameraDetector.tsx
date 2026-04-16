"use client";

import { useRef, useEffect, useState, useCallback } from "react";

const RAW = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const API_URL = RAW.startsWith("http") ? RAW : `https://${RAW}`;

interface Detection {
  class: string;
  confidence: number;
  bbox: [number, number, number, number];
}

function getColor(_cls: string) {
  return "#6366f1";
}

// Canvas de capture caché (hors écran) — uniquement pour encoder le JPEG
const offscreen = typeof document !== "undefined" ? document.createElement("canvas") : null;

export default function CameraDetector() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Canvas transparent superposé pour les bounding boxes uniquement
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const detectionsRef = useRef<Detection[]>([]);
  const animRef = useRef<number | null>(null);

  const [detections, setDetections] = useState<Detection[]>([]);
  const [best, setBest] = useState<Detection | null>(null);
  const [status, setStatus] = useState<"idle" | "running" | "saving" | "saved" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [cameraOn, setCameraOn] = useState(false);

  // Boucle rAF : redessine les boxes à 60fps par-dessus la vidéo native
  const startOverlayLoop = useCallback(() => {
    const loop = () => {
      const canvas = overlayRef.current;
      const video = videoRef.current;
      if (!canvas || !video) { animRef.current = requestAnimationFrame(loop); return; }

      canvas.width = video.videoWidth || canvas.offsetWidth;
      canvas.height = video.videoHeight || canvas.offsetHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) { animRef.current = requestAnimationFrame(loop); return; }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const det of detectionsRef.current) {
        const [x1, y1, x2, y2] = det.bbox;
        const color = getColor(det.class);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);

        const label = `${det.class} ${(det.confidence * 100).toFixed(0)}%`;
        ctx.font = "bold 14px sans-serif";
        const tw = ctx.measureText(label).width;
        ctx.fillStyle = color;
        ctx.fillRect(x1, y1 - 20, tw + 8, 20);
        ctx.fillStyle = "#fff";
        ctx.fillText(label, x1 + 4, y1 - 5);
      }

      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
  }, []);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraOn(true);
      setStatus("running");
      startOverlayLoop();
    } catch {
      setErrorMsg("Impossible d'accéder à la caméra. Vérifiez les permissions.");
      setStatus("error");
    }
  }, [startOverlayLoop]);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (animRef.current) cancelAnimationFrame(animRef.current);
    intervalRef.current = null;
    animRef.current = null;
    detectionsRef.current = [];
    setCameraOn(false);
    setStatus("idle");
    setDetections([]);
    setBest(null);
  }, []);

  // Capture un JPEG via canvas hors-écran
  const captureFrame = useCallback((): string | null => {
    const video = videoRef.current;
    if (!video || !offscreen) return null;
    offscreen.width = video.videoWidth;
    offscreen.height = video.videoHeight;
    const ctx = offscreen.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(video, 0, 0);
    return offscreen.toDataURL("image/jpeg", 0.7);
  }, []);

  // Boucle de détection — envoie frames à l'API sans bloquer le rendu
  useEffect(() => {
    if (!cameraOn) return;

    intervalRef.current = setInterval(async () => {
      const frame = captureFrame();
      if (!frame) return;
      try {
        const res = await fetch(`${API_URL}/detect`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: frame }),
        });
        if (!res.ok) return;
        const data = await res.json();
        const dets: Detection[] = data.detections ?? [];
        detectionsRef.current = dets;
        setDetections(dets);
        if (dets.length > 0) {
          setBest(dets.reduce((a, c) => (c.confidence > a.confidence ? c : a)));
        } else {
          setBest(null);
        }
      } catch {
        // silently ignore
      }
    }, 350);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [cameraOn, captureFrame]);

  const handleSave = async () => {
    if (!best || status === "saving") return;
    const frame = captureFrame();
    if (!frame) return;
    setStatus("saving");
    try {
      await fetch(`${API_URL}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: frame, object_class: best.class, confidence: best.confidence }),
      });
      setStatus("saved");
      setTimeout(() => setStatus("running"), 2000);
    } catch {
      setStatus("error");
      setErrorMsg("Erreur lors de la sauvegarde.");
      setTimeout(() => setStatus("running"), 3000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">
      {/* Viewer : vidéo fluide + canvas transparent pour les boxes */}
      <div className="relative w-full aspect-video bg-gray-900 rounded-2xl overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
        />
        <canvas
          ref={overlayRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        {!cameraOn && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-500 text-lg">Caméra éteinte</span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-3 flex-wrap justify-center">
        {!cameraOn ? (
          <button
            onClick={startCamera}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Démarrer la caméra
          </button>
        ) : (
          <button
            onClick={stopCamera}
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Arrêter
          </button>
        )}

        {best && cameraOn && (
          <button
            onClick={handleSave}
            disabled={status === "saving"}
            className={`font-semibold px-6 py-3 rounded-xl transition-colors text-white ${
              status === "saving"
                ? "bg-yellow-500 cursor-wait"
                : status === "saved"
                ? "bg-green-600"
                : "bg-green-600 hover:bg-green-500"
            }`}
          >
            {status === "saving"
              ? "Envoi..."
              : status === "saved"
              ? "Enregistré ✓"
              : `Envoyer — ${best.class} (${(best.confidence * 100).toFixed(0)}%)`}
          </button>
        )}
      </div>

      {/* Détections */}
      {detections.length > 0 && (
        <div className="w-full bg-gray-900 rounded-xl p-4">
          <p className="text-sm text-gray-400 mb-2 font-medium">Détections en cours :</p>
          <div className="flex flex-wrap gap-2">
            {detections.map((d, i) => (
              <span key={i} className="bg-indigo-900 text-indigo-200 text-sm px-3 py-1 rounded-full">
                {d.class} {(d.confidence * 100).toFixed(0)}%
              </span>
            ))}
          </div>
        </div>
      )}

      {status === "error" && <p className="text-red-400 text-sm">{errorMsg}</p>}
    </div>
  );
}
