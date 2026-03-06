"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className={cn("w-8 h-8", className)} />;

  return (
    <button
      onClick={() => {
        if (theme === "dark") setTheme("light");
        else if (theme === "light") setTheme("system");
        else setTheme("dark");
      }}
      className={cn(
        "p-2 rounded-lg transition-colors",
        "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100",
        "dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800",
        className
      )}
      title={`Theme: ${theme}`}
    >
      {theme === "dark" ? (
        <Moon className="w-4 h-4" />
      ) : theme === "light" ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Monitor className="w-4 h-4" />
      )}
    </button>
  );
}
