import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router";

import hamburger from "../../assets/images/category/category1.png";
import instance from "../../assets/images/category/category2.png";
import snack from "../../assets/images/category/category3.png";
import iceCream from "../../assets/images/category/category4.png";
import food from "../../assets/images/category/category5.png";
import drink from "../../assets/images/category/category6.png";
import dailyNecessities from "../../assets/images/category/category7.png";
import { twMerge } from "tailwind-merge";
import { IoSearch } from "react-icons/io5";

function SearchCategorySection() {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trimmed = keyword.trim();
        if (!trimmed) {
            alert("검색어를 입력해주세요!");
            return;
        }
        navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    };
    const categories = [
        {
            id:1,
            name: "간편식사",
            img: hamburger,
            bgColor: "bg-[#373f47]",
            textColor: "text-white",
            top: "15%",
            left: "10%",
        },
        {
            id:4,
            name: "즉석조리",
            img: instance,
            bgColor: "bg-white",
            textColor: "text-black",
            top: "35%",
            left: "30%",
        },
        {
            id:5,
            name: "스낵",
            img: snack,
            bgColor: "bg-[#6d39ff]",
            textColor: "text-white",
            top: "25%",
            left: "70%",
        },
        {
            id:6,
            name: "아이스크림",
            img: iceCream,
            bgColor: "bg-[#6d39ff]",
            textColor: "text-white",
            top: "60%",
            left: "5%",
        },
        {
            id:7,
            name: "식품",
            img: food,
            bgColor: "bg-white",
            textColor: "text-black",
            top: "55%",
            left: "65%",
        },
        {
            id:8,
            name: "음료",
            img: drink,
            bgColor: "bg-[#373f47]",
            textColor: "text-white",
            top: "75%",
            left: "45%",
        },
        {
            id:5,
            name: "생활용품",
            img: dailyNecessities,
            bgColor: "bg-[#32c742]",
            textColor: "text-white",
            top: "70%",
            left: "80%",
        },
    ];
    return (
        <>
            <section className="w-[1200px] mx-auto py-24 px-5 flex flex-col md:flex-row items-center gap-16">
                {/* LEFT: Search Area */}
                <div className="flex-1 w-full">
                    <h2 className="text-4xl md:text-5xl font-black mb-5 tracking-tight">
                        지금 나에게 필요한건?
                    </h2>
                    <p className="text-xl font-bold mb-14 text-gray-800">
                        CU의 다양한 상품들을 소개합니다!
                    </p>

                    <form onSubmit={handleSearch} className="relative max-w-[480px] group">
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="검색해보세요!"
                            className={twMerge(["w-full", "border-b-[3px]", "border-black", "py-4", "pr-12", "text-xl"],
                                ["focus:outline-none", "placeholder:text-gray-300", "font-bold"],
                                ["bg-transparent" ,"transition-colors", "focus:border-[#6d39ff]"])
                            }
                        />
                        <button
                            type="submit"
                            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:scale-110 transition-transform"
                        >
                            <IoSearch className={'w-8 h-8'}/>
                        </button>
                    </form>
                </div>

                {/* RIGHT: Floating Category Buttons */}
                <div className="flex-1 w-full h-[480px] relative">
                    {categories.map((cat, index) => (
                        <button
                            key={index}
                            onClick={() =>
                                navigate(`/productService?tab=allProduct&categoryId=${cat.id}`)
                            }
                            className={twMerge(
                                ["absolute", "flex", "items-center", "gap-3", "px-6", "py-3"],
                                [
                                    "rounded-l-full",
                                    "rounded-t-full",
                                    "shadow-2xl",
                                    "transition-all",
                                    "duration-300",
                                ],
                                ["hover:scale-110", "hover:-translate-y-3"],
                                [" group", "cursor-pointer", "active:scale-95"],
                                cat.bgColor,
                                cat.textColor,
                            )}
                            style={{ top: cat.top, left: cat.left }}
                        >
                            <div className="w-12 h-12 flex items-center justify-center pointer-events-none">
                                <img
                                    src={cat.img}
                                    alt={cat.name}
                                    className="w-full h-full object-contain group-hover:rotate-12 transition-transform duration-300"
                                />
                            </div>
                            <span className="text-[18px] font-black whitespace-nowrap">
                                {cat.name}
                            </span>
                        </button>
                    ))}
                </div>
            </section>
        </>
    );
}
export default SearchCategorySection;
