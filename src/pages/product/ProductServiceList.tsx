import { useEffect, useState } from "react";
import HeaderBar from "../../components/custory/HeaderBar.tsx";
import AllProduct from "../../components/product/AllProduct.tsx";
import PromotionProduct from "../../components/product/PromotionProduct.tsx";
import DailyService from "../../components/product/DailyService.tsx";
import PartnerCard from "../../components/product/PartnerCard.tsx";
import { twMerge } from "tailwind-merge";
import { useSearchParams } from "react-router";

const TAB_COMPONENT_MAP = {
    allProduct: AllProduct,
    saleProduct: PromotionProduct,
    dailyService: DailyService,
    partnerCard: PartnerCard,
};

type TabKey ="allProduct"|"saleProduct"|"dailyService"|"partnerCard"

const TABS:{key:TabKey,label:string}[] = [
    { key: 'allProduct', label: '전체 상품' },
    { key: 'saleProduct', label: '행사 상품' },
    { key: 'dailyService', label: '생활편의 서비스' },
    { key: 'partnerCard', label: '제휴카드' },
];

function ProductServiceList() {
    const [params] = useSearchParams();
    const tab = params.get("tab");

    const [activeTab, setActiveTab] = useState<TabKey>("allProduct");

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (tab) setActiveTab(tab as TabKey)
    }, [tab]);

    const ActiveComponent = TAB_COMPONENT_MAP[activeTab];

    return<>
        <header className="bg-gray-50 text-center py-16">
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-16">
                <div>나만의 놀이터 CU<br/> 즐거운 상품과 서비스를 확인해보세요.</div>
            </h1>
        </header>
        <HeaderBar
            tabs={TABS}
            activeTab={activeTab}
        />
        <main className={twMerge(["max-w-8xl", "mx-auto", "py-12"])}>
            <ActiveComponent/>
        </main>
    </>
}
export default ProductServiceList;