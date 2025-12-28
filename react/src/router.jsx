import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import GuestLayout from "./Components/GuestLayout";
import Login from "./Views/Login";
import Signup from "./Views/Signup";

const router = createBrowserRouter([
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