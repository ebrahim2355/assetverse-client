import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <div className="navbar bg-base-100 shadow">
            <div className="flex-1">
                <Link to="/" className="text-2xl font-bold">AssetVerse</Link>
            </div>

            <div className="flex-none">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} className="avatar placeholder cursor-pointer">
                            <div className="bg-neutral text-neutral-content rounded-full w-10">
                                <span>{user?.name?.charAt(0)}</span>
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box shadow w-52 mt-4">
                            <li><button onClick={logout}>Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <Link to="/login" className="btn btn-primary">Login</Link>
                )}
            </div>
        </div>
    );
}
