"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { PROPERTY_ID } from "@/lib/constants";
import { GuestNav } from "@/components/layout/GuestNav";
import { StepPersonalInfo } from "@/components/checkin/StepPersonalInfo";
import { StepDates } from "@/components/checkin/StepDates";
import { StepWhatsApp } from "@/components/checkin/StepWhatsApp";
import { StepTerms } from "@/components/checkin/StepTerms";
import { StepConfirmation } from "@/components/checkin/StepConfirmation";
import toast from "react-hot-toast";

interface FormState {
  guestName: string;
  email: string;
  phone: string;
  numGuests: number;
  checkInDate: string;
  checkOutDate: string;
}

const TOTAL_STEPS = 5;

const STEP_LABELS = [
  "Personal Info",
  "Dates",
  "Verify ID",
  "Terms",
  "Confirm",
];

export default function CheckinPage() {
  const [step, setStep] = useState(1);
  const [formState, setFormState] = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);
  const [checkinId, setCheckinId] = useState<string | null>(null);

  function goBack() {
    setStep((s) => Math.max(1, s - 1));
  }

  function handlePersonalInfo(data: {
    guestName: string;
    email: string;
    phone: string;
    numGuests: number;
  }) {
    setFormState((s) => ({ ...s, ...data }));
    setStep(2);
  }

  function handleDates(data: { checkInDate: string; checkOutDate: string }) {
    setFormState((s) => ({ ...s, ...data }));
    setStep(3);
  }

  function handleWhatsApp() {
    setStep(4);
  }

  function handleTerms() {
    setStep(5);
  }

  async function handleSubmit() {
    const { guestName, email, phone, numGuests, checkInDate, checkOutDate } =
      formState as Required<FormState>;
    setSubmitting(true);
    try {
      const docRef = await addDoc(collection(db, "checkins"), {
        guestName,
        email,
        phone,
        numGuests,
        checkInDate: Timestamp.fromDate(new Date(checkInDate)),
        checkOutDate: Timestamp.fromDate(new Date(checkOutDate)),
        termsAccepted: true,
        idViaWhatsapp: true,
        status: "pending",
        createdAt: Timestamp.now(),
        propertyId: PROPERTY_ID,
      });
      setCheckinId(docRef.id);
      toast.success("Check-in complete! 🌴");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (checkinId) {
    return (
      <div className="min-h-screen bg-[#F0FDFF] pb-24">
        <div className="max-w-lg mx-auto px-4 pt-6">
          <StepConfirmation
            guestName={formState.guestName ?? "Guest"}
            checkinId={checkinId}
          />
        </div>
        <GuestNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0FDFF] pb-24">
      {/* Ocean gradient header */}
      <div
        className="px-4 pt-10 pb-5 text-white"
        style={{ background: "linear-gradient(135deg, #0C4A6E 0%, #0891B2 100%)" }}
      >
        <div className="max-w-lg mx-auto">
          <p className="text-[11px] font-bold tracking-widest uppercase opacity-70 mb-1">
            🌊 Goa Stay
          </p>
          <h1 className="text-2xl font-extrabold">Check In 🏄</h1>
          <p className="text-xs text-white/60 mt-0.5">{STEP_LABELS[step - 1]}</p>

          {/* Progress bar */}
          <div className="mt-3 flex items-center justify-between text-xs text-white/60 mb-2">
            <span>Step {step} of {TOTAL_STEPS}</span>
            <span className="font-semibold text-white">
              {Math.round((step / TOTAL_STEPS) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            />
          </div>

          {/* Step dots */}
          <div className="flex items-center gap-1.5 mt-3">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i + 1 === step
                    ? "w-5 h-2 bg-white"
                    : i + 1 < step
                    ? "w-2 h-2 bg-white/60"
                    : "w-2 h-2 bg-white/25"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-5">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E0F2FE]">
          {step === 1 && (
            <StepPersonalInfo
              defaultValues={{
                guestName: formState.guestName,
                email: formState.email,
                phone: formState.phone,
                numGuests: formState.numGuests,
              }}
              onNext={handlePersonalInfo}
            />
          )}
          {step === 2 && (
            <StepDates
              defaultValues={{
                checkInDate: formState.checkInDate,
                checkOutDate: formState.checkOutDate,
              }}
              onNext={handleDates}
              onBack={goBack}
            />
          )}
          {step === 3 && (
            <StepWhatsApp
              guestName={formState.guestName ?? "Guest"}
              onNext={handleWhatsApp}
              onBack={goBack}
            />
          )}
          {step === 4 && <StepTerms onNext={handleTerms} onBack={goBack} />}
          {step === 5 && (
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-bold text-[#0C4A6E]">All set!</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Review your details and submit
                </p>
              </div>
              <div className="flex flex-col gap-3 text-sm">
                {[
                  ["Name", formState.guestName],
                  ["Email", formState.email],
                  ["Phone", formState.phone],
                  ["Guests", String(formState.numGuests)],
                  ["Check-in", formState.checkInDate],
                  ["Check-out", formState.checkOutDate],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between border-b border-[#E0F2FE] pb-2.5"
                  >
                    <span className="text-gray-500">{label}</span>
                    <span className="font-semibold text-[#0C4A6E]">{value}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-1">
                  <span className="text-gray-500">ID verification</span>
                  <span className="text-green-600 font-semibold flex items-center gap-1">
                    ✓ Sent via WhatsApp
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={goBack}
                  disabled={submitting}
                  className="flex-1 rounded-xl border border-[#E0F2FE] bg-[#F0FDFF] py-3 text-sm font-semibold text-[#0891B2] hover:bg-[#E0F2FE] disabled:opacity-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1 rounded-xl py-3 text-sm font-bold text-white disabled:opacity-50 transition-all shadow-md shadow-[#0891B2]/25 hover:shadow-lg active:scale-[0.98]"
                  style={{ background: "linear-gradient(135deg, #0891B2, #0C4A6E)" }}
                >
                  {submitting ? "Submitting…" : "Submit Check-in 🌊"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <GuestNav />
    </div>
  );
}
