import SellerProcess from "../../components/sellerInquiry/SellerProcess.tsx";
import SellerCriteria from "../../components/sellerInquiry/SellerCriteria.tsx";
import SellerApply from "../../components/sellerInquiry/SellerApply.tsx";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import HeaderBar from "../../components/custory/HeaderBar.tsx";
import { twMerge } from "tailwind-merge";

const TAB_COMPONENT_MAP={
    sellerProcess : SellerProcess,
    sellerCriteria : SellerCriteria,
    sellerApply : SellerApply,
};

type TabKey ="sellerProcess" | "sellerCriteria" |"sellerApply";

const TABS:{key:TabKey,label:string}[]=[
   { key:"sellerProcess",label:"입점 프로세스"},
   { key:"sellerCriteria",label:"입점 기준안내"},
   { key:"sellerApply",label:"입점 상담 신청"},
];

function SellerInquiry(){
    const [params]=useSearchParams();
    const tab =params.get("tab");

    const [activeTab,setActiveTab]=useState<TabKey>("sellerProcess");

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if(tab) setActiveTab(tab as TabKey);
    }, [tab]);

    const ActiveComponent =TAB_COMPONENT_MAP[activeTab];
    return<>
        <header className="bg-gray-50 text-center py-16">
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-16">
                <div>
                    언제 어디서나 최상의 상품과 서비스를 제공하는 대한민국 대표 편의점 CU
                    <br /> 귀사의 소중한 상품 제안을 환영합니다.
                </div>
            </h1>
        </header>
        <HeaderBar
            tabs={TABS}
            activeTab={activeTab}
        />
        <main className={twMerge(["max-w-5xl", "mx-auto", "py-12"])}>
            <ActiveComponent/>
        </main>
    </>
}
export default SellerInquiry;

