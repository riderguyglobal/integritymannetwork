import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Channels",
  description:
    "Explore the strategic channels of The Integrity Man Network — Schools, Outreach, Networking, and Support & Charity.",
};

export default function ChannelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
