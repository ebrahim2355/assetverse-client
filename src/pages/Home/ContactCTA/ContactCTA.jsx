import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";

export default function ContactCTA() {
    const { user } = useAuth();
    const { role } = useRole();
    return (
        <section className="text-center bg-primary rounded-2xl text-white py-16 mt-20">
            <h2 className="text-4xl font-bold">Ready to Get Started?</h2>
            <p className="mt-3 text-lg px-5">Join AssetVerse today and streamline your workflow.</p>

            {(!user || role === "employee") && (
                <a href="/register-hr" className="btn btn-neutral mt-6">
                    Create HR Account
                </a>
            )}

            {
                user && role === "hr" &&
                <a href="/register-employee" className="btn btn-neutral mt-6">
                    Create Employee Account
                </a>
            }
        </section>
    );
}