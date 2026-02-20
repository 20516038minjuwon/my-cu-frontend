import type { CartItem } from "../types/cart.ts";
import { create } from "zustand";
import { persist } from "zustand/middleware"; // 추가

interface OrderState {
    orderItems: CartItem[];
    setOrderItems: (items: CartItem[]) => void;
    clearOrder: () => void;
    getTotalPrice: () => number;
}

const useOrderStore = create<OrderState>()(
    persist(
        (set, get) => ({
            orderItems: [],
            setOrderItems: (items) => set({ orderItems: items }),
            clearOrder: () => set({ orderItems: [] }),
            getTotalPrice: () => {
                return get().orderItems.reduce((acc, item) => {
                    const price = item.product.price;
                    return acc + price * item.quantity;
                }, 0);
            },
        }),
        {
            name: "order-storage", // 로컬 스토리지에 저장될 키 이름
        }
    )
);

export default useOrderStore;