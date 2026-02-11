import { twMerge } from "tailwind-merge";
import { useState } from "react";
import creditCard01 from "../../assets/images/creditcard/credit_img_241023L.png";
import creditCard02 from "../../assets/images/creditcard/02.png";
import creditCard03 from "../../assets/images/creditcard/sinhan03.png";
import creditCard04 from "../../assets/images/creditcard/sinhan04.png";
import membershipCard01 from "../../assets/images/creditcard/membershipcard01.png";
import membershipCard02 from "../../assets/images/creditcard/membershipcard02.png";
import membershipCard03 from "../../assets/images/creditcard/membershipcard03.png";
import membershipCard04 from "../../assets/images/creditcard/membershipcard04.png";
import membershipCard05 from "../../assets/images/creditcard/membershipcard05.jpg";
import membershipCard06 from "../../assets/images/creditcard/membershipcard06.png";

type CardCategory = "credit" | "membership";

function PartnerCard() {
    const [activeCardType, setActiveCardType] = useState<CardCategory>("credit");

    return (
        <div className="max-w-[1200px] mx-auto flex gap-10 p-8">
            {/* 1. AllProduct와 동일한 중앙 탭 레이아웃 */}
            <aside className="w-48 shrink-0">
                <ul className="flex flex-col gap-1">
                    {[
                        { id: "credit", label: "제휴 신용/체크카드" },
                        { id: "membership", label: "제휴 멤버십카드" },
                    ].map((tab) => (
                        <li
                            key={tab.id}
                            onClick={() => setActiveCardType(tab.id as CardCategory)}
                            className={twMerge([
                                // AllProduct에서 사용한 캡슐형 CSS 그대로 적용
                                "px-4 py-3 text-[16px] transition-colors rounded-sm",
                                activeCardType === tab.id
                                    ? "bg-[#6d39af] text-white font-bold" // 활성화 (CU 초록색)
                                    : "text-gray-600 hover:bg-gray-50 hover:text-purple-600",
                            ])}
                        >
                            {tab.label}
                        </li>
                    ))}
                </ul>
            </aside>

            {/* 2. 카드 리스트 영역 (카드 2열 배치) */}
            <main className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                {activeCardType === "credit" ? (
                    // 신용/체크카드 렌더링
                    <>
                        <CardItem
                            title={"CU NPay 카드 (신한카드)"}
                            img={creditCard01}
                            desc={[
                                "CU 편의점 최대 20% 현장할인",
                                "네이버페이 포인트 최대 5% 적립",
                                "CU 편의점 外 최대 5% 네이버페이 포인트 적립 (네이버페이 결제 시)",
                                "CU 멤버십 서비스 (자동 가입 및 결제 시 자동 적립)",
                            ]}
                        />
                        <CardItem
                            title={"CU KB국민카드"}
                            img={creditCard02}
                            desc={[
                                "CU - 실물카드 결제 시 30% 청구할인 (월 1.5만원 한도)",
                                "CU - KB Pay 결제 시 추가 20% 청구할인 (월 5천원 한도)",
                                "CU멤버십 포인트 2% 적립 (실물카드 매장 결제 시 한정)",
                            ]}
                        />
                        <CardItem
                            title={"신한 SOL트래블체크카드"}
                            img={creditCard03}
                            desc={[
                                "[현장 할인] CU 행사상품* 5% 즉시 할인\n" +
                                    "(전월 실적 및 통합 한도 제한 없음, 1회 최대 2천원 할인)",
                                "[청구 할인] CU 이용금액 5% 결제일 할인 (일 1회, 월 3회, 월 3천원 까지 할인, 전월 이용금액 30만원 이상 시 제공)",
                                "해외 이용 서비스(수수료 면제) 및 해외 사용 서비스(라운지 등)의 상세 혜택은 신한카드 홈페이지 참조",
                            ]}
                        />
                        <CardItem
                            title={"신한 나라사랑카드(체크)"}
                            img={creditCard04}
                            desc={[
                                "CU 행사품목* 10% 현장 할인 (월 5천원 한도)",
                                "[현충일(6/6), 국군의날(10/1)]\n" +
                                    "CU 행사품목* 30% 현장 할인 (일 5천원 한도)",
                                "CU편의점 20% 캐시백 (일 1회, 최대 1천원, 월 5회 한도 / 오프라인매장 이용 한정)",
                                "전월 이용실적 및 제한 없음, 일반서비스 및\n" +
                                    "통신사 할인 중복 적용 가능",
                            ]}
                        />
                    </>
                ) : (
                    // 멤버십카드 렌더링
                    <>
                        <CardItem
                            title={"T멤버십"}
                            img={membershipCard01}
                            desc={[
                                "VIP/골드 1,000원당 100원 할인 or 적립",
                                "실버 1,000원당 50원 할인 or 적립",
                                "T멤버십 가용포인트 CU에서 사용 가능 (대상상품에 대해서만 사용가능)",
                            ]}
                        />
                        <CardItem
                            title={"CJ.ONE 포인트"}
                            img={membershipCard02}
                            desc={[
                                "가용포인트 1천P 이상 시, 포인트 사용 가능",
                                "1회 한도 최대 10만 포인트",
                            ]}
                        />
                        <CardItem
                            title={"KT멤버십"}
                            img={membershipCard03}
                            desc={[
                                "매일 오전 5~9시 간편식 1,000원당 200원 할인 (도시락, 줄김밥, 삼각김밥, 햄버거, 샐러드 등)",
                                "1일 1회 적용 가능, 할인한도 1,000원",
                            ]}
                        />
                        <CardItem
                            title={"H.Point"}
                            img={membershipCard04}
                            desc={[
                                "CU 매장에서 H.Point 사용 가능",
                                "최소 100P부터 10P 단위 사용 가능",
                                "월 최대 2만P 사용 가능",
                            ]}
                        />
                        <CardItem
                            className={"pt-7"}
                            title={"현대오일뱅크 보너스포인트"}
                            img={membershipCard05}
                            desc={[
                                "결제 시 포인트 사용가능 (적립불가)",
                                "최소 1,000원 포인트 이상 사용 가능",
                                "1일 1회 사용 가능 / 월 사용 한도 2만 포인트",
                            ]}
                        />
                        <CardItem
                            title={"삼성카드 (보너스 포인트)"}
                            img={membershipCard06}
                            desc={[
                                "결제금액의 100% 포인트 결제 (현장 할인)",
                                "포인트 결제 시 나머지 금액은 동일한\n" + "삼성카드로 결제해야 함",
                                "회원이 보유한 보너스 포인트 내에서만\n" + "사용 가능",
                            ]}
                        />
                    </>
                )}
            </main>
        </div>
    );
}

// 공통 카드 아이템 컴포넌트
function CardItem({
    title,
    img,
    desc,
    className,
}: {
    title: string;
    img: string;
    desc: string[];
    className?: string;
}) {
    return (
        <div className="flex gap-6 items-start border-b border-gray-100 pb-10">
            <div className="shrink-0 w-30 md:w-34 py-2 rounded-md overflow-hidden bg-gray-50">
                <img src={img} alt={title} className={className} />
            </div>
            <div className="flex-1 pt-2">
                <h3 className="text-xl font-black mb-3 text-gray-900 leading-tight">{title}</h3>
                <ul className="space-y-2">
                    {desc.map((line, i) => (
                        <li
                            key={i}
                            className="text-sm text-gray-600 flex items-start gap-2 leading-relaxed"
                        >
                            <span className="mt-1.5 w-1 h-1 bg-[#34d399] rounded-full shrink-0" />
                            {line}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default PartnerCard;
