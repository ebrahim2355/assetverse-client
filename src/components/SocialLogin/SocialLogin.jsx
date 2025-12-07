import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";

export default function SocialLogin() {
    const { signInGoogle } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const handleGoogleSignIn = async () => {
        try {
            const res = await signInGoogle();
            const googleUser = res.user;

            const dbRes = await axiosSecure.get(`/users/${googleUser.email}`);
            const existingUser = dbRes.data;

            if (existingUser) {
                toast.success("Logged in successfully!");
                return navigate("/dashboard");
            }

            toast("Please select your role to complete registration.");
            navigate("/google-register", {
                state: {
                    email: googleUser.email,
                    displayName: googleUser.displayName,
                    photoURL: googleUser.photoURL
                }
            });

        } catch (error) {
            console.log(error);
            toast.error("Google login failed.");
        }
    };

    return (
        <div className="text-center">
            <p className="my-2">OR</p>
            <button
                onClick={handleGoogleSignIn}
                className="btn bg-white text-black border w-full"
            >
                <FaGoogle />
                Continue with Google
            </button>
        </div>
    );
}
