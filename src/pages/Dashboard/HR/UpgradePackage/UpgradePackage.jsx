import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Loading from "../../../Shared/Loading";
import Swal from "sweetalert2";

export default function UpgradePackage() {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // Fetch HR profile to get current package info
    const { data: profile = {}, isLoading } = useQuery({
        queryKey: ["hr-profile", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

    if (isLoading) return <Loading />;

    const packages = [
        {
            name: "Basic",
            price: 0,
            employees: 5,
            description: "Default package for new HR accounts.",
            disabled: true
        },
        {
            name: "Standard",
            price: 20,
            employees: 15,
            description: "Perfect for growing teams.",
        },
        {
            name: "Premium",
            price: 50,
            employees: 50,
            description: "Best for companies scaling quickly."
        },
    ];

    // ---------- HANDLE PAYMENT ----------
    const handleUpgrade = async (pack) => {
        Swal.fire({
            title: `Upgrade to ${pack.name}?`,
            text: `This will increase your employee limit to ${pack.employees}.`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Proceed",
            confirmButtonColor: "#2563eb",
        }).then(async (result) => {
            if (!result.isConfirmed) return;

            try {
                // Create checkout session
                const res = await axiosSecure.post("/create-checkout-session", {
                    packageName: pack.name,
                    price: pack.price,
                    email: profile.email,
                    employeeLimit: pack.employees
                });

                if (res.data.url) {
                    // Redirect to Stripe Checkout
                    window.location.href = res.data.url;
                }

            } catch (error) {
                Swal.fire("Error", error.response?.data?.error || "Something went wrong", "error");
            }
        });
    };

    return (
        <div className="w-full">
            <h2 className="text-3xl font-bold mb-6">Upgrade Your Package</h2>

            {/* Current Package Summary */}
            <div className="p-4 bg-base-200 rounded-lg mb-6">
                <h3 className="text-xl font-semibold">Current Subscription</h3>
                <p className="mt-2"><strong>Plan:</strong> {profile.subscription}</p>
                <p><strong>Employee Limit:</strong> {profile.packageLimit}</p>
                <p><strong>Current Employees:</strong> {profile.currentEmployees}</p>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {packages.map((pack) => (
                    <div
                        key={pack.name}
                        className={`card shadow-lg border p-5 ${profile.subscription === pack.name ? "bg-base-200" : "bg-base-100"}`}
                    >
                        <h3 className="text-2xl font-bold">{pack.name}</h3>
                        <p className="flex-1 text-gray-600 mt-1">{pack.description}</p>

                        <div className="mt-4">
                            <p className="text-xl font-semibold">${pack.price} / month</p>
                            <p className="text-sm text-gray-500">
                                Employee limit: {pack.employees}
                            </p>
                        </div>

                        {profile.subscription === pack.name ? (
                            <button className="btn btn-disabled mt-4">Current Plan</button>
                        ) : (
                            <button
                                className="btn btn-primary mt-4"
                                disabled={pack.disabled}
                                onClick={() => handleUpgrade(pack)}
                            >
                                Upgrade
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
