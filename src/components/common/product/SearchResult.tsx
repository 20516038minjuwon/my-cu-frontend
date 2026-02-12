import ProductCard from "./ProductCard.tsx";
import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../../../api/product.api.ts";
import { useSearchParams } from "react-router";
import type { Product } from "../../../types/product.ts";
import { twMerge } from "tailwind-merge";

function SearchResult() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || ""; // URL에서 q=검색어 가져오기

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(16);

    useEffect(() => {
        const fetchSearchResults = async () => {
            setLoading(true);
            try {
                const res = await getProducts({
                    page: 1,
                    limit: 20,
                    keyword: query,
                });
                setProducts(res.data);
                setVisibleCount(16);
            } catch (e) {
                console.error("검색 로드 실패:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchSearchResults().then(() => {});
    }, [query]);

    const displayProducts = useMemo(() => {
        return products.slice(0, visibleCount);
    }, [products, visibleCount]);

    const handleShowMore = () => setVisibleCount((prev) => prev + 16);

    return (
        <div className={twMerge(["max-w-[1200px]", "mx-auto", "p-8"])}>
            <header className={"mb-12 border-b pb-8"}>
                <h2 className="text-3xl font-black text-center">
                    '<span className="text-purple-600">{query}</span>' 검색 결과
                </h2>
                <p className="text-center text-gray-500 mt-2">
                    총 <span className="font-bold">{products.length}</span>개의 상품이
                    검색되었습니다.
                </p>
            </header>

            {!loading && products.length > 0 ? (
                <>
                    {/* 상품 */}
                    <div
                        className={twMerge([
                            "grid",
                            "grid-cols-1",
                            "sm:grid-cols-2",
                            "md:grid-cols-3",
                            "lg:grid-cols-4",
                            "gap-6",
                        ])}
                    >
                        {displayProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {/* 더 보기 */}
                    {products.length > visibleCount && (
                        <div className="flex justify-center mt-12">
                            <button
                                onClick={handleShowMore}
                                className={twMerge(
                                    ["px-10", "py-4", "border", "border-gray-300"],
                                    ["rounded-full", "font-bold", "text-gray-700"],
                                    ["hover:bg-gray-50", "transition-colors"],
                                )}
                            >
                                검색 결과 더보기 ({displayProducts.length}/{products.length})
                            </button>
                        </div>
                    )}
                </>
            ) : (
                !loading && (
                    <div className="py-32 text-center">
                        <p className="text-7xl mb-6">🔍</p>
                        <h3 className="text-2xl font-bold text-gray-800">
                            죄송합니다. 찾으시는 상품이 없습니다.
                        </h3>
                        <p className="text-gray-500 mt-3 text-lg">
                            단어의 철자가 정확한지 확인하시거나, 다른 검색어를 입력해 보세요.
                        </p>
                    </div>
                )
            )}
        </div>
    );
}
export default SearchResult;
