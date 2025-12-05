import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import { AuthContext } from "../../providers/AuthContext";
import Swal from "sweetalert2";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import useAuth from "../../hooks/useAuth";
import { ErrorMsg } from "../../components/ErrorMsg/ErrorMsg";

export default function Login() {
    const { signInUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
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
                    <ErrorMsg error={errors.email} />

                    <input
                        {...register("password")}
                        type="password"
                        placeholder="Password"
                        className="input input-bordered w-full"
                        required
                    />

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
