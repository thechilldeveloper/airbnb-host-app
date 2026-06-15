"use client";
import { ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  loading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  loading = false,
  fullWidth = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 px-5 py-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97]";

  const variants = {
    primary:
      "bg-gradient-to-r from-[#0891B2] to-[#0E7490] text-white shadow-md shadow-[#0891B2]/25 hover:shadow-lg hover:shadow-[#0891B2]/30 hover:from-[#0E7490] hover:to-[#0C4A6E]",
    secondary:
      "bg-[#E0F2FE] text-[#0891B2] font-semibold hover:bg-[#BAE6FD] border border-[#0891B2]/20",
    ghost: "bg-transparent text-gray-600 hover:bg-[#E0F2FE] hover:text-[#0891B2]",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-md shadow-red-200",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  );
}
