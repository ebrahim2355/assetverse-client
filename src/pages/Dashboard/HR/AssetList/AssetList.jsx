import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Loading from "../../../Shared/Loading";
import { Link } from "react-router";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function AssetList() {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("all");

    // Fetch all HR-based assets
    const { data: assets = [], isLoading, refetch } = useQuery({
        queryKey: ["hr-assets", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/assets/${user.email}`);
            return res.data;
        },
    });

    // Delete Asset
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This asset will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/assets/${id}`);

                    if (res.data.deletedCount > 0) {
                        Swal.fire(
                            "Deleted!",
                            "Asset has been removed.",
                            "success"
                        );
                        refetch();
                    }
                } catch {
                    Swal.fire(
                        "Error!",
                        "Failed to delete the asset.",
                        "error"
                    );
                }
            }
        });
    };


    if (isLoading) return <Loading />;

    // FILTER + SEARCH
    const filtered = assets.filter((asset) => {
        const s = search.toLowerCase();
        const matchesSearch =
            asset.productName.toLowerCase().includes(s) ||
            asset.productType.toLowerCase().includes(s);

        const matchesFilter =
            filterType === "all" ||
            asset.productType.toLowerCase() === filterType.toLowerCase();

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="w-full">
            <div className="flex justify-between mb-6">
                <h2 className="text-3xl font-bold">Asset List</h2>
                <Link to="/dashboard/hr/add-asset" className="btn btn-primary">
                    + Add Asset
                </Link>
            </div>

            {/* Search + Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search assets..."
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

            {/* If no assets */}
            {filtered.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                    No assets found.
                </div>
            )}

            {/* DESKTOP TABLE */}
            <div className="hidden md:block overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>Date Added</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.map((asset) => (
                            <tr key={asset._id}>
                                <td>
                                    <img
                                        src={asset.productImage}
                                        className="w-14 h-14 rounded-md object-cover"
                                    />
                                </td>
                                <td>{asset.productName}</td>
                                <td>
                                    <span
                                        className={`badge ${asset.productType === "Returnable"
                                            ? "badge-primary"
                                            : "badge-secondary"
                                            }`}
                                    >
                                        {asset.productType}
                                    </span>
                                </td>

                                <td>{asset.productQuantity}</td>

                                <td>
                                    {new Date(asset.dateAdded).toLocaleDateString()}
                                </td>

                                <td className="flex gap-2">
                                    <Link
                                        to={`/dashboard/hr/edit-asset/${asset._id}`}
                                        className="btn btn-sm btn-info"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="btn btn-sm btn-error"
                                        onClick={() => handleDelete(asset._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MOBILE CARDS */}
            <div className="grid md:hidden grid-cols-1 gap-4">
                {filtered.map((asset) => (
                    <div
                        key={asset._id}
                        className="p-4 bg-base-100 shadow rounded-lg space-y-3"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={asset.productImage}
                                className="w-20 h-20 rounded-md object-cover"
                            />
                            <div>
                                <h3 className="font-bold text-lg">{asset.productName}</h3>
                                <p className="text-sm text-gray-500">
                                    {asset.productType}
                                </p>
                            </div>
                        </div>

                        <p>
                            <span className="font-semibold">Quantity:</span>{" "}
                            {asset.productQuantity}
                        </p>

                        <p>
                            <span className="font-semibold">Date Added:</span>{" "}
                            {new Date(asset.dateAdded).toLocaleDateString()}
                        </p>

                        <div className="flex gap-3 pt-2 w-full">
                            <Link
                                to={`/dashboard/hr/edit-asset/${asset._id}`}
                                className="btn btn-sm btn-info w-full flex-1"
                            >
                                Edit
                            </Link>
                            <button
                                className="btn btn-sm btn-error w-full flex-1"
                                onClick={() => handleDelete(asset._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
