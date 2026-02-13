import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {CartItem} from "../types/cart.ts";
import { addToCart, getCart, removeCartItem } from "../api/cart.api.ts";

interface CartState {
    items: CartItem[];
    loading: boolean;

    fetchCart: () => Promise<void>;
    addItem: (productId: number, quantity: number) => Promise<void>;
    removeItem: (itemId: number) => Promise<void>;
    updateQuantity: (itemId: number, quantity: number) => Promise<void>;
    clearCart: () => void;
    getTotalCount: () => number;
    getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            loading:false,

            fetchCart: async () => {
                set({loading:true});

                try {
                    const result = await getCart();
                    set({items:result.items});
                }catch(e){
                    console.log("장바구니 업로드 실패 ",e);
                }finally{
                    set({loading:false});
                }
            },

            addItem: async (productId, quantity) => {
                try {
                    await addToCart(productId,quantity);
                    await get().fetchCart();
                }catch(e){
                    console.log("장바구니 담기 실패",e);
                    throw e;
                }
            },

            removeItem: async (itemId) => {
                const prevItems =get().items;
                set({ items: prevItems.filter((item) => item.id !== itemId), });
                try {
                    await removeCartItem(itemId);
                }catch(e){
                    set({items:prevItems});
                    console.log("장바구니 항목 삭제 실패",e);
                }
            },

            updateQuantity: async (itemId, quantity) => {
                if(quantity <1)return;
                const prevItems =get().items;
                set({
                    items: prevItems.map((item) =>
                        (item.id === itemId ? { ...item, quantity } : item)
                    ),
                });
            },

            clearCart: () =>  set({ items: [] }),

            getTotalCount:()=>{
                return get().items.reduce((acc, item) => acc + item.quantity, 0);
            },

            getTotalPrice: () => {
                return get().items.reduce(
                    (acc, item) => acc + item.product.price * item.quantity,
                    0
                );
            },
        }),
        {
            name: 'cu-cart-storage',
        }
    )
);