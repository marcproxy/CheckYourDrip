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
    <div className="flex flex-col gap-4 w-full">

      {/* ── Viewer ── */}
      <div className="relative w-full aspect-video bg-gray-100 border border-gray-200 rounded-2xl overflow-hidden">
        <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" muted playsInline />
        <canvas ref={overlayRef} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />

        {!cameraOn && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.361a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
              </svg>
            </div>
            <p className="text-gray-400 text-sm">Caméra inactive</p>
          </div>
        )}

        {cameraOn && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 pulse-dot" />
            <span className="text-[10px] font-semibold text-gray-600 tracking-widest uppercase">Live</span>
          </div>
        )}

        {cameraOn && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm px-2.5 py-1 rounded-full">
            <span className="text-[10px] font-semibold text-gray-500">
              {detections.length} détection{detections.length !== 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>

      {/* ── Controls ── */}
      <div className="flex items-center justify-between gap-3">
        {!cameraOn ? (
          <button onClick={startCamera} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.361a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
            </svg>
            Démarrer la caméra
          </button>
        ) : (
          <button onClick={stopCamera} className="flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-600 hover:text-gray-900 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
            </svg>
            Arrêter
          </button>
        )}

        {best && cameraOn && (
          <button
            onClick={handleSave}
            disabled={status === "saving"}
            className={`flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm text-white ${
              status === "saving" ? "bg-amber-500 cursor-wait"
              : status === "saved" ? "bg-emerald-600"
              : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {status === "saving" ? (
              <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>Envoi…</>
            ) : status === "saved" ? (
              <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>Enregistré</>
            ) : (
              <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
              Envoyer — <span className="capitalize">{best.class}</span> ({(best.confidence * 100).toFixed(0)}%)</>
            )}
          </button>
        )}
      </div>

      {/* ── Détections ── */}
      {detections.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-4 fade-in">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Détections actives</p>
          <div className="flex flex-wrap gap-2">
            {detections.map((d, i) => (
              <div key={i} className="flex items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg">
                <span className="text-xs font-semibold text-blue-700 capitalize">{d.class}</span>
                <span className="text-[10px] text-blue-400 font-mono">{(d.confidence * 100).toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-3 rounded-xl text-red-600 text-sm">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
          </svg>
          {errorMsg}
        </div>
      )}
    </div>
  );
}
