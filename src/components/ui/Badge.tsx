interface BadgeProps {
  label: string;
  color?: "red" | "green" | "yellow" | "blue" | "gray";
}

const colors = {
  red: "bg-red-100 text-red-700",
  green: "bg-green-100 text-green-700",
  yellow: "bg-yellow-100 text-yellow-700",
  blue: "bg-blue-100 text-blue-700",
  gray: "bg-gray-100 text-gray-600",
};

export function Badge({ label, color = "gray" }: BadgeProps) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[color]}`}
    >
      {label}
    </span>
  );
}
