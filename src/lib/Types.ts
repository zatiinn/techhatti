export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  imageUrl: string;
  stock: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface User {
  name: string;
  email: string;
  phone: number;
}

import { Timestamp } from "firebase/firestore";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export type OrderStatus = "pending" | "processing" | "completed" | "cancelled";

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export type CreateOrderInput = Omit<
  Order,
  "id" | "createdAt" | "updatedAt" | "status"
>;
