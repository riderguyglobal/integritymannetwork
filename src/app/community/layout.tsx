import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Connect, share, and grow with men of integrity — The Integrity Man Network Community.",
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
