import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SkeletonProps = {
  className?: string;
  children?: ReactNode;
};

export function Skeleton({ className, children }: SkeletonProps) {
  return (
    <div className={cn("skeleton h-full w-full", className)}>{children}</div>
  );
}
