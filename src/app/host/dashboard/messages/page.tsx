"use client";
export const dynamic = "force-dynamic";
import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { PROPERTY_ID } from "@/lib/constants";
import { Conversation } from "@/types";
import { useMessages } from "@/hooks/useMessages";
import { MessageThread } from "@/components/messaging/MessageThread";
import { MessageInput } from "@/components/messaging/MessageInput";
import { Spinner } from "@/components/ui/Spinner";
import { format } from "date-fns";

export default function HostMessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loadingConvs, setLoadingConvs] = useState(true);
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      where("propertyId", "==", PROPERTY_ID),
      orderBy("lastMessageAt", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setConversations(
        snap.docs.map((d) => ({ id: d.id, ...d.data() } as Conversation))
      );
      setLoadingConvs(false);
    });
    return unsub;
  }, []);

  const selectedConv = conversations.find((c) => c.id === selectedConvId);
  const { messages, loading: loadingMsgs } = useMessages(selectedConvId);

  async function handleSend(text: string) {
    if (!selectedConvId || !selectedConv) return;
    await addDoc(collection(db, "messages", selectedConvId, "thread"), {
      text,
      sender: "host",
      senderName: "Host",
      createdAt: Timestamp.now(),
      read: true,
    });
    await updateDoc(doc(db, "messages", selectedConvId), {
      lastMessage: text,
      lastMessageAt: Timestamp.now(),
      unreadByHost: 0,
    });
  }

  function fmtTime(ts: unknown) {
    try {
      const d =
        ts instanceof Timestamp
          ? ts.toDate()
          : new Date(ts as string);
      return format(d, "HH:mm");
    } catch {
      return "";
    }
  }

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Conversation list */}
      <div className="w-72 shrink-0 border-r border-[#E0F2FE] flex flex-col bg-white">
        <div className="px-4 py-4 border-b border-[#E0F2FE]">
          <h2 className="font-bold text-[#0C4A6E]">💬 Conversations</h2>
        </div>
        {loadingConvs ? (
          <Spinner />
        ) : conversations.length === 0 ? (
          <p className="text-sm text-gray-400 p-4">No conversations yet</p>
        ) : (
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConvId(conv.id!)}
                className={`w-full text-left px-4 py-3.5 border-b border-[#F0FDFF] transition-colors ${
                  selectedConvId === conv.id
                    ? "bg-[#E0F2FE] border-l-2 border-l-[#0891B2]"
                    : "hover:bg-[#F0FDFF]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm text-[#0C4A6E]">
                    {conv.guestName}
                  </p>
                  <div className="flex items-center gap-1.5">
                    {(conv.unreadByHost ?? 0) > 0 && (
                      <span className="w-5 h-5 bg-[#0891B2] text-white rounded-full text-xs flex items-center justify-center font-bold">
                        {conv.unreadByHost}
                      </span>
                    )}
                    <span className="text-xs text-gray-400">
                      {fmtTime(conv.lastMessageAt)}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 truncate mt-0.5">
                  {conv.lastMessage || "…"}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Thread */}
      <div className="flex-1 flex flex-col bg-[#F0FDFF]">
        {selectedConvId ? (
          <>
            <div
              className="px-5 py-4 border-b border-[#E0F2FE]"
              style={{ background: "linear-gradient(to right, #0C4A6E, #0891B2)" }}
            >
              <p className="font-bold text-white">
                {selectedConv?.guestName}
              </p>
              {selectedConv?.guestPhone && (
                <p className="text-xs text-white/60">{selectedConv.guestPhone}</p>
              )}
            </div>
            <MessageThread
              messages={messages}
              loading={loadingMsgs}
              isHost
            />
            <MessageInput onSend={handleSend} />
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-3">
            <span className="text-4xl float-1">💬</span>
            <p className="text-sm font-medium text-[#0891B2]">Select a conversation</p>
          </div>
        )}
      </div>
    </div>
  );
}
