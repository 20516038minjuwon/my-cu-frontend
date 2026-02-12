import {twMerge} from "tailwind-merge";
import MainVisual from "../components/home/MainVisual.tsx"
import SecondMainVisual from "../components/home/SecondMainVisual.tsx";
import BestProductSlider from "../components/home/BestProductSlider.tsx";
import OnePlusProductSlider from "../components/home/OnePlusProductSlider.tsx";
import SearchCategorySection from "../components/home/SearchCategorySection.tsx";

function Home (){
    return<div className={twMerge(['min-h-screen','flex','flex-col'])}>
        <MainVisual/>
        <SecondMainVisual/>
        <BestProductSlider/>
        <OnePlusProductSlider/>
        <SearchCategorySection/>
    </div>
}
export default Home;