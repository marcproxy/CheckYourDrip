import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#060912]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo.png"
            alt="ENSITECH"
            width={100}
            height={34}
            className="object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
          />
          <div className="h-4 w-px bg-white/15" />
          <span className="text-[13px] font-semibold text-white/50 group-hover:text-white/70 transition-colors tracking-wide">
            Check<span className="text-blue-400">Your</span>Drip
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/camera"
            className="flex items-center gap-1.5 text-[13px] text-white/50 hover:text-white hover:bg-white/[0.06] px-3 py-1.5 rounded-lg transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.361a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
            </svg>
            Caméra live
          </Link>
          <Link
            href="/history"
            className="flex items-center gap-1.5 text-[13px] text-white/50 hover:text-white hover:bg-white/[0.06] px-3 py-1.5 rounded-lg transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Historique
          </Link>
        </nav>
      </div>
    </header>
  );
}
