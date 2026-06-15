"use client";
import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-semibold text-[#0C4A6E]">{label}</label>
        )}
        <input
          ref={ref}
          className={`rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 bg-white
            focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/20 focus:shadow-sm
            placeholder:text-gray-400
            ${error ? "border-red-400 bg-red-50/30" : "border-gray-200 hover:border-[#0891B2]/40"}
            ${className}`}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <span>⚠</span> {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
