import DashboardSidebar from "../components/nav/DashboardSidebar";
import { Outlet } from "react-router";

export default function DashboardLayout() {
    return (
        <div className="flex min-h-screen bg-base-200">

            {/* Sidebar */}
            <DashboardSidebar />

            {/* Main Content */}
            <div className="flex-1 p-6">
                <Outlet />
            </div>
        </div>
    );
}
