import { twMerge } from "tailwind-merge";
import vip from "../../assets/images/benefit/bg_point_vip_01.png";
import friend from "../../assets/images/benefit/bg_point_friend_01.png";
import saveanduse from "../../assets/images/benefit/img_point_save_01.png";
import save02 from "../../assets/images/benefit/img_point_save_02.png";
import use02 from "../../assets/images/benefit/img_point_use_02.png";
import use03 from "../../assets/images/benefit/img_point_use_03.png";
import use04 from "../../assets/images/benefit/img_point_use_04.png";

function MembershipPoint() {
    return (
        <div className={twMerge(["flex", "flex-col", "space-y-15"])}>
            {/*등급 및 혜택 */}
            <div className={twMerge(["flex", "flex-col", "gap-4"])}>
                <h1 className={twMerge(["font-medium", "text-2xl"])}>등급 및 혜택</h1>
                <p className={twMerge(["text-md", "text-gray-500"])}>
                    등급별 구매금액의{" "}
                    <span className={"text-[#772b8f]"}>최대 2%가 포인트로 적립</span>
                    됩니다.
                </p>
                <div
                    className={twMerge(
                        ["border", "border-gray-300", "px-15", "py-20"],
                        ["flex", "justify-center", "items-center"],
                    )}
                >
                    <div className={twMerge(["flex-1", "flex", "gap-10"])}>
                        <img src={vip} alt={"vip"} />
                        <div className={twMerge(["flex", "flex-col", "gap-5"])}>
                            <p className={twMerge(["font-bold", "text-lg"])}>적립률 2% </p>
                            <p className={twMerge(["text-md", "text-gray-500"])}>
                                {" "}
                                <span className={"text-[#772b8f]"}>3</span>개월 연속 <br /> 월{" "}
                                <span className={"text-[#772b8f]"}>3</span>만원 이상 구매 시
                            </p>
                        </div>
                    </div>
                    <div
                        className={twMerge(
                            ["flex-1", "flex", "gap-10"],
                            ["border-l", "border-dotted", "pl-20", "border-gray-400"],
                        )}
                    >
                        <img src={friend} alt={"friend"} className={"w-25 h-25"} />
                        <div className={twMerge(["flex", "flex-col"])}>
                            <p className={twMerge(["font-bold", "text-lg"])}>적립률 최대 1% </p>
                            <p className={twMerge(["text-md", "text-gray-500"])}>회원가입시</p>
                            <ul>
                                <li>- 0.5% 기본적립</li>
                                <li>- 0.5% CU페이 추가적립</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={twMerge(["text-gray-500", "leading-8", "mt-10"])}>
                    <ul
                        className={twMerge([
                            "list-disc",
                            "marker:text-xs",
                            "list-outside",
                            "pl-4",
                            "text-[15px]",
                        ])}
                    >
                        <li>등급은 매월 1일 설정되며, 등급 재산정 일까지 적용됩니다.</li>
                        <li>
                            단, 카드 이용 기간이 3개월 미만일 경우에는 이용 월수에 대한 이용 금액의
                            평균으로 회원 등급을 산정합니다.
                            <br />
                            (예시 : 1, 2개월 이용 고객의 경우 2개월 월 평균 적립 금액을 적용하여,
                            등급 산정)
                            <br />
                            (예시 : 2, 3개월 적립시 담배, 유가증권등을 제외한 3개월 합계 금액이
                            9만원 기준 등급 산정)
                        </li>
                        <li>
                            포인트 적립은 1일 3회까지, 회당 2,000포인트까지 적립 가능하고 포인트
                            사용 횟수는 제한이 없습니다.
                        </li>
                        <li>
                            FRIEND 고객은 포켓CU CU페이로 결제 시 0.5% 추가적립됩니다.
                            <br />※ 추가적립 CU페이 결제 수단 : 포켓CU CU페이 머니·카드·계좌,
                            잔돈충전
                        </li>
                        <li>
                            미등록카드는 일 3회, 총 30회까지만 적립이 가능하고, 그 후부터는 적립이
                            제한되며, 회원가입 및 카드등록 후 적립, 사용 가능합니다.
                        </li>
                        <li>CU 멤버십 적립과 SKT멤버십 할인은 중복 적용 불가합니다.</li>
                    </ul>
                </div>
            </div>
            {/* 적립 방법 안내 */}
            <div className={twMerge(["flex", "flex-col", "gap-10"])}>
                <h1 className={twMerge(["font-medium", "text-2xl"])}>적립 방법 안내</h1>
                <p className={twMerge(["text-md", "text-gray-500"])}>
                    다양한 방법으로
                    <span className={"text-[#772b8f]"}>CU멤버십 포인트를 적립</span>
                    받으실 수 있습니다.
                </p>
                <div className={twMerge(["flex", "gap-10"])}>
                    <img src={saveanduse} alt={"save"} />
                    <div className={twMerge(["flex", "flex-col", "space-y-4"])}>
                        <h1 className={twMerge(["text-xl"])}>포인트 적립 방법</h1>
                        <ul
                            className={twMerge(
                                ["list-disc", "marker:text-xs", "list-outside", "pl-4"],
                                ["text-[15px]", "text-gray-500"],
                            )}
                        >
                            <li>
                                CU 점포에서 상품 구매시, 포켓CU QR 또는 CU 멤버십 실물카드를
                                제시하시면, <br />{" "}
                                <span className={"text-[#772b8f]"}>
                                    구매 금액과 회원 등급의 적립률에 따라 포인트가 적립
                                </span>
                                됩니다.
                            </li>
                            <li className={twMerge(["pt-3"])}>
                                CU 멤버십 회원가입이 되어있으신 경우 포켓CU QR 또는 CU 멤버십
                                실물카드를 소지 하지 않으셨을 경우에도 <br />{" "}
                                <span className={"text-[#772b8f]"}>
                                    휴대폰번호를 입력하시면, 포인트 적립이 가능
                                </span>
                                합니다..
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={twMerge(["flex", "gap-10"])}>
                    <img src={save02} alt={"savepoint"} />
                    <div className={twMerge(["flex", "flex-col", "space-y-4"])}>
                        <h1 className={twMerge(["text-xl"])}>포인트 적립 가능 상품</h1>
                        <ul
                            className={twMerge(
                                ["list-disc", "marker:text-xs", "list-outside", "pl-4"],
                                ["text-[15px]", "text-gray-500"],
                            )}
                        >
                            <li className={twMerge(["pt-3"])}>
                                일부 예외상품을 제외한 CU 점포에서 판매중인 모든 상품(주류 포함)
                            </li>
                        </ul>
                        <p className={"text-sm text-gray-500"}>
                            ※적립 예외상품 : 담배, 유가증권, 결제대행서비스(택배, 로또, 토토 등),
                            일부 비식품 면세상품(쓰레기봉투 등)
                        </p>
                    </div>
                </div>
            </div>
            {/* 간편한 포인트 사용 */}
            <div className={twMerge(["flex", "flex-col", "gap-10"])}>
                <h1 className={twMerge(["font-medium", "text-2xl"])}>간편한 포인트 사용</h1>
                <p className={twMerge(["text-md", "text-gray-500"])}>
                    CU멤버십 포인트는 적립 즉시 사용가능하며,
                    <span className={"text-[#772b8f]"}>
                        100포인트 이상 적립되어 있을 경우 10포인트 단위로 현금처럼 사용 가능
                    </span>
                    합니다.
                </p>
                <div className={twMerge(["flex", "gap-10"])}>
                    <img src={saveanduse} alt={"save"} className={"h-40"} />
                    <div className={twMerge(["flex", "flex-col",'gap-2'])}>
                        <h1 className={twMerge(["text-xl"])}>포인트 사용 방법</h1>
                        <ul
                            className={twMerge(
                                ["list-disc", "marker:text-xs", "list-outside", "pl-4"],
                                ["text-[15px]", "text-gray-500"],
                            )}
                        >
                            <li>
                                CU 점포에서 상품 구매 시 포켓CU QR 또는 CU 멤버십 실물카드를
                                제시하면 포인트를 사용하실 수 있으며, <br />{" "}
                                <span className={"text-[#772b8f]"}>
                                    총 결제 금액에서 사용하신 포인트 만큼 금액이 차감됩니다.
                                </span>
                            </li>
                        </ul>
                        <p className={twMerge(["text-gray-500"])}>
                            ① 포켓CU QR / 실물카드 / 제휴카드 사용 시
                        </p>
                        <ol
                            className={twMerge(
                                ["list-disc", "marker:text-xs", "list-outside", "pl-8"],
                                ["text-[15px]", "text-gray-500"],
                            )}
                        >
                            <li>10,000 포인트 미만 : 비밀번호 입력 없이 사용 가능</li>
                            <li>10,000 포인트 이상 : 비밀번호 4자리 입력 후 사용 가능</li>
                        </ol>
                        <p className={twMerge(["text-gray-500"])}>
                            ② 포켓CU QR / 실물카드 미지참 시
                        </p>
                        <ol
                            className={twMerge(
                                ["list-disc", "marker:text-xs", "list-outside", "pl-8"],
                                ["text-[15px]", "text-gray-500"],
                            )}
                        >
                            <li>휴대폰 번호와 비밀번호 입력 후 사용 가능</li>
                        </ol>
                    </div>
                </div>
                <div className={twMerge(["flex", "gap-10"])}>
                    <img src={use02} alt={"pointProduct"} />
                    <div className={twMerge(["flex", "flex-col", "space-y-4"])}>
                        <h1 className={twMerge(["text-xl"])}>포인트 사용 가능 상품</h1>
                        <ul
                            className={twMerge(
                                ["list-disc", "marker:text-xs", "list-outside", "pl-4"],
                                ["text-[15px]", "text-gray-500"],
                            )}
                        >
                            <li className={twMerge(["pt-3"])}>
                                일부 예외상품을 제외한 CU 점포에서 판매중인 모든 상품(주류 포함)
                            </li>
                        </ul>
                        <p className={"text-sm text-gray-500"}>
                            ※사용 예외상품 : 담배, 유가증권, 결제대행서비스(택배, 로또, 토토 등),
                            일부 비식품 면세상품(쓰레기봉투 등)
                        </p>
                    </div>
                </div>
                <div className={twMerge(["flex", "gap-10"])}>
                    <img src={use03} alt={"pointUntil"} />
                    <div className={twMerge(["flex", "flex-col", "space-y-4"])}>
                        <h1 className={twMerge(["text-xl"])}>포인트 유효기간</h1>
                        <ul
                            className={twMerge(
                                ["list-disc", "marker:text-xs", "list-outside", "pl-4"],
                                ["text-[15px]", "text-gray-500",'space-y-4'],
                            )}
                        >
                            <li>
                                적립된 포인트는 포인트
                                <span className={"text-[#772b8f]"}>적립일로부터 60개월까지</span>
                                사용 가능합니다.
                                <p className={"text-sm"}>
                                    (이벤트 참여 혹은 보상을 통해 적립된 멤버십포인트 유효기간 별도
                                    안내)
                                </p>
                            </li>
                            <li>
                                <span className={"text-[#772b8f]"}>
                                    유효기간이 지난 포인트는 자동 소멸
                                </span>
                                됩니다.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <img src={use04} alt={"pointUntilLine"} className={twMerge(['flex','items-center','justify-center','ml-20','w-210'])}/>
        </div>
    );
}
export default MembershipPoint;
