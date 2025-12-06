import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

export default function GoogleRegister() {
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const googleUser = location.state;

    if (!googleUser) {
        return <p className="text-center mt-10">Invalid access</p>;
    }

    const handleRegister = async (role) => {
        const userInfo = {
            ...googleUser,
            role,
            createdAt: new Date(),
        };

        if (role === "hr") {
            userInfo.packageLimit = 5;
            userInfo.currentEmployees = 0;
            userInfo.subscription = "basic";
        }

        // POST to the correct API
        const endpoint = role === "employee" ? "/users/employee" : "/users/hr";

        const res = await axiosSecure.post(endpoint, userInfo);

        if (res.data.insertedId) {
            toast.success("Registration completed!");
            navigate("/dashboard");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="card bg-base-100 shadow-xl p-6 max-w-md w-full text-center">

                <h2 className="text-xl font-bold mb-4">
                    Complete Google Registration
                </h2>

                <p className="mb-4">Choose how you want to join AssetVerse:</p>

                <button
                    onClick={() => handleRegister("employee")}
                    className="btn btn-primary w-full mb-3"
                >
                    Join as Employee
                </button>

                <button
                    onClick={() => handleRegister("hr")}
                    className="btn btn-secondary w-full"
                >
                    Join as HR Manager
                </button>
            </div>
        </div>
    );
}
