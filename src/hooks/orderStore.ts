// stores/orderStore.ts
import { create } from "zustand";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
  where,
  Timestamp,
  DocumentReference,
} from "firebase/firestore";
import { db } from "@/lib/Firebase";
import { CreateOrderInput, Order, OrderStatus } from "@/lib/Types";

interface OrdersState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;

  fetchOrders: (userId: string) => Promise<void>;
  createOrder: (orderData: CreateOrderInput) => Promise<string>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  getOrderById: (orderId: string) => Order | undefined;
}

const useOrdersStore = create<OrdersState>((set, get) => ({
  orders: [],
  isLoading: false,
  error: null,

  fetchOrders: async (userId: string) => {
    set({ isLoading: true, error: null });

    try {
      const ordersRef = collection(db, "orders");
      const q = query(
        ordersRef,
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      const orders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt as Timestamp,
        updatedAt: doc.data().updatedAt as Timestamp,
      })) as Order[];

      set({ orders, isLoading: false });
    } catch (error) {
      set({
        error: `Failed to fetch orders: ${(error as Error).message}`,
        isLoading: false,
      });
      throw error;
    }
  },

  createOrder: async (orderData: CreateOrderInput): Promise<string> => {
    set({ isLoading: true, error: null });

    try {
      const ordersRef = collection(db, "orders");
      const timestamp = serverTimestamp();

      const docRef = await addDoc(ordersRef, {
        ...orderData,
        status: "pending" as OrderStatus,
        createdAt: timestamp,
        updatedAt: timestamp,
      });

      // Fetch updated orders
      await get().fetchOrders(orderData.userId);

      set({ isLoading: false });
      return docRef.id;
    } catch (error) {
      set({
        error: `Failed to create order: ${(error as Error).message}`,
        isLoading: false,
      });
      throw error;
    }
  },

  updateOrderStatus: async (orderId: string, status: OrderStatus) => {
    set({ isLoading: true, error: null });

    try {
      const orderRef = doc(db, "orders", orderId) as DocumentReference<Order>;
      await updateDoc(orderRef, {
        status,
        updatedAt: serverTimestamp(),
      });

      // Update local state
      const orders = get().orders.map((order) =>
        order.id === orderId
          ? { ...order, status, updatedAt: Timestamp.now() }
          : order
      );

      set({ orders, isLoading: false });
    } catch (error) {
      set({
        error: `Failed to update order status: ${(error as Error).message}`,
        isLoading: false,
      });
      throw error;
    }
  },

  getOrderById: (orderId: string) => {
    return get().orders.find((order) => order.id === orderId);
  },
}));

export default useOrdersStore;
