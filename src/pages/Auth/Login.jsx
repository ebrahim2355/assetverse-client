import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import useAuth from "../../hooks/useAuth";
import { ErrorMsg } from "../../components/ErrorMsg/ErrorMsg";
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
