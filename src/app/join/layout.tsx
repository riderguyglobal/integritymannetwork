import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join The Network",
  description:
    "Become a member of The Integrity Man Network — join a global community of men committed to purpose, integrity, and God-aligned work.",
};

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
