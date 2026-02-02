import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { IoIosArrowBack, IoIosSave } from "react-icons/io";
import { createAdminUser } from "../../api/admin.user.api";
import type { CreateUserInput } from "../../types/admin.user";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { AxiosError } from "axios";

function AdminUserCreate() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<CreateUserInput>({
        defaultValues: {
            role: "USER",
        },
    });

    const onSubmit = async (data: CreateUserInput) => {
        try {
            await createAdminUser(data);
            alert("새로운 회원이 성공적으로 등록되었습니다.");
            navigate("/admin/users");
        } catch (e) {
            if (e instanceof AxiosError) {
                const message = e.response?.data?.message || "회원 등록 중 오류가 발생했습니다.";
                // 아이디 중복 등 특정 필드 에러 처리
                if (message.includes("아이디")) {
                    setError("username", { message });
                } else {
                    setError("root", { message });
                }
            }
        }
    };

    return (
        <div className="max-w-3xl mx-auto pb-20">
            {/* 헤더 */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <IoIosArrowBack className="w-6 h-6 text-gray-600" />
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">회원 직접 추가</h2>
                    <p className="text-sm text-gray-500">
                        새로운 사용자 또는 관리자 계정을 생성합니다.
                    </p>
                </div>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 space-y-6"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 아이디 */}
                    <Input
                        label="사용자 ID"
                        placeholder="4자 이상 입력"
                        error={errors.username}
                        registration={register("username", {
                            required: "아이디는 필수입니다.",
                            minLength: { value: 4, message: "최소 4자 이상 입력해주세요." },
                        })}
                    />
                    {/* 비밀번호 */}
                    <Input
                        label="비밀번호"
                        type="password"
                        placeholder="6자 이상 입력"
                        error={errors.password}
                        registration={register("password", {
                            required: "비밀번호는 필수입니다.",
                            minLength: { value: 6, message: "최소 6자 이상 입력해주세요." },
                        })}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 이름 */}
                    <Input
                        label="성함"
                        placeholder="실명을 입력하세요"
                        error={errors.name}
                        registration={register("name", {
                            required: "이름은 필수입니다.",
                        })}
                    />
                    {/* 이메일 */}
                    <Input
                        label="이메일"
                        type="email"
                        placeholder="example@mail.com"
                        error={errors.email}
                        registration={register("email", {
                            required: "이메일은 필수입니다.",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "올바른 이메일 형식이 아닙니다.",
                            },
                        })}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 연락처 */}
                    <Input
                        label="연락처"
                        placeholder="010-0000-0000"
                        error={errors.phone}
                        registration={register("phone", {
                            required: "연락처는 필수입니다.",
                        })}
                    />
                    {/* 생년월일 */}
                    <Input
                        label="생년월일"
                        type="date"
                        error={errors.birthdate}
                        registration={register("birthdate", {
                            required: "생년월일은 필수입니다.",
                        })}
                    />
                </div>

                {/* 권한 설정 */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">계정 권한</label>
                    <div className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="USER"
                                {...register("role")}
                                className="w-4 h-4 text-[#772b8f] focus:ring-[#772b8f]"
                            />
                            <span className="text-sm font-medium text-gray-700">
                                일반 사용자 (USER)
                            </span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="ADMIN"
                                {...register("role")}
                                className="w-4 h-4 text-[#772b8f] focus:ring-[#772b8f]"
                            />
                            <span className="text-sm font-medium text-red-600">관리자 (ADMIN)</span>
                        </label>
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
                        <IoIosSave className="w-5 h-5" /> 회원 등록 완료
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default AdminUserCreate;
