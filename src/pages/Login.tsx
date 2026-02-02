import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import type { LoginFormType } from "../types/user.ts";
import { twMerge } from "tailwind-merge";
import Input from "../components/common/Input.tsx";
import Button from "../components/common/Button.tsx";
import { AxiosError } from "axios";
import useAuthStore from "../stores/useAuthStore.ts";
import {loginUser} from "../api/auth.api.ts";

function Login(){
    const navigate = useNavigate();

    const {login}=useAuthStore();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    }=useForm<LoginFormType>();

    const onSubmit =async (data: LoginFormType) => {
        setError("root",{message:""})
        try{
            const response =await loginUser(data);
            login(response.data.token,response.data.user);
            alert("로그인 되었습니다.")
            navigate("/")
        } catch(e){
            if(e instanceof AxiosError){
                setError("root",{message:e.response?.data.message||"로그인에 실패하였습니다."})
            }else{
                console.log(e)
                setError("root",{message:"알 수 없는 오류가 발생했습니다."})
            }
        }
    }
    return (
        <div
            className={twMerge(
                ["flex", "flex-col", "justify-center", "items-center"],
                ["min-h-[80dvh]", "py-40", "px-4"],
            )}
        >
            <h2 className={twMerge(["text-3xl", "font-bold", "text-center", "mb-10"])}>LOGIN</h2>
            <form
                className={twMerge(["w-full", "max-w-lg"], ["flex", "flex-col", "gap-5"])}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className={twMerge(["flex", "flex-col", "gap-5"])}>
                    <Input
                        fullWidth={true}
                        placeholder={"아이디를 입력해주세요."}
                        type={"text"}
                        registration={register("username", {
                            required: "아이디는 필수값입니다.",
                        })}
                        error={errors.username}
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
                </div>
                {errors.root &&(
                    <p className={'text-red-600 text-sm text-center'}>
                        {errors.root.message}
                    </p>
                )}

                <Button
                    type={"submit"}
                    isLoading={isSubmitting}
                    fullWidth={true}
                    size={"lg"}
                    variant={"primary"}
                >로그인</Button>

                <div className={twMerge(['w-full','mt-2','flex','flex-end','gap-2'])}>
                    <p className={'text-sm text-gray-500 mt-[1px]'}>
                        계정이 없으신가요 ? &rarr;
                    </p>
                    <Link to={"/register"} className={'text-gray-500 hover:text-black'}>
                        회원가입
                    </Link>
                </div>
            </form>
        </div>
    );
}
export default Login;