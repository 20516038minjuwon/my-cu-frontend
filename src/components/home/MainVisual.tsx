import img01 from "../../assets/images/main_visual/main_visual.png";
import img02 from "../../assets/images/main_visual/main_visual_illu.png";
import {twMerge} from "tailwind-merge";
import {useEffect, useState} from "react";
import {Link} from "react-router";

function MainVisual() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const target = document.querySelector(".hero-content");
        if (!target) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShow(true);
                    observer.disconnect();
                }
            },
            {threshold: 0.3}
        );

        observer.observe(target);
    }, []);

    return (
        <section className="relative w-full h-60 bg-white overflow-hidden">
            <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between px-10">

                {/* 텍스트 영역 */}
                <div
                    className={twMerge(
                        ["hero-content","transition-all", "duration-1000", "ease-out"],
                        ["opacity-0","translate-y-6"],
                        show && "opacity-100 translate-y-0"
                    )}
                >
                    <img src={img01} alt={"img01"}/>

                    <Link to={"/cuStory"}
                        className="mt-6 flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-gray-600 transition">
                        CU 스토리 보기
                        <span
                            className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-500 text-white text-xs">
                             ▶
                         </span>
                    </Link>
                </div>

                {/* 우측 일러스트 */}
                <img
                    src={img02}
                    alt="CU character"
                    className={twMerge(
                        "transition-all duration-1000 ease-out",
                        "opacity-0 translate-y-6",
                        show && "opacity-100 translate-y-0"
                    )}
                />
            </div>
        </section>
    );
}

export default MainVisual;