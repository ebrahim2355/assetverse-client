import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useRole from "../../../hooks/useRole";
import useAuth from "../../../hooks/useAuth";

export default function Packages() {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { role } = useRole();
    const navigate = useNavigate();

    const { data: packages = [], isLoading } = useQuery({
        queryKey: ["packages"],
        queryFn: async () => {
            const res = await axiosSecure.get("/packages");
            return res.data;
        }
    });

    const handleChoosePlan = () => {

        if (!user) {
            navigate("/login");
            return;
        }

        if (role === "employee") {
            toast.error("You need to be an HR to upgrade your package!");
            return;
        }

        if (role === "hr") {
            navigate("/dashboard/hr/upgrade");
        }
    };

    return (
        <section className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-8">Our Packages</h2>

            {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="animate-pulse bg-base-200 rounded-xl h-64"></div>
                    ))}
                </div>
            )}

            {!isLoading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {packages.map((pack) => (
                    <div key={pack._id} className="p-8 bg-base-100 rounded-xl shadow border">
                        <h3 className="text-2xl font-bold">{pack.name}</h3>
                        <p className="text-gray-600 mt-2 mb-3">{pack.description}</p>

                        <p className="text-3xl font-bold">
                            ${pack.price}
                            <span className="text-sm text-gray-500"> / month</span>
                        </p>

                        <p className="mt-3 text-sm">
                            Employee Limit: <b>{pack.employeeLimit}</b>
                        </p>

                        <button
                            onClick={handleChoosePlan}
                            className="btn btn-primary mt-6 w-full"
                        >
                            Choose Plan
                        </button>
                    </div>
                ))}
            </div>
            )}
        </section>
    );
}