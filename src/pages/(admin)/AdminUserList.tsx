import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import {
    IoIosTrash,
    IoIosCreate,
    IoIosPersonAdd,
    IoIosContact,
    IoIosMail,
} from "react-icons/io";
import { getAdminUsers, deleteAdminUser } from "../../api/admin.user.api";
import type { AdminUser } from "../../types/admin.user";
import Button from "../../components/common/Button";

function AdminUserList() {
    const navigate = useNavigate();

    // 상태 관리
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);

    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            const response = await getAdminUsers({ page, limit: 10 });
            setUsers(response.data);
            setTotalPages(response.pagination.totalPages);
            setTotalUsers(response.pagination.totalUsers);
        } catch (error) {
            console.error("사용자 목록 로드 실패:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers().then(() => {});
    }, [page]);

    const handleDelete = async (id: number, name: string) => {
        if (!window.confirm(`${name} 회원을 정말 삭제하시겠습니까?`)) return;
        try {
            await deleteAdminUser(id);
            alert("회원이 삭제되었습니다.");
            fetchUsers().then(() => {}); // 목록 새로고침
        } catch (error) {
            console.log(error);
            alert("삭제 처리 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="space-y-6">
            {/* 상단 헤더 섹션 */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">회원 관리</h2>
                    <p className="text-sm text-gray-500">
                        총 {totalUsers}명의 회원이 등록되어 있습니다.
                    </p>
                </div>
                <Button
                    onClick={() => navigate("/admin/users/create")}
                    className="bg-[#772b8f] hover:bg-[#5e2271] text-white flex items-center gap-2"
                >
                    <IoIosPersonAdd className="w-5 h-5" /> 관리자 직접 추가
                </Button>
            </div>

            {/* 회원 목록 테이블 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-[12px] font-bold text-gray-500 uppercase tracking-wider">
                                <th className="px-6 py-4 w-20 text-center">ID</th>
                                <th className="px-6 py-4">사용자 정보</th>
                                <th className="px-6 py-4">이메일 / 연락처</th>
                                <th className="px-6 py-4">권한</th>
                                <th className="px-6 py-4">가입일</th>
                                <th className="px-6 py-4 text-center">관리</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="py-20 text-center text-gray-400">
                                        데이터 로딩 중...
                                    </td>
                                </tr>
                            ) : users.length > 0 ? (
                                users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4 text-center text-sm font-mono text-gray-400">
                                            {user.id}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-[#772b8f]">
                                                    <IoIosContact className="w-6 h-6" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-gray-800 text-sm">
                                                        {user.name}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        @{user.username}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1 text-sm text-gray-600">
                                                <div className="flex items-center gap-1">
                                                    <IoIosMail className="text-gray-400" />{" "}
                                                    {user.email}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {user.phone}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={twMerge(
                                                    "px-2.5 py-0.5 rounded-full text-[11px] font-bold",
                                                    user.role === "ADMIN"
                                                        ? "bg-red-50 text-red-600 border border-red-100"
                                                        : "bg-green-50 text-green-600 border border-green-100",
                                                )}
                                            >
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() =>
                                                        navigate(`/admin/users/edit/${user.id}`)
                                                    }
                                                    className="p-2 text-gray-400 hover:text-[#772b8f] hover:bg-purple-50 rounded-lg transition-all"
                                                    title="회원 수정"
                                                >
                                                    <IoIosCreate className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user.id, user.name)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                    title="회원 삭제"
                                                >
                                                    <IoIosTrash className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="py-20 text-center text-gray-400">
                                        등록된 회원이 없습니다.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* 페이지네이션 */}
                {totalPages > 1 && (
                    <div className="p-6 border-t border-gray-100 flex justify-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={twMerge(
                                    "w-9 h-9 rounded-xl text-sm font-medium transition-all",
                                    page === p
                                        ? "bg-[#772b8f] text-white shadow-md shadow-purple-100"
                                        : "text-gray-400 hover:bg-gray-100",
                                )}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminUserList;
