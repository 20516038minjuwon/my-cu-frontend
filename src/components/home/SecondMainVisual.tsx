import img01 from "../../assets/images/info/slide1.jpg";
import img02 from "../../assets/images/info/slide2.jpg";
import img03 from "../../assets/images/info/slide3.jpg";
import img04 from "../../assets/images/main_visual/CF63BE730326443388A5FF6760AF120E.png";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import SlideCard from "../common/SlideCard.tsx";
import { twMerge } from "tailwind-merge";

const SLIDE = [img01, img02, img03, img04];

function SecondMainVisual() {
    return (
        <section className="w-full py-20 bg-gray-50 overflow-hidden">
            <div className="max-w-[1200px] mx-auto relative px-5">
                <Swiper
                    modules={[Autoplay, Navigation, Pagination]}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    slidesPerView={"auto"}
                    centeredSlides={true}
                    loop={true}
                    spaceBetween={20}
                    navigation={{
                        nextEl: ".swiper-button-next-custom",
                        prevEl: ".swiper-button-prev-custom",
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    className="!overflow-visible"
                >
                    {SLIDE.map((img, index) => (
                        <SwiperSlide
                            key={index}
                            className={twMerge([
                                "!w-[320px]",
                                "md:!w-[500px]",
                                "lg:!w-[700px]",
                                "transition-opacity duration-500",
                            ])}
                        >
                            <div className="w-full h-full rounded-[30px] overflow-hidden shadow-xl">
                                <SlideCard image={img} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* [스타일 보완] 커스텀 버튼 - CU 스타일링 */}
                <button className="swiper-button-prev-custom absolute left-55 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:bg-white transition-all group border border-gray-100">
                    <span className="text-2xl group-hover:-translate-x-0.5 transition-transform">
                        〈
                    </span>
                </button>
                <button className="swiper-button-next-custom absolute right-55 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:bg-white transition-all group border border-gray-100">
                    <span className="text-2xl group-hover:translate-x-0.5 transition-transform">
                        〉
                    </span>
                </button>
            </div>

            {/* 페이지네이션 커스텀 스타일 (전역 CSS나 인라인 스타일로 유지) */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                .swiper-pagination {
                    position: relative !important;
                    bottom: -40px !important;
                }
                .swiper-pagination-bullet {
                    width: 10px !important;
                    height: 10px !important;
                    background: #ddd !important;
                    opacity: 1 !important;
                    margin: 0 5px !important;
                }
                .swiper-pagination-bullet-active {
                    background: #34d399 !important;
                    width: 30px !important;
                    border-radius: 5px !important;
                    transition: width 0.3s !important;
                }
            `,
                }}
            />
        </section>
    );
}

export default SecondMainVisual;
