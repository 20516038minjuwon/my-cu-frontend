import { useEffect, useState, useRef, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { IoIosArrowBack, IoIosSave, IoIosCloudUpload } from "react-icons/io";
import { getCategories } from "../../api/category.api";
import { getProductById } from "../../api/product.api";
import { updateProduct } from "../../api/admin.product.api";
import type { CategoryTreeResponse } from "../../types/category";
import type { UpdateProductInput } from "../../types/admin.product";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { AxiosError } from "axios";
import { uploadImage } from "../../api/upload.api.ts";

function AdminProductEdit() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const productId = Number(id);

    // 상태 관리
    const [flatCategories, setFlatCategories] = useState<
        { id: number; name: string; depth: number }[]
    >([]);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<UpdateProductInput>();

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsInitialLoading(true);
                // 1. 카테고리 목록과 상품 상세 정보를 병렬로 로드
                const [categoriesData, productData] = await Promise.all([
                    getCategories(),
                    getProductById(productId),
                ]);

                // 2. 카테고리 평탄화
                const flattened: { id: number; name: string; depth: number }[] = [];
                const traverse = (nodes: CategoryTreeResponse[], depth: number) => {
                    nodes.forEach((node) => {
                        flattened.push({ id: node.id, name: node.name, depth });
                        if (node.children) traverse(node.children, depth + 1);
                    });
                };
                traverse(categoriesData, 0);
                setFlatCategories(flattened);

                // 3. 폼 데이터 초기화
                setPreviewUrl(productData.image);
                reset({
                    name: productData.name,
                    description: productData.description,
                    price: productData.price,
                    categoryId: productData.categoryId,
                    image: productData.image,
                    isNew: productData.isNew,
                    isBest: productData.isBest,
                    onePlus: productData.onePlus,
                    twoPlus: productData.twoPlus,
                });
            } catch (error) {
                console.error("데이터 로드 실패", error);
                alert("상품 정보를 불러오는 중 오류가 발생했습니다.");
                navigate("/admin/products");
            } finally {
                setIsInitialLoading(false);
            }
        };

        if (productId) loadData().then(() => {});
    }, [productId, reset, navigate]);

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            const { url } = await uploadImage(file, "products");
            setPreviewUrl(url);
            setValue("image", url);
        } catch (error) {
            console.log(error);
            alert("이미지 업로드에 실패했습니다.");
        } finally {
            setIsUploading(false);
        }
    };

    const onSubmit = async (data: UpdateProductInput) => {
        try {
            await updateProduct(productId, {
                ...data,
                price: Number(data.price),
                categoryId: Number(data.categoryId),
            });
            alert("상품 정보가 수정되었습니다.");
            navigate("/admin/products");
        } catch (e) {
            if (e instanceof AxiosError) {
                setError("root", { message: e.response?.data?.message || "수정 실패" });
            }
        }
    };

    if (isInitialLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#772b8f] mb-4"></div>
                <p>상품 정보를 불러오는 중입니다...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <IoIosArrowBack className="w-6 h-6 text-gray-600" />
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">상품 수정</h2>
                    <p className="text-sm text-gray-500">상품 ID: {productId}</p>
                </div>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
                {/* 이미지 섹션 */}
                <div className="md:col-span-1 space-y-4">
                    <label className="text-sm font-bold text-gray-700">상품 이미지</label>
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="aspect-square rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#772b8f] bg-gray-50 flex flex-col items-center justify-center cursor-pointer overflow-hidden relative transition-all"
                    >
                        {isUploading ? (
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#772b8f]" />
                        ) : previewUrl ? (
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="text-center p-4">
                                <IoIosCloudUpload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                                <p className="text-xs text-gray-500 font-medium">이미지 교체</p>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                            <span className="text-white text-xs font-bold">이미지 변경</span>
                        </div>
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                    />
                </div>

                {/* 정보 입력 섹션 */}
                <div className="md:col-span-2 space-y-6 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                    <Input
                        label="상품명"
                        error={errors.name}
                        registration={register("name", { required: "상품명은 필수입니다." })}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="판매 가격"
                            type="number"
                            error={errors.price}
                            registration={register("price", { required: "가격을 입력하세요." })}
                        />
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">카테고리</label>
                            <select
                                {...register("categoryId", { required: "카테고리를 선택하세요." })}
                                className="h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#772b8f] text-sm"
                            >
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
                        />
                    </div>

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
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        {...register(tag.id as keyof UpdateProductInput)}
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
                            <IoIosSave className="w-5 h-5" /> 수정 완료
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AdminProductEdit;
