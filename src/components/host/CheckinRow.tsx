"use client";
import { useState } from "react";
import { Checkin } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { format } from "date-fns";
import { Timestamp } from "firebase/firestore";
import { Download, Eye, MessageCircle, Users, CalendarDays } from "lucide-react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import toast from "react-hot-toast";

function fmtDate(ts: Timestamp | Date | unknown) {
  try {
    const d =
      ts instanceof Timestamp
        ? ts.toDate()
        : ts instanceof Date
        ? ts
        : new Date(ts as string);
    return format(d, "dd MMM yyyy");
  } catch {
    return "–";
  }
}

const statusColor: Record<string, "green" | "yellow" | "red"> = {
  approved: "green",
  pending: "yellow",
  flagged: "red",
};

interface Props {
  checkin: Checkin;
}

export function CheckinRow({ checkin }: Props) {
  const [idModal, setIdModal] = useState(false);

  async function approve() {
    try {
      await updateDoc(doc(db, "checkins", checkin.id!), { status: "approved" });
      toast.success("Check-in approved ✓");
    } catch {
      toast.error("Failed to update status");
    }
  }

  const hasId = checkin.idFrontUrl || checkin.idBackUrl;

  return (
    <>
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E0F2FE] flex flex-col gap-3">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-bold text-[#0C4A6E]">{checkin.guestName}</p>
            <p className="text-xs text-gray-500 mt-0.5 truncate">
              {checkin.email} · {checkin.phone}
            </p>
          </div>
          <Badge
            label={checkin.status}
            color={statusColor[checkin.status] ?? "gray"}
          />
        </div>

        {/* Info pills */}
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F0FDFF] text-[#0891B2] border border-[#E0F2FE] px-2.5 py-1 rounded-full font-medium">
            <CalendarDays size={11} />
            {fmtDate(checkin.checkInDate)} → {fmtDate(checkin.checkOutDate)}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#F0FDFF] text-[#0891B2] border border-[#E0F2FE] px-2.5 py-1 rounded-full font-medium">
            <Users size={11} />
            {checkin.numGuests} guest{checkin.numGuests !== 1 ? "s" : ""}
          </span>
          {checkin.idViaWhatsapp && (
            <span className="inline-flex items-center gap-1.5 text-xs bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full font-medium">
              <MessageCircle size={11} />
              ID via WhatsApp
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {checkin.status === "pending" && (
            <button
              onClick={approve}
              className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-[#0891B2] to-[#0E7490] text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Approve ✓
            </button>
          )}
          {hasId && (
            <button
              onClick={() => setIdModal(true)}
              className="flex items-center gap-1.5 text-xs text-[#0891B2] font-semibold hover:underline"
            >
              <Eye size={13} />
              View ID
            </button>
          )}
        </div>
      </div>

      {hasId && (
        <Modal
          open={idModal}
          onClose={() => setIdModal(false)}
          title={`${checkin.guestName}'s ID`}
        >
          <div className="flex flex-col gap-4">
            {[
              { label: "Front", url: checkin.idFrontUrl },
              { label: "Back", url: checkin.idBackUrl },
            ]
              .filter(({ url }) => !!url)
              .map(({ label, url }) => (
                <div key={label}>
                  <p className="text-sm font-semibold text-[#0C4A6E] mb-2">{label}</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={`ID ${label}`}
                    className="w-full rounded-xl object-cover max-h-52"
                  />
                  <a
                    href={url}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center gap-1.5 text-xs text-[#0891B2] font-semibold"
                  >
                    <Download size={12} />
                    Download {label}
                  </a>
                </div>
              ))}
          </div>
        </Modal>
      )}
    </>
  );
}
