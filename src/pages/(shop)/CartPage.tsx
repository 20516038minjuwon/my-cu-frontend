import { twMerge } from "tailwind-merge";
import useAuthStore from "../../stores/useAuthStore.ts";
import { useCartStore } from "../../stores/useCartStore.ts";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function CartPage() {
    const navigate = useNavigate();
    const { items, loading, fetchCart, updateQuantity, removeItem, getTotalPrice } = useCartStore();
    const { isLoggedIn } = useAuthStore();

    useEffect(() => {
        fetchCart().then(() => {});
    }, [fetchCart]);


    if (loading && items.length === 0) {
        return (
            <div className={twMerge("py-40 text-center text-lg")}>
                장바구니를 불러오는 중입니다...
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className={twMerge("py-40 text-center")}>
                <p className="text-gray-500 mb-4">장바구니에 담긴 상품이 없습니다.</p>
                <button
                    onClick={() => navigate("/productService")}
                    className="bg-black text-white px-6 py-2 rounded-md"
                >
                    쇼핑하러 가기
                </button>
            </div>
        );
    }

    const shippingCost = getTotalPrice() >= 30000 ? 0 : 3000;
    const finalTotalPrice = getTotalPrice() + shippingCost;

    const handleOrder = () => {
        if (!isLoggedIn) {
            alert("로그인이 필요합니다.");
            navigate("/login");
            return;
        }
        navigate("/order");
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-8">장바구니</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* 왼쪽: 상품 리스트 */}
                <div className="lg:col-span-2">
                    <div className="border-t border-gray-200">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center py-6 border-b border-gray-100"
                            >
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-24 h-24 object-cover rounded-md"
                                />
                                <div className="ml-6 flex-1">
                                    <h3 className="font-medium text-gray-900">
                                        {item.product.name}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {(item.product.price?? 0).toLocaleString()}원
                                    </p>

                                    <div className="flex items-center mt-4">
                                        <div className="flex border border-gray-300 rounded-md">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.id, item.quantity - 1)
                                                }
                                                className="px-3 py-1 hover:bg-gray-50"
                                            >
                                                -
                                            </button>
                                            <span className="px-3 py-1 border-x border-gray-300 w-10 text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.id, item.quantity + 1)
                                                }
                                                className="px-3 py-1 hover:bg-gray-50"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="ml-4 text-sm text-red-500 hover:underline"
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </div>
                                <div className="text-right font-semibold text-gray-900">
                                    {(item.product.price * item.quantity).toLocaleString()}원
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 오른쪽: 주문 요약 (Sticky) */}
                <div className="lg:col-span-1">
                    <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
                        <h2 className="text-lg font-semibold mb-4">주문 요약</h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">총 상품 금액</span>
                                <span>{getTotalPrice().toLocaleString()}원</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">배송비</span>
                                <span>
                                    {shippingCost === 0
                                        ? "무료"
                                        : `+${shippingCost.toLocaleString()}원`}
                                </span>
                            </div>
                            {shippingCost > 0 && (
                                <p className="text-xs text-blue-500 text-right">
                                    {(30000 - getTotalPrice()).toLocaleString()}원 더 담으면
                                    무료배송!
                                </p>
                            )}
                            <div className="border-t border-gray-200 pt-3 flex justify-between text-base font-bold text-gray-900">
                                <span>총 결제 예정 금액</span>
                                <span className="text-orange-600">
                                    {finalTotalPrice.toLocaleString()}원
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={handleOrder}
                            className="w-full mt-6 bg-black text-white py-3 rounded-md font-bold hover:bg-gray-800 transition-colors"
                        >
                            주문하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;
