import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events & Gatherings",
  description:
    "Discover upcoming events hosted by The Integrity Man Network — The Integrity Summit, Men's Retreat, and Corporate Gatherings.",
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
