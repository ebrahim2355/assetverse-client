import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

export default function Footer() {
    const { user } = useAuth();
    const { role } = useRole();

    const publicLinks = (
        <>
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/login" className="hover:text-primary">Login</Link></li>
            <li><Link to="/register-employee" className="hover:text-primary">Join as Employee</Link></li>
            <li><Link to="/register-hr" className="hover:text-primary">Join as HR Manager</Link></li>
        </>
    )

    const employeeLinks = (
        <>
            <li><Link to="/dashboard" className="hover:text-primary">Dashboard</Link></li>
            <li><Link to="/dashboard/employee/my-assets" className="hover:text-primary">My Assets</Link></li>
            <li><Link to="/dashboard/employee/request-asset" className="hover:text-primary">Request Asset</Link></li>
            <li><Link to="/dashboard/employee/my-team" className="hover:text-primary">My Team</Link></li>
        </>
    )

    const hrLinks = (
        <>
            <li><Link to="/dashboard" className="hover:text-primary">Dashboard</Link></li>
            <li><Link to="/dashboard/hr/assets" className="hover:text-primary">Asset List</Link></li>
            <li><Link to="/dashboard/hr/add-asset" className="hover:text-primary">Add Asset</Link></li>
            <li><Link to="/dashboard/hr/requests" className="hover:text-primary">All Requests</Link></li>
            <li><Link to="dashboard/hr/upgrade" className="hover:text-primary">Upgrade Package</Link></li>
        </>
    )

    return (
        <footer className="bg-base-200 text-base-content mt-10 border-t">
            <div className="container mx-auto px-6 py-10">

                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* About */}
                    <div>
                        <h2 className="text-xl font-bold mb-3">AssetVerse</h2>
                        <p className="text-sm leading-relaxed">
                            A smart and secure asset management platform helping businesses
                            track, assign, and manage assets efficiently.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-sm">

                            {!user && publicLinks}

                            {user && role === "employee" && employeeLinks}

                            {user && role === "hr" && hrLinks}

                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold text-lg mb-3">Contact</h3>
                        <ul className="space-y-2 text-sm">
                            <li>Email: support@assetverse.com</li>
                            <li>Phone: +1 234 567 890</li>
                            <li>Address: New York, USA</li>
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
                        <div className="flex items-center space-x-4">

                            <a
                                href="#"
                                className="text-2xl hover:text-primary transition"
                            >
                                <i className="bi bi-facebook"></i>
                            </a>

                            <a
                                href="#"
                                className="text-2xl hover:text-primary transition"
                            >
                                <i className="bi bi-instagram"></i>
                            </a>

                            <a
                                href="#"
                                className="text-2xl hover:text-primary transition"
                            >
                                <i className="bi bi-linkedin"></i>
                            </a>

                            <a
                                href="#"
                                className="text-2xl hover:text-primary transition"
                            >
                                {/* New X Logo instead of Twitter bird */}
                                <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 1200 1227"
                                    fill="currentColor"
                                >
                                    <path d="M714 519l416-519H993L691 428 434 0H0l446 648L0 1227h183l312-446 293 446h434L714 519z" />
                                </svg>
                            </a>

                        </div>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="text-center mt-10 pt-6 border-t text-sm">
                    © {new Date().getFullYear()} AssetVerse — All Rights Reserved.
                </div>

            </div>
        </footer>
    );
}
