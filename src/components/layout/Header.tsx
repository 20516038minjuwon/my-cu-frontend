import {Link, useLocation, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {twMerge} from "tailwind-merge";
import Logo from "../../assets/logo.png";
import {IoIosMenu} from "react-icons/io";
import useAuthStore from "../../stores/useAuthStore.ts";

const MENU = [
    {
        name: "CU소개",
        path: "/cuStory",
        subMenu: [
            {name: "브랜드 스토리", path: "/cuStory/"}
        ]
    },
    {
        name: "상품/서비스",
        path: "/productService",
        subMenu: [
            {name: "전체 상품", path: "/productService"},
            {name: "행사 상품", path: "/productService?tab=PromotionProduct"},
            {name: "생활편의 서비스", path: "/productService?tab=dailyService"},
            {name: "제휴카드", path: "/productService?tab=partnerCard"},
        ]
    },
    {
        name: "멤버십",
        path: "membership",
        subMenu: [
            {name: "멤버십 소개", path: "/membership"},
        ]
    },
    {
        name: "입점상담",
        path: "",
        subMenu: [
            {name: "입점 프로세스", path: "/"},
            {name: "기준 안내", path: "/"},
            {name: "입점 상담 신청", path: "/"},
        ]
    },
    {name: "새로운소식", path: "newContent"},
]

function Header() {
    const {pathname} = useLocation();
    const navigate = useNavigate();

    const{isLoggedIn, user, logout}=useAuthStore();

    const [isScrolled, setIsScrolled] = useState(false);

    const handleLogOut = () => {
        const confirm =window.confirm("로그아웃 하시겠습니까?");
        if (confirm) {
            logout();
            alert("로그아웃 되었습니다.")
            navigate("/");
        }
    }
    
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])
    const [hoveredMenu, setHoveredMenu] = useState<string | null>(null)
    const isMenuOpen = hoveredMenu !== null;
    const isHome = pathname === "/";
    const isTransparent = isHome && isScrolled;

    return (
        <header onMouseLeave={() => setHoveredMenu(null)}
                className={twMerge(
                    ["fixed", "left-0", "right-0", "z-60"],
                    ["transition-all", "duration-300", "border-b"],
                    isTransparent
                        ? ["bg-transparent", "border-transparent", "text-white"]
                        : ["bg-white", "border-gray-100"],
                    isMenuOpen && ["bg-white", "border-gray-300", "text-gray-600"]
                )}
        >
            <div className={twMerge(['flex','gap-2','justify-end','p-4'])}>
                {isLoggedIn && user ?(
                    <button
                        onClick={handleLogOut}
                        className="text-xs  hover:text-gray-500 transition-colors">
                        로그아웃
                    </button>
                ):(
                    <Link to={"/login"} className={'text-xs  hidden md:block'}>로그인</Link>
                )}
                <div className={'text-xs  hidden md:block'}>|</div>
                <Link to={"/admin"} className={'text-xs  hidden md:block'}>점주광장</Link>
            </div>
            <div className={twMerge(
                ["container", "mx-auto", "px-4", "h-20"],
                ["flex", "justify-between", "items-center"],
            )}>
                <div className={twMerge(["flex", "items-center", "gap-5"])}>
                    <Link to={"/"} className={'w-40'}>
                        <img src={Logo} alt={"logo"}/>
                    </Link>
                    <nav
                        className={twMerge(
                            ["hidden", "lg:flex", "flex-1"],
                            ["justify-center", "gap-7"],
                            ["font-extrabold",'text-lg'],
                        )}
                    >
                        {/*메뉴 구성*/}
                        {MENU.map((menu) => (
                            <div
                                onMouseEnter={() => setHoveredMenu(menu.name)}
                                key={menu.name}
                                className={twMerge(
                                    ["relative", "w-30"],
                                    ["h-full", "flex", "items-center"],
                                )}
                            >
                                <Link
                                    key={menu.name}
                                    to={menu.path}
                                    className={twMerge(
                                        ["relative"],
                                        ["py-7", "hover:text-green-600", "transition-colors"],
                                    )}
                                >
                                    {menu.name}
                                    <span
                                        className={twMerge(
                                            ["absolute", "bottom-0", "left-0"],
                                            ["w-0", "h-[2px]"],
                                            hoveredMenu === menu.name ? "w-full" : "w-0",

                                            ///['w-full',"h-[2px]",'opacity-0','group-hover:opacity-100'],
                                            ["bg-green-600", "transition-all", "duration-300"],
                                        )}
                                    />
                                </Link>
                            </div>
                        ))}
                    </nav>
                </div>
                <div className={twMerge(["w-100", "flex", "justify-end", "items-end"])}>
                        <button className={twMerge(["right-0", "top-2"])}>
                            <IoIosMenu className={'w-7 h-7'}/>
                        </button>
                </div>
            </div>
            {/*메가메뉴*/}
            <div
                className={twMerge(
                    ["absolute", "left-0", "top-[130px]", "w-full", "z-50", "overflow-hidden"],
                    ["border-t", "border-gray-100"],
                    ["bg-white", "text-gray-600"],
                    ["transition-all", "duration-300"],
                    isMenuOpen
                        ? ["h-64", "opacity-100", "border-b"]
                        : ["h-0", "opacity-0", "border-b-0"],
                )}
            >
                <div
                    className={twMerge(
                        ["container", "mx-auto", "px-4"],
                        ["flex", "justify-between"],
                    )}
                >
                    {/*왼쪽영역*/}
                    <div className={twMerge(["flex", "items-center",])}>
                        <div className={twMerge(["w-40", "invisible"])} />
                        <div
                            className={twMerge(
                                ["hidden", "lg:flex", "flex-1"],
                                ["justify-center", "gap-8"],
                                ["font-bold"],
                            )}
                        >
                            {/*메뉴 구성*/}
                            {MENU.map((menu) => (
                                <ul
                                    key={menu.name}
                                    className={twMerge(["flex", "flex-col", "w-30"])}
                                >
                                    {menu.subMenu?.map((subMenu) => (
                                        <li key={subMenu.name}>
                                            <Link
                                                to={subMenu.path}
                                                className={twMerge(
                                                    ["block", "py-4", "text-sm", "text-gray-500"],
                                                    ["hover:bg-green-50"],
                                                )}
                                            >
                                                {subMenu.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ))}
                        </div>
                    </div>
                    {/*오른쪽영역*/}
                    <div className={twMerge(["w-100", "invisible"])} />
                </div>
            </div>
        </header>
    )
}

export default Header;