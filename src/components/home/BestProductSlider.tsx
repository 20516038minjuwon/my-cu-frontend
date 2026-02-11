import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { twMerge } from "tailwind-merge";
import { getProducts } from "../../api/product.api.ts"; // API 함수 위치에 맞게 수정
import type { Product } from "../../types/product.ts";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductCard from "../common/product/ProductCard.tsx";
import { Link } from "react-router";

function BestProductSlider() {
    const [bestProducts, setBestProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBestProducts = async () => {
            try {
                // 1. 전체 상품을 불러옵니다.
                const res = await getProducts({ page: 1, limit: 100 });

                // 2. [수정] isBest인 상품만 필터링한 후, 앞에서부터 딱 10개만 자릅니다.
                const filtered = res.data
                    .filter((p: Product) => p.isBest)
                    .slice(0, 10); // 이 부분이 핵심입니다!

                setBestProducts(filtered);
            } catch (e) {
                console.error("BEST 상품 로드 실패:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchBestProducts().then(()=>{});
    }, []);

    const navBtnStyle = "absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center text-3xl text-gray-400 hover:text-black transition-colors";

    if (loading) return <div className="py-20 text-center">Loading BEST Products...</div>;

    return (
        <section className="max-w-[1200px] mx-auto py-20 px-5">
            <div className="flex justify-between items-end mb-10">
                <h2 className="text-4xl font-black text-center flex-1 ml-24">BEST 상품</h2>
                <Link to={'/productService'} className="text-gray-400 text-sm font-bold hover:underline">
                    BEST 상품 모두보기 〉
                </Link>
            </div>

            <div className="relative group">
                <Swiper
                    modules={[Navigation, Pagination,Autoplay]}
                    autoplay={{
                        delay: 3000, // 5초마다 다음 그룹으로 이동
                        disableOnInteraction: false, // 사용자가 수동으로 조작해도 자동 재생 유지
                    }}
                    slidesPerView={5}
                    slidesPerGroup={5}        // [추가] 한 번에 넘어갈 개수
                    centeredSlides={false}    // [확인] 왼쪽 정렬 유지
                    loop={true}
                    spaceBetween={20}
                    navigation={{
                        nextEl: ".best-next",
                        prevEl: ".best-prev",
                    }}
                    pagination={{
                        clickable: true,
                        el: ".best-pagination",
                    }}
                    className="pb-16"
                >
                    {bestProducts.map((product) => (
                        <SwiperSlide key={product.id}>
                            <ProductCard product={product}/>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <button className={twMerge(navBtnStyle, "left-[-50px] best-prev")}>〈</button>
                <button className={twMerge(navBtnStyle, "right-[-50px] best-next")}>〉</button>

                <div className="best-pagination flex justify-center gap-2 mt-4" />
            </div>

            {/* 페이지네이션 스타일링 */}
            <style dangerouslySetInnerHTML={{ __html: `
                .best-pagination .swiper-pagination-bullet {
                    background: #ddd !important;
                    opacity: 1;
                    width: 8px;
                    height: 8px;
                }
                .best-pagination .swiper-pagination-bullet-active {
                    background: #34d399 !important;
                }
            `}} />
        </section>
    );
}

export default BestProductSlider;