export const PROPERTY_ID =
  process.env.NEXT_PUBLIC_PROPERTY_ID ?? "property_main";

export const HOST_WHATSAPP =
  process.env.NEXT_PUBLIC_HOST_WHATSAPP ?? "+91 98765 43210";

export const MENU_CATEGORIES = [
  { value: "breakfast", label: "Breakfast" },
  { value: "mains", label: "Mains" },
  { value: "snacks", label: "Snacks" },
  { value: "drinks", label: "Drinks" },
] as const;

export const PLACE_CATEGORIES = [
  { value: "restaurant", label: "Restaurants", icon: "🍽️" },
  { value: "cafe", label: "Cafes", icon: "☕" },
  { value: "pharmacy", label: "Pharmacy", icon: "💊" },
  { value: "attraction", label: "Attractions", icon: "🏛️" },
  { value: "transport", label: "Transport", icon: "🚌" },
  { value: "supermarket", label: "Supermarket", icon: "🛒" },
] as const;

export const ORDER_STATUS_LABELS: Record<string, string> = {
  new: "New",
  preparing: "Preparing",
  ready: "Ready",
  delivered: "Delivered",
  cancelled: "Cancelled",
};
