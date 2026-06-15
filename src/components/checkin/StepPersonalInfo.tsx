"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  guestName: z.string().min(2, "Full name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Phone number required"),
  numGuests: z.number().min(1, "At least 1 guest").max(20),
});

type FormData = z.infer<typeof schema>;

interface Props {
  defaultValues: Partial<FormData>;
  onNext: (data: FormData) => void;
}

export function StepPersonalInfo({ defaultValues, onNext }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues });

  return (
    <form onSubmit={handleSubmit(onNext)} className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Personal details</h2>
        <p className="text-sm text-gray-500 mt-1">Tell us a little about yourself</p>
      </div>
      <Input
        label="Full name"
        placeholder="John Smith"
        error={errors.guestName?.message}
        {...register("guestName")}
      />
      <Input
        label="Email address"
        type="email"
        placeholder="john@example.com"
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        label="Phone number"
        type="tel"
        placeholder="+1 555 000 0000"
        error={errors.phone?.message}
        {...register("phone")}
      />
      <Input
        label="Number of guests"
        type="number"
        min={1}
        max={20}
        error={errors.numGuests?.message}
        {...register("numGuests", { valueAsNumber: true })}
      />
      <Button type="submit" fullWidth>
        Continue
      </Button>
    </form>
  );
}
