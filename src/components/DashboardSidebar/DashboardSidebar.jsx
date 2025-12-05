import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

export default function DashboardSidebar() {
    const { user } = useAuth();

    return (
        <aside className="w-64 bg-base-100 shadow-md min-h-screen">

            <div className="p-4 text-xl font-bold border-b">
                Dashboard
            </div>

            <ul className="menu p-4">
                {user?.role === "employee" && (
                    <>
                        <li><Link to="/dashboard/employee/my-assets">My Assets</Link></li>
                        <li><Link to="/dashboard/employee/request-asset">Request Asset</Link></li>
                        <li><Link to="/dashboard/employee/my-team">My Team</Link></li>
                        <li><Link to="/dashboard/employee/profile">Profile</Link></li>
                    </>
                )}

                {user?.role === "hr" && (
                    <>
                        <li><Link to="/dashboard/hr/assets">Asset List</Link></li>
                        <li><Link to="/dashboard/hr/add-asset">Add Asset</Link></li>
                        <li><Link to="/dashboard/hr/requests">All Requests</Link></li>
                        <li><Link to="/dashboard/hr/employees">Employee List</Link></li>
                        <li><Link to="/dashboard/hr/upgrade">Upgrade Package</Link></li>
                        <li><Link to="/dashboard/hr/profile">Profile</Link></li>
                    </>
                )}
            </ul>

        </aside>
    );
}
