import {Link, useNavigate} from "react-router";
import {useForm} from "react-hook-form";
import type {RegisterFormType} from "../types/user.ts";
import {twMerge} from "tailwind-merge";
import Input from "../components/common/Input.tsx";
import Button from "../components/common/Button.tsx";

function Register() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isSubmitting},
    } = useForm<RegisterFormType>();

    const onSubmit = async (data: RegisterFormType) => {
       /* setError("root", {message: ""});
        try {
            await registerUser(data);
            alert("회원가입이 완료되었습니다.로그인 해주세요")
            navigate("/login");
        } catch (e) {
            /!* try문 중에 어디서든지 에러가 발생된다면 catch절이 실행될 거임
            * 혹시 그 error가 ,Axios에서 발생된 AxiosError라면,*!/
            if (e instanceof AxiosError) {
                setError("root", {message: e.response?.data?.message || "회원가입에 실패했습니다."});
            } else {
                setError("root", {message: "오류가 발생했습니다."})
            }
        }*/
    };
    return (
        <div
            className={twMerge(
                ["flex", "flex-col", "justify-center", "items-center"],
                ["min-h-[80dvh]", "py-40", "px-4"],
            )}
        >
            <h2 className={twMerge(["text-3xl", "font-bold", "text-center", "mb-10"])}>JOIN MEMBER</h2>
            <form
                className={twMerge(["w-full", "max-w-lg"], ["flex", "flex-col", "gap-5"])}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className={twMerge(["flex", "flex-col", "gap-5"])}>
                    <Input
                        placeholder={"이름"}
                        error={errors.username}
                        registration={register("username", {
                            required: "이름은 필수값입니다.",
                            minLength: {value: 2, message: "이름은 2글자 이상 입력해주세요."},
                        })}
                    />
                    <Input
                        placeholder={"아이디"}
                        error={errors.username}
                        registration={register("id", {
                            required: "아이디는 필수값입니다.",
                            minLength: {value: 4, message: "아이디는 4자 이상 입력해주세요."},
                        })}
                    />
                    <Input
                        type={"password"}
                        placeholder={"비밀번호 (6자 이상)"}
                        error={errors.password}
                        registration={register("password", {
                            required: "비밀번호는 필수값입니다.",
                            minLength: {
                                value: 6,
                                message: "비밀번호는 최소 6자 이상이여야 합니다.",
                            },
                        })}
                    />
                    <Input
                        fullWidth={true}
                        placeholder={"이메일을 입력해주세요."}
                        type={"text"}
                        registration={register("email", {
                            required: "이메일은 필수값입니다.",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "올바른 이메일 형식이 아닙니다.",
                            },
                        })}
                        error={errors.email}
                    />
                    <Input
                        placeholder={"휴대폰 번호 (-없이 입력)"}
                        error={errors.phone}
                        registration={register("phone", {
                            required: "휴대폰 번호는 필수값입니다.",
                            pattern: {
                                value: /^01([0|1|6|7|8|9])?([0-9]{3,4})?([0-9]{4})$/,
                                message: "올바른 휴대폰 번호 형식이 아닙니다.(-제외)",
                            },
                        })}
                    />
                </div>
                <div className={twMerge(["flex", "gap-2", "items-center"])}>
                    <div className={twMerge(["flex-1"])}>
                        <Input
                            type={"text"}
                            placeholder={"생년월일 (YYYYMMDD)"}
                            maxLength={8}
                            error={errors.birthdate}
                            registration={register("birthdate", {
                                required: "생년월일은 필수값 입니다.",
                                minLength: {value: 8, message: "8자리로 입력해주세요."},
                                maxLength: {value: 8, message: "8자리로 입력해주세요."},
                                pattern: {value: /^[0-9]+$/, message: "숫자만 입력해주세요."},
                            })}
                        />
                    </div>
                </div>
                {errors.root && (
                    <p className={'text-red-600 text-sm text-center'}>
                        {errors.root.message}
                    </p>
                )}

                <Button
                    type={"submit"}
                    isLoading={isSubmitting}
                    fullWidth={true}
                    size={"lg"}
                >회원가입</Button>
                <div className={twMerge(['w-full','mt-2','flex','flex-end','gap-2'])}>
                    <p className={'text-sm text-gray-500 mt-[1px]'}>
                        이미 계정이 있으신가요 ? &rarr;
                    </p>
                    <Link to={"/login"} className={'text-gray-500 hover:text-black'}>
                        로그인
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Register;
