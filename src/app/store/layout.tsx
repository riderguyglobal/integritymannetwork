import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Store",
  description:
    "Shop official merchandise, books, apparel, and resources from The Integrity Man Network. Purpose-branded products that represent the values you stand for.",
};

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
