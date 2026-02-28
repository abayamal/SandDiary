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
import WorkerRead from "./Views/WorkerRead";
import Mining from "./Views/Mining/Mining";
import DailyMiningList from "./Views/Mining/DailyMiningList";
import DailyMiningForm from "./Views/Mining/DailyMiningForm";

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
                path:"/workers/view/:id",
                element:<WorkerRead/>
            },
            {
                path:"/workers/list",
                element:<WorkerList/>
            },
            {
                path:"/mining",
                element:<Mining/>
            },
            {
                path:"/mining",
                element:<Mining/>
            },
            {
                path:"/mining/daily/create",
                element:<DailyMiningForm/>
            },
            {
                path:"/mining/daily/:id/edit",
                element:<DailyMiningForm/>
            },
            {
                path:"/mining/daily/:id/view",
                element:<DailyMiningForm/>
            },
            {
                path:"/mining/daily",
                element:<DailyMiningList/>
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