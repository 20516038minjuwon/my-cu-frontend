import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { getProducts } from "../../api/product.api.ts";
import type { Product } from "../../types/product.ts";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductCard from "../common/product/ProductCard.tsx";
import { Link } from "react-router";
import { twMerge } from "tailwind-merge";

function OnePlusProductSlider() {
    const [onePlusProducts, setOnePlusProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOnePlusProducts = async () => {
            try {
                const res = await getProducts({ page: 1, limit: 100 });
                const filtered = res.data.filter((p: Product) => p.onePlus).slice(0, 15);

                setOnePlusProducts(filtered);
            } catch (e) {
                console.error("1+1 상품 로드 실패:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchOnePlusProducts().then(() => {});
    }, []);

    if (loading) return <div className="py-20 text-center">증정 상품 로딩 중...</div>;

    return (
        <section className="w-full mx-auto py-16 px-5">
            {/* 상단 헤더 */}
            <div className="flex justify-between items-end mb-10">
                <h2 className="text-4xl font-black text-center flex-1 ml-35">+1 증정 상품</h2>
                <Link
                    to={"/productService"}
                    className="text-gray-400 text-sm font-bold hover:underline mr-30"
                >
                    증정상품 모두보기 〉
                </Link>
            </div>

            <div className="relative group">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    breakpoints={{
                        320: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 10 },
                        768: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 15 },
                        1024: { slidesPerView: 6, slidesPerGroup: 6, spaceBetween: 15 },
                    }}
                    slidesPerView={6}
                    slidesPerGroup={6}
                    spaceBetween={15}
                    loop={onePlusProducts.length > 6}
                    navigation={{
                        nextEl: ".op-next",
                        prevEl: ".op-prev",
                    }}
                    pagination={{
                        clickable: true,
                        el: ".op-pagination",
                    }}
                >
                    {onePlusProducts.map((product) => (
                        <SwiperSlide key={product.id}>
                            <ProductCard product={product} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="flex items-center justify-center mt-6">
                    <button
                        className={twMerge(
                            ["op-prev", "text-xl", "text-gray-400", "hover:text-black"],
                            ["cursor-pointer", "transition-colors", "leading-none"],
                        )}>〈</button>
                    <div className="op-pagination flex items-center justify-center gap-2" />
                    <button
                        className={twMerge(
                            ["op-next", "text-xl", "text-gray-400", "hover:text-black"],
                            ["cursor-pointer", "transition-colors", "leading-none"],
                        )}>〉</button>
                </div>
            </div>

            {/* 증정 상품 전용 그린 포인트 스타일링 */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                .op-pagination .swiper-pagination-bullet {
                    background: #ccc !important;
                    opacity: 1;
                    width: 10px;
                    height: 10px;
                    margin: 0 4px !important;
                }
                .op-pagination .swiper-pagination-bullet-active {
                    background: #34d399 !important;
                }
            `,
                }}
            />
        </section>
    );
}

export default OnePlusProductSlider;
