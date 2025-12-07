import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import Loading from "../../pages/Shared/Loading";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

export default function Navbar() {
    const { user, logOut } = useAuth();
    const { role, roleLoading } = useRole();
    const [menuOpen, setMenuOpen] = useState(false);

    if (roleLoading && user) {
        return <Loading />;
    }

    // NAV LINKS BASED ON ROLE
    const employeeLinks = (
        <>
            <Link className="hover:text-primary" to="/dashboard/employee/my-assets">My Assets</Link>
            <Link className="hover:text-primary" to="/dashboard/employee/request-asset">Request Asset</Link>
            <Link className="hover:text-primary" to="/dashboard/employee/my-team">My Team</Link>
            <Link className="hover:shadow hover:shadow-primary rounded-full" to="/dashboard/employee/profile" title="Profile">
            <img className="w-10 h-10 rounded-full" src={user?.photoURL} alt="" /></Link>
        </>
    );

    const hrLinks = (
        <>
            <Link className="hover:text-primary" to="/dashboard/hr/assets">Asset List</Link>
            <Link className="hover:text-primary" to="/dashboard/hr/add-asset">Add Asset</Link>
            <Link className="hover:text-primary" to="/dashboard/hr/requests">All Requests</Link>
            <Link className="hover:text-primary" to="/dashboard/hr/employees">Employee List</Link>
            <Link className="hover:text-primary" to="/dashboard/hr/upgrade">Upgrade Package</Link>
            <Link className="hover:shadow hover:shadow-primary rounded-full" to="/dashboard/hr/profile">
            <img className="w-10 h-10 rounded-full" src={user?.photoURL} alt="" /></Link>
        </>
    );

    const publicLinks = (
        <>
            <Link className="hover:text-primary" to="/">Home</Link>
            <Link className="hover:text-primary" to="/register-employee">Join as Employee</Link>
            <Link className="hover:text-primary" to="/register-hr">Join as HR Manager</Link>
            <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow px-6 md:px-12">

            {/* LEFT — LOGO */}
            <div className="flex-1">
                <Link to="/" className="text-2xl font-bold">AssetVerse</Link>
            </div>

            {/* MIDDLE — LINKS (Desktop Only) */}
            <div className="hidden lg:flex gap-6 items-center">
                {!user && publicLinks}

                {user && role === "employee" && employeeLinks}

                {user && role === "hr" && hrLinks}

                {user && (
                    <button onClick={logOut} className="btn btn-error btn-sm">
                        Logout
                    </button>
                )}
                
            </div>

            {/* RIGHT — PROFILE + MOBILE MENU */}
            <div className="flex items-center gap-4">

                {/* MOBILE MENU BUTTON */}
                <div className="lg:hidden">
                    <button
                        className="text-2xl cursor-pointer hover:bg-base-200"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <FaBars />
                    </button>

                    {menuOpen && (
                        <div className="absolute right-4 top-16 w-60 bg-base-100 shadow rounded-lg p-4 flex flex-col gap-3 z-50">
                            {!user && publicLinks}

                            {user && role === "employee" && employeeLinks}
                            {user && role === "hr" && hrLinks}

                            {user && (
                                <button onClick={logOut} className="btn btn-error btn-sm mt-2">
                                    Logout
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
