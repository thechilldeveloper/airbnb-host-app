export const dynamic = "force-dynamic";
import { MenuEditor } from "@/components/host/MenuEditor";

export default function MenuPage() {
  return (
    <div className="px-6 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Food Menu</h1>
      <MenuEditor />
    </div>
  );
}
