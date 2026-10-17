import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionProps = {
  children: ReactNode;
  className?: string;
};

export function Section({ children, className }: SectionProps) {
  return (
    <section className={cn("max-w-6xl mx-auto px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12", className)}>
      {children}
    </section>
  );
}
