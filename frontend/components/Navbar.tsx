import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-white/10 bg-[#0a0f1e]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo + titre */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="ENSITECH"
            width={120}
            height={40}
            className="object-contain brightness-0 invert"
          />
          <div className="h-6 w-px bg-white/20" />
          <span className="text-sm font-semibold tracking-wide text-white/80">
            Check<span className="text-blue-400">Your</span>Drip
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/camera"
            className="text-white/60 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span>📷</span> Caméra
          </Link>
          <Link
            href="/history"
            className="text-white/60 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span>📋</span> Historique
          </Link>
        </nav>
      </div>
    </header>
  );
}
