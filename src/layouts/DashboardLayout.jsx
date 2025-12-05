import { Outlet } from "react-router";
import DashboardSidebar from "../components/DashboardSidebar/DashboardSidebar";

export default function DashboardLayout() {
    return (
        <div className="flex min-h-screen">

            {/* Sidebar */}
            <DashboardSidebar />

            {/* Main Content */}
            <div className="flex-1 p-6">
                <Outlet />
            </div>
        </div>
    );
}
