import Accordion from "../common/Accordion.tsx";
import { twMerge } from "tailwind-merge";
import circleBar from "../../assets/images/seller/bullet_bar.png";
import pr01 from "../../assets/images/seller/step09_img01.png";
import pr02 from "../../assets/images/seller/step06_img01.png";
function SellerCriteria() {
    return (
        <div>
            <Accordion title="상품 도입 평가 기준" defaultOpen={true}>
                <div className={twMerge(["overflow-x-auto", "my-8"])}>
                    <table className="min-w-full bg-white border-t-2 border-gray-800">
                        <thead>
                            <tr
                                className={twMerge(
                                    ["bg-gray-50", "border-b", "border-gray-200"],
                                    ["text-center", "text-sm", "font-bold"],
                                )}
                            >
                                <th
                                    className={twMerge(
                                        ["px-6", "py-2"],
                                        ["text-gray-700", "w-1/4", "border-r", "border-gray-300"],
                                    )}
                                >
                                    심사 항목
                                </th>
                                <th className={twMerge(["px-6", "py-4"], ["text-gray-700"])}>
                                    항목 설명
                                </th>
                            </tr>
                        </thead>

                        <tbody className={twMerge(["divide-y", " divide-gray-100"])}>
                            <tr
                                className={twMerge([
                                    "text-sm",
                                    "hover:bg-gray-50",
                                    "transition-colors",
                                ])}
                            >
                                <td
                                    className={twMerge(
                                        ["text-center", "font-semibold"],
                                        ["text-gray-800", "border-r", "border-gray-200"],
                                    )}
                                >
                                    참신성
                                </td>
                                <td className={twMerge(["px-6", "py-4", "text-gray-600"])}>
                                    현재 시장에 독자적인 포지션을 가지고 있는가? (대체가능성이
                                    존재하는가)
                                </td>
                            </tr>
                            <tr
                                className={twMerge([
                                    "text-sm",
                                    "hover:bg-gray-50",
                                    "transition-colors",
                                ])}
                            >
                                <td
                                    className={twMerge(
                                        ["text-center", "font-semibold"],
                                        ["text-gray-800", "border-r", "border-gray-200"],
                                    )}
                                >
                                    트렌드 반영
                                </td>
                                <td className={twMerge(["px-6", "py-4", "text-gray-600"])}>
                                    제안 받은 시점에서의 최근 트렌드를 반영하는가?
                                </td>
                            </tr>
                            <tr
                                className={twMerge([
                                    "text-sm",
                                    "hover:bg-gray-50",
                                    "transition-colors",
                                ])}
                            >
                                <td
                                    className={twMerge(
                                        ["text-center", "font-semibold"],
                                        ["text-gray-800", "border-r", "border-gray-200"],
                                    )}
                                >
                                    상품행사능력
                                </td>
                                <td className={twMerge(["px-6", "py-4", "text-gray-600"])}>
                                    편의점 채널의 특성을 반영한 행사 기획 능력 및 참여 의지가
                                    있는가?
                                </td>
                            </tr>
                            <tr
                                className={twMerge([
                                    "text-sm",
                                    "hover:bg-gray-50",
                                    "transition-colors",
                                ])}
                            >
                                <td
                                    className={twMerge(
                                        ["text-center", "font-semibold"],
                                        ["text-gray-800", "border-r", "border-gray-200"],
                                    )}
                                >
                                    상품 개선 역량
                                </td>
                                <td className={twMerge(["px-6", "py-4", "text-gray-600"])}>
                                    상품의 맛, 용량, 포장 등 고객니즈를 반영한 개선 가능 역량을
                                    갖추고 있는가?
                                </td>
                            </tr>
                            <tr
                                className={twMerge([
                                    "text-sm",
                                    "hover:bg-gray-50",
                                    "transition-colors",
                                ])}
                            >
                                <td
                                    className={twMerge(
                                        ["text-center", "font-semibold"],
                                        ["text-gray-800", "border-r", "border-gray-200"],
                                    )}
                                >
                                    가격경쟁력
                                </td>
                                <td className={twMerge(["px-6", "py-4", "text-gray-600"])}>
                                    상품 가격이 동일, 유사 카테고리 평균과 비교하여 어떠한가?
                                </td>
                            </tr>
                            <tr
                                className={twMerge([
                                    "text-sm",
                                    "hover:bg-gray-50",
                                    "transition-colors",
                                ])}
                            >
                                <td
                                    className={twMerge(
                                        ["text-center", "font-semibold"],
                                        ["text-gray-800", "border-r", "border-gray-200"],
                                    )}
                                >
                                    생산/납품 능력
                                </td>
                                <td className={twMerge(["px-6", "py-4", "text-gray-600"])}>
                                    당사 판매 계획에 대응 가능한 생산, 납품 능력을 갖추고 있는가?
                                </td>
                            </tr>
                            <tr
                                className={twMerge([
                                    "text-sm",
                                    "hover:bg-gray-50",
                                    "transition-colors",
                                ])}
                            >
                                <td
                                    className={twMerge(
                                        ["text-center", "font-semibold"],
                                        ["text-gray-800", "border-r", "border-gray-200"],
                                    )}
                                >
                                    브랜드 경쟁력
                                </td>
                                <td className={twMerge(["px-6", "py-4", "text-gray-600"])}>
                                    인지도가 있는 상품 브랜드인가?
                                </td>
                            </tr>
                            <tr
                                className={twMerge([
                                    "text-sm",
                                    "hover:bg-gray-50",
                                    "transition-colors",
                                ])}
                            >
                                <td
                                    className={twMerge(
                                        ["text-center", "font-semibold"],
                                        ["text-gray-800", "border-r", "border-gray-200"],
                                    )}
                                >
                                    사회질서 준수
                                </td>
                                <td className={twMerge(["px-6", "py-4", "text-gray-600"])}>
                                    점포 판매 시 사회적 논란을 야기하지 않는가?
                                </td>
                            </tr>
                            <tr
                                className={twMerge([
                                    "text-sm",
                                    "hover:bg-gray-50",
                                    "transition-colors",
                                ])}
                            >
                                <td
                                    className={twMerge(
                                        ["text-center", "font-semibold"],
                                        ["text-gray-800", "border-r", "border-gray-200"],
                                    )}
                                >
                                    품질 / 위생
                                </td>
                                <td className={twMerge(["px-6", "py-4", "text-gray-600"])}>
                                    당사 품질 / 위생 기준에 부합하는가?
                                </td>
                            </tr>
                            <tr
                                className={twMerge([
                                    "text-sm",
                                    "hover:bg-gray-50",
                                    "transition-colors",
                                ])}
                            >
                                <td
                                    className={twMerge(
                                        ["text-center", "font-semibold"],
                                        ["text-gray-800", "border-r", "border-gray-200"],
                                    )}
                                >
                                    신뢰성
                                </td>
                                <td className={twMerge(["px-6", "py-4", "text-gray-600"])}>
                                    보유 중인 상품 또는 평판과 관련하여 사회적 이슈가 있었는가?
                                </td>
                            </tr>
                            <tr
                                className={twMerge([
                                    "text-sm",
                                    "hover:bg-gray-50",
                                    "transition-colors",
                                ])}
                            >
                                <td
                                    className={twMerge(
                                        ["text-center", "font-semibold"],
                                        ["text-gray-800", "border-r", "border-gray-200"],
                                    )}
                                >
                                    점포 운영 적합성
                                </td>
                                <td className={twMerge(["px-6", "py-4", "text-gray-600"])}>
                                    편의점 운영에 적합한 사이즈, 무게의 상품인가?
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <p className="mt-4 text-xs text-gray-500 leading-relaxed">
                        * 특정 심사 항목 기준에 부합하지 않는다고 거래 불가한 것이 아닌, 종합적으로
                        상품 도입 평가를 진행합니다.
                    </p>
                </div>
            </Accordion>
            <Accordion title="홍보물 비용분담 기준" defaultOpen={false}>
                <div className={twMerge(["flex", "gap-4"])}>
                    <img src={pr01} alt={"홍보물 비용"} />
                    <div className={twMerge(["flex", "flex-col", "gap-6", "text-black"])}>
                        <h1 className={"text-lg mt-2"}>홍보물 비용 분담 결정</h1>
                        <p className={"text-xs"}>
                            당사 홍보물 등 제작 요건 및 비용분담 기준을 아래와 같이 안내드립니다.
                        </p>
                    </div>
                </div>
                <div className={twMerge(["overflow-x-auto", "my-8"])}>
                    <div className={twMerge(["flex", "flex-col", "space-y-2"])}>
                        <img className={"w-6"} src={circleBar} alt={"Bar"} />
                        <p className={"text-lg font-semibold pb-4 text-black"}>결정기준</p>
                    </div>
                    <table className="min-w-full bg-white border-t-2 border-gray-800">
                        <thead>
                            <tr
                                className={twMerge(
                                    ["bg-gray-50", "border-b", "border-gray-200"],
                                    ["text-center", "text-sm", "font-bold"],
                                )}
                            >
                                <th
                                    className={twMerge(
                                        ["px-6", "py-2"],
                                        ["text-gray-700", "w-1/4", "border-r", "border-gray-300"],
                                    )}
                                >
                                    구분
                                </th>
                                <th className={twMerge(["px-6", "py-4"], ["text-gray-700"])}>
                                    내용
                                </th>
                            </tr>
                        </thead>

                        <tbody className={twMerge(["divide-y", " divide-gray-100"])}>
                            <tr
                                className={twMerge([
                                    "text-sm",
                                    "hover:bg-gray-50",
                                    "transition-colors",
                                ])}
                            >
                                <td
                                    className={twMerge(
                                        ["text-center", "font-semibold"],
                                        ["text-gray-800", "border-r", "border-gray-200"],
                                    )}
                                >
                                    요건
                                </td>
                                <td className={twMerge(["px-6", "py-4", "text-gray-600"])}>
                                    홍보물 등은 해당 상품의 판매촉진을 위해 제작하여야 합니다.
                                </td>
                            </tr>
                            <tr
                                className={twMerge([
                                    "text-sm",
                                    "hover:bg-gray-50",
                                    "transition-colors",
                                ])}
                            >
                                <td
                                    className={twMerge(
                                        ["text-center", "font-semibold"],
                                        ["text-gray-800", "border-r", "border-gray-200"],
                                    )}
                                >
                                    비용 분담
                                </td>
                                <td className={twMerge(["px-6", "py-4", "text-gray-600"])}>
                                    홍보물 등의 비용은 당사와 협력사 간 협의를 통해 합리적인
                                    수준으로 분담하도록 합니다.
                                </td>
                            </tr>
                            <tr
                                className={twMerge([
                                    "text-sm",
                                    "hover:bg-gray-50",
                                    "transition-colors",
                                ])}
                            >
                                <td
                                    className={twMerge(
                                        ["text-center", "font-semibold"],
                                        ["text-gray-800", "border-r", "border-gray-200"],
                                    )}
                                >
                                    제재
                                </td>
                                <td className={twMerge(["px-6", "py-4", "text-gray-600"])}>
                                    당사의 임직원은 업무 수행과정에서 해당 규정을 준수해야 하며,
                                    임직원이 이를 위반한 사실이 발견될 경우에는 당시의 윤리규범 등에
                                    따라 징계등 제재 조치를 받을 수 있습니다.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Accordion>
            <Accordion title="판매장려금 결정 기준" defaultOpen={false}>
                <div className={twMerge(["flex", "gap-4"])}>
                    <img src={pr02} alt={"판매장려금"} />
                    <div className={twMerge(["flex", "flex-col", "gap-6", "text-black"])}>
                        <h1 className={"text-lg mt-2"}>판매장려금의 결정 기준 및 결정 절차</h1>
                        <p className={"text-xs"}>
                            당사는 협력회사와 본 계약 제 8조 2항에 따라 판매장려금의 결정 기준, 결정
                            절차 및 변경사유, 변경기준, 변경절차를 정하고 있으며 아래와 같이 안내
                            해드립니다.
                        </p>
                    </div>
                </div>
                <div className={twMerge(["overflow-x-auto", "my-8"])}>
                    <div className={twMerge(["flex", "flex-col", "space-y-2"])}>
                        <img className={"w-6"} src={circleBar} alt={"Bar"} />
                        <p className={"text-lg font-semibold pb-4 text-black"}>결정기준</p>
                    </div>
                    <table className="min-w-full bg-white border-t-2 border-gray-800">
                        <thead>
                            <tr
                                className={twMerge(
                                    ["bg-gray-50", "border-b", "border-gray-200"],
                                    ["text-center", "text-sm", "font-bold"],
                                )}
                            >
                                <th
                                    className={twMerge(
                                        ["px-6", "py-2"],
                                        ["text-gray-700", "w-1/4", "border-r", "border-gray-300"],
                                    )}
                                >
                                    구분
                                </th>
                                <th className={twMerge(["px-6", "py-4"], ["text-gray-700"])}>
                                    내용
                                </th>
                            </tr>
                        </thead>

                        <tbody className={twMerge(["divide-y", " divide-gray-100"])}>
                            <tr
                                className={twMerge([
                                    "text-sm",
                                    "hover:bg-gray-50",
                                    "transition-colors",
                                ])}
                            >
                                <td
                                    className={twMerge(
                                        ["text-center", "font-semibold"],
                                        ["text-gray-800", "border-r", "border-gray-200"],
                                    )}
                                >
                                    협의
                                </td>
                                <td className={twMerge(["px-6", "py-4", "text-gray-600"])}>
                                    본 계약 체결 전, 당사와의 거래 품목 상품의 담당자 및 팀장 등
                                    관련자와 협력회사의 담당자, 관리자 등의 실무자 간 상기 결정 기준
                                    등을 종합적 고려사항으로 하여, 거래상 우월적 지위를 남용하지
                                    않고, 상호 동반 성장의 기조를 유지하는 공정하고 투명한 사전
                                    협의를 충분히 거친 후, “판매장려금”에 대한 협의안을 마련합니다.
                                </td>
                            </tr>
                            <tr
                                className={twMerge([
                                    "text-sm",
                                    "hover:bg-gray-50",
                                    "transition-colors",
                                ])}
                            >
                                <td
                                    className={twMerge(
                                        ["text-center", "font-semibold"],
                                        ["text-gray-800", "border-r", "border-gray-200"],
                                    )}
                                >
                                    결정
                                </td>
                                <td className={twMerge(["px-6", "py-4", "text-gray-600"])}>
                                    위 협의안에 대하여, 각각 대표이사 또는 이에 준하는
                                    의사결정권자의 확인, 동의 등의 절차를 통해 최종적으로
                                    ‘판매장려금’에 대한 내용을 확정 후, 합의(약정)하도록 합니다.
                                </td>
                            </tr>
                            <tr
                                className={twMerge([
                                    "text-sm",
                                    "hover:bg-gray-50",
                                    "transition-colors",
                                ])}
                            >
                                <td
                                    className={twMerge(
                                        ["text-center", "font-semibold"],
                                        ["text-gray-800", "border-r", "border-gray-200"],
                                    )}
                                >
                                    재협의
                                </td>
                                <td className={twMerge(["px-6", "py-4", "text-gray-600"])}>
                                    위 ‘협의’ 또는 ‘합의(결정)’ 불성립 시, 합의 성립 시까지 거래가
                                    개시되지 않으며, 상호 합의 도출 시까지 충분한 재협의를 하도록
                                    합니다. 다만, 기존 거래가 있는 경우는 합의 성립 시 까지
                                    한시적으로 기존 장려금 조건을 유지하며, 변경 “판매장려금”의 적용
                                    시점은 합의에 따라 정하여 적용하도록 합니다.
                                </td>
                            </tr>
                            <tr
                                className={twMerge([
                                    "text-sm",
                                    "hover:bg-gray-50",
                                    "transition-colors",
                                ])}
                            >
                                <td
                                    className={twMerge(
                                        ["text-center", "font-semibold"],
                                        ["text-gray-800", "border-r", "border-gray-200"],
                                    )}
                                >
                                    제재
                                </td>
                                <td className={twMerge(["px-6", "py-4", "text-gray-600"])}>
                                    당사의 임직원은 업무 수행 과정에서 해당 규정을 준수해야 하며,
                                    임직원이 이를 위반한 사실이 발견될 경우에는 당사의 윤리규범 등에
                                    따라 징계 등 제재 조치를 받을 수 있습니다.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={twMerge(["flex", "flex-col", "space-y-2"])}>
                    <img className={"w-6"} src={circleBar} alt={"Bar"} />
                    <p className={"text-lg font-semibold pb-4 text-black"}>
                        변경 사유 / 변경 기준 / 변경 절차
                    </p>
                    <span className={'text-xs text-black leading-5'}>
                        당사와 협력회사는 납품 상품 원료의 원료대 및 수급 상황, 경기 변화, 시장
                        상황의 변동, 매출액의 변동, 이에 준하는 당사 또는 협력회사의 정당한 사유가
                        있는 경우 등으로 판매장려금의 변경이 필요한 경우, 해당 변경 “필요 사유” 및
                        상기 “결정 기준”을 “변경 기준”으로 하고, 상기 “결정 절차”와 같은 변경 절차를
                        통해, 변경하도록 합니다. 다만, 정당한 사유 없이 판매장려금의 비율 또는 액수
                        등의 계약조건을 변경하는 것은 불가한 것으로 합니다.
                    </span>
                    <span className={'text-xs text-gray-600'}>
                       * 2013.10.8. 이후 재계약 및 신규 계약 업체에 대하여 공정위에서 제정한 판매장려금 심사 지침을 준용합니다.
                    </span>
                </div>
            </Accordion>
        </div>
    );
}
export default SellerCriteria;
