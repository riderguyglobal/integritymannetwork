// Section heading component used across all pages
// Provides consistent, premium typography

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {label && (
        <div className={cn("flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4", align === "center" && "justify-center")}>
          <div className="h-px w-6 sm:w-8 bg-linear-to-r from-transparent to-orange-500/50" />
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-orange-500">
            {label}
          </span>
          <div className="h-px w-6 sm:w-8 bg-linear-to-l from-transparent to-orange-500/50" />
        </div>
      )}

      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight font-display">
        {title}
      </h2>

      {description && (
        <p className={cn("mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed max-w-2xl", align === "center" && "mx-auto")}>
          {description}
        </p>
      )}
    </div>
  );
}
