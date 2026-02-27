import BGFretail from "../../assets/images/seller/consult03_img.jpg";
import purpleBar from "../../assets/images/seller/bullet_bar.png";
import circleBar from "../../assets/images/seller/imgi_21_bullet_purple.png";
import { twMerge } from "tailwind-merge";

function SellerApply() {
    return (
        <div className={twMerge(["flex", "flex-col", "space-y-6"])}>
            <div className={twMerge([])}>
                <img src={BGFretail} alt={"BGF 리테일"} />
            </div>
            <div className={twMerge(["flex", "flex-col", "gap-10"])}>
                <div>
                    <img className={"w-6"} src={purpleBar} alt={"바"} />
                    <p className={twMerge(["font-bold", "text-lg", "mt-3"])}>상담안내 </p>
                </div>
                <div className={twMerge(["flex", "items-center", "gap-4"])}>
                    <img className={twMerge(["w-3", "h-3"])} src={circleBar} alt={"동그라미 바"} />
                    <p className={twMerge(["text-lg"])}>
                        {" "}
                        CU 고객센터 : <span className={"text-[#772b8f]"}>1577 - 8007</span>
                    </p>
                </div>
                <div className={twMerge(["flex", "flex-col", "gap-3"])}>
                    <div className={twMerge(["flex", "items-center", "gap-4"])}>
                        <img
                            className={twMerge(["w-3", "h-3"])}
                            src={circleBar}
                            alt={"동그라미 바"}
                        />
                        <p className={twMerge(["text-lg"])}> 안내사항</p>
                    </div>
                    <li className={twMerge(["ml-5", "text-sm"])}>
                        상담 신청 완료 후 담당 카테고리 MD 컴토 후 문자메세지를 통해 결과를
                        안내드리며, 추가 상담 일정에 대해 연락 드립니다.
                        <br />
                        (문자 확인 후 입점상담시스탬 내 상세 결과 확인)
                    </li>
                    <li className={twMerge(["ml-5", "text-sm"])}>
                        상담 신청시 회사소개, 제품소개 상세 내용은 PPT, PDF등 파일로 작성하여
                        첨부파일 등록시 원활한 상담 가능
                    </li>
                    <li className={twMerge(["ml-5", "text-sm"])}>
                        점포 임대 문의는 최상단 메뉴의 창업ㆍ상생 ▶ 점포물건 ▶ 점포임대제안 메뉴
                        활용
                    </li>
                </div>
                <div className={twMerge(["flex", "flex-col", "gap-3"])}>
                    <div className={twMerge(["flex", "items-center", "gap-4"])}>
                        <img
                            className={twMerge(["w-3", "h-3"])}
                            src={circleBar}
                            alt={"동그라미 바"}
                        />
                        <p className={twMerge(["text-lg"])}> 거래원칙</p>
                    </div>
                    <li className={twMerge(["ml-5", "text-sm"])}>
                        BGF리테일은 제조업체와 직거래/직매입을 원칙으로 합니다.
                    </li>
                </div>
                <div className={twMerge(["flex", "flex-col", "gap-3"])}>
                    <div className={twMerge(["flex", "items-center", "gap-4"])}>
                        <img
                            className={twMerge(["w-3", "h-3"])}
                            src={circleBar}
                            alt={"동그라미 바"}
                        />
                        <p className={twMerge(["text-lg"])}> 상담원칙</p>
                    </div>
                    <li className={twMerge(["ml-5", "text-sm"])}>
                        상담 과정에서 부당하게 불이익을 주거나 경제적 이익을 요구하지 않습니다.
                    </li>
                    <li className={twMerge(["ml-5", "text-sm"])}>
                        상담 과정에서 경영정보, 기술자료, 지적재산권을 부당하게 요구하지 않습니다.
                    </li>
                    <li className={twMerge(["ml-5", "text-sm"])}>
                        당사 임직원이 이를 위반한 사실이 발견될 경우에는 당사의 윤리규범 등에 따라
                        징계 등 제재 조치를 받을 수 있습니다.
                    </li>
                </div>
            </div>
        </div>
    );
}
export default SellerApply;
