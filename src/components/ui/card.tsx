import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
  children: ReactNode;
  className?: string;
  padding?: boolean;
  variant?: "default" | "elevated" | "outline" | "filled";
};

const variants = {
  default: "border border-biscuit-200 bg-cream-50 shadow-soft",
  elevated: "border border-biscuit-200 bg-cream-50 shadow-medium",
  outline: "border-2 border-biscuit-300 bg-transparent shadow-none",
  filled: "border border-biscuit-200 bg-brown-900 text-cream-50 shadow-medium",
};

export function Card({
  children,
  className,
  padding = true,
  variant = "default",
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl overflow-hidden transition-fast",
        variants[variant],
        padding && "p-6 sm:p-8",
        className
      )}
    >
      {children}
    </div>
  );
}
