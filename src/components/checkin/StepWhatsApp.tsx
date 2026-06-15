"use client";
import { HOST_WHATSAPP } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { MessageCircle, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  guestName: string;
  onNext: () => void;
  onBack: () => void;
}

export function StepWhatsApp({ guestName, onNext, onBack }: Props) {
  const [copied, setCopied] = useState(false);

  const cleanNumber = HOST_WHATSAPP.replace(/\D/g, "");
  const waMessage = `Hi! I'm ${guestName} and I'm checking in at your Goa property. Please find my ID proof attached.`;
  const waLink = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(waMessage)}`;

  function copyNumber() {
    navigator.clipboard.writeText(HOST_WHATSAPP).then(() => {
      setCopied(true);
      toast.success("Number copied!");
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-bold text-[#0C4A6E]">Send your ID via WhatsApp</h2>
        <p className="text-sm text-gray-500 mt-1">
          We need a photo of your government-issued ID to complete check-in.
        </p>
      </div>

      {/* WhatsApp card */}
      <div className="rounded-2xl overflow-hidden border border-green-200">
        {/* Green header */}
        <div className="bg-[#25D366] px-5 py-4 flex items-center gap-3">
          <div className="w-11 h-11 bg-white/20 rounded-full flex items-center justify-center">
            <MessageCircle size={22} className="text-white" />
          </div>
          <div className="text-white">
            <p className="font-bold text-sm">Your host on WhatsApp</p>
            <p className="text-xs text-white/80">Typically responds within minutes</p>
          </div>
        </div>

        {/* Number + copy */}
        <div className="bg-white px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Host WhatsApp number</p>
            <p className="font-bold text-[#0C4A6E] text-lg tracking-wide">{HOST_WHATSAPP}</p>
          </div>
          <button
            onClick={copyNumber}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
              copied
                ? "bg-green-50 text-green-600 border border-green-200"
                : "bg-[#E0F2FE] text-[#0891B2] hover:bg-[#BAE6FD]"
            }`}
          >
            {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Instructions */}
        <div className="bg-gray-50 px-5 py-4 border-t border-gray-100">
          <p className="text-xs font-bold text-gray-700 mb-2">What to send:</p>
          <ul className="text-xs text-gray-600 space-y-1.5">
            <li className="flex items-start gap-2">
              <span className="text-[#0891B2] mt-0.5">①</span>
              Clear photo of your ID <strong>front</strong> (Aadhaar / Passport / Driving License)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#0891B2] mt-0.5">②</span>
              Clear photo of your ID <strong>back</strong>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#0891B2] mt-0.5">③</span>
              Mention your name: <strong>{guestName}</strong>
            </li>
          </ul>
        </div>
      </div>

      {/* Open WhatsApp button */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-2xl py-3.5 font-bold text-sm shadow-md shadow-green-200 hover:bg-[#1ebe5c] active:scale-95 transition-all duration-200"
      >
        <MessageCircle size={18} />
        Open WhatsApp &amp; send ID
      </a>

      <p className="text-xs text-center text-gray-400">
        Already sent your ID? Tap the button below to continue.
      </p>

      <div className="flex gap-3">
        <Button variant="secondary" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={onNext} className="flex-1">
          I&apos;ve sent my ID ✓
        </Button>
      </div>
    </div>
  );
}
