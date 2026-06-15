"use client";
export const dynamic = "force-dynamic";
import { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  setDoc,
  doc,
  increment,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { PROPERTY_ID } from "@/lib/constants";
import { useMessages } from "@/hooks/useMessages";
import { GuestNav } from "@/components/layout/GuestNav";
import { MessageThread } from "@/components/messaging/MessageThread";
import { MessageInput } from "@/components/messaging/MessageInput";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
}

export default function MessagesPage() {
  const [guestName, setGuestName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [showNameModal, setShowNameModal] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("guestName");
    if (saved) {
      setGuestName(saved);
      const convId = `${PROPERTY_ID}__${slugify(saved)}`;
      setConversationId(convId);
      // Ensure conversation doc exists
      setDoc(
        doc(db, "messages", convId),
        {
          propertyId: PROPERTY_ID,
          guestName: saved,
          guestPhone: "",
          lastMessage: "",
          lastMessageAt: serverTimestamp(),
          unreadByHost: 0,
        },
        { merge: true }
      );
    } else {
      setShowNameModal(true);
    }
  }, []);

  function handleSetName() {
    if (!nameInput.trim()) return;
    const name = nameInput.trim();
    localStorage.setItem("guestName", name);
    setGuestName(name);
    const convId = `${PROPERTY_ID}__${slugify(name)}`;
    setConversationId(convId);
    setDoc(
      doc(db, "messages", convId),
      {
        propertyId: PROPERTY_ID,
        guestName: name,
        guestPhone: "",
        lastMessage: "",
        lastMessageAt: serverTimestamp(),
        unreadByHost: 0,
      },
      { merge: true }
    );
    setShowNameModal(false);
  }

  const { messages, loading } = useMessages(conversationId);

  async function handleSend(text: string) {
    if (!conversationId || !guestName) return;
    const msg = {
      text,
      sender: "guest" as const,
      senderName: guestName,
      createdAt: Timestamp.now(),
      read: false,
    };
    await addDoc(collection(db, "messages", conversationId, "thread"), msg);
    await setDoc(
      doc(db, "messages", conversationId),
      {
        lastMessage: text,
        lastMessageAt: Timestamp.now(),
        unreadByHost: increment(1),
      },
      { merge: true }
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#F0FDFF] pb-16">
      {/* Ocean header */}
      <div
        className="px-4 py-4 sticky top-0 z-10 shadow-sm"
        style={{ background: "linear-gradient(to right, #0C4A6E, #0891B2)" }}
      >
        <div className="max-w-lg mx-auto">
          <h1 className="text-xl font-extrabold text-white">Messages 💬</h1>
          {guestName ? (
            <p className="text-[11px] text-white/60 mt-0.5">Chatting as {guestName}</p>
          ) : (
            <p className="text-[11px] text-white/60 mt-0.5">Chat with your host</p>
          )}
        </div>
      </div>

      <div className="flex-1 max-w-lg mx-auto w-full flex flex-col overflow-hidden">
        <MessageThread messages={messages} loading={loading} isHost={false} />
        <MessageInput onSend={handleSend} />
      </div>

      <Modal open={showNameModal} onClose={() => {}} title="What&apos;s your name?">
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-500">
            We need your name to start the conversation
          </p>
          <Input
            placeholder="John Smith"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSetName()}
          />
          <Button fullWidth disabled={!nameInput.trim()} onClick={handleSetName}>
            Start chatting
          </Button>
        </div>
      </Modal>

      <GuestNav />
    </div>
  );
}
