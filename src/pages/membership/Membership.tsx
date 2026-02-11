import HeaderBar from "../../components/custory/HeaderBar.tsx";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import CuMembership from "../../components/memberships/CuMembership.tsx";
import MembershipPoint from "../../components/memberships/MembershipPoint.tsx";
import MembershipPartner from "../../components/memberships/MembershipPartner.tsx";
import { useSearchParams } from "react-router";

const TAB_COMPONENT_MAP = {
    cuMembership: CuMembership,
    membershipPoint: MembershipPoint,
    membershipPartner: MembershipPartner,
};

type TabKey ="cuMembership"|"membershipPoint"|"membershipPartner"

const TABS:{key:TabKey,label:string}[] = [
    { key: "cuMembership", label: "CU 멤버십 안내" },
    { key: "membershipPoint", label: "CU 멤버십 포인트" },
    { key: "membershipPartner", label: "멤버십 제휴 안내" },
];


function Membership() {
    const [params] = useSearchParams();
    const tab = params.get("tab");

    const [activeTab, setActiveTab] = useState<TabKey>("cuMembership");

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (tab) setActiveTab(tab as TabKey)
    }, [tab]);

    const ActiveComponent = TAB_COMPONENT_MAP[activeTab];
    return (
        <>
            <header className="bg-gray-50 text-center py-16">
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-16">
                    <div>
                        여러분의 일상 가장 가까운 곳에서
                        <br /> 언제 어디서나 만날 수 있는 CU
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
    );
}
export default Membership;
