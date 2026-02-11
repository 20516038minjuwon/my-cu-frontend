import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import type { Product } from "../../types/product.ts";
import { getProducts } from "../../api/product.api.ts";
import { twMerge } from "tailwind-merge";
import ProductCard from "../common/product/ProductCard.tsx";

function PromotionProduct() {
    const [searchParams, setSearchParams] = useSearchParams();
    // URL 파라미터로 행사 타입을 관리합니다 (?type=all, ?type=onePlus, ?type=twoPlus)
    const promotionType = searchParams.get("type") || "all";

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPromotionProducts = async () => {
            setLoading(true);
            try {
                // 1. 일단 데이터를 가져옵니다.
                const res = await getProducts({ page: 1, limit: 100 });
                const allData = res.data;

                // 2. [핵심] 행사 상품이 아닌 것들은 기본적으로 제외합니다.
                // onePlus이거나 twoPlus인 상품만 남깁니다.
                const filteredList = allData.filter(p => {
                    const isPromotion = p.onePlus || p.twoPlus; // 일단 행사 상품이어야 함
                    if (promotionType === "onePlus") return p.onePlus;
                    if (promotionType === "twoPlus") return p.twoPlus;
                    return isPromotion;
                });

                setProducts(filteredList);
            } catch (e) {
                console.log("행사 상품 로드 실패:",e);
            } finally {
                setLoading(false);
            }
        };
        fetchPromotionProducts().then(() => {});
    }, [promotionType]);

    if (loading)
        return <div className={twMerge(["text-center", "text-gray-500"])}>로딩 중 ...</div>;

    return (
        <div className="max-w-[1200px] mx-auto flex gap-10 p-8">
            {/* 왼쪽 사이드바: 행사 카테고리 */}
            <aside className="w-48 shrink-0">
                <ul className="flex flex-col gap-4">
                    {["all", "onePlus", "twoPlus"].map((type) => (
                        <li
                            key={type}
                            onClick={() => setSearchParams({ type })}
                            className={twMerge([
                                "px-4 py-3 text-[16px] transition-colors rounded-sm",
                                promotionType === type
                                    ? "bg-[#6d39af] text-white font-bold"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-purple-600",
                            ])}
                        >
                            {type === "all" ? "전체" : type === "onePlus" ? "1+1" : "2+1"}
                        </li>
                    ))}
                </ul>
            </aside>

            {/* 오른쪽: 상품 그리드 */}
            <main className="flex-1">
                <div className="grid grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </main>
        </div>
    );
}
export default PromotionProduct;
