import { Timestamp } from "firebase/firestore";

export type CheckinStatus = "pending" | "approved" | "flagged";
export type MenuCategory = "breakfast" | "mains" | "snacks" | "drinks";
export type OrderStatus =
  | "new"
  | "preparing"
  | "ready"
  | "delivered"
  | "cancelled";
export type MessageSender = "guest" | "host";
export type PlaceCategory =
  | "restaurant"
  | "cafe"
  | "pharmacy"
  | "attraction"
  | "transport"
  | "supermarket";

export interface Checkin {
  id?: string;
  guestName: string;
  email: string;
  phone: string;
  numGuests: number;
  checkInDate: Timestamp | Date;
  checkOutDate: Timestamp | Date;
  idFrontUrl?: string;
  idBackUrl?: string;
  idViaWhatsapp?: boolean;
  termsAccepted: boolean;
  status: CheckinStatus;
  createdAt: Timestamp | Date;
  propertyId: string;
}

export interface MenuItem {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  available: boolean;
  imageUrl?: string;
  sortOrder: number;
}

export interface OrderItem {
  itemId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id?: string;
  guestName: string;
  guestPhone: string;
  items: OrderItem[];
  manualNote: string;
  total: number;
  status: OrderStatus;
  createdAt: Timestamp | Date;
  propertyId: string;
  isManual: boolean;
}

export interface Conversation {
  id?: string;
  propertyId: string;
  guestName: string;
  guestPhone: string;
  lastMessage: string;
  lastMessageAt: Timestamp | Date;
  unreadByHost: number;
}

export interface Message {
  id?: string;
  text: string;
  sender: MessageSender;
  senderName: string;
  createdAt: Timestamp | Date;
  read: boolean;
}

export interface NearbyPlace {
  id?: string;
  name: string;
  category: PlaceCategory;
  description: string;
  distance: string;
  address?: string;
  phone?: string;
  openingHours?: string;
  mapsUrl?: string;
  sortOrder: number;
  propertyId: string;
}

export interface Property {
  id?: string;
  name: string;
  address: string;
  hostUid: string;
  wifiName: string;
  wifiPassword: string;
  checkInTime: string;
  checkOutTime: string;
  houseRules: string[];
}

export interface CartItem extends MenuItem {
  quantity: number;
}
