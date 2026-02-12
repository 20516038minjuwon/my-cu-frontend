import { useEffect, useState, useMemo, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router";
import useAuthStore from "../../stores/useAuthStore.ts";
import type { CategoryTreeResponse, CategoryDetailResponse } from "../../types/category.ts";
import type { Product } from "../../types/product.ts";
import { getProducts } from "../../api/product.api.ts";
import { getCategoryById, getCategories } from "../../api/category.api.ts";
import ProductCard from "../common/product/ProductCard.tsx";
import { twMerge } from "tailwind-merge";
import Button from "../common/Button.tsx";

function AllProduct() {
    const [searchParams] = useSearchParams();
    const { isLoggedIn } = useAuthStore();
    const id = searchParams.get("categoryId") || "1";
    const urlKeyword = searchParams.get("keyword")

    const [loading, setLoading] = useState(true);
    const [mainCategories, setMainCategories] = useState<CategoryTreeResponse[]>([]);
    const [currentCategory, setCurrentCategory] = useState<CategoryDetailResponse | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [visibleCount, setVisibleCount] = useState(16);
    const [selectedSubId, setSelectedSubId] = useState<number | null>(null);
    const [keyword, setKeyword] = useState(urlKeyword || "");
    const [searchQuery, setSearchQuery] = useState("");

    // [1] 초기 로드: 1차 카테고리 목록 가져오기
    useEffect(() => {
        const fetchMainCategories = async () => {
            try {
                const data = await getCategories();
                setMainCategories(data);
            } catch (e) {
                console.error("1차 카테고리 로드 실패:", e);
            }
        };
        fetchMainCategories().then(() => {});
    }, []);

    useEffect(() => {
        setSelectedSubId(null);
        setKeyword("");
        setSearchQuery("");
    }, [id]);

    const fetchData = async () => {
        setLoading(true);
        try {
            // 1. 카테고리 상세 정보 가져오기 (자식 카테고리 목록 포함)
            const categoryDetail: CategoryDetailResponse = await getCategoryById(Number(id));
            setCurrentCategory(categoryDetail);

            let productList: Product[];

            // 2. 상품 데이터 가져오기 로직
            if (selectedSubId) {
                // [특정 소분류 선택 시] 해당 소분류 상품만 요청
                const res = await getProducts({
                    page: 1,
                    limit: 100,
                    categoryId: selectedSubId,
                    keyword: keyword,
                });
                productList = res.data;
            } else {
                // [전체 탭 선택 시] 모든 소분류 ID에 대해 각각 요청하여 합치기
                const childrenIds = categoryDetail.children?.map((child) => child.id) || [];

                if (childrenIds.length > 0) {
                    // 모든 소분류의 요청을 동시에 보냄
                    const requests = childrenIds.map((childId) =>
                        getProducts({ page: 1, limit: 50, categoryId: childId, keyword: keyword }),
                    );
                    const responses = await Promise.all(requests);

                    // 모든 응답의 데이터를 하나의 배열로 합침 (flat)
                    productList = responses.flatMap((res) => res.data);
                } else {
                    // 자식이 없는 경우 대분류 ID로 직접 요청
                    const res = await getProducts({
                        page: 1,
                        limit: 8,
                        categoryId: Number(id),
                    });
                    productList = res.data;
                }
            }
            setVisibleCount(16);
            setProducts(productList);
        } catch (e) {
            console.error("데이터 로드 실패:", e);
        } finally {
            setLoading(false);
        }
    };

    // [2] ID 변경 시: 카테고리 상세 정보 및 상품 목록 가져오기
    useEffect(() => {
        fetchData().then(() => {});
    }, [id, selectedSubId]);

    // [3] 필터링 로직
    const filteredProducts = useMemo(() => {
        return products.filter((p) => {
            if (!selectedSubId) return true;
            const isSubMatch = !selectedSubId || p.categoryId === selectedSubId;
            const isNameMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
            return isSubMatch && isNameMatch;
        });
    }, [products, selectedSubId, searchQuery]);

    const displayProducts = useMemo(() => {
        return filteredProducts.slice(0, visibleCount);
    }, [filteredProducts, visibleCount]);

    const handleSearch=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setSearchQuery(keyword.trim());
        setVisibleCount(16);
        fetchData().then(() => {});
    }

    const handleShowMore = () => {
        setVisibleCount((prev) => prev + 16);
    };

    if (!isLoggedIn)
        return <div className="p-20 text-center text-gray-500">로그인이 필요합니다.</div>;
    return (
        <div className="max-w-[1200px] mx-auto flex gap-10 p-8">
            {/* 1차 카테고리 */}
            <aside className="w-48 shrink-0">
                <div className="flex flex-col gap-1">
                    {mainCategories.map((cat) => (
                        <Link
                            key={cat.id}
                            to={`/productService?tab=allProduct&categoryId=${cat.id}`}
                            className={twMerge(
                                "px-4 py-3 text-[16px] transition-colors rounded-sm",
                                Number(id) === cat.id
                                    ? "bg-[#6d39af] text-white font-bold" // CU 테마색 예시
                                    : "text-gray-600 hover:bg-gray-50 hover:text-purple-600",
                            )}
                        >
                            {cat.name}
                        </Link>
                    ))}
                </div>
            </aside>

            {/* 메인 영역 */}
            <main className="flex-1">
                <h3 className="text-3xl font-bold mb-8 text-center">{currentCategory?.name}</h3>
                {/* 2차 카테고리 */}
                <div className="flex flex-wrap justify-center gap-2 mb-10 pb-6 border-b">
                    <button
                        onClick={() => setSelectedSubId(null)}
                        className={twMerge(
                            "px-6 py-2 rounded-full border text-sm font-medium",
                            selectedSubId === null
                                ? "bg-slate-800 text-white border-slate-800"
                                : "bg-white text-gray-500 border-gray-300",
                        )}
                    >
                        전체
                    </button>
                    {currentCategory?.children?.map((sub) => (
                        <button
                            key={sub.id}
                            onClick={() => setSelectedSubId(sub.id)}
                            className={twMerge(
                                "px-6 py-2 rounded-full border text-sm font-medium",
                                selectedSubId === sub.id
                                    ? "bg-purple-600 text-white border-purple-600"
                                    : "bg-white text-gray-500 border-gray-300",
                            )}
                        >
                            {sub.name}
                        </button>
                    ))}
                </div>

                {/* 검색 바 */}
                <form onSubmit={handleSearch} className="bg-gray-100 p-8 rounded-lg mb-12 flex justify-center items-center gap-3">
                    <div className="flex bg-white border border-gray-300 rounded-md overflow-hidden w-full max-w-lg">
                        <span className="px-4 py-3 bg-gray-50 text-gray-500 border-r text-sm">
                            상품명
                        </span>
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="찾으시는 상품을 입력하세요"
                            className="flex-1 px-4 outline-none text-sm"
                        />
                    </div>
                    <Button
                        type={"submit"}
                        variant="primary"
                        className="h-full px-8 py-3 bg-purple-600 hover:bg-purple-700"
                    >
                        검색
                    </Button>
                </form>

                {/* 상품 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {displayProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/*  더보기 */}
                {filteredProducts.length > visibleCount && (
                    <div className="flex justify-center mt-12">
                        <button
                            onClick={handleShowMore}
                            className={twMerge(
                                ["flex", "items-center", "justify-center", "gap-2"],
                                ["px-10", "py-4", "border", "border-gray-300", "rounded-full"],
                                [" font-bold", " text-gray-700"],
                                ["hover:bg-gray-50", "transition-colors"],
                            )}
                        >
                            더보기
                            <span className="text-purple-600">
                                ({displayProducts.length}/{filteredProducts.length})
                            </span>
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1 4L6 9L11 4"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                )}
                {!loading && filteredProducts.length === 0 && (
                    <div className="py-20 text-center text-gray-400">상품이 존재하지 않습니다.</div>
                )}
            </main>
        </div>
    );
}

export default AllProduct;
