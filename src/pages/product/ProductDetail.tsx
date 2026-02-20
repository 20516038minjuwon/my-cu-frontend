import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getProductById } from "../../api/product.api.ts";
import type { Product } from "../../types/product.ts";
import { useCartStore } from "../../stores/useCartStore.ts";
import useAuthStore from "../../stores/useAuthStore.ts";
import { twMerge } from "tailwind-merge";
import useOrderStore from "../../stores/useOrderStore.ts";
import type { CartItem } from "../../types/cart.ts";

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {addItem}=useCartStore();
    const{isLoggedIn}=useAuthStore();
    const { setOrderItems } = useOrderStore();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1); // 수량 상태

    useEffect(() => {
        const fetchDetail = async () => {
            if (!id) return;
            try {
                const data = await getProductById(Number(id));
                setProduct(data);
            } catch (e) {
                console.log("상세 로드 실패:", e);
                alert("존재하지 않는 상품입니다.");
                navigate(-1);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail().then(()=>{});
    }, [id]);

    // 수량 조절 핸들러
    const handleQuantity = (type: 'plus' | 'minus') => {
        if (type === 'plus') setQuantity(prev => prev + 1);
        else setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };

    // 장바구니 담기 클릭
    const handleAddToCart = async () => {
        if(!isLoggedIn){
            const confirmLogin =window.confirm("로그인이 필요한 서비스 입니다. 로그인 페이지로 이동하시겠습니까 ?");
            if(!confirmLogin){
                navigate("/login");
            }
            return;
        }
        if(!product)return null;
        try{
            await addItem(product.id, quantity);
            if(window.confirm("장바구니에 상품을 담았습니다. 장바구니로 이동하시겠습니까 ?")){
                navigate("/cart")
                alert(`${product.name} ${quantity}개가 장바구니에 담겼습니다.`)
            }
        }catch (e){
            console.log(e);
            alert("장바구니 담기에 실패하였습니다.")
        }
    }

    // 바로 구매하기 클릭
    const handleBuyNow = () => {
        if(!isLoggedIn){
            const confirmLogin=window.confirm("로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까 ?");
            if(!confirmLogin){
                navigate("/login");
            }
            return;
        }
        if (!product) return;

        const directOrderItem: CartItem = {
            id: -1,
            quantity: quantity,
            totalPrice: product.price * quantity,
            product: {
                id: product.id,
                image: product.image,
                name: product.name,
                price: product.price,
            }
        };

        // 2. OrderStore에 배열 형태로 저장 (OrderPage는 배열을 받으므로)
        setOrderItems([directOrderItem]);

        // 3. 페이지 이동
        console.log("CU 주문 정보 저장 완료:", directOrderItem);
        navigate("/order");
    };

    if (loading) return <div className={"py-40 text-center"}>Loading...</div>;
    if (!product) return <div className={"py-40 text-center"}>상품 정보가 없습니다.</div>;

    const totalPrice = product.price * quantity;

    return (
        <div className="max-w-[1200px] mx-auto px-5 py-16">
            <div className="flex flex-col md:flex-row gap-16">
                {/* 왼쪽: 상품 이미지 영역 */}
                <div className="flex-1 shrink-0">
                    <div className="aspect-square border border-gray-100 rounded-2xl overflow-hidden bg-[#f9f9f9] sticky top-8">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </div>

                {/* 오른쪽: 상품 정보 및 구매 영역 */}
                <div className="flex-1 flex flex-col pt-4">
                    <div className= "pb-6">
                        <h1 className="text-4xl font-black mt-2 leading-tight text-gray-900">{product.name}</h1>
                        <p className="text-3xl font-bold mt-6">{product.price.toLocaleString()}원</p>
                        <p className={twMerge(['text-sm','text-gray-500','mt-10'])}>{product.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4 border-b-2 border-gray-900 pb-6">
                        {product.isNew && (
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full border border-green-200">NEW</span>
                        )}
                        {product.isBest && (
                            <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full border border-orange-200">BEST</span>
                        )}
                        {product.onePlus && (
                            <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full border border-red-200">1 + 1</span>
                        )}
                        {product.twoPlus && (
                            <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-bold rounded-full border border-blue-200">2 + 1</span>
                        )}
                    </div>

                    {/* 부가 정보 영역 */}
                    <div className="py-8 flex flex-col gap-4 text-sm border-b">
                        <div className="flex justify-between">
                            <span className="text-gray-500 w-24">배송안내</span>
                            <span className="flex-1 text-gray-800 font-medium">편의점 픽업 가능 / 당일 배송 제외</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 w-24">포인트적립</span>
                            <span className="flex-1 text-gray-800 font-medium">CU 멤버십 0.1% 적립</span>
                        </div>
                    </div>

                    {/* 수량 선택 박스 */}
                    <div className="bg-gray-50 p-6 rounded-xl my-8">
                        <div className="flex justify-between items-center mb-6">
                            <span className="font-bold text-gray-700">수량 선택</span>
                            <div className="flex items-center bg-white border border-gray-200 rounded-md overflow-hidden">
                                <button onClick={() => handleQuantity('minus')} className="px-4 py-2 hover:bg-gray-100 transition-colors">-</button>
                                <span className="px-6 py-2 font-bold min-w-[50px] text-center">{quantity}</span>
                                <button onClick={() => handleQuantity('plus')} className="px-4 py-2 hover:bg-gray-100 transition-colors">+</button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                            <span className="font-bold text-lg text-gray-900">총 합계 금액</span>
                            <span className="text-3xl font-black text-purple-600">
                                {totalPrice.toLocaleString()}원
                            </span>
                        </div>
                    </div>

                    {/* 버튼 그룹 */}
                    <div className="flex gap-3 h-16">
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 border-2 border-purple-600 text-purple-600 font-black rounded-lg hover:bg-purple-50 transition-all text-lg"
                        >
                            장바구니 담기
                        </button>
                        <button
                            onClick={handleBuyNow}
                            className="flex-1 bg-[#6d39af] text-white font-black rounded-lg hover:bg-[#5a2f91] transition-all text-lg shadow-lg shadow-purple-100"
                        >
                            바로 구매하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;