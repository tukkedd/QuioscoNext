import { create } from "zustand";
import { OrderItem } from "./types";
import { Product } from "./generated/prisma/client";

export const MAX_ITEMS_PER_PRODUCT = 5;

interface Store {
    order: OrderItem[]
    addToOrder: (product: Product) => void
    increaseQuantity : (id: Product['id']) => void
    decreaseQuantity : (id: Product['id']) => void
    removeItem: (id: Product['id']) => void
}

export const useStore = create<Store>((set, get) => ({
    order: [],
    addToOrder: (product) => {
        const {categoryId, image, ...data} = product
        const existingItem = get().order.find(item => item.id === product.id)

        if (existingItem && existingItem.quantity >= MAX_ITEMS_PER_PRODUCT) {
            return;
        }

        let order : OrderItem[] = []
        if(existingItem) {
            order = get().order.map(item => item.id === product.id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item )
        } else {
            order = [...get().order, {
                ...data,
                quantity: 1,
                subtotal: 1 * product.price
            }]
        }

        set(() => ({
            order
        }))
    },
    increaseQuantity: (id) => {
        const item = get().order.find(item => item.id === id)

        if (!item || item.quantity >= MAX_ITEMS_PER_PRODUCT) {
            return;
        }

        set((state) => ({
                order: state.order.map(item => item.id === id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item )
        }))
    },
    decreaseQuantity: (id) => {
        const order = get().order.map(item => item.id === id ? {
            ...item,
            quantity: Math.max(0, item.quantity - 1),
            subtotal: item.price * Math.max(0, item.quantity - 1)
        } : item)

        set(() => ({
            order: order.filter(item => item.quantity > 0)
        }))
    },
    removeItem: (id) => {
        set((state) => ({
            order: state.order.filter(item => item.id !== id)
        }))
    }
}))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         