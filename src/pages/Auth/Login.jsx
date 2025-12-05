import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthContext";
import Swal from "sweetalert2";

export default function Login() {
    const { signInUser, signInGoogle } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = ({ email, password }) => {
        signInUser(email, password)
            .then(() => {
                Swal.fire("Success", "Logged in successfully!", "success");
                navigate("/dashboard");
            })
            .catch((err) =>
                Swal.fire("Error!", err.message, "error")
            );
    };

    const handleGoogleLogin = () => {
        signInGoogle()
            .then(() => {
                Swal.fire("Success", "Logged in with Google!", "success");
                navigate("/dashboard");
            })
            .catch((err) =>
                Swal.fire("Error!", err.message, "error")
            );
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="card bg-base-100 w-full max-w-md shadow-xl p-6">

                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

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

                    <button className="btn btn-primary w-full">Login</button>
                </form>

                <div className="divider">OR</div>

                <button onClick={handleGoogleLogin} className="btn btn-outline w-full">
                    Continue with Google
                </button>

                <p className="text-center mt-4">
                    Don't have an account?
                    <Link className="text-primary ml-1" to="/register-employee">
                        Join as Employee
                    </Link>
                    {" "}or{" "}
                    <Link className="text-primary" to="/register-hr">
                        Join as HR
                    </Link>
                </p>
            </div>
        </div>
    );
}
