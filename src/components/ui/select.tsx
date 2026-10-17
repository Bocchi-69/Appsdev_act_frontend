import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  error?: string;
};

export function Select({ className, error, children, ...props }: SelectProps) {
  return (
    <div>
      <select
        className={cn(
          "w-full rounded-xl border border-biscuit-300 bg-cream-100 px-4 py-3 text-sm text-brown-800 outline-none transition-colors focus:border-saffron-600 focus:ring-2 focus:ring-saffron-600/20",
          error ? "border-rosybrown-500" : "border-biscuit-300",
          className
        )}
        aria-invalid={error ? true : undefined}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1.5 text-xs text-rosybrown-600 font-medium">{error}</p>}
    </div>
  );
}
