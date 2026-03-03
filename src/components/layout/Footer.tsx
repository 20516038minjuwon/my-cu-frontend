import { twMerge } from "tailwind-merge";
import logo from"../../assets/logo.png"
function Footer() {
    return (
        <footer className={twMerge(['w-full', 'bg-[#f4f4f4]', 'py-14', 'px-8', 'lg:px-24', 'font-sans', 'text-[#666]', 'text-[13px]'])}>
            <div className={twMerge(['max-w-[1200px]', 'mx-auto', 'flex', 'flex-col', 'lg:flex-row', 'justify-between', 'items-start', 'gap-16'])}>

                {/*CU 정보*/}
                <div className={twMerge(['flex-1', 'space-y-5'])}>
                    <div className={twMerge(['mb-4'])}>
                        <img src={logo} alt="CU Logo" className={twMerge(['h-7', 'opacity-80'])} />
                    </div>
                    <address className={twMerge(['not-italic', 'leading-relaxed'])}>
                        <p className={twMerge(['mb-1'])}>BGF리테일 서울시 강남구 테헤란로 405(삼성동)</p>
                        <p className={twMerge(['tracking-tight', 'uppercase', 'mb-1'])}>COPYRIGHT © BGFretail ALL RIGHT RESERVED.</p>
                        <p>TEL: 1577-8007</p>
                        <p>대표자 민승배</p>
                        <p>사업자 등록 번호 893-88-00792</p>
                    </address>

                    <div className={twMerge(['flex', 'gap-4', 'pt-2', 'items-center', 'grayscale', 'opacity-60'])}>
                        <span className={twMerge(['font-serif', 'font-bold', 'text-lg', 'cursor-pointer', 'hover:text-black'])}>f</span>
                        <span className={twMerge(['font-bold', 'text-lg', 'cursor-pointer', 'hover:text-black'])}>X</span>
                        <span className={twMerge(['font-bold', 'cursor-pointer', 'hover:text-black', 'underline', 'underline-offset-4'])}>blog</span>
                        <span className={twMerge(['font-bold', 'text-lg', 'cursor-pointer', 'hover:text-black'])}>O</span>
                        <span className={twMerge(['font-bold', 'text-lg', 'cursor-pointer', 'hover:text-black'])}>Y</span>
                    </div>
                </div>

                {/*Quick Menu*/}
                <div className={twMerge(['flex-[1.2]'])}>
                    <h3 className={twMerge(['text-[#7d32ff]', 'font-bold', 'text-base', 'mb-5'])}>Quick Menu</h3>
                    <div className={twMerge(['flex', 'gap-20'])}>
                        <ul className={twMerge(['space-y-2.5'])}>
                            <li><a href="#" className={twMerge(['hover:text-black'])}>입점상담</a></li>
                            <li><a href="#" className={twMerge(['hover:text-black'])}>제휴/광고 문의</a></li>
                            <li><a href="#" className={twMerge(['hover:text-black'])}>매장찾기</a></li>
                            <li><a href="#" className={twMerge(['hover:text-black'])}>발주 및 배송데이터</a></li>
                            <li><a href="#" className={twMerge(['hover:text-black'])}>전자세금계산서</a></li>
                        </ul>
                        <ul className={twMerge(['space-y-2.5'])}>
                            <li><a href="#" className={twMerge(['hover:text-black'])}>제휴인증</a></li>
                            <li>
                                <a href="#" className={twMerge(['font-bold', 'text-black', 'hover:underline', 'underline-offset-2'])}>
                                    개인정보처리방침
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Family Site */}
                <div className={twMerge(['flex-1'])}>
                    <h3 className={twMerge(['text-[#7d32ff]', 'font-bold', 'text-base', 'mb-5'])}>Family Site</h3>
                    <div className={twMerge(['grid', 'grid-cols-2', 'gap-x-10', 'gap-y-2.5'])}>
                        <a href="#" className={twMerge(['hover:text-black'])}>BGF</a>
                        <a href="#" className={twMerge(['hover:text-black'])}>BGF휴먼넷</a>
                        <a href="#" className={twMerge(['hover:text-black'])}>BGF리테일</a>
                        <a href="#" className={twMerge(['hover:text-black'])}>BGF로지스</a>
                        <a href="#" className={twMerge(['hover:text-black'])}>BGF네트웍스</a>
                        <a href="#" className={twMerge(['hover:text-black'])}>CU포스트</a>
                    </div>
                </div>

            </div>
        </footer>
    );
}
export default Footer;