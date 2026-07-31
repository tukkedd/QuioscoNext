"use client"

import { Product } from "@/src/generated/prisma/client";
import { MAX_ITEMS_PER_PRODUCT, useStore } from "@/src/store";

type AddProductBottonProps = {
  product: Product
}


export default function AddProductBotton({product}: AddProductBottonProps) {
  const addToOrder = useStore((state) => state.addToOrder)
  const quantity = useStore((state) => state.order.find(item => item.id === product.id)?.quantity ?? 0)
  const isDisabled = quantity >= MAX_ITEMS_PER_PRODUCT

  return (
    <button 
        type="button"
        disabled={isDisabled}
        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
        onClick={() => addToOrder(product) }
    >
      {isDisabled ? "Límite alcanzado" : "Agregar"}
    </button>
  );
}
 