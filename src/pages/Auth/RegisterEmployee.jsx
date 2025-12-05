import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthContext";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";

export default function RegisterEmployee() {
    const { registerUser, updateUserProfile } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = ({ name, email, password, dob }) => {
        registerUser(email, password)
            .then(() => {
                return updateUserProfile({ displayName: name });
            })
            .then(() => {
                Swal.fire("Success!", "Employee registered successfully", "success");
                navigate("/dashboard/employee/my-assets");
            })
            .catch((err) => Swal.fire("Error!", err.message, "error"));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <div className="card bg-base-100 w-full max-w-md shadow-xl p-6">

                <h2 className="text-2xl font-bold text-center mb-4">Employee Registration</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <input
                        {...register("name")}
                        type="text"
                        placeholder="Full Name"
                        className="input input-bordered w-full"
                        required
                    />

                    <input
                        {...register("email")}
                        type="email"
                        placeholder="Email"
                        className="input input-bordered w-full"
                        required
                    />

                    <input
                        {...register("password")}
                        type="password"
                        placeholder="Password"
                        className="input input-bordered w-full"
                        required
                    />

                    <input
                        {...register("dob")}
                        type="date"
                        className="input input-bordered w-full"
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
