import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
};

export function Textarea({ className, error, ...props }: TextareaProps) {
  return (
    <div>
      <textarea
        className={cn(
          "w-full rounded-xl border border-biscuit-300 bg-cream-100 px-4 py-3 text-sm text-brown-800 placeholder-brown-400/70 outline-none transition-colors focus:border-saffron-600 focus:ring-2 focus:ring-saffron-600/20",
          error ? "border-rosybrown-500" : "border-biscuit-300",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-rosybrown-600 font-medium">{error}</p>}
    </div>
  );
}
