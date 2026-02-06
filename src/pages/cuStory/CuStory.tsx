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
import cuValue from "../../assets/images/brand_story/imgi_40_img06_2021.png"
import daily01 from "../../assets/images/brand_story/imgi_42_refresh_bg04.jpg"
import daily02 from "../../assets/images/brand_story/imgi_44_refresh_bg05.jpg"
import daily03 from "../../assets/images/brand_story/imgi_45_refresh_bg06.jpg"
import triangle from "../../assets/images/brand_story/imgi_41_refresh_bg07.jpg"
import {twMerge} from "tailwind-merge";
import { useState } from "react";

const TABS = [
    { key: 'brand', label: '브랜드 스토리' },
    { key: 'bgf', label: 'BGF LIVE' },
    { key: 'gallery', label: 'CU 갤러리' },
];

function CuStory() {
    const [activeTab, setActiveTab] = useState('brand');

    return (
        <main>
            <div className="min-h-screen bg-white">
                <header className="bg-gray-50 text-center py-16">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-16">
                        <div>여러분의 일상 가장 가까운 곳에서<br/> 언제 어디서나 만날 수 있는 CU</div>
                    </h1>
                </header>
                <HeaderBar
                    tabs={TABS}
                    activeTab={activeTab}
                    onChange={setActiveTab}
                />
                <section className="max-w-6xl mx-auto py-10 px-6 text-gray-700">
                    <div>
                        <img src={img02} alt={"bar"}/>
                        <h2 className={'mt-6'}>ABOUT US</h2>
                    </div>
                    <div className={twMerge(['flex', 'gap-4'])}>
                        {/* 왼쪽 */}
                        <div
                            className={twMerge(['bg-right', 'bg-no-repeat'], ['flex', 'flex-col', 'flex-2', 'py-4'])}
                            style={{backgroundImage: `url(${cuBg})`}}
                        >
                            <div className={'py-4'}>
                                <p className={twMerge(['text-xs'])}>
                                    매일매일 신선함으로 가득 차는 CU는 재치있는 상품으로 하루를 충전하고,<br/>
                                    365일 24시간 언제 어디서나 편리하게 원하는 것을 넘어<br/>
                                    필요한 것까지 찾아주는 서비스로 편의점 이상의 가치를 드립니다.
                                </p>
                                <div className={twMerge(['mt-4', 'flex', 'gap-3'])}>
                                    <img src={img01} alt={"cu"}/>
                                    <div className={'pt-7'}>
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
                    className={twMerge(['w-full', 'h-[60dvh]', 'flex'])}>
                    <div className={twMerge(['bg-no-repeat', 'object-center'], ['flex-1', 'relative'])}
                         style={{backgroundImage: `url(${cuImg})`}}
                    >
                        <img src={cuImg01} alt={"한국형 편의점 cu"}
                             className={twMerge(['absolute', 'max-w-[700px]', 'left-50', 'top-20'])}
                        />
                        <div className={twMerge(['absolute', 'right-50', 'top-10', 'px-6', 'py-10'], ['text-white'])}
                             style={{backgroundImage: `url(${cuImg02})`}}
                        >
                            <p className={twMerge(['font-bold', 'text-lg'], ['mb-6'])}>대한민국 1등 편의점의 <br/>새로운 변신, CU</p>
                            <p className={twMerge(['text-sm'])}>순수 국내 브랜드 CU는 21세기 한국형 편의점을<br/>
                                지향하며 고객의 니즈에 능동적으로 대응하기 위해<br/>
                                BGF 리테일에서 지난 30여 년간 쌓아온 노하우를<br/>
                                바탕으로 만든 새로운 편의점 모델입니다.<br/>
                                ‘Fresh & Refresh’라는 모토를 내걸고<br/>
                                새롭고 신선한 상품과 이용자 중심의 서비스를<br/>
                                제공하여 하루를 충전하고 일상의 활력을 얻는<br/>
                                생활 속 쉼터를 지향하고 있습니다</p>
                        </div>
                    </div>
                </section>
                <section
                    className={twMerge(['max-w-6xl', 'mx-auto', 'px-6', 'py-10'], ['flex', 'text-gray-700'])}>
                    <div className={twMerge(['flex', 'flex-col'])}>
                        <div>
                            <img src={img02} alt={"bar"}/>
                            <h2 className={'py-4'}>CU의 차별화</h2>
                            <div className={twMerge(['flex', 'flex-col', 'gap-4'])}>
                                <h2 className={'font-bold text-lg'}>CU에서는 당신이 주인공 입니다.</h2>
                                <span className={twMerge(['text-sm'])}>
                                    CU는 상품, 서비스, 디스플레이 등 모든 면에서 <br/>
                                    고객 중심의 새로운 패러다임을 제시합니다. <br/>
                                    기존에 경험할 수 없던 즐거운 체험과 새로움 감동으로<br/>
                                    21세기 한국형 편의점의 밝은 내일을 열어 가겠습니다.<br/>
                                </span>
                            </div>
                            <img className={'right-0'} src={cuValue} alt={"cu의 차별화"}/>
                        </div>
                    </div>
                </section>
                <section
                    className={twMerge(['max-w-6xl', 'mx-auto', 'px-6', 'py-10'], ['flex', 'text-gray-700'])}>
                    <div className={twMerge(['flex', 'flex-col','gap-5'])}>
                        <div>
                            <img src={img02} alt={"bar"}/>
                            <h2 className={'py-4'}>Daily Life Platform</h2>
                            <div className={twMerge(['flex', 'flex-col', 'gap-4'])}>
                                <h2 className={'font-bold text-lg'}>고객의 하루가 시작되고, 잠깐의 휴식이 되어 머무르고, 하루의 마무리를 같이 하는
                                    CU</h2>
                                <span className={twMerge(['text-xs'])}>
                                    이전까지의 편의점은 단순히 제품과 서비스를 채워두고 제공하는 편의점으로 고객들이 필요로 하는 상품과 서비스, 편안한 휴식 제공에 대해 부족함이 있었습니다.<br/>
                                    CU는 정형화된 틀을 깨는 Fresh한 생각으로 매장을 방문한 고객들이 1분 1초도 Refresh 할 수 있도록 편안한 휴식처가 되기 위해 노력하고 있습니다.
                                </span>
                            </div>
                        </div>
                        <div className={twMerge(['flex','gap-5'])}>
                            <div
                                className={twMerge(['bg-right', 'bg-no-repeat'],
                                    ['flex', 'justify-center', 'items-center', 'text-center', 'flex-col', 'flex-1'],
                                    ['px-10', 'py-4', 'gap-4'])}
                                style={{backgroundImage: `url(${cuBg})`}}
                            >
                                <div className={'flex'}>
                                    <img src={daily01} alt={"fresh한 쇼핑공간"}/>
                                </div>
                                <p className={'text-sm'}>동선 하나까지 세심하게 배려하여 <br/> 매대를 낮추고 복도를 넓힌</p>
                                <p className={'text-lg font-bold'}>Fresh한 쇼핑공간</p>
                            </div>
                            <div
                                className={twMerge(['bg-right', 'bg-no-repeat'],
                                    ['flex', 'justify-center', 'items-center', 'text-center', 'flex-col', 'flex-1',],
                                    ['px-10', 'py-4', 'gap-4'])}
                                style={{backgroundImage: `url(${cuBg})`}}
                            >
                                <div className={'flex'}>
                                    <img src={daily02} alt={"Refresh"}/>
                                </div>
                                <p className={'text-sm'}>매장의 인테리어를 환하고 <br/> 깨끗하게 개선해 시각적인</p>
                                <p className={'text-lg font-bold'}>Refresh</p>
                            </div>
                            <div
                                className={twMerge(['flex', 'flex-col', 'flex-1'],
                                    [ 'justify-center', 'items-center', 'text-center'],
                                    ['px-10', 'py-4', 'gap-4'])}
                            >
                                <div className={'flex'}>
                                    <img src={daily03} alt={"사람 중심의 편의점"}/>
                                </div>
                                <p className={'text-sm'}>카페, 미팅룸, 공연장과 같이<br/> 생활에 필요한 부분을 늘 연구하는</p>
                                <p className={'text-lg font-bold'}>사람 중심의 편의점</p>
                            </div>

                        </div>
                        <div className={twMerge(['flex', 'flex-col', 'gap-4', 'justify-center', 'items-center'])}>
                            <img className={'w-15 h-8'} src={triangle} alt={"triangle"}/>
                            <p className={twMerge(['text-xs'])}>
                                앞으로 CU는 상품과 서비스만 제공하는 어제의 편의점을 넘어 혼자서도 가장 편안한 시간을 보내고, 행복하게 함께 식사를 하고,<br/>
                                누구와도 부담없이 만나는 ‘라이프 플랫폼’, 내일의 편의점으로 여러분의 마음속에 자리잡기 위해 당신을 대하는 자세를 더<br/>
                                Fresh하게 만들어 CU를 찾는 모든 분들이 언제나 Refresh한 순간을 느낄 수 있도록 최선을 다하겠습니다.
                            </p>
                            <p className={twMerge(['text-md', 'font-bold', 'text-[#772b8f]'])}>
                                하루를 시작해서 하루를 마무리 할 수 있는 당신만의 휴식처가 되기 위해 CU가 다시 한번 달라집니다.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default CuStory;