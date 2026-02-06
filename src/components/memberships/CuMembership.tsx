import bg01 from "../../assets/images/cu membership/img_mship_info_01.png";
import pokeyCu from "../../assets/images/cu membership/img_mship_card_02.png";
import card from "../../assets/images/cu membership/img_mship_card_01.png";
import { twMerge } from "tailwind-merge";

function CuMembership() {
    return (
        <div className="min-h-screen bg-white">
            <section
                className={twMerge(
                    ["max-w-7xl", "px-6", "py-10"],
                    ["flex", "justify-between"],
                )}
            >
                <div className={twMerge(["flex"])}>
                    <div className={"space-y-4 w-130"}>
                        <h1
                            className={twMerge([
                                "text-2xl",
                                "pb-3",
                            ])}
                        >
                            CU 멤버십
                        </h1>
                        <div className={twMerge(["flex", "flex-col", "pt-3"])}>
                            <span
                                className={twMerge([
                                    "text-md",
                                    "text-gray-600",
                                ])}
                            >
                                CU멤버십은,
                                <br />
                                전국 CU점포에서 사용금액에 따라 포인트를
                                적립해드리고,
                                <br />
                                적립된 포인트를 매장에서 현금처럼 사용할 수 있는{" "}
                                <br />
                                <span className={"text-[#772b8f]"}>
                                    포인트 적립형 멤버십
                                </span>
                                입니다.
                            </span>
                        </div>
                    </div>
                    <div
                        className={twMerge([
                            "flex",
                            "items-center",
                            "justify-center",
                        ])}
                    >
                        <img src={bg01} alt={"bg01"} />
                    </div>
                </div>
            </section>
            <section
                className={twMerge(
                    ["max-w-7xl", "px-6", "py-10",'gap-7'],
                    ["flex",'flex-col', "justify-between"],
                )}
            >
                <h1 className={twMerge(['text-2xl'])}>이용 방법</h1>
                <div className={twMerge(["flex",'gap-5'])}>
                    <img src={pokeyCu} alt={pokeyCu} className={"w-60 h-40"} />
                    <ul className={twMerge(['flex','flex-col','gap-4','top-3'])}>
                        <h2 className={'text-lg'}>포켓 CU QR</h2>
                        <li className={twMerge(['list-disc','text-gray-700','text-[15px]'])}>
                            포켓CU 앱을 다운로드하고 회원가입 시 자동으로
                            멤버십이 만들어집니다.
                        </li>
                        <li className={twMerge(['list-disc','text-gray-700','text-[15px]'])}>
                            모바일 멤버십은 별도의 등록 절차 없이 점포에서
                            간편하게 포인트 적립, 사용이 가능합니다.
                        </li>
                    </ul>
                </div>
                <div className={twMerge(["flex",'gap-5','items-center', 'justify-center'])}>
                    <img src={card} alt={card} className={"w-60 h-30"} />
                    <ul className={twMerge(['flex','flex-col','gap-4','top-3'])}>
                        <h2 className={'text-lg'}>CU 멤버십 실물카드</h2>
                        <span className={twMerge(['text-sm','text-gray-700'])}>
                            .2020년 이후, 실물카드 발급이 중단되었으며 분실 시
                            재발급이 불가능하니 이용에 유의 부탁드립니다.
                            <br />
                            (단, 분실신고 시 적립된 포인트는 소멸되지 않습니다.)
                        </span>
                        <li>실물카드를 보유 중인 경우</li>
                        <li className={twMerge(['list-disc','text-gray-700','text-[15px]'])}>
                            CU 홈페이지 또는 포켓CU 앱을 통해 회원가입 및 카드
                            등록을 해야 정상적인 서비스 이용이 가능합니다.
                        </li>
                        <li className={twMerge(['list-disc','text-gray-700','text-[15px]'])}>
                            미등록 카드는 포인트 적립만 가능하며 사용은 카드
                            등록 후 가능합니다.
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
export default CuMembership;
