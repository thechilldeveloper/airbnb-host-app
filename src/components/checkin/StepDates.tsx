"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const schema = z
  .object({
    checkInDate: z.string().min(1, "Check-in date required"),
    checkOutDate: z.string().min(1, "Check-out date required"),
  })
  .refine((d) => d.checkOutDate > d.checkInDate, {
    message: "Check-out must be after check-in",
    path: ["checkOutDate"],
  });

type FormData = z.infer<typeof schema>;

interface Props {
  defaultValues: Partial<FormData>;
  onNext: (data: FormData) => void;
  onBack: () => void;
}

const today = new Date().toISOString().split("T")[0];

export function StepDates({ defaultValues, onNext, onBack }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues });

  return (
    <form onSubmit={handleSubmit(onNext)} className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Your stay dates</h2>
        <p className="text-sm text-gray-500 mt-1">When are you arriving and leaving?</p>
      </div>
      <Input
        label="Check-in date"
        type="date"
        min={today}
        error={errors.checkInDate?.message}
        {...register("checkInDate")}
      />
      <Input
        label="Check-out date"
        type="date"
        min={today}
        error={errors.checkOutDate?.message}
        {...register("checkOutDate")}
      />
      <div className="flex gap-3">
        <Button type="button" variant="secondary" fullWidth onClick={onBack}>
          Back
        </Button>
        <Button type="submit" fullWidth>
          Continue
        </Button>
      </div>
    </form>
  );
}
