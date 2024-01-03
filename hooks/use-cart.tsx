import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

import { Product } from "@/types";

interface CartStore {
  items: Product[];
  addItemToCart: (data: Product) => void;
  addQuantity: (data: Product) => void;
  decrementItem: (id: string) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItemToCart: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          // item already exists in the cart
          toast(`${data.name} already in cart.`);
        } else {
          set((state) => ({
            items: [...state.items, { ...data, quantity: 1 }],
          }));
          toast.success(`${data.name} added to cart.`);
        }
      },
      addQuantity: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);
        if (existingItem) {
          set((state) => {
            const updatedItems = state.items.map((item) =>
              item.id === data.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
            const updatedItem = updatedItems.find(
              (item) => item.id === data.id
            );
            toast.success(`Total of ${updatedItem?.quantity} for ${data.name}`);
            return { items: updatedItems };
          });
        }
      },
      removeItem: (id: string) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id);

        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success(`${existingItem?.name} removed from cart.`);
      },
      decrementItem: (id: string) => {
        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.id === id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );

          // Check if the quantity was actually updated
          const itemUpdated = state.items.some(
            (item) => item.id === id && item.quantity > 1
          );

          if (!itemUpdated) {
            toast.error("Cannot decrease quantity further.");
          } else {
            toast(`1 item removed.`);
          }

          return { items: updatedItems };
        });
      },

      removeAll: () => set({ items: [] }),
    }),

    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
