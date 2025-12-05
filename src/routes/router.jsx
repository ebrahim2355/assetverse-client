import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Auth/Login";
import RegisterEmployee from "../pages/Auth/RegisterEmployee";
import RegisterHR from "../pages/Auth/RegisterHR";
import Unauthorized from "../pages/Shared/Unauthorized";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";

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
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>
    }
])