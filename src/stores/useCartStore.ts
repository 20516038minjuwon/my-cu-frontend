import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {CartItem} from "../types/cart.ts";
import type {Product} from "../types/product.ts";

interface CartState {
    items: CartItem[];
    // 상세페이지에서 Product 객체와 수량을 받아서 추가
    addItem: (product: Product, quantity: number) => void;
    removeItem: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product, quantity) => {
                const currentItems = get().items;
                // items 안의 product.id와 비교해야 함
                const existingItem = currentItems.find((item) => item.product.id === product.id);

                if (existingItem) {
                    // 이미 장바구니에 있으면 quantity만 업데이트
                    set({
                        items: currentItems.map((item) =>
                            item.product.id === product.id
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        ),
                    });
                } else {
                    // 새로 추가 (CartItem 구조에 맞게 생성)
                    const newItem: CartItem = {
                        id: Date.now(), // 장바구니 아이템 자체의 고유 ID (임시)
                        quantity: quantity,
                        product: {
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                        },
                    };
                    set({ items: [...currentItems, newItem] });
                }
            },

            removeItem: (productId) => {
                set({
                    items: get().items.filter((item) => item.product.id !== productId),
                });
            },

            updateQuantity: (productId, quantity) => {
                set({
                    items: get().items.map((item) =>
                        item.product.id === productId ? { ...item, quantity } : item
                    ),
                });
            },

            clearCart: () => set({ items: [] }),

            getTotalPrice: () => {
                return get().items.reduce(
                    (total, item) => total + item.product.price * item.quantity,
                    0
                );
            },
        }),
        {
            name: 'cu-cart-storage',
        }
    )
);