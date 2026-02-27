import { twMerge } from "tailwind-merge";
import { useState } from "react";
import hiPass from "../../assets/images/hipass.jpg"
import tfCard from "../../assets/images/trafficCard.jpg"
import mobile from "../../assets/images/mobile.jpg"
import pointMoney from "../../assets/images/point_money.jpg"

type ServiceTab = "voucher" | "transport" | "hiPass" | "point" | "id";


const SERVICE_TABS = [
    { id: "voucher", label: "모바일상품권" },
    { id: "transport", label: "교통카드" },
    { id: "hiPass", label: "하이패스" },
    { id: "point", label: "포인트&머니" },
    { id: "id", label: "모바일 신분확인" },
] as const;

function DailyService() {
    const [activeTab, setActiveTab] = useState<ServiceTab>("voucher");


    const renderContent = () => {
        switch (activeTab) {
            case "voucher":
                return <MobileGift />;
            case "transport":
                return (
                    <div>
                        <img src={tfCard} alt={"교통카드"} />
                    </div>
                );
            case "hiPass":
                return (
                    <div>
                        <img src={hiPass} alt={"하이패스"} />
                    </div>
                );
            case "point":
                return (
                    <div>
                        <div className={twMerge(['flex','flex-col','pb-15'])}>
                            <h1 className={twMerge(['text-xl'])}>포인트/머니 충전 서비스</h1>
                            <p className={twMerge(['text-sm','mb-8'])}>CU에서는 24시간 365일 현금으로 다양한 포인트/머니 (네이버페이,카카오페이머니,토스머니,갤럭시 스토어,KB 스타틴즈)이 가능합니다.</p>
                            <ol>
                                <li className={twMerge(['text-sm','text-gray-700'])}>1. STAFF에게 포인트로 충전할 금액의 현금을 주세요.</li>
                                <li className={twMerge(['text-sm','text-gray-700'])}>2. 충전용바코드를 STAFF에게 보여주세요.</li>
                                <li className={twMerge(['text-sm','text-gray-700'])}>3. STAFF가 바코드를 스캔하고 충전 금액을 입력해주면 충전완료!</li>
                            </ol>
                        </div>
                        <div>
                            <img src={pointMoney} alt={"포인트/머니"} />
                        </div>
                    </div>
                );
            case "id":
                return (
                    <div>
                        <img src={mobile} alt={"모바일 신분확인 "} />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-[1200px] mx-auto flex gap-10 p-8">
            {/* 4. [AllProduct 스타일] 캡슐형 탭 메뉴 */}
            <nav className="w-48 shrink-0">
                <ul className="flex flex-col gap-1">
                    {SERVICE_TABS.map((tab) => (
                        <li
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={twMerge([
                                "px-4 py-3 text-[16px] transition-colors rounded-sm",
                                activeTab === tab.id
                                    ? "bg-[#6d39af] text-white font-bold"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-purple-600",
                            ])}
                        >
                            {tab.label}
                        </li>
                    ))}
                </ul>
            </nav>

            {/* 5. 변환되는 컨텐츠 영역 */}
            <main className="min-h-[400px] border-t border-gray-400 pt-10">{renderContent()}</main>
        </div>
    );
}
export default DailyService;

import mobileGift01 from "../../assets/images/dailyService/mobileGift01.png";
import mobileGift02 from "../../assets/images/dailyService/mobi.png";
function MobileGift() {
    return (
        <div className={twMerge(["flex", "flex-col", "space-y-6"])}>
            <div className={twMerge(["flex", "flex-col", "gap-5"])}>
                <h1 className={twMerge(["text-xl", "italic", "font-semibold"])}>모바일 상품권</h1>
                <p className={twMerge(["text-sm", "text-gray-600"])}>
                    모바일 상품권은 휴대폰 메세지로 전송되는 바코드 형태의 전자 상품권이며 <br />
                    CU점포에서 실제 금액처럼 사용하거나 실제 상품과 교환 할 수 있는 서비스 입니다.
                </p>
            </div>
            <div
                className={twMerge(
                    ["flex", "gap-20", "pb-10"],
                    ["border-b", "border-gray-400", "border-dashed"],
                )}
            >
                <div
                    className={twMerge(
                        ["flex-1", "flex", "flex-col", "gap-3"],
                        ["text-center", "items-center"],
                    )}
                >
                    <img
                        className={twMerge(["w-30", "h-30"])}
                        src={mobileGift01}
                        alt={"mobileGift01"}
                    />
                    <p>모바일 상품교환권</p>
                    <span className={twMerge(["text-gray-600", "text-[14px]"])}>
                        : 정해진 상품과 교환 가능한 모바일 상품권
                    </span>
                </div>
                <div
                    className={twMerge(
                        ["flex-1.2", "flex", "flex-col", "gap-3"],
                        ["text-center", "items-center"],
                    )}
                >
                    <img
                        className={twMerge(["w-30", "h-30"])}
                        src={mobileGift02}
                        alt={"mobileGift02"}
                    />
                    <p>모바일 금액권 </p>
                    <span className={twMerge(["text-gray-600", "text-[14px]"])}>
                        : 해당 금액만큼 현금처럼 이용가능한 모바일 상품권
                    </span>
                    <span className={twMerge(["text-gray-600", "text-[14px]"])}>
                        {" "}
                        (유가증권등 일부 사용 이용 불가)
                    </span>
                </div>
            </div>
            <div className={twMerge(['flex','flex-col', 'gap-3'])}>
                <h3 className={'font-bold'}>모바일 상품권 사용 방법</h3>
                <p className={'text-sm'}>
                    상품권 결제 시 구매 상품과 함께 모바일 바코드를 제시해주시기만 하면 됩니다.{" "}
                    <br /> * 화질이 떨어지거나 바코드가 너무 작을 경우 인식을 못하는 경우가 있으니
                    주의하세요.
                </p>
            </div>
        </div>
    );
}
