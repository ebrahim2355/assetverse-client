import { Link } from "react-router";
import useAuth from "../../../../hooks/useAuth";

export default function EmployeeDashboard() {
    const { user } = useAuth();

    return (
        <div className="space-y-8">

            {/* HEADER */}
            <div>
                <h1 className="text-3xl font-bold">Welcome, {user?.displayName || "Employee"} 👋</h1>
                <p className="text-base-content/70 mt-1">
                    Manage your assets, requests, and team from one place.
                </p>
            </div>

            {/* GRID CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* My Assets */}
                <div className="card bg-base-100 shadow hover:shadow-lg transition cursor-pointer">
                    <div className="card-body">
                        <h2 className="card-title">My Assets</h2>
                        <p>View all assets assigned to you.</p>
                        <Link to="/dashboard/employee/my-assets" className="btn btn-primary btn-sm mt-2">
                            View
                        </Link>
                    </div>
                </div>

                {/* Request Asset */}
                <div className="card bg-base-100 shadow hover:shadow-lg transition cursor-pointer">
                    <div className="card-body">
                        <h2 className="card-title">Request Asset</h2>
                        <p>Browse available company assets and request items.</p>
                        <Link to="/dashboard/employee/request-asset" className="btn btn-primary btn-sm mt-2">
                            Request
                        </Link>
                    </div>
                </div>

                {/* My Team */}
                <div className="card bg-base-100 shadow hover:shadow-lg transition cursor-pointer">
                    <div className="card-body">
                        <h2 className="card-title">My Team</h2>
                        <p>See other employees affiliated with your companies.</p>
                        <Link to="/dashboard/employee/my-team" className="btn btn-primary btn-sm mt-2">
                            Team
                        </Link>
                    </div>
                </div>

                {/* Profile */}
                <div className="card bg-base-100 shadow hover:shadow-lg transition cursor-pointer">
                    <div className="card-body">
                        <h2 className="card-title">Profile</h2>
                        <p>Manage your personal and account information.</p>
                        <Link to="/dashboard/employee/profile" className="btn btn-primary btn-sm mt-2">
                            Update
                        </Link>
                    </div>
                </div>

            </div>

            {/* EXTRA SECTION (OPTIONAL) */}
            <div className="card bg-base-100 shadow">
                <div className="card-body">
                    <h2 className="text-xl font-semibold">Account Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <p><span className="font-semibold">Email:</span> {user?.email}</p>
                        <p><span className="font-semibold">Display Name:</span> {user?.displayName || "N/A"}</p>
                        <p><span className="font-semibold">Joined:</span> {user?.metadata?.creationTime?.split(",")[0]}</p>
                    </div>
                </div>
            </div>

        </div>
    );
}
