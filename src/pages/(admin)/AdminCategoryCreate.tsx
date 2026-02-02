import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { IoIosArrowBack, IoIosSave } from "react-icons/io";
import { getCategories } from "../../api/category.api";
import { createCategory } from "../../api/admin.category.api";
import type { CategoryTreeResponse } from "../../types/category";
import type { CreateCategoryInput } from "../../types/admin.category";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { AxiosError } from "axios";

function AdminCategoryCreate() {
    const navigate = useNavigate();
    const [flatCategories, setFlatCategories] = useState<
        { id: number; name: string; depth: number }[]
    >([]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<CreateCategoryInput>({
        defaultValues: {
            name: "",
            parentId: null,
        },
    });

    // Select 박스에서 계층 구조를 보여주기 위해 트리 데이터를 평탄화(Flat)
    useEffect(() => {
        const fetchAndFlatten = async () => {
            try {
                const data = await getCategories();
                const flattened: { id: number; name: string; depth: number }[] = [];

                const traverse = (nodes: CategoryTreeResponse[], depth: number) => {
                    nodes.forEach((node) => {
                        flattened.push({ id: node.id, name: node.name, depth });
                        if (node.children && node.children.length > 0) {
                            traverse(node.children, depth + 1);
                        }
                    });
                };

                traverse(data, 0);
                setFlatCategories(flattened);
            } catch (error) {
                console.error("카테고리 목록 로드 실패", error);
            }
        };
        fetchAndFlatten().then(() =>{});
    }, []);

    const onSubmit = async (data: CreateCategoryInput) => {
        try {
            // parentId가 빈 문자열이면 null로 변환 (Select value 처리)
            const submitData = {
                ...data,
                parentId: data.parentId ? Number(data.parentId) : null,
            };

            await createCategory(submitData);
            alert("새 카테고리가 생성되었습니다.");
            navigate("/admin/categories");
        } catch (e) {
            if (e instanceof AxiosError) {
                const message = e.response?.data?.message || "카테고리 생성에 실패했습니다.";
                setError("root", { message });
            }
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            {/* 상단 네비게이션 */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <IoIosArrowBack className="w-6 h-6 text-gray-600" />
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">새 카테고리 추가</h2>
                    <p className="text-sm text-gray-500">새로운 상품 분류 항목을 생성합니다.</p>
                </div>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col gap-6"
            >
                {/* 카테고리명 입력 */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">카테고리명</label>
                    <Input
                        placeholder="예: 상의, 티셔츠, 간절기 의류"
                        error={errors.name}
                        registration={register("name", {
                            required: "카테고리명은 필수입니다.",
                            minLength: { value: 1, message: "최소 1자 이상 입력해주세요." },
                        })}
                    />
                </div>

                {/* 상위 카테고리 선택 */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">상위 카테고리</label>
                    <select
                        {...register("parentId")}
                        className={twMerge(
                            "w-full h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#772b8f] focus:border-transparent transition-all appearance-none bg-white",
                            "text-sm text-gray-700",
                        )}
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 1rem center",
                            backgroundSize: "1.5em",
                        }}
                    >
                        <option value="">없음 (1차 카테고리로 생성)</option>
                        {flatCategories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {"\u00A0".repeat(cat.depth * 4)} {cat.depth > 0 ? "ㄴ" : ""}{" "}
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    <p className="text-[11px] text-gray-400 ml-1">
                        * 대분류를 만들려면 '없음'을 선택하세요.
                    </p>
                </div>

                {/* 에러 메시지 */}
                {errors.root && (
                    <p className="text-red-500 text-sm text-center font-medium bg-red-50 py-3 rounded-xl">
                        {errors.root.message}
                    </p>
                )}

                {/* 하단 버튼 */}
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
                        <IoIosSave className="w-5 h-5" /> 생성하기
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default AdminCategoryCreate;
