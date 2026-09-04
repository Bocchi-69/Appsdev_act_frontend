import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className }: CardProps) {
  return (
    <div className={cn("border border-gray-200 rounded-lg", className)}>
      {children}
    </div>
  );
}