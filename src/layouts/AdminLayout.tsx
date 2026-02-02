import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import {
    IoIosSettings,
    IoIosList,
    IoIosCart,
    IoIosPeople,
    IoIosLogOut,
    IoIosHome,
} from "react-icons/io";
import useAuthStore from "../stores/useAuthStore";

const ADMIN_MENU = [
    {
        name: "대시보드",
        path: "/admin",
        icon: <IoIosHome className="w-5 h-5" />,
    },
    {
        name: "사용자 관리",
        path: "/admin/users",
        icon: <IoIosPeople className="w-5 h-5" />,
    },
    {
        name: "카테고리 관리",
        path: "/admin/categories",
        icon: <IoIosList className="w-5 h-5" />,
    },
    {
        name: "상품 관리",
        path: "/admin/products",
        icon: <IoIosCart className="w-5 h-5" />,
    },
    {
        name: "시스템 설정",
        path: "/admin/settings",
        icon: <IoIosSettings className="w-5 h-5" />,
    },
];

function AdminLayout() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            logout();
            alert("로그아웃 되었습니다.");
            navigate("/");
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* 사이드바 (Sidebar) */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col sticky top-0 h-screen">
                {/* 로고 영역 */}
                <div className="h-16 px-5 border-b border-gray-100 flex items-center">
                    <Link
                        to={"/admin"}
                        className="text-center font-bold text-[#772b8f] tracking-widest"
                    >
                        ADMIN CENTER
                    </Link>
                </div>

                {/* 네비게이션 메뉴 */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {ADMIN_MENU.map((item) => {
                        const isActive =
                            pathname === item.path ||
                            (item.path !== "/admin" && pathname.startsWith(item.path));

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={twMerge(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                                    isActive
                                        ? "bg-[#772b8f] text-white shadow-md shadow-purple-100"
                                        : "text-gray-500 hover:bg-purple-50 hover:text-[#772b8f]",
                                )}
                            >
                                {item.icon}
                                <span className="font-semibold text-sm">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* 하단 관리자 정보 및 로그아웃 */}
                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 px-2 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[#8cc740] flex items-center justify-center text-white font-bold">
                            {user?.name?.charAt(0) || "A"}
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-sm font-bold text-gray-800 truncate">
                                {user?.name || "관리자"}
                            </span>
                            <span className="text-xs text-gray-500 truncate">{user?.username}</span>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <IoIosLogOut className="w-5 h-5" />
                        로그아웃
                    </button>
                </div>
            </aside>

            {/* 메인 콘텐츠 영역 (Main Content) */}
            <main className="flex-1 flex flex-col">
                {/* 상단바 (Top Bar) */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
                    <h2 className="text-xl font-extrabold text-gray-800">
                        {ADMIN_MENU.find((m) => m.path === pathname)?.name || "관리자 센터"}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>
                            현재 접속:{" "}
                            <b className="text-[#8cc740]">{new Date().toLocaleDateString()}</b>
                        </span>
                        <Link
                            to="/"
                            className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            사이트 바로가기
                        </Link>
                    </div>
                </header>

                {/* 실제 페이지 내용이 렌더링되는 곳 */}
                <div className="p-8">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdminLayout;
