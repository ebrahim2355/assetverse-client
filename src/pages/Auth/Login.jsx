import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const { signInUser } = useAuth();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = ({ email, password }) => {
        signInUser(email, password)
            .then(() => {
                toast.success("Success! Logged in successfully!");
                navigate("/dashboard");
            })
            .catch(() =>
                toast.error("Error! Could't log you in! Try again please.")
            );
    }

    const handleDemoEmployeeLogin = async () => {
        try {
            await signInUser(
                "char@li.com",
                "char12"
            );
            toast.success("Logged in as Demo Employee");
            navigate("/dashboard");
        } catch {
            toast.error("Demo login failed");
        }
    };

    const handleDemoHRLogin = async () => {
        try {
            await signInUser(
                "hr@testcompany.com",
                "testCompany1"
            );
            toast.success("Logged in as Demo HR");
            navigate("/dashboard");
        } catch {
            toast.error("Demo login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="card bg-base-100 w-full max-w-md shadow-xl p-6">

                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <input
                        {...register("email", { required: true })}
                        type="email"
                        placeholder="Email"
                        className="input input-bordered w-full"
                        required
                    />

                    <div className="relative mb-2">
                        <input
                            {...register("password")}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="input input-bordered w-full"
                            required
                        />

                        {/* Eye Icon */}
                        <span
                            className="absolute right-3 top-3 cursor-pointer text-xl text-gray-500 z-20"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <button className="btn btn-primary w-full">Login</button>
                </form>

                <div className="flex flex-col gap-3 mt-4">
                    <button
                        type="button"
                        onClick={handleDemoEmployeeLogin}
                        className="btn btn-outline w-full"
                    >
                        Demo Login as Employee
                    </button>

                    <button
                        type="button"
                        onClick={handleDemoHRLogin}
                        className="btn btn-outline w-full"
                    >
                        Demo Login as HR
                    </button>
                </div>

                <SocialLogin></SocialLogin>

                <p className="text-center mt-4 ">
                    Don't have an account?
                    <Link className="text-primary ml-1 hover:underline" to="/register-employee">
                        Join as Employee
                    </Link>
                    <span> or </span>
                    <Link className="text-primary hover:underline" to="/register-hr">
                        Join as HR
                    </Link>
                </p>
            </div>
        </div>
    );
}
