import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Loading from "../../../Shared/Loading";
import Swal from "sweetalert2";

export default function UpgradePackage() {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // Fetch HR profile
    const { data: profile = {}, isLoading: profileLoading } = useQuery({
        queryKey: ["hr-profile", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

    // Fetch packages dynamically
    const { data: packages = [], isLoading: packagesLoading } = useQuery({
        queryKey: ["packages"],
        queryFn: async () => {
            const res = await axiosSecure.get("/packages");
            return res.data;
        }
    });

    if (profileLoading || packagesLoading) return <Loading />;

    // ---------- HANDLE PAYMENT ----------
    const handleUpgrade = async (pack) => {
        Swal.fire({
            title: `Upgrade to ${pack.name}?`,
            text: `This will increase your employee limit to ${pack.employeeLimit}.`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Proceed",
            confirmButtonColor: "#2563eb",
        }).then(async (result) => {
            if (!result.isConfirmed) return;

            try {
                const res = await axiosSecure.post("/create-checkout-session", {
                    packageName: pack.name,
                    price: pack.price,
                    email: profile.email,
                    employeeLimit: pack.employeeLimit,
                });

                if (res.data.url) window.location.href = res.data.url;

            } catch (error) {
                Swal.fire("Error", error.response?.data?.error || "Something went wrong", "error");
            }
        });
    };

    const currentPack = packages.find(p => p.name === profile.subscription);
    const currentOrder = currentPack?.order || 1;


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

            {/* Package Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {packages.map(pack => (
                    <div
                        key={pack._id}
                        className={`card shadow-lg border p-5 ${profile.subscription === pack.name ? "bg-base-200" : "bg-base-100"
                            }`}
                    >
                        <h3 className="text-2xl font-bold">{pack.name}</h3>
                        <p className="flex-1 text-gray-600 mt-1">{pack.description}</p>

                        <div className="mt-4">
                            <p className="text-xl font-semibold">${pack.price} / month</p>
                            <p className="text-sm text-gray-500">
                                Employee limit: {pack.employeeLimit}
                            </p>
                        </div>

                        {pack.order <= currentOrder ? (
                            <button className="btn btn-disabled mt-4">Upgraded</button>
                        ) : (
                            <button
                                className="btn btn-primary mt-4"
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