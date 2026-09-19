import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],

      addItem: (dish) =>
        set((state) => {
          const existing = state.items.find(
            (item) => item.id === dish.id
          );

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === dish.id
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                    }
                  : item
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                ...dish,
                quantity: 1,
              },
            ],
          };
        }),

      removeItem: (id) =>
        set((state) => {
          const existing = state.items.find(
            (item) => item.id === id
          );

          if (!existing) return state;

          if (existing.quantity > 1) {
            return {
              items: state.items.map((item) =>
                item.id === id
                  ? {
                      ...item,
                      quantity: item.quantity - 1,
                    }
                  : item
              ),
            };
          }

          return {
            items: state.items.filter(
              (item) => item.id !== id
            ),
          };
        }),

      clear: () => set({ items: [] }),
    }),
    {
      name: "addis-eats-cart",
    }
  )
);