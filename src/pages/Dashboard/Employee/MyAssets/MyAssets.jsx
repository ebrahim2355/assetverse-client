import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../Shared/Loading";

export default function MyAssets() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("all");

    // Fetch employee assets
    const { data: assets = [], isLoading } = useQuery({
        queryKey: ["my-assets", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/assigned-assets/${user.email}`);
            return res.data;
        }
    });

    if (isLoading) return <Loading />;

    // FILTER + SEARCH LOGIC
    const filtered = assets.filter(asset => {
        const matchesSearch = asset.assetName.toLowerCase().includes(search.toLowerCase());
        const matchesFilter =
            filterType === "all" ||
            asset.assetType.toLowerCase() === filterType.toLowerCase();

        return matchesSearch && matchesFilter;
    });

    // TODO: Connect with return API
    function handleReturn(id) {
        console.log("Return asset:", id);
    }

    return (
        <div className="w-full">

            <h2 className="text-3xl font-bold mb-6">My Assets</h2>

            {/* Search + Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by asset name..."
                    className="input input-bordered w-full md:w-1/3"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="select select-bordered w-full md:w-1/4"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    <option value="all">All Types</option>
                    <option value="Returnable">Returnable</option>
                    <option value="Non-returnable">Non-returnable</option>
                </select>
            </div>

            {/* No data message */}
            {filtered.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                    <p>No assets found.</p>
                </div>
            )}

            {/* Desktop Table */}
            {filtered.length > 0 && (
                <>
                    <div className="hidden md:block overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Company</th>
                                    <th>Assigned Date</th>
                                    <th>Status</th>
                                    <th>Return</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filtered.map(asset => (
                                    <tr key={asset._id}>
                                        <td>
                                            <img
                                                src={asset.assetImage}
                                                className="w-14 h-14 rounded-md object-cover"
                                            />
                                        </td>

                                        <td className="font-medium">{asset.assetName}</td>

                                        <td>
                                            <span
                                                className={`badge ${asset.assetType === "Returnable"
                                                    ? "badge-primary"
                                                    : "badge-secondary whitespace-nowrap"
                                                    }`}
                                            >
                                                {asset.assetType}
                                            </span>
                                        </td>

                                        <td>{asset.companyName}</td>

                                        <td>
                                            {new Date(asset.assignmentDate).toLocaleDateString()}
                                        </td>

                                        <td className="font-semibold">{asset.status}</td>

                                        <td>
                                            {asset.assetType === "Returnable" &&
                                                asset.status === "assigned" ? (
                                                <button
                                                    className="btn btn-sm btn-error"
                                                    onClick={() => handleReturn(asset._id)}
                                                >
                                                    Return
                                                </button>
                                            ) : (
                                                <span className="text-gray-400 text-sm btn">Not Returnable</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden grid grid-cols-1 gap-4">
                        {filtered.map(asset => (
                            <div
                                key={asset._id}
                                className="p-4 bg-base-100 shadow rounded-lg space-y-3"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={asset.assetImage}
                                        className="w-16 h-16 rounded-md object-cover"
                                    />
                                    <div>
                                        <h3 className="font-bold text-lg">{asset.assetName}</h3>
                                        <p className="text-sm text-gray-500">{asset.companyName}</p>
                                    </div>
                                </div>

                                <p className="text-sm">
                                    <strong>Type:</strong>{" "}
                                    <span
                                        className={`badge ${asset.assetType === "Returnable"
                                            ? "badge-primary"
                                            : "badge-secondary"
                                            }`}
                                    >
                                        {asset.assetType}
                                    </span>
                                </p>

                                <p className="text-sm">
                                    <strong>Assigned:</strong>{" "}
                                    {new Date(asset.assignmentDate).toLocaleDateString()}
                                </p>

                                <p className="text-sm">
                                    <strong>Status:</strong>{" "}
                                    <span className="font-semibold">{asset.status}</span>
                                </p>

                                <div className="pt-2">
                                    {asset.assetType === "Returnable" &&
                                        asset.status === "assigned" ? (
                                        <button
                                            className="btn btn-error btn-sm w-full"
                                            onClick={() => handleReturn(asset._id)}
                                        >
                                            Return
                                        </button>
                                    ) : (
                                        <button className="btn btn-disabled btn-sm w-full" disabled>
                                            Not Returnable
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

        </div>
    );
}
