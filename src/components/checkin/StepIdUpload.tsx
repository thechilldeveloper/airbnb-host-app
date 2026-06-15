"use client";
import { useState, useRef } from "react";
import { Upload, Camera } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Props {
  onNext: (front: File, back: File) => void;
  onBack: () => void;
}

export function StepIdUpload({ onNext, onBack }: Props) {
  const [front, setFront] = useState<File | null>(null);
  const [back, setBack] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);
  const [error, setError] = useState("");

  const frontRef = useRef<HTMLInputElement>(null);
  const backRef = useRef<HTMLInputElement>(null);

  function handleFile(
    file: File,
    setter: (f: File) => void,
    previewSetter: (url: string) => void
  ) {
    setter(file);
    previewSetter(URL.createObjectURL(file));
  }

  function handleSubmit() {
    if (!front || !back) {
      setError("Please upload both sides of your ID");
      return;
    }
    onNext(front, back);
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900">ID verification</h2>
        <p className="text-sm text-gray-500 mt-1">
          Upload a photo of your government-issued ID
        </p>
      </div>

      {["Front", "Back"].map((side) => {
        const preview = side === "Front" ? frontPreview : backPreview;
        const inputRef = side === "Front" ? frontRef : backRef;
        const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (!file) return;
          if (side === "Front") {
            handleFile(file, setFront, setFrontPreview);
          } else {
            handleFile(file, setBack, setBackPreview);
          }
          setError("");
        };

        return (
          <div key={side}>
            <p className="text-sm font-medium text-gray-700 mb-2">
              ID {side}
            </p>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className={`w-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 py-6 transition-colors ${
                preview
                  ? "border-[#FF385C] bg-pink-50"
                  : "border-gray-300 hover:border-gray-400 bg-white"
              }`}
            >
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview}
                  alt={`ID ${side}`}
                  className="max-h-36 rounded-xl object-cover"
                />
              ) : (
                <>
                  <Camera size={28} className="text-gray-400" />
                  <span className="text-sm text-gray-500">
                    Tap to take photo or upload
                  </span>
                </>
              )}
              {preview && (
                <span className="text-xs text-[#FF385C] font-medium flex items-center gap-1">
                  <Upload size={12} /> Change photo
                </span>
              )}
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={onChange}
            />
          </div>
        );
      })}

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-3">
        <Button type="button" variant="secondary" fullWidth onClick={onBack}>
          Back
        </Button>
        <Button type="button" fullWidth onClick={handleSubmit}>
          Continue
        </Button>
      </div>
    </div>
  );
}
