import useModalStore from "../../stores/useModalStore.ts";
import useAuthStore from "../../stores/useAuthStore.ts";
import Modal from "../common/Modal.tsx";
import Button from "../common/Button.tsx";
import { useEffect, useRef, useState } from "react";
import { loadPaymentWidget, type PaymentWidgetInstance } from "@tosspayments/payment-widget-sdk";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = "HOKEZe0vB6WzIlA8WVwIP";

function PaymentModal() {
    const { isOpen, closeModal, modalProps } = useModalStore();
    const { user } = useAuthStore();

    const { orderId, orderName, customerName, customerEmail, amount } = modalProps;

    /* 뭘 선택할지는 정하지 않았지만, 앞으로 선택할 녀석의 타입을 PaymentWidgetInstance로 정함 */
    const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
    /* 마찬가지로 뭘 선택할 지 정하지 않았지만 앞으로 선택할 녀석의 타입을 ~~ 로 정함 */
    const paymentMethodWidgetRef = useRef<ReturnType<PaymentWidgetInstance["renderPaymentMethods"]> | null>(null);

    const [isWidgetLoaded, setIsWidgetLoaded] = useState(false);

    /* 토스 페이먼츠 모듈은 외부 프로그램이기 때문에 외부 통신해서 받아오듯 useEffect를 통해 존재하는 영역에 넣어줘야 함*/
    useEffect(() => {
        if (!isOpen || !user) return;

        const fetchPaymentWidget = async () => {
            try {
                const widget = await loadPaymentWidget(clientKey, customerKey);
                paymentWidgetRef.current = widget;

                const methodWidget = widget.renderPaymentMethods(
                    "#payment-widget",
                    { value: amount },
                    { variantKey: "DEFAULT" },
                );
                paymentMethodWidgetRef.current = methodWidget;

                widget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });
                /* 토스 페이먼츠 모듈 코드 끝 */
                setIsWidgetLoaded(true);
            } catch (e) {
                console.log("결제 위젯 로드 실패", e);
            }
        };
        fetchPaymentWidget().then(() => {});
    }, []);

    const handlePaymentRequest = async () => {
        const widget = paymentWidgetRef.current;
        if (!widget) return;

        try {
            await widget.requestPayment({
                orderId: orderId,
                orderName: orderName,
                customerName: customerName,
                customerEmail: customerEmail,
                successUrl: `${window.location.origin}/order/success`,
                failUrl: `${window.location.origin}/order/fail`,
            });
        } catch (e) {
            console.log("결제 창 접근 실패", e);
        }
    };
    return (
        <Modal isOpen={isOpen} onClose={closeModal} title={"결제하기"} width={"max-w-xl"}>
            <div className={"flex flex-col gap-4"}>
                {/* 결제 위젯 영역 */}
                <div id={"payment-widget"} className={"w-full"} />
                <div id={"agreement"} className={"w-full"} />
                {/* 최종 결제 버튼 */}
                <div className={"mt-6 px-4 pb-4"}>
                    <Button fullWidth={true} size={"lg"} onClick={handlePaymentRequest} disabled={!isWidgetLoaded}>
                        {amount?.toLocaleString()}원
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
export default PaymentModal;
