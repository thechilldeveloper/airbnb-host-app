"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

const HOUSE_RULES = [
  "No smoking inside the property",
  "No parties or events without prior approval",
  "Check-out time is 11:00 AM",
  "Please treat the property with care",
  "Quiet hours are 10:00 PM – 8:00 AM",
  "Pets are not allowed unless pre-approved",
];

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export function StepTerms({ onNext, onBack }: Props) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900">House rules</h2>
        <p className="text-sm text-gray-500 mt-1">
          Please read and agree before checking in
        </p>
      </div>

      <ul className="bg-white rounded-2xl divide-y divide-gray-100 border border-gray-200">
        {HOUSE_RULES.map((rule, i) => (
          <li key={i} className="flex items-start gap-3 px-4 py-3">
            <span className="text-[#FF385C] font-bold mt-0.5">✓</span>
            <span className="text-sm text-gray-700">{rule}</span>
          </li>
        ))}
      </ul>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 accent-[#FF385C] w-4 h-4"
        />
        <span className="text-sm text-gray-700">
          I have read and agree to all house rules and the guest terms of stay
        </span>
      </label>

      <div className="flex gap-3">
        <Button type="button" variant="secondary" fullWidth onClick={onBack}>
          Back
        </Button>
        <Button type="button" fullWidth disabled={!agreed} onClick={onNext}>
          Continue
        </Button>
      </div>
    </div>
  );
}
