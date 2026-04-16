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
      .then((data) => {
        setLogs(data.logs ?? []);
        setLoading(false);
      })
      .catch(() => {
        setError("Impossible de charger l'historique.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-gray-400">Chargement...</p>;
  if (error) return <p className="text-red-400">{error}</p>;
  if (logs.length === 0) return <p className="text-gray-500">Aucune détection enregistrée.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {logs.map((log) => (
        <div key={log.id} className="bg-gray-900 rounded-xl overflow-hidden">
          {log.photo && (
            <div className="relative w-full aspect-video">
              <Image
                src={log.photo}
                alt={log.objectClass}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="p-4">
            <p className="font-semibold text-indigo-300 capitalize">{log.objectClass}</p>
            <p className="text-gray-500 text-xs mt-1">
              {new Date(log.dateLog).toLocaleString("fr-FR")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
