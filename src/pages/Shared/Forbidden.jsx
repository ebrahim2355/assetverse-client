import Lottie from "react-lottie";
import animationData from "../../assets/lottie/forbidden.json";
import { Link } from "react-router";

export default function Forbidden() {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <div className=" flex flex-col items-center justify-center text-center bg-base-200 px-4">

            {/* Lottie Animation */}
            <div className="w-full max-w-md">
                <Lottie options={defaultOptions} height={"100%"} width={"100%"} />
            </div>

            {/* Text */}
            <h1 className="text-4xl md:text-5xl font-bold text-error mt-4">
                403 Forbidden
            </h1>
            <p className="text-base md:text-lg text-base-content/70 max-w-md mt-3">
                You don’t have permission to access this page.
                Please login with the correct account or contact your admin.
            </p>

            {/* Button */}
            <Link to="/dashboard" className="btn btn-primary mt-6">
                Go Back to Dashboard
            </Link>
        </div>
    );
}
