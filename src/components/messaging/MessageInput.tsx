"use client";
import { useState } from "react";
import { Send } from "lucide-react";

interface Props {
  onSend: (text: string) => Promise<void>;
}

export function MessageInput({ onSend }: Props) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() || sending) return;
    setSending(true);
    try {
      await onSend(text.trim());
      setText("");
    } finally {
      setSending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 px-4 py-3 bg-white border-t border-[#E0F2FE]"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message…"
        className="flex-1 rounded-full border border-[#E0F2FE] bg-[#F0FDFF] px-4 py-2.5 text-sm outline-none transition-all focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/20 placeholder:text-gray-400"
      />
      <button
        type="submit"
        disabled={!text.trim() || sending}
        className="w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-40 transition-all active:scale-90"
        style={{ background: "linear-gradient(135deg, #0891B2, #0C4A6E)" }}
      >
        <Send size={16} className="text-white" />
      </button>
    </form>
  );
}
