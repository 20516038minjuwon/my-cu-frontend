import HeaderBar from "../../components/custory/HeaderBar.tsx";
import img01 from "../../assets/images/brand_story/img01.png"
import img02 from "../../assets/images/brand_story/imgi_30_bullet_bar.png"
import cuBg from "../../assets/images/brand_story/bg_05.png"
import numImg from "../../assets/images/brand_story/imgi_10_txt03.png"
import cuLogo from "../../assets/images/brand_story/imgi_11_brand_story.png"
import bi01 from "../../assets/images/brand_story/imgi_12_img03.jpg"
import bi02 from "../../assets/images/brand_story/imgi_13_img04.jpg"
import bi03 from "../../assets/images/brand_story/imgi_14_img05.jpg"
import dot from "../../assets/images/brand_story/imgi_33_bullet_purple.png"
import cuImg from "../../assets/images/brand_story/imgi_37_bnr_01.jpg"
import cuImg01 from "../../assets/images/brand_story/imgi_16_img10.png"
import cuImg02 from "../../assets/images/brand_story/bg_02.png"

import {twMerge} from "tailwind-merge";

function CuStory() {
    return (
        <main>
            <div className="min-h-screen bg-white">
                <header className="bg-gray-50 text-center py-16">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                        <div>여러분의 일상 가장 가까운 곳에서<br/> 언제 어디서나 만날 수 있는 CU</div>
                    </h1>
                </header>
                <HeaderBar/>
                <section className="max-w-6xl mx-auto py-10 px-6 text-gray-700">
                    <div>
                        <img src={img02} alt={"bar"}/>
                        <h2 className={'mt-6'}>ABOUT US</h2>
                    </div>
                    <div className={twMerge(['flex'])}>
                        {/* 왼쪽 */}
                        <div
                            className={twMerge(['bg-right', 'bg-no-repeat'], ['flex', 'flex-col', 'flex-2', 'px-10', 'py-4'])}
                            style={{backgroundImage: `url(${cuBg})`}}
                        >
                            <div className={'py-4'}>
                                <p className={twMerge(['text-xs'])}>
                                    매일매일 신선함으로 가득 차는 CU는 재치있는 상품으로 하루를 충전하고, 365일 24시간 언제 어디서나 편리하게 원하는 것을 넘어 필요한 것까지
                                    찾아주는 서비스로 편의점 이상의 가치를 드립니다.
                                </p>
                                <div className={twMerge(['flex'])}>
                                    <img src={img01} alt={"cu"}/>
                                    <div>
                                        <h3 className={'font-bold'}>Nice to CU</h3>
                                        <span>신선함으로 일상을 충전하고 활력을 얻는 공간, 언제 어디서나 만나면 반가운 브래드, CU가 고객의 하루를 함께합니다.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 오른쪽 */}
                        <div
                            className={twMerge(['bg-right', 'bg-no-repeat'], ['flex', 'flex-col', 'flex-1', 'px-10', 'py-4', 'gap-4'])}
                            style={{backgroundImage: `url(${cuBg})`}}
                        >
                            <h2 className={'font-bold'}>Cu의 한 달 평균 이용 고객 수</h2>
                            <div className={'flex'}>
                                <img src={numImg} alt={"cu 한달 평균 이용 고객 수"}/>
                                <span className={twMerge(['font-bold'])}>만 명</span>
                            </div>
                            <p>
                                대한민국 모든 국민이 한 달에 한 번 이상 방문하는 숫자, 고객의 가장 가까운 곳에서 고객의 하루 하루를 더욱 가치있게 만듭니다.
                            </p>
                        </div>
                    </div>
                </section>
                <section
                    className={twMerge(['max-w-6xl', 'mx-auto', 'px-6', 'py-10'], ['flex', 'justify-between', 'text-gray-700'])}>
                    <div className={twMerge(['flex'])}>
                        <div>
                            <img src={img02} alt={"bar"}/>
                            <h2 className={'py-4'}>BRAND STORY</h2>
                            <div className={twMerge(['flex', 'flex-col', 'gap-4'])}>
                                <span className={twMerge(['text-sm'])}>고객과 사회에 좋은 친구,<br/>BGF리테일이 편의점 브랜드 CU입니다.</span>
                                <h2 className={'font-bold text-lg'}>Nice to CU</h2>
                                <span className={twMerge(['text-sm'])}>Nice to see you! 친근한 인사 처럼<br/>고객에게 언제 어디서나 반가운 브랜드로 다가갑니다. </span>
                                <span className={twMerge(['text-sm'])}>상품과 서비스 제공을 넘어 <br/> 당신에게 휴식과 위로,응원과 힘이 되는 <br/>즐거운 경험과 공간을 만들어갑니다.</span>
                            </div>
                        </div>
                    </div>
                    <div className={twMerge(['flex', 'items-center', 'justify-center'])}>
                        <img src={cuLogo} alt={"CU logo"}/>
                    </div>
                </section>
                <section
                    className={twMerge(['max-w-6xl', 'mx-auto', 'px-6', 'py-10'], ['flex', 'justify-between', 'text-gray-700'])}>
                    <div className={'flex flex-col gap-4'}>
                        <div>
                            <img src={img02} alt={"bar"}/>
                            <h2 className={'py-3'}>BI 소개</h2>
                        </div>
                        {/* 왼쪽 */}
                        <div className={twMerge(['flex', 'gap-30'])}>
                            <div className={twMerge(['flex', 'flex-col', 'gap-4'])}>
                                <div className={twMerge(['px-4'],
                                    ['bg-no-repeat', 'bg-left'])}
                                     style={{backgroundImage: `url(${dot})`}}
                                >
                                    <p>Word mark</p>
                                </div>
                                <img src={bi01} alt={"work mark"}/>
                            </div>
                            <div className={twMerge(['flex', 'flex-col', 'gap-4'])}>
                                <div className={twMerge(['px-4'],
                                    ['bg-no-repeat', 'bg-left'])}
                                     style={{backgroundImage: `url(${dot})`}}
                                >
                                    <p>Slogan</p>
                                </div>
                                <img src={bi02} alt={"slogan"}/>
                            </div>
                        </div>
                        {/* 오른쪽 */}
                        <div className={twMerge(['flex', 'gap-65'])}>
                            <div className={twMerge(['flex', 'flex-col', 'gap-4'])}>
                                <div className={twMerge(['px-4'],
                                    ['bg-no-repeat', 'bg-left'])}
                                     style={{backgroundImage: `url(${dot})`}}
                                >
                                    <p>Color Palette</p>
                                </div>
                                <p className={'text-lg'}>Main Color</p>
                                <div className={twMerge(['flex', 'items-center', 'gap-5'])}>
                                    <div
                                        className={twMerge(
                                            ['flex', 'flex-col', 'gap-4', 'items-center', 'justify-center'],
                                            ['w-25', 'h-25', 'bg-[#772b8f]', 'rounded-full'],
                                            ['text-white', 'text-md', 'text-center'])}>
                                        CU purple
                                    </div>
                                    <div className={twMerge(['flex', 'flex-col'])}>
                                        <span>Pantone 2090C</span>
                                        <span>Process C 72 Y 92</span>
                                        <span>Screen R 105 G 59 B 151</span>
                                    </div>
                                </div>
                                <div className={twMerge(['flex', 'items-center', 'gap-5'])}>
                                    <div
                                        className={twMerge(
                                            ['flex', 'flex-col', 'gap-4', 'items-center', 'justify-center'],
                                            ['w-25', 'h-25', 'bg-[#8cc740]', 'rounded-full'],
                                            ['text-white', 'text-md', 'text-center'])}>
                                        CU Green
                                    </div>
                                    <div className={twMerge(['flex', 'flex-col'])}>
                                        <span>Pantone 367C</span>
                                        <span>Process C 40 Y 90</span>
                                        <span>Screen R 165 G 207 B 76</span>
                                    </div>
                                </div>
                                <div className={twMerge(['flex', 'items-center', 'gap-5'])}>
                                    <div
                                        className={twMerge(
                                            ['flex', 'flex-col', 'gap-4', 'items-center', 'justify-center'],
                                            ['w-25', 'h-25', 'bg-white', 'rounded-full'],
                                            ['text-black', 'text-md', 'text-center', 'border', 'border-gray-300'])}>
                                        White
                                    </div>
                                    <div className={twMerge(['flex', 'flex-col'])}>
                                        <span>Process C 0 M 0 Y 0 K 0</span>
                                        <span>Screen R 255 G 255 B 255</span>
                                    </div>
                                </div>
                            </div>
                            <div className={twMerge(['flex', 'flex-col', 'gap-4'])}>
                                <div className={twMerge(['px-4'],
                                    ['bg-no-repeat', 'bg-left'])}
                                     style={{backgroundImage: `url(${dot})`}}
                                >
                                    <p>Application</p>
                                </div>
                                <img src={bi03} alt={"application"}/>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    className={twMerge(['w-full', 'h-[100dvh]','flex'])}>
                    <div className={twMerge(['bg-no-repeat', 'object-center'], ['flex-1','relative'])}
                         style={{backgroundImage: `url(${cuImg})`}}
                    >
                        <img src={cuImg01} alt={"한국형 편의점 cu"}
                            className={twMerge(['absolute','max-w-[700px]','left-20','top-20'])}
                        />
                        <img src={cuImg02} alt={"purple bg"}/>
                        <div className=" absolute w-[420px] bg-[#8b3fa9]"/>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default CuStory;