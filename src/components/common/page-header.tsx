import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
  className?: string;
};

export function PageHeader({ eyebrow, title, description, children, className }: PageHeaderProps) {
  return (
    <header className={cn("mb-8 flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-saffron-700 px-6 py-6 text-cream-50 sm:px-8 sm:py-8", className)}>
      <div>
        <p className="text-xs tracking-widest text-saffron-100 uppercase font-medium">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-display font-semibold tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-saffron-100/85 leading-relaxed">{description}</p>
      </div>
      {children}
    </header>
  );
}
