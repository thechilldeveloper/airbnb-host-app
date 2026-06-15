"use client";
import { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: "rgba(12, 74, 110, 0.45)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-[#E0F2FE] slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-[#0C4A6E]">{title}</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#F0FDFF] flex items-center justify-center text-gray-400 hover:text-[#0891B2] hover:bg-[#E0F2FE] transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
