import { createBrowserRouter } from "react-router-dom";

import GuestLayout from "./Components/GuestLayout";
import Login from "./Views/Login";
import Signup from "./Views/Signup";
import DefaultLayout from "./Components/DefaultLayout";
import Dashboard from "./Views/Dashboard";
import Workers from "./Views/Workers";
import WorkerAdd from "./Views/WorkerAdd";

const router = createBrowserRouter([
    {
        path:"/",
        element:<DefaultLayout/>,
        children:[
            {
                path:"/",
                element:<Dashboard/>
            },
            {
                path:"/workers",
                element:<Workers/>
            },
            {
                path:"/worker/add",
                element:<WorkerAdd/>
            },
          
        ]
    },
    {
        path: "/",
        element:<GuestLayout/>,
        children: [
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/signup",
                element: <Signup/>
            }
           
        ]
    },
 
   
])

export default router;