import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Auth/Login";
import RegisterEmployee from "../pages/Auth/RegisterEmployee";
import RegisterHR from "../pages/Auth/RegisterHR";
import Unauthorized from "../pages/Shared/Unauthorized";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import RoleBasedDashboard from "./RoleBasedDashboard";
import MyAssets from "../pages/Dashboard/Employee/MyAssets/MyAssets";
import RequestAsset from "../pages/Dashboard/Employee/RequestAsset/RequestAsset";
import MyTeam from "../pages/Dashboard/Employee/MyTeam/MyTeam";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "register-employee",
                element: <RegisterEmployee></RegisterEmployee>
            },
            {
                path: "register-hr",
                element: <RegisterHR></RegisterHR>
            },
            {
                path: "unauthorized",
                element: <Unauthorized></Unauthorized>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                index: true,
                element: <RoleBasedDashboard></RoleBasedDashboard>
            },
            {
                path: "employee/my-assets",
                element: <MyAssets></MyAssets>
            },
            {
                path: "employee/request-asset",
                element: <RequestAsset></RequestAsset>
            },
            {
                path: "employee/my-team",
                element: <MyTeam></MyTeam>
            },
            {
                path: "employee/profile"
            }
        ]
    }
])