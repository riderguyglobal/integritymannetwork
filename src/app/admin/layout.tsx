"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  ShoppingBag,
  Heart,
  MessageSquare,
  Settings,
  BarChart3,
  Menu,
  X,
  LogOut,
  ChevronRight,
  Bell,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Blog Posts", href: "/admin/blog", icon: FileText },
  { label: "Events", href: "/admin/events", icon: Calendar },
  { label: "Products", href: "/admin/products", icon: ShoppingBag },
  { label: "Donations", href: "/admin/donations", icon: Heart },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/*  Mobile Top Bar  */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800/50 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 -ml-2 text-zinc-500 hover:text-white transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <Image
              src="/images/IntegrityMan Logo.png"
              alt="TIMN"
              width={28}
              height={28}
              className="w-7 h-7 object-contain"
            />
            <span className="text-sm font-bold text-white">TIMN Admin</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 text-zinc-500 hover:text-white transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full" />
          </button>
        </div>
      </div>

      {/*  Mobile Backdrop  */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/*  Sidebar  */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 w-64 h-screen border-r border-zinc-800/50 bg-zinc-950 transition-transform duration-300 ease-in-out",
          "lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-zinc-800/50">
          <Image
            src="/images/IntegrityMan Logo.png"
            alt="Integrity Man Network"
            width={36}
            height={36}
            className="w-9 h-9 object-contain"
          />
          <div>
            <p className="font-display font-bold text-white text-sm">TIMN</p>
            <p className="text-[10px] text-zinc-500">Admin Panel</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="py-4 px-3 space-y-1 overflow-y-auto h-[calc(100vh-140px)] scrollbar-thin">
          {sidebarLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                  active
                    ? "bg-orange-500/10 text-orange-500 border border-orange-500/20"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                )}
              >
                <link.icon
                  className={cn(
                    "w-4 h-4 transition-colors",
                    active ? "text-orange-500" : "text-zinc-500 group-hover:text-orange-500"
                  )}
                />
                {link.label}
                {active && (
                  <ChevronRight className="w-3 h-3 ml-auto text-orange-500/60" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-zinc-800/50 p-3 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/*  Main Content  */}
      <main className="lg:ml-64 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8 pt-18 lg:pt-8">{children}</div>
      </main>
    </div>
  );
}
