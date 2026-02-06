import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";


type Tab<T extends string> = {
    key: T;
    label: string;
};

interface StickyTabBarProps<T extends string> {
    tabs: readonly Tab<T>[];
    activeTab: T;
    onChange: (key: T) => void;
}

function HeaderBar<T extends string>({
    tabs,
    activeTab,
    onChange,
}: StickyTabBarProps<T>) {
    const [isStuck, setIsStuck] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setIsStuck(window.scrollY >= 150);
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (
        <div
            className={twMerge(
                ["sticky", "top-[129px]", "z-40"],
                isStuck && "w-full bg-gray-800",
            )}
        >
            <nav
                className={twMerge(
                    ["bg-gray-800"],
                    ["transition-all", "duration-300", "mx-auto", "max-w-6xl"],
                    isStuck ? ["rounded-none"] : ["rounded-full"],
                )}
            >
                <ul className="flex h-17">
                    {tabs.map((tab) => (
                        <li key={tab.key} className="flex-1">
                            <button
                                type="button"
                                onClick={() => onChange(tab.key)}
                                className={`
                h-full w-full rounded-full text-md font-bold transition
                ${
                    activeTab === tab.key
                        ? "bg-green-500 text-white "
                        : "text-gray-300 hover:text-white"
                }
              `}
                            >
                                {tab.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
export default HeaderBar;
