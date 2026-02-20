import { useNavigate } from "react-router";
import useOrderStore from "../../stores/useOrderStore.ts";
import useAuthStore from "../../stores/useAuthStore.ts";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../../components/common/Button.tsx";
import Input from "../../components/common/Input.tsx";
import type { CreateOrderRequest } from "../../types/order.ts";
import { createOrder } from "../../api/order.api.ts";
import useModalStore from "../../stores/useModalStore.ts";
import PostcodeModal from "../../components/modals/PostcodeModal.tsx";
import PaymentModal from "../../components/modals/PaymentModal.tsx";

interface OrderFormData {
    recipientName: string;
    recipientPhone: string;
    zipCode: string;
    address1: string;
    address2: string;
    deliveryRequestType: string;
    deliveryRequestDirect: string;
    gatePassword: string;
}

function OrderPage() {
    const navigate = useNavigate();
    const { orderItems, getTotalPrice } = useOrderStore();
    const { user } = useAuthStore();
    const { modalType,isOpen,openModal } = useModalStore();

    const productsPrice = getTotalPrice();
    const shippingCost = productsPrice >= 30000 ? 0 : 3000;
    const finalPrice = productsPrice + shippingCost;

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<OrderFormData>();

    const deliveryRequestType = watch("deliveryRequestType");

    useEffect(() => {
        if (user) {
            reset({
                recipientName: user.name,
                recipientPhone: user.phone
            });
        }
    }, [user,reset]);

    const handleSearchAddress = () => {
        openModal("POSTCODE", {
            onComplete: (data: { zipCode: string; address1: string }) => {
                setValue("zipCode", data.zipCode);
                setValue("address1", data.address1);
                document.getElementById("address2")?.focus();
            },
        });
    };

    const onSubmit = async (data: OrderFormData) => {
        // 택배기사 전달말
        const finalDeliveryRequest =
            data.deliveryRequestType === "DIRECT"
                ? data.deliveryRequestDirect
                : data.deliveryRequestType;

        try {
            // 1. 백엔드에 주문 생성 요청
            const orderInput: CreateOrderRequest = {
                recipientName: data.recipientName,
                recipientPhone: data.recipientPhone,
                zipCode: data.zipCode,
                address1: data.address1,
                address2: data.address2,
                gatePassword: data.gatePassword,
                deliveryRequest: finalDeliveryRequest,
                items: orderItems.map(item => ({
                    productId: item.product.id,
                    quantity: item.quantity,
                })),
            };

            const response = await createOrder(orderInput);
            const {id,totalPrice}=response.data;
            const tossOrderId =`ORDER-${id}-${new Date().getTime()}`;

            openModal("PAYMENT", {
                orderId:  tossOrderId,
                orderName:
                    orderItems.length > 1
                        ? `${orderItems[0].product.name} 외 ${orderItems.length - 1}건`
                        : orderItems[0].product.name,
                customerName: data.recipientName,
                customerEmail: user?.email || "",
                amount: totalPrice,
            });

            // 2. 토스페이먼츠 결제모듈을 모달에 담아서 띄워주기
        } catch (e) {
            console.log(e);
            alert("주문 생성 중 오류가 발생했습니다.");
        }
        return;
    };

    if (orderItems.length === 0) {
        return (
            <div className={twMerge(["py-40", "text-center"])}>
                <p className={twMerge(["mb-4", "text-gray-500"])}>주문할 상품 정보가 없습니다.</p>
                <Button onClick={() => navigate("/")}>홈으로 이동</Button>
            </div>
        );
    }

    const DELIVERY_OPTIONS = [
        { value: "", label: "배송 메세지를 선택해주세요" },
        { value: "문 앞에 놓아주세요", label: "문 앞에 놓아주세요" },
        { value: "배송 전 연락 바랍니다", label: "배송 전 연락 바랍니다" },
        { value: "경비실에 맡겨주세요", label: "경비실에 맡겨주세요" },
        { value: "DIRECT", label: "직접 입력" },
    ];
    return (
        <div className={twMerge(["max-w-7xl", "mx-auto", "px-8", "py-40"])}>
            <h1 className={twMerge(["text-2xl", "font-bold", "mb-8"])}>주문</h1>

            <form
                id="order-form"
                onSubmit={handleSubmit(onSubmit)}
                className={twMerge(["flex", "gap-10"])}>
                {/* 왼쪽 */}
                <div className={twMerge(["flex-1", "space-y-10"])}>
                    {/* 정보 입력 */}
                    <div className={twMerge(['flex','flex-col','gap-4'])}>
                        <h2
                            className={twMerge(
                                ["pb-3", "mb-5"],
                                ["text-lg", "font-bold", "border-b", "border-black"],
                            )}>
                            배송지 정보
                        </h2>
                        <div className={twMerge(["space-y-4"])}>
                            <div className={twMerge(["flex", "gap-4"])}>
                                <Input
                                    label={"받는 사람"}
                                    fullWidth={true}
                                    registration={register("recipientName", {
                                        required: "이름은 필수입니다.",
                                    })}
                                    error={errors.recipientName}
                                />
                                <Input
                                    label={"휴대폰 번호"}
                                    fullWidth={true}
                                    placeholder={"010-0000-0000"}
                                    registration={register("recipientPhone", {
                                        required: "전화번호는 필수입니다.",
                                        pattern: {
                                            value: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
                                            message: "올바른 형식이 아닙니다",
                                        },
                                    })}
                                    error={errors.recipientPhone}
                                />
                            </div>
                            <div className={twMerge(["space-y-2"])}>
                                <div className={twMerge(["flex", "gap-2", "items-end"])}>
                                    <div className={twMerge("flex-1")}>
                                        <Input
                                            label={"주소"}
                                            placeholder={"우편번호"}
                                            registration={register("zipCode", {
                                                required: "주소를 검색해주세요.",
                                            })}
                                            error={errors.zipCode}
                                            readOnly={true}
                                        />
                                    </div>
                                    <Button
                                        type={"button"}
                                        variant={"primary"}
                                        size={"md"}
                                        className={twMerge(["w-32"])}
                                        onClick={handleSearchAddress}>
                                        주소 검색
                                    </Button>
                                </div>
                                <Input
                                    placeholder={"기본 주소"}
                                    registration={register("address1", { required: true })}
                                    readOnly={true}
                                />
                                <Input
                                    placeholder={"상세 주소"}
                                    registration={register("address2")}
                                />
                            </div>
                        </div>

                        <div className={twMerge(["space-y-2"])}>
                            <label
                                className={twMerge([
                                    "block",
                                    "text-xs",
                                    "font-bold",
                                    "text-gray-500",
                                ])}>
                                배송 메모
                            </label>
                            <div className="w-full">
                                <select
                                    className={twMerge([
                                        "w-full p-4 border border-gray-300 text-sm",
                                        "focus:outline-none focus:border-black transition-all",
                                        errors.deliveryRequestType ? "border-red-500" : ""
                                    ])}
                                    {...register("deliveryRequestType")}
                                >
                                    {DELIVERY_OPTIONS.map((option, index) => (
                                        <option key={index} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.deliveryRequestType && (
                                    <p className="text-red-600 text-xs mt-1">{errors.deliveryRequestType.message}</p>
                                )}
                            </div>

                            {deliveryRequestType == "DIRECT" && (
                                <Input
                                    placeholder={"직접 입력"}
                                    registration={register("deliveryRequestDirect")}
                                />
                            )}
                        </div>
                        <Input
                            label={"공동현관 비밀번호"}
                            registration={register("gatePassword")}
                        />
                    </div>

                    {/* 상품 목록 */}
                    <section>
                        <h2
                            className={twMerge(
                                ["text-lg", "font-bold", "border-b", "border-black"],
                                ["pb-3", "mb-5"],
                            )}>
                            주문 상품
                        </h2>

                        {orderItems.map(item => {
                            const product = item.product;
                            const image =product.image
                            return (
                                <div
                                    key={item.id}
                                    className={twMerge(
                                        ["flex", "items-center", "py-6"],
                                        ["border-b", "border-gray-200"],
                                    )}>
                                    <div className={twMerge(["w-full", "flex", "gap-4"])}>
                                        <div className={twMerge(["w-24", "h-28", "bg-gray-100"])}>
                                            {image && (
                                                <img
                                                    src={image}
                                                    alt={product.name}
                                                    className={twMerge([
                                                        "w-full",
                                                        "h-full",
                                                        "object-cover",
                                                    ])}
                                                />
                                            )}
                                        </div>
                                        <div
                                            className={twMerge([
                                                "flex",
                                                "flex-col",
                                                "justify-center",
                                                "gap-1",
                                            ])}>
                                            <p className={twMerge(["font-bold", "text-gray-900"])}>
                                                {product.name}
                                            </p>
                                            <p className={twMerge(["text-sm", "text-gray-500"])}>
                                                {item.quantity}개
                                            </p>
                                            <p className={twMerge(["text-sm", "font-bold"])}>
                                                {(product.price * item.quantity).toLocaleString()}원
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </section>
                </div>

                {/* 오른쪽 */}
                <div className="w-full lg:w-90 h-fit sticky top-24">
                    <div className="bg-gray-50 p-6 border border-gray-100">
                        <h3 className="font-bold text-lg mb-4 border-b border-black pb-2">
                            결제 금액
                        </h3>

                        <div className="space-y-3 text-sm mb-6">
                            <div className="flex justify-between">
                                <span className="text-gray-600">총 상품금액</span>
                                <span className="font-bold">
                                    {productsPrice.toLocaleString()}원
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">배송비</span>
                                <span className="font-bold">
                                    {shippingCost === 0
                                        ? "무료"
                                        : `+${shippingCost.toLocaleString()}원`}
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center border-t border-gray-300 pt-4 mb-6">
                            <span className="font-bold text-gray-900">최종 결제 금액</span>
                            <span className="text-2xl font-extrabold text-orange-600">
                                {finalPrice.toLocaleString()}원
                            </span>
                        </div>

                        {/* 결제 버튼 클릭 -> onSubmit -> createOrder -> openModal('PAYMENT') */}
                        <Button type="submit" fullWidth size="lg" form="order-form">
                            결제하기
                        </Button>
                    </div>
                </div>
            </form>
            {/* 🚀 전역 관리자 없이 직접 여기에 렌더링 */}
            {isOpen && modalType === "POSTCODE" && <PostcodeModal />}

            {/* 나중에 결제 모달이 필요하면 여기 추가 */}
            {isOpen && modalType === "PAYMENT" && <PaymentModal />}
        </div>
    );
}

export default OrderPage;