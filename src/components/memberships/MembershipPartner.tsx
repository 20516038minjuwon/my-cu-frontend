import { twMerge } from "tailwind-merge";
import majorCard01 from"../../assets/images/membershipPartner/img_partner_card_01.png"
import majorCard02 from"../../assets/images/membershipPartner/img_partner_card_02.png"
import majorCard03 from"../../assets/images/membershipPartner/img_partner_card_03.png"
import mobilePay01 from"../../assets/images/membershipPartner/img_partner_pay_01.png"
import mobilePay02 from"../../assets/images/membershipPartner/img_partner_pay_02.png"
import mobilePay03 from"../../assets/images/membershipPartner/img_partner_pay_05.png"
import mobilePay04 from"../../assets/images/membershipPartner/img_partner_pay_03.png"
import smartWallet01 from"../../assets/images/membershipPartner/img_partner_wallet_01.png"
import smartWallet02 from"../../assets/images/membershipPartner/img_partner_wallet_02.png"
import smartWallet03 from"../../assets/images/membershipPartner/img_partner_wallet_03.png"
import anotherCard01 from"../../assets/images/membershipPartner/img_partner_etc_01.png"
import anotherCard02 from"../../assets/images/membershipPartner/img_partner_etc_02.png"

function MembershipPartner(){
    return<div className={twMerge(["flex", "flex-col", "space-y-12"])}>
        <div>
            <h1 className={twMerge(["font-medium", "text-2xl"])}>CU 멤버십 혜택은 기본!<br/>
                다양하고 편리한 멤버십 제휴 서비스</h1>
            <p className={twMerge(["text-md", "text-gray-500",'pt-5'])}>
                <span className={"text-[#772b8f]"}>혜택에 집중한 제휴카드부터 결제 시 자동으로 적립해주는 페이까지, </span>
                상황에 따라 편리하게 선택해서 쓰세요.
            </p>
        </div>
        <section className={twMerge(['flex','flex-col','gap-10'])}>
            <h1 className={twMerge(['text-xl'])}>주요 멤버십 제휴카드</h1>
            <div className={twMerge(['grid','grid-cols-3','gap-x-20','gap-y-16'])}>
                <div className={twMerge(['flex','flex-col','items-center'])}>
                    <img src={majorCard01} alt={"KB check card"} />
                    <p className={'text-center pt-5'}>KB 국민 체크카드</p>
                </div>
                <div className={twMerge(['flex','flex-col','items-center'])}>
                    <img src={majorCard02} alt={"uri BC card"} />
                    <p className={'text-center  pt-5'}>우리 BC 다모아카드</p>
                </div>
                <div className={twMerge(['flex','flex-col','items-center'])}>
                    <img src={majorCard03} alt={"hana Sk card"} />
                    <p className={'text-center  pt-5'}>하나 SK메가 캐쉬백 더드림카드</p>
                </div>
            </div>
        </section>
        <section className={twMerge(['flex','flex-col','gap-10'])}>
            <h1 className={twMerge(['text-xl'])}>모바일 페이</h1>
            <p className={'text-gray-500'}>아래 모바일페이 이외 정보는 모바일페이 홈페이지 안내 참조</p>
            <div className={twMerge(['grid','grid-cols-3','gap-x-20','gap-y-16'])}>
                <div className={twMerge(['flex','flex-col','items-center'])}>
                    <img src={mobilePay01} alt={"samsung Pay"} />
                    <p className={'text-center pt-5'}>삼성페이</p>
                </div>
                <div className={twMerge(['flex','flex-col','items-center'])}>
                    <img src={mobilePay02} alt={"kakao pay"} />
                    <p className={'text-center  pt-5'}>카카오페이</p>
                </div>
                <div className={twMerge(['flex','flex-col','items-center'])}>
                    <img src={mobilePay03} alt={"n pay"} />
                    <p className={'text-center  pt-5'}>네이버페이</p>
                </div>
                <div className={twMerge(['flex','flex-col','items-center'])}>
                    <img src={mobilePay04} alt={"pay-co"} />
                    <p className={'text-center  pt-5'}>페이코</p>
                </div>
            </div>
        </section>
        <section className={twMerge(['flex','flex-col','gap-10'])}>
            <h1 className={twMerge(['text-xl'])}>스마트 월렛</h1>
            <div className={twMerge(['grid','grid-cols-3','gap-x-20','gap-y-16'])}>
                <div className={twMerge(['flex','flex-col','items-center'])}>
                    <img src={smartWallet01} alt={"syrup"} />
                    <p className={'text-center pt-5'}>시럽</p>
                </div>
                <div className={twMerge(['flex','flex-col','items-center'])}>
                    <img src={smartWallet02} alt={"clip"} />
                    <p className={'text-center  pt-5'}>클립(CLIP)</p>
                </div>
                <div className={twMerge(['flex','flex-col','items-center'])}>
                    <img src={smartWallet03} alt={"u+members"} />
                    <p className={'text-center  pt-5'}>U+멤버스</p>
                </div>
            </div>
        </section>
        <section className={twMerge(['flex','flex-col','gap-10'])}>
            <h1 className={twMerge(['text-xl'])}>기타</h1>
            <div className={twMerge(['grid','grid-cols-3','gap-x-20','gap-y-16'])}>
                <div className={twMerge(['flex','flex-col','items-center'])}>
                    <img src={anotherCard01} alt={"CU plus t-money"}/>
                    <p className={'text-center pt-5'}>CU 플러스 티머니</p>
                </div>
                <div className={twMerge(['flex','flex-col','items-center'])}>
                    <img src={anotherCard02} alt={"cu cash-be"} />
                    <p className={'text-center  pt-5'}>CU 캐시비 교통카드</p>
                </div>
            </div>
        </section>
    </div>
}
export default MembershipPartner;