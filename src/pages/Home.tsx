import {twMerge} from "tailwind-merge";
import MainVisual from "../components/home/MainVisual.tsx"
import SecondMainVisual from "../components/home/SecondMainVisual.tsx";
import BestProductSlider from "../components/home/BestProductSlider.tsx";

function Home (){
    return<div className={twMerge(['min-h-screen','flex','flex-col'])}>
        <MainVisual/>
        <SecondMainVisual/>
        <BestProductSlider/>
    </div>
}
export default Home;