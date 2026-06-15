"use client";
import { useEffect, useRef } from "react";
import { Message } from "@/types";
import { MessageBubble } from "./MessageBubble";
import { Spinner } from "@/components/ui/Spinner";

interface Props {
  messages: Message[];
  loading: boolean;
  isHost?: boolean;
}

export function MessageThread({ messages, loading, isHost = false }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (loading) return <Spinner />;

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
      {messages.length === 0 && (
        <p className="text-center text-sm text-gray-400 mt-8">
          No messages yet. Say hello!
        </p>
      )}
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} isHost={isHost} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
