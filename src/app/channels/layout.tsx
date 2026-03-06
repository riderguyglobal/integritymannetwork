import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Channels",
  description:
    "Explore the strategic channels of The Integrity Man Network — Schools, Outreach, Integrity Houses, and Man Foundation.",
};

export default function ChannelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
