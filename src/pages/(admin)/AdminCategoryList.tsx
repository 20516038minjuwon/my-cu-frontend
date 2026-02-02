import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import {
    IoIosAdd,
    IoIosCreate,
    IoIosTrash,
    IoIosArrowForward,
    IoIosArrowDown,
} from "react-icons/io";
import { getCategories } from "../../api/category.api";
import { deleteCategory } from "../../api/admin.category.api";
import type { CategoryTreeResponse } from "../../types/category";
import Button from "../../components/common/Button";
import { AxiosError } from "axios";

function AdminCategoryList() {
    const [categories, setCategories] = useState<CategoryTreeResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
    const navigate = useNavigate();

    // 데이터 로드
    const fetchCategories = async () => {
        try {
            setIsLoading(true);
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error("카테고리 로딩 실패:", error);
            alert("카테고리 목록을 불러오는데 실패했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories().then(() =>{});
    }, []);

    // 트리 토글 로직
    const toggleExpand = (id: number) => {
        const newExpanded = new Set(expandedIds);
        if (newExpanded.has(id)) newExpanded.delete(id);
        else newExpanded.add(id);
        setExpandedIds(newExpanded);
    };

    // 삭제 로직
    const handleDelete = async (id: number, name: string) => {
        if (
            !window.confirm(
                `[${name}] 카테고리를 삭제하시겠습니까?\n하위 카테고리나 상품이 있으면 삭제되지 않습니다.`,
            )
        )
            return;

        try {
            await deleteCategory(id);
            alert("삭제되었습니다.");
            fetchCategories().then(() => {}); // 목록 새로고침
        } catch (error) {
            let message = "삭제에 실패했습니다.";
            if (error instanceof AxiosError) message = error.response?.data.message;
            alert(message);
        }
    };

    // 재귀적 트리 렌더링 함수
    const renderCategoryRow = (category: CategoryTreeResponse, depth = 0) => {
        const hasChildren = category.children && category.children.length > 0;
        const isExpanded = expandedIds.has(category.id);

        return (
            <div key={category.id} className="flex flex-col">
                <div
                    className={twMerge(
                        "flex items-center justify-between py-3 px-4 border-b border-gray-100 hover:bg-gray-50 transition-colors",
                        depth > 0 && "bg-white",
                    )}
                >
                    <div
                        className="flex items-center gap-2"
                        style={{ paddingLeft: `${depth * 24}px` }}
                    >
                        {hasChildren ? (
                            <button
                                onClick={() => toggleExpand(category.id)}
                                className="p-1 hover:bg-gray-200 rounded"
                            >
                                {isExpanded ? <IoIosArrowDown /> : <IoIosArrowForward />}
                            </button>
                        ) : (
                            <div className="w-6" /> // 아이콘 공간 확보
                        )}
                        <span
                            className={twMerge(
                                "text-sm",
                                depth === 0 ? "font-bold text-gray-800" : "text-gray-600",
                            )}
                        >
                            {category.name}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">
                            ID: {category.id}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-2 border-gray-200 text-gray-600 hover:text-[#772b8f]"
                            onClick={() => navigate(`/admin/categories/edit/${category.id}`)}
                        >
                            <IoIosCreate className="w-4 h-4 mr-1" /> 수정
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-2 border-gray-200 text-gray-600 hover:text-red-500 hover:border-red-200"
                            onClick={() => handleDelete(category.id, category.name)}
                        >
                            <IoIosTrash className="w-4 h-4 mr-1" /> 삭제
                        </Button>
                    </div>
                </div>

                {/* 자식 노드 렌더링 */}
                {hasChildren && isExpanded && (
                    <div className="flex flex-col">
                        {category.children!.map((child) => renderCategoryRow(child, depth + 1))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">전체 카테고리 구조</h3>
                    <p className="text-sm text-gray-500 mt-1">
                        상품 분류 체계를 관리하고 계층을 구성합니다.
                    </p>
                </div>
                <Link to="/admin/categories/create">
                    <Button className="bg-[#772b8f] hover:bg-[#5e2271] text-white flex items-center gap-1 shadow-md shadow-purple-100">
                        <IoIosAdd className="w-6 h-6" /> 새 카테고리 추가
                    </Button>
                </Link>
            </div>

            <div className="min-h-100">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#772b8f] mb-4"></div>
                        <p>데이터를 불러오는 중입니다...</p>
                    </div>
                ) : categories.length > 0 ? (
                    <div className="flex flex-col">
                        {/* 헤더 컬럼명 (선택사항) */}
                        <div className="flex items-center justify-between py-2 px-6 bg-gray-50 border-b border-gray-200 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                            <span>카테고리명</span>
                            <span>관리 도구</span>
                        </div>
                        {categories.map((cat) => renderCategoryRow(cat))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-400">등록된 카테고리가 없습니다.</p>
                        <Link
                            to="/admin/categories/create"
                            className="text-[#772b8f] text-sm font-bold mt-2 inline-block underline"
                        >
                            첫 번째 카테고리 만들기
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminCategoryList;
