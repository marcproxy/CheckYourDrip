"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const RAW = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const API_URL = RAW.startsWith("http") ? RAW : `https://${RAW}`;

interface LogEntry {
  id: string;
  objectClass: string;
  dateLog: string;
  photo: string;
  verification: boolean;
  pgDetectionId: number;
}

export default function HistoryList() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/history`)
      .then((r) => r.json())
      .then((data) => { setLogs(data.logs ?? []); setLoading(false); })
      .catch(() => { setError("Impossible de charger l'historique."); setLoading(false); });
  }, []);

  if (loading) return (
    <div className="flex items-center gap-2 text-gray-400 text-sm py-8">
      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
      </svg>
      Chargement…
    </div>
  );

  if (error) return (
    <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
      {error}
    </div>
  );

  if (logs.length === 0) return (
    <div className="text-center py-16 flex flex-col items-center gap-3">
      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
        </svg>
      </div>
      <p className="text-gray-400 text-sm">Aucune détection enregistrée.</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {logs.map((log) => (
        <div key={log.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
          {log.photo && (
            <div className="relative w-full aspect-video bg-gray-100">
              <Image src={log.photo} alt={log.objectClass} fill className="object-cover" />
            </div>
          )}
          <div className="p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900 capitalize text-sm">{log.objectClass}</p>
              <p className="text-gray-400 text-xs mt-0.5">{new Date(log.dateLog).toLocaleString("fr-FR")}</p>
            </div>
            <span className="bg-blue-50 text-blue-600 text-[10px] font-semibold px-2 py-1 rounded-lg border border-blue-100">
              #{log.pgDetectionId}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
