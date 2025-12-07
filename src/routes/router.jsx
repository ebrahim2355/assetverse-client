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
import EmployeeProfile from "../pages/Dashboard/Employee/EmployeeProfile/EmployeeProfile";
import GoogleRegister from "../pages/Auth/GoogleRegister";
import EmployeeRoute from "./EmployeeRoute";
import AdminRoute from "./AdminRoute";
import AssetList from "../pages/Dashboard/HR/AssetList/AssetList";
import EditAsset from "../pages/Dashboard/HR/EditAsset/EditAsset";
import AddAsset from "../pages/Dashboard/HR/AddAsset/AddAsset";
import AllRequests from "../pages/Dashboard/HR/AllRequests/AllRequests";
import EmployeeList from "../pages/Dashboard/HR/EmployeeList/EmployeeList";
import HRProfile from "../pages/Dashboard/HR/HRProfile/HRProfile";
import UpgradePackage from "../pages/Dashboard/HR/UpgradePackage/UpgradePackage";
import PaymentSuccess from "../pages/Dashboard/HR/UpgradePackage/PaymentSuccess";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

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
                path: "google-register",
                element: <GoogleRegister></GoogleRegister>
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
                element: <EmployeeRoute><MyAssets></MyAssets></EmployeeRoute>
            },
            {
                path: "employee/request-asset",
                element: <EmployeeRoute><RequestAsset></RequestAsset></EmployeeRoute>
            },
            {
                path: "employee/my-team",
                element: <EmployeeRoute><MyTeam></MyTeam></EmployeeRoute>
            },
            {
                path: "employee/profile",
                element: <EmployeeProfile></EmployeeProfile>
            },
            {
                path: "hr/assets",
                element: <AdminRoute><AssetList></AssetList></AdminRoute>
            },
            {
                path: "hr/edit-asset/:id",
                element: <AdminRoute><EditAsset></EditAsset></AdminRoute>
            },
            {
                path: "hr/add-asset",
                element: <AdminRoute><AddAsset></AddAsset></AdminRoute>
            },
            {
                path: "hr/requests",
                element: <AdminRoute><AllRequests></AllRequests></AdminRoute>
            },
            {
                path: "hr/employees",
                element: <AdminRoute><EmployeeList></EmployeeList></AdminRoute>
            },
            {
                path: "hr/profile",
                element: <AdminRoute><HRProfile></HRProfile></AdminRoute>
            },
            {
                path: "hr/upgrade",
                element: <AdminRoute><UpgradePackage></UpgradePackage></AdminRoute>
            },
            {
                path: "hr/payment-success",
                element: <AdminRoute><PaymentSuccess></PaymentSuccess></AdminRoute>
            }
        ]
    },
    {
        path: "*",
        element: <ErrorPage></ErrorPage>
    }
])