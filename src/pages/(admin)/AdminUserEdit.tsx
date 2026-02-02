import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { IoIosArrowBack, IoIosSave, IoIosInformationCircle } from "react-icons/io";
import { getAdminUserById, updateAdminUser } from "../../api/admin.user.api";
import type { UpdateUserInput } from "../../types/admin.user";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { AxiosError } from "axios";

function AdminUserEdit() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const userId = Number(id);

    const [isLoadingData, setIsLoadingData] = useState(true);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<UpdateUserInput>();

    // 초기 데이터 로드
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setIsLoadingData(true);
                const userData = await getAdminUserById(userId);

                // 폼 데이터 초기화
                reset({
                    name: userData.name,
                    email: userData.email,
                    phone: userData.phone,
                    birthdate: userData.birthdate,
                    role: userData.role,
                });
            } catch (error) {
                console.error("회원 정보 로드 실패:", error);
                alert("사용자 정보를 불러올 수 없습니다.");
                navigate("/admin/users");
            } finally {
                setIsLoadingData(false);
            }
        };

        if (userId) fetchUser().then(() => {});
    }, [userId, reset, navigate]);

    const onSubmit = async (data: UpdateUserInput) => {
        try {
            // 빈 비밀번호는 전송하지 않도록 필터링
            const updateData = { ...data };
            if (!updateData.password) {
                delete updateData.password;
            }

            await updateAdminUser(userId, updateData);
            alert("회원 정보가 성공적으로 수정되었습니다.");
            navigate("/admin/users");
        } catch (e) {
            if (e instanceof AxiosError) {
                setError("root", {
                    message: e.response?.data?.message || "수정 중 오류가 발생했습니다.",
                });
            }
        }
    };

    if (isLoadingData) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#772b8f] mb-4"></div>
                <p>회원 정보를 불러오는 중입니다...</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto pb-20">
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <IoIosArrowBack className="w-6 h-6 text-gray-600" />
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">회원 정보 수정</h2>
                    <p className="text-sm text-gray-500">사용자 고유 번호: {userId}</p>
                </div>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 space-y-6"
            >
                {/* 알림 배너 */}
                <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl text-blue-700 text-sm">
                    <IoIosInformationCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p>
                        비밀번호는 변경이 필요한 경우에만 입력해주세요. 입력하지 않으면 기존
                        비밀번호가 유지됩니다.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="성함"
                        error={errors.name}
                        registration={register("name", { required: "이름은 필수입니다." })}
                    />
                    <Input
                        label="새 비밀번호 (선택)"
                        type="password"
                        placeholder="변경 시에만 입력"
                        error={errors.password}
                        registration={register("password", {
                            minLength: { value: 6, message: "최소 6자 이상 입력해주세요." },
                        })}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="이메일"
                        type="email"
                        error={errors.email}
                        registration={register("email", { required: "이메일은 필수입니다." })}
                    />
                    <Input
                        label="연락처"
                        error={errors.phone}
                        registration={register("phone", { required: "연락처는 필수입니다." })}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="생년월일"
                        type="date"
                        error={errors.birthdate}
                        registration={register("birthdate", { required: "생년월일은 필수입니다." })}
                    />
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">계정 권한</label>
                        <div className="flex gap-4 h-12 items-center px-4 bg-gray-50 rounded-xl border border-gray-100">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    value="USER"
                                    {...register("role")}
                                    className="text-[#772b8f]"
                                />
                                <span className="text-sm font-medium">USER</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer ml-4">
                                <input
                                    type="radio"
                                    value="ADMIN"
                                    {...register("role")}
                                    className="text-[#772b8f]"
                                />
                                <span className="text-sm font-medium text-red-600">ADMIN</span>
                            </label>
                        </div>
                    </div>
                </div>

                {errors.root && (
                    <p className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg text-center">
                        {errors.root.message}
                    </p>
                )}

                <div className="flex gap-4 pt-6">
                    <Button
                        type="button"
                        variant="outline"
                        fullWidth
                        onClick={() => navigate(-1)}
                        className="h-12 border-gray-200 text-gray-500"
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

export default AdminUserEdit;
