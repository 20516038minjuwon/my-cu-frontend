import { twMerge } from "tailwind-merge";

interface SlideCardProps {
    image: string;
    className?: string; // 외부에서 스타일 주입 가능하게 추가
}

function SlideCard({ image, className }: SlideCardProps) {
    return (
        <div className={twMerge(
            "w-full h-full rounded-[40px] overflow-hidden shadow-sm bg-white",
            className
        )}>
            <img
                src={image}
                alt="event slide"
                className="w-full h-full object-cover block"
            />
        </div>
    );
}

export default SlideCard;