import type {
    CancelOrderResponse,
    ConfirmOrderRequest,
    CreateOrderRequest,
    Order,
} from "../types/order.ts";
import {httpClient} from "./axios.ts";

export const createOrder=async (data:CreateOrderRequest)=>{
    const response =await httpClient.post<Order>("/orders",data);
    return response.data;
}

export const confirmOrder=async (data:ConfirmOrderRequest)=>{
    const response = await httpClient.post<Order>("/orders/confirm",data);
    return response.data;
}

export const getOrder =async ()=>{
    const response =await httpClient.get<Order[]>("/orders");
    return response.data;
}

export const getOrderDetail=async (orderId:number)=>{
    const response=await httpClient.get<Order>(`/orders/${orderId}`);
    return response.data;
}

export const cancelOrder=async (id:number,reason:string)=>{
    const response=await httpClient.patch<CancelOrderResponse>(`/orders/${id}/status`,{
        reason,
    })
    return response.data;
}