import img01 from "../../assets/images/info/slide1.jpg";
import img02 from "../../assets/images/info/slide2.jpg";
import img03 from "../../assets/images/info/slide3.jpg";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import {Autoplay,Navigation, Pagination} from "swiper/modules";
import SlideCard from "../common/SlideCard.tsx";
import {twMerge} from "tailwind-merge";

const SLIDE =[img01,img02,img03];
function SecondMainVisual() {
    return (
        <section className="w-full">
            <div className="w-full,'h-[200px] relative">
                <Swiper
                    modules={[Autoplay, Navigation, Pagination]}
                    slidesPerView={"auto"}
                    centeredSlides={true}
                    spaceBetween={30}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    navigation={true}
                    pagination={{ clickable: true }}
                    className={twMerge(
                        ['!overflow-visible',"w-full"],
                        [
                            "[&_.swiper-pagination]:!bottom-[-40px]",
                            "[&_.swiper-pagination-bullet-active]:!bg-green-600",
                            "[&_.swiper-pagination-bullet]:!w-3",
                            "[&_.swiper-pagination-bullet]:!h-3",
                            "[&_.swiper-button-prev]:!w-4 [&_.swiper-button-next]:!w-4",
                            "[&_.swiper-button-prev]:!p-8 [&_.swiper-button-next]:!p-8",
                            "[&_.swiper-button-next]:!left-[calc(50%+370px)] [&_.swiper-button-prev]:!left-[calc(50%-430px)]",
                            "[&_.swiper-button-prev]:!rounded-full [&_.swiper-button-next]:!rounded-full",
                            "[&_.swiper-button-next]:!bg-white/70 [&_.swiper-button-prev]:!bg-white/70",
                            "[&_.swiper-button-next]:after:text-xl [&_.swiper-button-next]:!text-gray-800",
                            "[&_.swiper-button-prev]:after:text-xl [&_.swiper-button-prev]:!text-gray-800",

                        ],
                    )}
                >
                    {SLIDE.map((img, index) => (
                        <SwiperSlide
                            key={index}
                            className={twMerge(['!w-[340px]','md:!w-[600px]','lg:!w-[800px]'])}
                        >
                            <div className={'w-full h-full'}>
                                <SlideCard image={img} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}


export default SecondMainVisual;

{/*
return (
    <section className="w-full py-16">
<div className="mx-auto max-w-[1320px] overflow-hidden">
    <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        slidesPerView="auto"     // ⭐ 핵심
        centeredSlides           // ⭐ 핵심
        spaceBetween={32}
        loop
        autoplay={{
            delay: 3000,
            disableOnInteraction: false,
        }}
        navigation
        pagination={{ clickable: true }}
    >
        <SwiperSlide className="!w-[420px]">
            <SlideCard image={img01} />
        </SwiperSlide>
        <SwiperSlide className="!w-[420px]">
            <SlideCard image={img02} />
        </SwiperSlide>
        <SwiperSlide className="!w-[420px]">
            <SlideCard image={img03} />
        </SwiperSlide>
    </Swiper>
</div>
</section>
);
*/}
