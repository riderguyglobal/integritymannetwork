import Link from "next/link";
import { Shield } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mx-auto mb-6">
          <Shield className="w-8 h-8 text-orange-500" />
        </div>
        <h1 className="text-5xl font-bold text-white font-display mb-4">404</h1>
        <p className="text-lg text-zinc-400 mb-8">
          This page doesn&apos;t exist. Let&apos;s get you back on track.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
