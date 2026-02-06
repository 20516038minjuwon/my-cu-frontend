import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router";
import useAuthStore from "../../stores/useAuthStore.ts";
import type { CategoryTreeResponse } from "../../types/category.ts";
import type { Product, ProductListQuery } from "../../types/product.ts";
import { getProducts } from "../../api/product.api.ts";
import { getCategoryById } from "../../api/category.api.ts";

function AllProduct() {
    const { id } = useParams(); // URL 파라미터 (대분류 ID)
    const { isLoggedIn } = useAuthStore();

    const [loading, setLoading] = useState(true);
    // 1. 현재 대분류와 그 자식들(children)을 담을 상태
    const [category, setCategory] = useState<CategoryTreeResponse | null>(null);
    // 2. 서버에서 받아온 전체 상품 목록
    const [products, setProducts] = useState<Product[]>([]);

    // 필터 관련 state
    const [selectedSubId, setSelectedSubId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    // [useEffect 1] 카테고리 상세 정보 요청
    useEffect(() => {
        const fetchCategoryInfo = async () => {
            if (!id) return;
            try {
                // 특정 ID의 카테고리 정보를 가져와서 set (children 포함)
                const result = await getCategoryById(Number(id));
                setCategory(result);

                // 새로운 대분류로 이동했으므로 소분류 선택과 검색어 초기화
                setSelectedSubId(null);
                setSearchTerm("");
            } catch (e) {
                console.error("카테고리 요청 실패:", e);
            }
        };
        fetchCategoryInfo().then(()=>{});
    }, [id]); // URL의 id가 바뀔 때마다 실행


    // [useEffect 2] 상품 목록 요청
    useEffect(() => {
        const fetchProductList = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const params: ProductListQuery = {
                    page: 1,
                    limit: 100, // 전체를 가져와서 프론트에서 필터링하거나 서버 페이징 처리
                    categoryId: Number(id),
                };
                const result = await getProducts(params);
                setProducts(result.data);
            } catch (e) {
                console.error("상품 요청 실패:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchProductList().then(()=>{});
    }, [id]); // URL의 id가 바뀔 때마다 실행


    // [로직] 실시간 필터링 (소분류 선택 + 검색어)
    const filteredProducts = useMemo(() => {
        return products.filter((p) => {
            // 소분류가 선택되지 않았으면(null) 전체 통과, 선택됐으면 ID 비교
            const isSubMatch = !selectedSubId || p.categoryId === selectedSubId;
            // 검색어가 포함되어 있는지 확인
            const isNameMatch = p.name.toLowerCase().includes(searchTerm.toLowerCase());

            return isSubMatch && isNameMatch;
        });
    }, [products, selectedSubId, searchTerm]);


    if (!isLoggedIn) return <div>로그인이 필요합니다.</div>;

    return (
        <div style={{ display: 'flex', gap: '30px', padding: '20px' }}>
            {/* 메인 콘텐츠 영역 */}
            <main style={{ flex: 1 }}>
                {/* 1차 카테고리 제목 */}
                <h2>{category?.name}</h2>

                {/* 2차 카테고리 탭 (category.children 사용) */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <button
                        onClick={() => setSelectedSubId(null)}
                        style={tabStyle(selectedSubId === null)}
                    >
                        전체
                    </button>
                    {category?.children?.map((sub) => (
                        <button
                            key={sub.id}
                            onClick={() => setSelectedSubId(sub.id)}
                            style={tabStyle(selectedSubId === sub.id)}
                        >
                            {sub.name}
                        </button>
                    ))}
                </div>

                {/* 검색창 */}
                <div style={{ marginBottom: '20px', padding: '10px', background: '#f5f5f5' }}>
                    <label>검색 </label>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="상품명을 입력하세요"
                    />
                </div>

                {/* 상품 그리드 */}
                {loading ? (
                    <div>로딩 중...</div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                        {filteredProducts.map((product) => (
                            <div key={product.id} style={{ border: '1px solid #ddd', padding: '10px' }}>
                                {/* 상품 카드 내용: 이미지, 이름, 가격 등 */}
                                <div style={{ fontWeight: 'bold' }}>{product.name}</div>
                                <div>{product.price.toLocaleString()}원</div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

// 간단한 스타일 헬퍼
const tabStyle = (isActive: boolean) => ({
    padding: '8px 16px',
    borderRadius: '20px',
    cursor: 'pointer',
    backgroundColor: isActive ? '#6d2da8' : '#fff',
    color: isActive ? '#fff' : '#333',
    border: '1px solid #ccc'
});

export default AllProduct;