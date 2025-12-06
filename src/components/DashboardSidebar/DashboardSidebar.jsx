import { Link, NavLink } from "react-router";
import useRole from "../../hooks/useRole";
import Loading from "../../pages/Shared/Loading";

export default function DashboardSidebar() {
    const { role, roleLoading } = useRole();

    if (roleLoading) return <Loading />;

    // ACTIVE STYLE for DaisyUI
    const activeClass =
        "bg-primary text-white font-semibold rounded-lg";

    return (
        <aside className="w-64 bg-base-100 shadow-md min-h-screen h-full">

            {/* Title */}
            <div className="p-4 text-2xl font-bold border-b text-primary">
                <Link to={"/dashboard"}>Dashboard</Link>
            </div>

            <ul className="menu w-full p-4 text-lg">

                {/* HOME BUTTON */}
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? activeClass : ""
                        }
                    >
                        Home
                    </NavLink>
                </li>

                {/* EMPLOYEE SIDEBAR */}
                {role === "employee" && (
                    <>
                        <li>
                            <NavLink
                                to="/dashboard/employee/my-assets"
                                className={({ isActive }) =>
                                    isActive ? activeClass : ""
                                }
                            >
                                My Assets
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/employee/request-asset"
                                className={({ isActive }) =>
                                    isActive ? activeClass : ""
                                }
                            >
                                Request Asset
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/employee/my-team"
                                className={({ isActive }) =>
                                    isActive ? activeClass : ""
                                }
                            >
                                My Team
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/employee/profile"
                                className={({ isActive }) =>
                                    isActive ? activeClass : ""
                                }
                            >
                                Profile
                            </NavLink>
                        </li>
                    </>
                )}

                {/* HR SIDEBAR */}
                {role === "hr" && (
                    <>
                        <li>
                            <NavLink
                                to="/dashboard/hr/assets"
                                className={({ isActive }) =>
                                    isActive ? activeClass : ""
                                }
                            >
                                Asset List
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/hr/add-asset"
                                className={({ isActive }) =>
                                    isActive ? activeClass : ""
                                }
                            >
                                Add Asset
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/hr/requests"
                                className={({ isActive }) =>
                                    isActive ? activeClass : ""
                                }
                            >
                                All Requests
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/hr/employees"
                                className={({ isActive }) =>
                                    isActive ? activeClass : ""
                                }
                            >
                                Employee List
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/hr/upgrade"
                                className={({ isActive }) =>
                                    isActive ? activeClass : ""
                                }
                            >
                                Upgrade Package
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/hr/profile"
                                className={({ isActive }) =>
                                    isActive ? activeClass : ""
                                }
                            >
                                Profile
                            </NavLink>
                        </li>
                    </>
                )}

            </ul>
        </aside>
    );
}
