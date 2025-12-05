import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthContext";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

export default function RegisterHR() {
    const { registerUser, updateUserProfile } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async ({ name, email, password }) => {
        registerUser(email, password)
            .then(() => updateUserProfile({ displayName: name }))
            .then(() => {
                toast.success("Success!", "HR Manager registered successfully", "success");
                navigate("/dashboard/hr/assets");
            })
            .catch((err) => toast.error("Error! Could't register your account, try again please!", err.message, "error"));
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="card bg-base-100 w-full max-w-md shadow-xl p-6">

                <h2 className="text-2xl font-bold text-center mb-4">HR Manager Registration</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="">

                    <label className="label text-sm font-medium">Your Photo</label>
                    <input type="file" {...register("photo")} className="w-full file-input mb-2" placeholder="Your Photo" required/>

                    <label className="label text-sm font-medium">Your Full Name</label>
                    <input
                        {...register("name")}
                        type="text"
                        placeholder="Full Name"
                        className="input input-bordered w-full mb-2"
                        required
                    />

                    <label className="label text-sm font-medium">Your Company Name</label>
                    <input
                        {...register("companyName")}
                        type="text"
                        placeholder="Company Name"
                        className="input input-bordered w-full mb-2"
                        required
                    />

                    <label className="label text-sm font-medium">Your Company Email</label>
                    <input
                        {...register("email")}
                        type="email"
                        placeholder="Company Email"
                        className="input input-bordered w-full mb-2"
                        required
                    />

                    <label className="label text-sm font-medium">Your Password</label>
                    <div className="relative mb-2">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="input input-bordered w-full pr-10"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d).*$/,
                                    message: "Password must contain at least one letter and one number",
                                },
                            })}
                        />

                        {/* Eye Icon */}
                        <span
                            className="absolute right-3 top-3 cursor-pointer text-xl text-gray-500 z-20"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    {/* Error Message */}
                    {errors?.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}

                    <label className="label text-sm font-medium">Your Date of Birth</label>
                    <input
                        {...register("dob")}
                        type="date"
                        className="input input-bordered w-full mb-4"
                        required
                    />

                    <button className="btn btn-primary w-full">Register</button>
                </form>

                <p className="text-center mt-4">
                    Already have an account?
                    <Link className="text-primary ml-1" to="/login">Login</Link>
                </p>

            </div>
        </div>
    );
}
