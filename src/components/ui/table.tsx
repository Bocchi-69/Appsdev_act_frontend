import type { TableHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Table({ className, ...props }: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="rounded-2xl border border-biscuit-200 bg-cream-50 shadow-sm overflow-hidden">
      <table className={cn("w-full text-left text-sm", className)} {...props} />
    </div>
  );
}
