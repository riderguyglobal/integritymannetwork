import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support The Integrity Man Network through your generous donations. Fund schools, outreach programs, and men's formation initiatives globally.",
};

export default function DonateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
