import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

import { Product } from "@/types";

interface CartStore {
  items: Product[];
  addItemToCart: (data: Product) => void;
  // updateQuantity: (id: string, newQuantity: number) => void;
  removeItem: (id: string) => void;
  decrementItem: (id: string) => void;
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
          // set((state) => {
          //   const updatedItems = [...state.items];
          //   updatedItems[data.quantity].quantity += 1;
          //   toast(`Total of ${data.quantity} for ${data.name}`);
          //   return { items: updatedItems };
          return toast("Item already in cart.");
          // });
        } else {
          set({ items: [...get().items, data] });
          toast.success("Item added to cart.");
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
      updateQuantity: (id: string, newQuantity: number) => {
        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          );
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
