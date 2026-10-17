import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TagProps = { children: ReactNode; className?: string; variant?: "saffron" | "brown" | "olive" | "rosybrown" };

const variants = {
  saffron: "bg-saffron-100 text-saffron-800 border border-saffron-200",
  brown: "bg-brown-100 text-brown-800 border border-brown-200",
  olive: "bg-olive-100 text-olive-800 border border-olive-200",
  rosybrown: "bg-rosybrown-100 text-rosybrown-800 border border-rosybrown-200",
};

export function Tag({ children, className, variant = "saffron" }: TagProps) {
  return (
    <span className={cn("inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-medium whitespace-nowrap", variants[variant], className)}>
      {children}
    </span>
  );
}
