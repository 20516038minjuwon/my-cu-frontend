import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { IoIosArrowBack, IoIosSave } from "react-icons/io";
import { getCategories, getCategoryById } from "../../api/category.api";
import { updateCategory } from "../../api/admin.category.api";
import type { CategoryTreeResponse } from "../../types/category";
import type { UpdateCategoryInput } from "../../types/admin.category";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { AxiosError } from "axios";

function AdminCategoryEdit() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const categoryId = Number(id);

    const [flatCategories, setFlatCategories] = useState<
        { id: number; name: string; depth: number }[]
    >([]);
    const [isLoading, setIsLoading] = useState(true);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<UpdateCategoryInput>();

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setIsLoading(true);
                // 1. 전체 카테고리 목록 로드 (부모 선택용)
                const treeData = await getCategories();
                const flattened: { id: number; name: string; depth: number }[] = [];

                const traverse = (nodes: CategoryTreeResponse[], depth: number) => {
                    nodes.forEach((node) => {
                        // 자기 자신은 부모가 될 수 없으므로 목록에서 제외하거나 비활성화 처리 가능
                        // 여기서는 일단 목록에는 넣되, UI나 검증에서 처리
                        flattened.push({ id: node.id, name: node.name, depth });
                        if (node.children && node.children.length > 0) {
                            traverse(node.children, depth + 1);
                        }
                    });
                };
                traverse(treeData, 0);
                setFlatCategories(flattened);

                // 2. 현재 수정할 카테고리 정보 로드
                const currentCategory = await getCategoryById(categoryId);
                reset({
                    name: currentCategory.name,
                    parentId: currentCategory.parentId,
                });
            } catch (error) {
                console.error("데이터 로드 실패", error);
                alert("카테고리 정보를 불러올 수 없습니다.");
                navigate("/admin/categories");
            } finally {
                setIsLoading(false);
            }
        };

        if (categoryId) loadInitialData();
    }, [categoryId, reset, navigate]);

    const onSubmit = async (data: UpdateCategoryInput) => {
        try {
            const submitData = {
                ...data,
                parentId: data.parentId ? Number(data.parentId) : null,
            };

            // 클라이언트 사이드 검증: 자기 자신을 부모로 선택했는지 확인
            if (submitData.parentId === categoryId) {
                setError("parentId", {
                    message: "자기 자신을 상위 카테고리로 설정할 수 없습니다.",
                });
                return;
            }

            await updateCategory(categoryId, submitData);
            alert("카테고리 정보가 수정되었습니다.");
            navigate("/admin/categories");
        } catch (e) {
            if (e instanceof AxiosError) {
                const message = e.response?.data?.message || "수정에 실패했습니다.";
                setError("root", { message });
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#772b8f] mb-4"></div>
                <p>카테고리 정보를 불러오는 중...</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <IoIosArrowBack className="w-6 h-6 text-gray-600" />
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">카테고리 수정</h2>
                    <p className="text-sm text-gray-500">
                        기존 카테고리의 이름이나 위치를 변경합니다.
                    </p>
                </div>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col gap-6"
            >
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">카테고리명</label>
                    <Input
                        placeholder="카테고리명 입력"
                        error={errors.name}
                        registration={register("name", {
                            required: "카테고리명은 필수입니다.",
                        })}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">상위 카테고리</label>
                    <select
                        {...register("parentId")}
                        className={twMerge(
                            "w-full h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#772b8f] focus:border-transparent transition-all appearance-none bg-white",
                            "text-sm text-gray-700",
                            errors.parentId && "border-red-500 ring-red-100",
                        )}
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 1rem center",
                            backgroundSize: "1.5em",
                        }}
                    >
                        <option value="">없음 (1차 카테고리)</option>
                        {flatCategories.map((cat) => (
                            <option
                                key={cat.id}
                                value={cat.id}
                                disabled={cat.id === categoryId} // 자기 자신 선택 불가
                            >
                                {"\u00A0".repeat(cat.depth * 4)} {cat.depth > 0 ? "ㄴ" : ""}{" "}
                                {cat.name} {cat.id === categoryId ? "(현재 카테고리)" : ""}
                            </option>
                        ))}
                    </select>
                    {errors.parentId && (
                        <p className="text-red-500 text-xs ml-1">{errors.parentId.message}</p>
                    )}
                </div>

                {errors.root && (
                    <p className="text-red-500 text-sm text-center font-medium bg-red-50 py-3 rounded-xl">
                        {errors.root.message}
                    </p>
                )}

                <div className="flex gap-3 mt-4">
                    <Button
                        type="button"
                        variant="outline"
                        fullWidth
                        onClick={() => navigate("/admin/categories")}
                        className="border-gray-200 text-gray-600 h-12"
                    >
                        취소
                    </Button>
                    <Button
                        type="submit"
                        isLoading={isSubmitting}
                        fullWidth
                        className="bg-[#772b8f] hover:bg-[#5e2271] text-white h-12 flex items-center justify-center gap-2"
                    >
                        <IoIosSave className="w-5 h-5" /> 수정 완료
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default AdminCategoryEdit;
