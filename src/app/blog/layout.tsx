import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read insightful articles, devotionals, and teachings from The Integrity Man Network on purpose, integrity, leadership, and faith.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
