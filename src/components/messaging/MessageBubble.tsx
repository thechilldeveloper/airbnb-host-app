import { Message } from "@/types";
import { format } from "date-fns";
import { Timestamp } from "firebase/firestore";

interface Props {
  message: Message;
  isHost?: boolean;
}

export function MessageBubble({ message, isHost = false }: Props) {
  const isGuest = message.sender === "guest";
  const fromMe = isHost ? !isGuest : isGuest;

  let timeStr = "";
  try {
    const ts = message.createdAt as Timestamp;
    const date = ts?.toDate ? ts.toDate() : new Date(ts as unknown as number);
    timeStr = format(date, "HH:mm");
  } catch {
    timeStr = "";
  }

  return (
    <div className={`flex ${fromMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm ${
          fromMe
            ? "text-white rounded-br-sm shadow-md"
            : "bg-white text-[#0C4A6E] shadow-sm rounded-bl-sm border border-[#E0F2FE]"
        }`}
        style={
          fromMe
            ? { background: "linear-gradient(135deg, #0891B2 0%, #0C4A6E 100%)" }
            : undefined
        }
      >
        {!fromMe && (
          <p className="text-xs font-bold mb-0.5 text-[#0891B2]">
            {message.senderName}
          </p>
        )}
        <p className="leading-relaxed">{message.text}</p>
        <p
          className={`text-xs mt-1 text-right ${
            fromMe ? "text-white/60" : "text-gray-400"
          }`}
        >
          {timeStr}
        </p>
      </div>
    </div>
  );
}
