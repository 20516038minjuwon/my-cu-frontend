import { httpClient } from "./axios.ts";
import type {CartResponse } from "../types/cart.ts";


export const getCart =async ()=>{
    const response=await httpClient.get<CartResponse>("/cart");
    return response.data.data;
}

export const addToCart=async (productId :number , quantity:number)=>{
    return httpClient.post("/cart/items",{
        productId ,
        quantity ,
    })
};

export const updateCart =async(ItemId:number,quantity:number)=>{
    return httpClient.patch(`/cart/items/${ItemId}`,{quantity});
};

export const removeCartItem=async(ItemId:number)=>{
    return httpClient.delete(`/cart/items/${ItemId}`);
}