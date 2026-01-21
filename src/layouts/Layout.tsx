import Footer from "../components/layout/Footer.tsx";
import Header from "../components/layout/Header.tsx";
import {Outlet} from "react-router";
import {twMerge} from "tailwind-merge";

function Layout(){
    return<div className={twMerge(['min-h-screen','flex','flex-col'])}>
        <Header/>
        <main>
            <Outlet/>
        </main>
        <Footer/>
    </div>
}
export default Layout;