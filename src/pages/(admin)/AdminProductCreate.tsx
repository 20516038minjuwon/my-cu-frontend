import { useEffect, useState, useRef, type ChangeEvent } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { IoIosArrowBack, IoIosSave, IoIosCloudUpload, IoIosCloseCircle } from "react-icons/io";
import { getCategories } from "../../api/category.api";
import { createProduct } from "../../api/admin.product.api";
import type { CategoryTreeResponse } from "../../types/category";
import type { CreateProductInput } from "../../types/admin.product";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { AxiosError } from "axios";
import { uploadImage } from "../../api/upload.api.ts";

function AdminProductCreate() {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // 상태 관리
    const [flatCategories, setFlatCategories] = useState<
        { id: number; name: string; depth: number }[]
    >([]);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<CreateProductInput>({
        defaultValues: {
            isNew: false,
            isBest: false,
            onePlus: false,
            twoPlus: false,
            price: 0,
        },
    });

    // 카테고리 로드 및 평탄화
    useEffect(() => {
        const fetchCats = async () => {
            try {
                const data = await getCategories();
                const flattened: { id: number; name: string; depth: number }[] = [];
                const traverse = (nodes: CategoryTreeResponse[], depth: number) => {
                    nodes.forEach((node) => {
                        flattened.push({ id: node.id, name: node.name, depth });
                        if (node.children) traverse(node.children, depth + 1);
                    });
                };
                traverse(data, 0);
                setFlatCategories(flattened);
            } catch (error) {
                console.error("카테고리 로드 실패", error);
            }
        };
        fetchCats().then(() => {});
    }, []);

    // 이미지 업로드 핸들러
    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            // 기존 이미지가 있다면 삭제 로직을 추가할 수 있음 (선택 사항)
            const { url } = await uploadImage(file, "products");
            setPreviewUrl(url);
            setValue("image", url); // react-hook-form 필드에 값 주입
        } catch (error) {
            console.log(error);
            alert("이미지 업로드에 실패했습니다.");
        } finally {
            setIsUploading(false);
        }
    };

    const removeImage = async () => {
        if (!previewUrl) return;
        try {
            // 서버에서도 삭제하고 싶다면 아래 주석 해제
            // await deleteImage(previewUrl);
            setPreviewUrl(null);
            setValue("image", "");
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmit = async (data: CreateProductInput) => {
        if (!data.image) {
            setError("root", { message: "상품 이미지는 필수입니다." });
            return;
        }

        try {
            await createProduct({
                ...data,
                price: Number(data.price),
                categoryId: Number(data.categoryId),
            });
            alert("상품이 성공적으로 등록되었습니다.");
            navigate("/admin/products");
        } catch (e) {
            if (e instanceof AxiosError) {
                setError("root", { message: e.response?.data?.message || "등록 실패" });
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
                    <IoIosArrowBack className="w-6 h-6 text-gray-600" />
                </button>
                <h2 className="text-2xl font-bold text-gray-900">새 상품 등록</h2>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
                {/* 왼쪽: 이미지 업로드 섹션 */}
                <div className="md:col-span-1 space-y-4">
                    <label className="text-sm font-bold text-gray-700">상품 이미지</label>
                    <div
                        onClick={() => !previewUrl && fileInputRef.current?.click()}
                        className={twMerge(
                            "aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer overflow-hidden relative",
                            previewUrl
                                ? "border-transparent"
                                : "border-gray-200 hover:border-[#772b8f] bg-gray-50",
                        )}
                    >
                        {isUploading ? (
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#772b8f]" />
                        ) : previewUrl ? (
                            <>
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeImage().then(() => {});
                                    }}
                                    className="absolute top-2 right-2 text-red-500 bg-white rounded-full shadow-md"
                                >
                                    <IoIosCloseCircle className="w-7 h-7" />
                                </button>
                            </>
                        ) : (
                            <div className="text-center p-4">
                                <IoIosCloudUpload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                                <p className="text-xs text-gray-500 font-medium">이미지 업로드</p>
                            </div>
                        )}
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                    />
                    <p className="text-[11px] text-gray-400 text-center">
                        권장 사이즈: 800x800px (JPG, PNG)
                    </p>
                </div>

                {/* 오른쪽: 상품 정보 입력 섹션 */}
                <div className="md:col-span-2 space-y-6 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                    <Input
                        label="상품명"
                        placeholder="상품명을 입력하세요"
                        error={errors.name}
                        registration={register("name", { required: "상품명은 필수입니다." })}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="판매 가격"
                            type="number"
                            placeholder="0"
                            error={errors.price}
                            registration={register("price", { required: "가격을 입력하세요." })}
                        />
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">카테고리</label>
                            <select
                                {...register("categoryId", { required: "카테고리를 선택하세요." })}
                                className="h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#772b8f] text-sm"
                            >
                                <option value="">선택해주세요</option>
                                {flatCategories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {"\u00A0".repeat(cat.depth * 3)} {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">상품 설명</label>
                        <textarea
                            {...register("description", { required: "설명을 입력하세요." })}
                            className="w-full h-32 p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#772b8f] text-sm resize-none"
                            placeholder="상품에 대한 상세 설명을 작성해주세요."
                        />
                        {errors.description && (
                            <p className="text-red-500 text-xs">{errors.description.message}</p>
                        )}
                    </div>

                    {/* 태그 설정 (Checkbox) */}
                    <div className="space-y-3">
                        <label className="text-sm font-bold text-gray-700 ml-1">
                            상품 태그 설정
                        </label>
                        <div className="flex flex-wrap gap-6 bg-gray-50 p-4 rounded-xl">
                            {[
                                { id: "isNew", label: "NEW", color: "text-blue-500" },
                                { id: "isBest", label: "BEST", color: "text-red-500" },
                                { id: "onePlus", label: "1+1", color: "text-green-600" },
                                { id: "twoPlus", label: "2+1", color: "text-orange-500" },
                            ].map((tag) => (
                                <label
                                    key={tag.id}
                                    className="flex items-center gap-2 cursor-pointer group"
                                >
                                    <input
                                        type="checkbox"
                                        {...register(tag.id as keyof CreateProductInput)}
                                        className="w-4 h-4 rounded border-gray-300 text-[#772b8f] focus:ring-[#772b8f]"
                                    />
                                    <span className={twMerge("text-xs font-bold", tag.color)}>
                                        {tag.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {errors.root && (
                        <p className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg text-center">
                            {errors.root.message}
                        </p>
                    )}

                    <div className="flex gap-4 pt-4 border-t border-gray-100">
                        <Button
                            variant="outline"
                            fullWidth
                            onClick={() => navigate(-1)}
                            className="h-12 border-gray-200 text-gray-500"
                        >
                            취소
                        </Button>
                        <Button
                            type="submit"
                            isLoading={isSubmitting || isUploading}
                            fullWidth
                            className="bg-[#772b8f] hover:bg-[#5e2271] text-white h-12 flex items-center justify-center gap-2"
                        >
                            <IoIosSave className="w-5 h-5" /> 상품 등록 완료
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AdminProductCreate;
