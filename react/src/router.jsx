import { createBrowserRouter } from "react-router-dom";

import GuestLayout from "./Components/GuestLayout";
import Login from "./Views/Login";
import Signup from "./Views/Signup";
import DefaultLayout from "./Components/DefaultLayout";
import Dashboard from "./Views/Dashboard";
import Workers from "./Views/Workers";
import WorkerAdd from "./Views/WorkerAdd";
import WorkerList from "./Views/WorkerList";
import WorkerEdit from "./Views/WorkerEdit";

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
                path:"/workers/add",
                element:<WorkerAdd/>
            },
            {
                path:"/workers/edit/:id",
                element:<WorkerEdit/>
            },
            {
                path:"/workers/list",
                element:<WorkerList/>
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