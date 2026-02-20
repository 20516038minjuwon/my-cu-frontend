import { useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { confirmOrder } from "../../api/order.api.ts";
import { twMerge } from "tailwind-merge";
import Button from "../../components/common/Button.tsx";

function OrderSuccessPage(){
    const [searchParams]=useSearchParams();
    const navigate=useNavigate();
    const [isLoading,setIsLoading]=useState(true);

    const paymentKey =searchParams.get("paymentKey");
    const orderId = searchParams.get("orderId");
    const amount = Number(searchParams.get("amount"));

    useEffect(() => {
        const handleConfirm =async ()=>{
            if (!paymentKey || !orderId ||!amount)return;
            try{
                await confirmOrder({
                    paymentKey,
                    orderId,
                    amount
                });
                setIsLoading(false);
            }catch (e) {
                console.log("결제 승인 실패",e);
                navigate("/order/fail?message=결제 승인 중 오류가 발생하였습니다.")
            }
        }
        handleConfirm().then(()=>{});
    }, [paymentKey,orderId,amount,navigate]);

    if (isLoading) return <div className="py-40 text-center">결제 승인 중입니다...</div>;

    return<div className={twMerge(['max-w-md','mx-auto','py-40','text-center','space-y-6'])}>
        <h1 className={twMerge(['text-3xl','font-bold','text-green-600'])}> 결제 완료 ! </h1>
        <p className={'text-gray-600'}>주문이 성공적으로 완료되었습니다 .</p>
        <div className={twMerge(['bg-gray-50','p-6','rounded-lg','text-left','space-y-2'])}>
            <p><strong>주문번호 :</strong> {orderId}</p>
            <p><strong>결제금액 :</strong> {amount.toLocaleString()}</p>
        </div>
        <Button fullWidth={true} onClick={()=>navigate("my-page/orders")}>
            주문 내역 확인하기
        </Button>
    </div>
}
export default OrderSuccessPage;