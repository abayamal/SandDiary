import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import GuestLayout from "./Components/GuestLayout";
import Login from "./Views/Login";
import Signup from "./Views/Signup";
import DefaultLayout from "./Components/DefaultLayout";

const router = createBrowserRouter([
    {
        path:"/",
        element:<DefaultLayout/>,
        children:[
            {
                path:"/",
                element:<Dashboard/>
            }
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