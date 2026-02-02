import { type FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import { IoIosAdd, IoIosCreate, IoIosTrash, IoIosSearch, IoIosImage } from "react-icons/io";
import { getProducts } from "../../api/product.api";
import { deleteProduct } from "../../api/admin.product.api";
import type { Product } from "../../types/product";
import Button from "../../components/common/Button";
import type { Pagination } from "../../types/common.ts";
import { AxiosError } from "axios";

function AdminProductList() {
    const navigate = useNavigate();

    // 상태 관리
    const [products, setProducts] = useState<Product[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // 검색 및 필터 상태
    const [page, setPage] = useState(1);
    const [keyword, setKeyword] = useState("");
    const [searchInput, setSearchInput] = useState("");

    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const response = await getProducts({
                page,
                limit: 10,
                keyword: keyword || undefined,
                sort: "latest",
            });
            setProducts(response.data);
            setPagination(response.pagination);
        } catch (error) {
            console.error("상품 로드 실패:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts().then(() => {});
    }, [page, keyword]);

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        setKeyword(searchInput);
        setPage(1); // 검색 시 첫 페이지로 이동
    };

    const handleDelete = async (id: number, name: string) => {
        if (!window.confirm(`[${name}] 상품을 정말 삭제하시겠습니까?`)) return;
        try {
            await deleteProduct(id);
            alert("삭제되었습니다.");
            fetchProducts().then(() => {});
        } catch (error) {
            let message = "삭제 실패";
            if (error instanceof AxiosError) message = error.response?.data.message;
            alert(message);
        }
    };

    return (
        <div className="space-y-6">
            {/* 상단 헤더 & 검색바 */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">상품 관리</h2>
                    <p className="text-sm text-gray-500">등록된 모든 상품을 조회하고 관리합니다.</p>
                </div>
                <Link to="/admin/products/create">
                    <Button className="bg-[#772b8f] hover:bg-[#5e2271] text-white flex items-center gap-1 shadow-md shadow-purple-100">
                        <IoIosAdd className="w-6 h-6" /> 새 상품 등록
                    </Button>
                </Link>
            </div>

            {/* 필터 영역 */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap items-center gap-4">
                <form onSubmit={handleSearch} className="flex-1 min-w-75 relative">
                    <input
                        type="text"
                        placeholder="상품명으로 검색..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="w-full h-11 pl-11 pr-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#772b8f] focus:border-transparent transition-all text-sm"
                    />
                    <IoIosSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <button type="submit" className="hidden">
                        검색
                    </button>
                </form>
            </div>

            {/* 상품 테이블 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-[12px] font-bold text-gray-500 uppercase tracking-wider">
                            <th className="px-6 py-4 w-20 text-center">ID</th>
                            <th className="px-6 py-4">상품 정보</th>
                            <th className="px-6 py-4">카테고리</th>
                            <th className="px-6 py-4">가격</th>
                            <th className="px-6 py-4">태그</th>
                            <th className="px-6 py-4 text-center">관리</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {isLoading ? (
                            <tr>
                                <td colSpan={6} className="py-20 text-center text-gray-400">
                                    로딩 중...
                                </td>
                            </tr>
                        ) : products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-center text-sm font-mono text-gray-400">
                                        {product.id}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden border border-gray-100 shrink-0">
                                                {product.image ? (
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                        <IoIosImage />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-800 text-sm">
                                                    {product.name}
                                                </span>
                                                <span className="text-xs text-gray-400 truncate max-w-50">
                                                    {product.description}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-purple-50 text-[#772b8f] text-[11px] font-bold rounded-md">
                                            {product.category?.name || "미지정"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-sm text-gray-700">
                                        {product.price.toLocaleString()}원
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-1">
                                            {product.isNew && (
                                                <span
                                                    className="w-2 h-2 rounded-full bg-blue-400"
                                                    title="신상품"
                                                />
                                            )}
                                            {product.isBest && (
                                                <span
                                                    className="w-2 h-2 rounded-full bg-red-400"
                                                    title="베스트"
                                                />
                                            )}
                                            {product.onePlus && (
                                                <span
                                                    className="w-2 h-2 rounded-full bg-[#8cc740]"
                                                    title="1+1"
                                                />
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() =>
                                                    navigate(`/admin/products/edit/${product.id}`)
                                                }
                                                className="p-2 text-gray-400 hover:text-[#772b8f] hover:bg-purple-50 rounded-lg transition-all"
                                            >
                                                <IoIosCreate className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(product.id, product.name)
                                                }
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                            >
                                                <IoIosTrash className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="py-20 text-center text-gray-400">
                                    등록된 상품이 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* 페이지네이션 */}
                {pagination && pagination.totalPages > 1 && (
                    <div className="p-6 border-t border-gray-100 flex justify-center gap-2">
                        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={twMerge(
                                    "w-8 h-8 rounded-lg text-sm font-medium transition-all",
                                    page === p
                                        ? "bg-[#772b8f] text-white shadow-md shadow-purple-100"
                                        : "text-gray-400 hover:bg-gray-100",
                                )}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminProductList;
