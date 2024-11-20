import { create } from "zustand";
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  serverTimestamp,
  runTransaction,
} from "firebase/firestore";
import { CartItem, Product } from "@/lib/Types";
import { auth, db } from "@/lib/Firebase";

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

interface CartActions {
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  initializeCart: () => Promise<void>;
  syncCart: () => (() => void) | undefined;
}

const useCartStore = create<CartState & CartActions>((set, get) => ({
  items: [],
  loading: false,
  error: null,

  addToCart: async (product: Product, quantity = 1) => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error("Please login to add items to cart");

      const cartRef = doc(db, "carts", userId);

      await runTransaction(db, async (transaction) => {
        const productRef = doc(db, "products", product.id);
        const productDoc = await transaction.get(productRef);
        const currentProduct = productDoc.data() as Product;

        if (!currentProduct || currentProduct.stock < quantity) {
          throw new Error("Product is out of stock");
        }

        const cartDoc = await transaction.get(cartRef);
        const existingCart = cartDoc.exists() ? cartDoc.data().items : [];

        const existingItemIndex = existingCart.findIndex(
          (item: CartItem) => item.productId === product.id
        );

        let updatedCart;
        if (existingItemIndex > -1) {
          const newQuantity =
            existingCart[existingItemIndex].quantity + quantity;
          if (newQuantity > currentProduct.stock) {
            throw new Error("Cannot add more items than available in stock");
          }
          existingCart[existingItemIndex].quantity = newQuantity;
          updatedCart = existingCart;
        } else {
          const newItem: CartItem = {
            productId: product.id,
            quantity,
            price: product.price,
            name: product.name,
            image: product.imageUrl,
          };
          updatedCart = [...existingCart, newItem];
        }

        transaction.set(cartRef, {
          items: updatedCart,
          updatedAt: serverTimestamp(),
        });

        set({ items: updatedCart, error: null });
      });
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },

  removeFromCart: async (productId: string) => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error("User not authenticated");

      const cartRef = doc(db, "carts", userId);
      const updatedItems = get().items.filter(
        (item) => item.productId !== productId
      );

      await setDoc(cartRef, {
        items: updatedItems,
        updatedAt: serverTimestamp(),
      });

      set({ items: updatedItems, error: null });
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },

  updateQuantity: async (productId: string, quantity: number) => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error("User not authenticated");

      if (quantity < 1) {
        throw new Error("Quantity must be at least 1");
      }

      await runTransaction(db, async (transaction) => {
        const productRef = doc(db, "products", productId);
        const productDoc = await transaction.get(productRef);
        const product = productDoc.data() as Product;

        if (!product || product.stock < quantity) {
          throw new Error("Requested quantity not available");
        }

        const cartRef = doc(db, "carts", userId);
        const updatedItems = get().items.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        );

        transaction.set(cartRef, {
          items: updatedItems,
          updatedAt: serverTimestamp(),
        });

        set({ items: updatedItems, error: null });
      });
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },

  clearCart: async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error("User not authenticated");

      const cartRef = doc(db, "carts", userId);
      await setDoc(cartRef, {
        items: [],
        updatedAt: serverTimestamp(),
      });

      set({ items: [], error: null });
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },

  getCartTotal: () => {
    return get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },

  getCartItemsCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  },

  initializeCart: async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    try {
      set({ loading: true, error: null });
      const cartRef = doc(db, "carts", userId);
      const cartDoc = await getDoc(cartRef);

      if (cartDoc.exists()) {
        set({ items: cartDoc.data().items });
      } else {
        set({ items: [] });
      }
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  syncCart: () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const cartRef = doc(db, "carts", userId);
    const unsubscribe = onSnapshot(cartRef, (doc) => {
      if (doc.exists()) {
        set({ items: doc.data().items, error: null });
      } else {
        set({ items: [] });
      }
    });

    return unsubscribe;
  },
}));

auth.onAuthStateChanged((user) => {
  if (user) {
    useCartStore.getState().initializeCart();
    return useCartStore.getState().syncCart();
  }
});

export default useCartStore;