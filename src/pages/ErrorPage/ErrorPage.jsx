// src/pages/Shared/ErrorPage.jsx
import Lottie from "react-lottie";
import animationData from "../../assets/lottie/error.json";
import { Link } from "react-router";

export default function ErrorPage() {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center p-6">

            <div className="max-w-md w-full">
                <Lottie options={defaultOptions} height={300} width={300} />

                <h1 className="text-4xl font-bold mt-4">Oops! Page Not Found</h1>
                <p className="text-gray-500 mt-2">
                    The page you are looking for does not exist or has been moved.
                </p>

                <Link to="/" className="btn btn-primary mt-6 w-full">
                    Go Back Home
                </Link>
            </div>

        </div>
    );
}