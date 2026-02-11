import { createBrowserRouter, redirect } from "react-router";
import Layout from "../layouts/Layout.tsx";
import Home from "../pages/Home.tsx";
import Login from "../pages/Login.tsx";
import Register from "../pages/Register.tsx";
import CuStory from "../pages/cuStory/CuStory.tsx";
import useAuthStore from "../stores/useAuthStore.ts";
import AdminLayout from "../layouts/AdminLayout.tsx";
import AdminDashboard from "../pages/(admin)/AdminDashboard.tsx";
import AdminCategoryList from "../pages/(admin)/AdminCategoryList.tsx";
import AdminCategoryCreate from "../pages/(admin)/AdminCategoryCreate.tsx";
import AdminCategoryEdit from "../pages/(admin)/AdminCategoryEdit.tsx";
import AdminProductList from "../pages/(admin)/AdminProductList.tsx";
import AdminProductCreate from "../pages/(admin)/AdminProductCreate.tsx";
import AdminProductEdit from "../pages/(admin)/AdminProductEdit.tsx";
import AdminUserList from "../pages/(admin)/AdminUserList.tsx";
import AdminUserCreate from "../pages/(admin)/AdminUserCreate.tsx";
import AdminUserEdit from "../pages/(admin)/AdminUserEdit.tsx";
import ProductServiceList from "../pages/product/ProductServiceList.tsx";
import Membership from "../pages/membership/Membership.tsx";
import ProductDetail from "../pages/product/ProductDetail.tsx";

export const adminOnlyLoader = () => {
    const { isLoggedIn, user } = useAuthStore.getState();
    if (!isLoggedIn) {
        alert("관리자 로그인이 필요합니다.");
        return redirect("/login");
    }

    if (user?.role !== "ADMIN") {
        alert("접근 권한이 없습니다.");
        return redirect("/");
    }

    return null;
};

const router = createBrowserRouter([
    {
        path: "",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "cuStory", element: <CuStory /> },
            {
                path: "productService",
                children: [
                    { index: true, element: <ProductServiceList /> },
                    {path:":id",element:<ProductDetail/>},
                ],
            },
            {
                path: "membership",
                children: [{ index: true, element: <Membership /> }],
            },
        ],
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            { index: true, element: <AdminDashboard /> },
            {
                path: "users",
                children: [
                    { index: true, element: <AdminUserList /> },
                    { path: "create", element: <AdminUserCreate /> },
                    { path: "edit/:id", element: <AdminUserEdit /> },
                ],
            },
            {
                path: "categories",
                children: [
                    { index: true, element: <AdminCategoryList /> },
                    { path: "create", element: <AdminCategoryCreate /> },
                    { path: "edit/:id", element: <AdminCategoryEdit /> },
                ],
            },
            {
                path: "products",
                children: [
                    { index: true, element: <AdminProductList /> },
                    { path: "create", element: <AdminProductCreate /> },
                    { path: "edit/:id", element: <AdminProductEdit /> },
                ],
            },
        ],
    },
]);
export default router;
