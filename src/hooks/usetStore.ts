import { create } from "zustand";
import { Category, Order, Product } from "@/lib/Types";
import { auth, db } from "@/lib/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile,
} from "firebase/auth";

import {
  collection,
  getDocs,
  doc,
  setDoc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";

interface StoreState {
  products: Product[];
  categories: Category[];
  orders: Order[];
  selectedCategory: string | null;
  isLoading: boolean;
  error: string | null;
  user: User | null;
  loading: boolean;

  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchOrders: () => Promise<void>;
  placeOrder: () => Promise<void>;
  setSelectedCategory: (categoryId: string | null) => void;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const useStore = create<StoreState>((set, get) => ({
  user: null,
  loading: true,
  products: [],
  categories: [],
  orders: [],
  selectedCategory: null,
  isLoading: false,
  error: null,

  signUp: async (email: string, password: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;

      await updateProfile(user, {
        displayName: name,
      });

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: serverTimestamp(),
      });

      set({ user });
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      set({ user });
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null, orders: [] });
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },

  placeOrder: async () => {
    const { user } = get();
    if (!user) return;

    try {
      await runTransaction(db, async (transaction) => {
        const orderRef = doc(collection(db, "orders"));
        transaction.set(orderRef, {
          userId: user.uid,
          status: "pending",
          createdAt: serverTimestamp(),
        });
      });
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },

  fetchOrders: async () => {
    const { user } = get();
    if (!user) return;

    try {
      const querySnapshot = await getDocs(collection(db, "orders"));

      const orders = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() } as Order))
        .filter((order) => order.userId === user.uid)

      set({ orders });
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const products: Product[] = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Product)
      );
      set({ products, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch products", isLoading: false });
      throw error;
    }
  },

  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const querySnapshot = await getDocs(collection(db, "category"));
      const categories: Category[] = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Category)
      );
      set({ categories, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch categories", isLoading: false });
      throw error;
    }
  },

  setSelectedCategory: (categoryId: string | null) => {
    set({ selectedCategory: categoryId });
  },
}));

onAuthStateChanged(auth, (user) => {
  if (user) {
    useStore.setState({ user, loading: false });
    useStore.getState().fetchOrders();
  } else {
    useStore.setState({ user: null, loading: false, orders: [] });
  }
});

export default useStore;
