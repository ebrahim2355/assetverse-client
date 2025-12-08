import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";

export default function RegisterEmployee() {
    const { registerUser, updateUserProfile } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const axiosInstance = useAxios();

    const handleEmployeeRegister = async (data) => {
        const profileImg = data.photo[0];

        await registerUser(data.email, data.password)
            .then(async () => {
                const formData = new FormData();
                formData.append("image", profileImg);

                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`

                await axios.post(image_API_URL, formData)
                    .then(async res => {
                        const photoURL = res.data.data.url;

                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoURL,
                            password: data.password,
                            dateOfBirth: data.dateOfBirth
                        }
                        await axiosInstance.post("/users/employee", userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log("user created")
                                }
                            })
                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL
                        }

                        updateUserProfile(userProfile)
                            .then(() => {
                                toast.success("Success! Employee registered successfully");
                                navigate("/dashboard");
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    })


            })

            .catch(() => toast.error("Error! Could't register your account, try again please!"));
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="card bg-base-100 w-full max-w-md shadow-xl p-6">

                <h2 className="text-2xl font-bold text-center mb-4">Employee Registration</h2>

                <form onSubmit={handleSubmit(handleEmployeeRegister)} className="">

                    <label className="label text-sm font-medium">Your Photo</label>
                    <input type="file" {...register("photo")} className="w-full file-input mb-2" placeholder="Your Photo" required />

                    <label className="label text-sm">Your Full Name</label>
                    <input
                        {...register("name")}
                        type="text"
                        placeholder="Full Name"
                        className="input input-bordered w-full mb-2"
                        required
                    />

                    <label className="label text-sm">Your Email</label>
                    <input
                        {...register("email")}
                        type="email"
                        placeholder="Email"
                        className="input input-bordered w-full mb-2"
                        required
                    />

                    <label className="label text-sm">Your Password</label>
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

                    <label className="label text-sm">Your Date of Birth</label>
                    <input
                        {...register("dateOfBirth")}
                        type="date" placeholder="Date"
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
