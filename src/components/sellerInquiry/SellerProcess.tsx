import sellerProcess01 from "../../assets/images/consult01_img.jpg"
import { twMerge } from "tailwind-merge";


function sellerProcess (){
    return<div className={twMerge(['flex','justify-between','items-center','ml-20','mt-20'])}>
        <img src={sellerProcess01} alt={"입점 프로세스"}/>
    </div>
}
export default sellerProcess;