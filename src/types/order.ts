interface OrderItemInput {
    productId: number;
    quantity: number;
}
export interface CreateOrderRequest{
    items: OrderItemInput[];
    address1:string;
    address2:string;
    recipientName:string;
    recipientPhone:string;
    zipCode:string;
    deliveryRequest?:string;
    gatePassword?:string;
    paymentMethod?: string;
}

export interface ConfirmOrderRequest {
    paymentKey: string;
    orderId: string;
    amount: number;
}

export type CancelOrderStatus = "CANCELED"|"RETURN_REQUESTED"

export interface OrderItems{
    id:number;
    price:number;
    quantity:number;
    product:{
        id:number;
        image:string;
        name:string;
    }
}
export interface OrderPayment{
    amount:number;
    method:string;
}

export interface Order{
    data:{
        address1:string;
        address2:string;
        createdAt:string;
        deliveryRequest:string;
        id:number;
        recipientName:string;
        recipientPhone:string;
        state:string;
        totalPrice:number;
        zipCode:string;
        items:OrderItems[];
        payment:OrderPayment;
    }
}
export interface CancelOrderResponse{
    id:number;
    status:CancelOrderStatus;
    reason:string;
}