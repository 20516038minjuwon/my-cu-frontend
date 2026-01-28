import {createBrowserRouter} from "react-router";
import Layout from "../layouts/Layout.tsx";
import Home from "../pages/Home.tsx";
import Login from "../pages/Login.tsx";
import Register from "../pages/Register.tsx";
import CuStory from "../pages/cuStory/CuStory.tsx";


const router=createBrowserRouter([
    {
        path:"",
        element:<Layout/>,
        children:[
            {index:true,element:<Home/>},
            {path:"login",element:<Login/>},
            {path:"register",element:<Register/>},
            {path:"cuStory", element:<CuStory/>}
        ]

    },
]);
export default router;
