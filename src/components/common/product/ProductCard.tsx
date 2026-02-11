import { twMerge } from "tailwind-merge";
import { Link } from "react-router";
import type { Product } from "../../../types/product.ts";
import isBest from "../../../assets/images/product/tag_best.png";
import isNew from "../../../assets/images/product/tag_new.png";

interface ProductCardProps {
    product: Product;
}
function ProductCard({ product }: ProductCardProps) {
    const thumbnail = product.image;
    return (
        <Link
            to={`/productService/${product.id}`}
            className={twMerge(
                ["group", "block", "rounded-2xl", "p-[5px]"],
                ["transition-all", "duration-300"],
                ["hover:bg-gradient-to-r", "hover:from-cyan-400"],
                ["hover:via-purple-500", "hover:to-blue-500", "hover:shadow-lg"],
            )}
        >
            <div
                className={twMerge(
                    ["relative", "aspect-[3/4]", "overflow-hidden", "rounded-2xl", "bg-white"],
                    ["flex", "flex-col", "gap-2"],
                    ["border", "border-gray-200", "px-5"],
                )}
            >
                {thumbnail ? (
                    <img
                        src={thumbnail}
                        alt={product.name}
                        className={twMerge(
                            ["w-full", "h-full", "object-cover", "object-center", "p-2"],
                            ["group-hover:scale-105", "transition-all", "duration-300"],
                        )}
                    />
                ) : (
                    <div className={twMerge(["flex", "justify-center", "items-center"])}>
                        NO IMAGE
                    </div>
                )}
                {/*배지*/}
                <div className={twMerge(["absolute", "right-0", "top-0"], ["flex", "gap-3"])}>
                    {product.isBest && <img src={isBest} alt={"isBest"} />}
                    {product.isNew && <img src={isNew} alt={"isNew"} />}
                </div>
                <div className={twMerge(["absolute", "left-3", "top-3"], ["flex", "gap-3"])}>
                    {product.onePlus && (
                        <span
                            className={twMerge(
                                ["bg-green-500", "p-2", "text-sm"],
                                ["uppercase", "rounded-full", "text-white"],
                            )}
                        >
                            1+1
                        </span>
                    )}
                    {product.twoPlus && (
                        <span
                            className={twMerge(
                                ["bg-purple-500", "p-2", "text-sm"],
                                ["uppercase", "rounded-full", "text-white"],
                            )}
                        >
                            2+1
                        </span>
                    )}
                </div>

                {/*텍스트 정보*/}
                <div className={twMerge(["space-y-2"])}>
                    <h3 className={twMerge(["text-sm", "font-medium", "text-gray-900"])}>
                        {product.name}
                    </h3>
                    <p className={"text-base text-gray-900 text-bold text-center font-bold pb-4"}>
                        {product.price.toLocaleString()}원
                    </p>
                </div>
            </div>
        </Link>
    );
}
export default ProductCard;
