import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
};

const baseStyles =
  "cursor-pointer rounded-xl font-medium transition-fast focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const sizeStyles = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-3 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const variants = {
  primary: "bg-saffron-700 text-cream-50 hover:bg-saffron-800 shadow-soft hover:shadow-glow focus-visible:outline-saffron-500",
  secondary:
    "bg-brown-700 text-cream-50 hover:bg-brown-800 shadow-soft hover:shadow-medium focus-visible:outline-brown-500",
  outline:
    "border border-saffron-700 text-saffron-700 hover:bg-saffron-700 hover:text-cream-50 shadow-soft focus-visible:outline-saffron-500",
  ghost: "text-brown-600 hover:bg-brown-100 shadow-soft focus-visible:outline-brown-400",
  danger: "bg-rosybrown-700 text-cream-50 hover:bg-rosybrown-800 shadow-soft hover:shadow-medium focus-visible:outline-rosybrown-500",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(baseStyles, sizeStyles[size], variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
