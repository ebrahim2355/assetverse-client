import { useState } from "react";
import { Outlet } from "react-router";
import { FaBars } from "react-icons/fa";
import DashboardSidebar from "../components/DashboardSidebar/DashboardSidebar";

export default function DashboardLayout() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="min-h-screen flex bg-base-200">

            {/* SIDEBAR — Desktop */}
            <div className="hidden lg:block">
                <DashboardSidebar />
            </div>

            {/* SIDEBAR — Mobile Slide Drawer */}
            <div
                className={`fixed top-0 left-0 h-full z-50 bg-base-100 shadow-lg transform 
                ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                transition-transform duration-300 lg:hidden`}
            >
                <DashboardSidebar />
            </div>

            {/* OVERLAY — when sidebar open on mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* MAIN AREA */}
            <div className="flex-1 flex flex-col">

                {/* Top Bar inside dashboard */}
                <div className="w-full bg-base-100 p-3 shadow flex items-center gap-4 lg:hidden">
                    <button
                        className="text-2xl cursor-pointer hover:bg-base-300 p-2 rounded-full"
                        onClick={() => setIsOpen(true)}
                    >
                        <FaBars />
                    </button>
                    <h2 className="text-lg font-semibold">Dashboard</h2>
                </div>

                {/* CONTENT */}
                <div className="p-6 flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
