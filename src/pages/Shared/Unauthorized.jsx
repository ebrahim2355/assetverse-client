import { Link } from "react-router";

export default function Unauthorized() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">

            <h1 className="text-5xl font-bold text-error mb-3">403</h1>
            <h2 className="text-2xl font-semibold mb-2">Unauthorized Access</h2>

            <p className="max-w-md mb-6">
                You don't have permission to view this page.
                Please login with the correct account or return to the homepage.
            </p>

            <Link to="/" className="btn btn-primary">
                Go Home
            </Link>
        </div>
    );
}
