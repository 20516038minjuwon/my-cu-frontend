import { twMerge } from "tailwind-merge";
import { Link, useLocation } from "react-router";
import { useLayoutStore } from "../../stores/useLayoutStore.ts";
import useAuthStore from "../../stores/useAuthStore.ts";
import Backdrop from "../common/Backdrop.tsx";

// CU 메뉴 타입 정의 (아이콘 제외, 설명 추가 가능)
type MenuItemType = {
    text: string;
    path: string;
}

function Sidebar() {
    const { pathname } = useLocation();
    const { isSidebarOpen, closeSidebar } = useLayoutStore();
    const { isLoggedIn } = useAuthStore();

    const mainMenus: MenuItemType[] = [
        { text: "CU소개", path: "/cuStory" },
        { text: "상품·서비스", path: "/productService" },
        { text: "멤버십", path: "/membership" },
        { text: "입점상담", path: "/sellerInquiry" },
        { text: "새로운소식", path: "/newContent" },
    ];

    const handleMenuClick = () => {
        if (window.innerWidth < 640) {
            closeSidebar();
        }
    };

    return (
        <>
            {isSidebarOpen && (
                <div className="sm:hidden">
                    <Backdrop onClose={closeSidebar} isTransparent={false}/>
                </div>
            )}
            <aside
                className={twMerge(
                    "fixed right-0 top-0 bottom-0 z-50 w-72 bg-white border-l border-gray-200 overflow-y-auto transition-transform duration-300 ease-in-out",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <span className="font-bold text-xl text-[#6d28d9]">Nice to CU</span>
                    <button onClick={closeSidebar} className="sm:hidden text-gray-500 text-2xl">×</button>
                </div>

                <div className="flex flex-col p-4">
                    <nav className="space-y-1">
                        {mainMenus.map((item) => (
                            <MenuItem
                                key={item.text}
                                item={item}
                                isActive={pathname === item.path}
                                onClose={handleMenuClick}
                            />
                        ))}
                    </nav>

                    <div className="my-6 border-t border-gray-100" />

                    {!isLoggedIn && (
                        <div className="p-4 bg-gray-50 rounded-xl text-center">
                            <p className="text-sm text-gray-600 mb-4 leading-tight">
                                CU 멤버십 서비스와<br />다양한 혜택을 만나보세요!
                            </p>
                            <Link
                                to="/sign-in"
                                onClick={handleMenuClick}
                                className="block w-full py-3 bg-[#6d28d9] text-white rounded-lg font-medium text-sm transition-hover hover:bg-[#5b21b6]"
                            >
                                로그인 / 회원가입
                            </Link>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}

export default Sidebar;

type MenuItemProps = {
    item: MenuItemType;
    isActive: boolean;
    onClose: VoidFunction;
};

function MenuItem({ item, isActive, onClose }: MenuItemProps) {
    return (
        <Link
            onClick={onClose}
            to={item.path}
            className={twMerge(
                "flex items-center justify-between px-4 py-3.5 rounded-lg transition-all",
                isActive
                    ? "bg-[#6d28d9]/5 text-[#6d28d9] font-bold"
                    : "text-gray-700 hover:bg-gray-50 hover:pl-6",
            )}
        >
            <span className="text-base">{item.text}</span>
            <span
                className={twMerge(
                    "text-xs opacity-0 transition-opacity",
                    isActive && "opacity-100",
                )}
            >
                ●
            </span>
        </Link>
    );
}