/**
 * Post-build script: Copy public/ and .next/static/ into .next/standalone/
 * Required for Next.js standalone output to serve static assets.
 */
import { cpSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const STANDALONE = join(ROOT, ".next", "standalone");

if (!existsSync(STANDALONE)) {
  console.log("⏭  No standalone output found — skipping asset copy.");
  process.exit(0);
}

// 1. Copy public/ → .next/standalone/public/
const publicSrc = join(ROOT, "public");
const publicDest = join(STANDALONE, "public");
if (existsSync(publicSrc)) {
  mkdirSync(publicDest, { recursive: true });
  cpSync(publicSrc, publicDest, { recursive: true });
  console.log("✓ Copied public/ → .next/standalone/public/");
}

// 2. Copy .next/static/ → .next/standalone/.next/static/
const staticSrc = join(ROOT, ".next", "static");
const staticDest = join(STANDALONE, ".next", "static");
if (existsSync(staticSrc)) {
  mkdirSync(staticDest, { recursive: true });
  cpSync(staticSrc, staticDest, { recursive: true });
  console.log("✓ Copied .next/static/ → .next/standalone/.next/static/");
}

console.log("✓ Standalone assets ready.");
