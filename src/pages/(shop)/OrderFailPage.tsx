import Button from "../../components/common/Button.tsx";
import { useNavigate, useSearchParams } from "react-router";

function OrderFailPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const errorCode = searchParams.get("code");
    const errorMessage = searchParams.get("message");

    return (
        <div className="max-w-md mx-auto py-40 text-center space-y-6">
            <div className="mb-8 flex justify-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                    <span className="text-4xl font-bold">!</span>
                </div>
            </div>
            <h1 className="text-3xl font-bold ">결제 실패</h1>
            <div className="bg-red-50 p-5 rounded-lg text-left mb-10 border border-red-100">
                <p className="text-red-700 text-sm font-medium">오류 내용</p>
                <p className="text-gray-800 mt-1">
                    {errorMessage || "알 수 없는 오류가 발생했습니다."}
                    {errorCode && <span className="text-gray-500 text-xs ml-2">({errorCode})</span>}
                </p>
            </div>
            <div className="flex gap-4">
                <Button variant="outline" fullWidth onClick={() => navigate("/cart")}>
                    장바구니로 이동
                </Button>
                <Button fullWidth onClick={() => navigate("/order")}>
                    다시 결제하기
                </Button>
            </div>
        </div>
    );
}

export default OrderFailPage;