import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../Shared/Loading";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Link } from "react-router";

export default function RequestAsset() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [page, setPage] = useState(1);
    const [limit] = useState(6);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [filterType, setFilterType] = useState("");
    const [sortBy, setSortBy] = useState("");

    const [selectedAsset, setSelectedAsset] = useState(null);
    const [note, setNote] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1);
        }, 400);
        return () => clearTimeout(timer);
    }, [search]);

    const { data = {}, isLoading } = useQuery({
        queryKey: ["all-assets", page, limit, debouncedSearch, filterType, sortBy],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/assets?available=true&page=${page}&limit=${limit}&search=${debouncedSearch}`
            );

            let assets = res.data.assets;

            // FILTER
            if (filterType) {
                assets = assets.filter(a => a.productType === filterType);
            }

            // SORT
            if (sortBy === "name") {
                assets.sort((a, b) => a.productName.localeCompare(b.productName));
            }
            if (sortBy === "availability") {
                assets.sort((a, b) => b.availableQuantity - a.availableQuantity);
            }

            return {
                ...res.data,
                assets
            };
        }
    });

    const { assets = [], totalPages = 1 } = data;

    const handleRequest = async () => {
        if (!selectedAsset) return;

        try {
            const res = await axiosSecure.post("/requests", {
                assetId: selectedAsset._id,
                assetName: selectedAsset.productName,
                assetType: selectedAsset.productType,
                assetImage: selectedAsset.productImage,
                requesterName: user.displayName,
                requesterEmail: user.email,
                hrEmail: selectedAsset.hrEmail,
                companyName: selectedAsset.companyName,
                note,
                requestDate: new Date(),
                requestStatus: "pending"
            });

            if (res.data.insertedId) {
                toast.success("Request submitted!");
                setSelectedAsset(null);
                setNote("");
            }
        } catch {
            toast.error("Failed to submit request.");
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="w-full">
            <h2 className="text-3xl font-bold mb-6">Request an Asset</h2>

            {/* CONTROLS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search assets..."
                    className="input input-bordered"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="select select-bordered"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    <option value="">All Types</option>
                    <option value="Returnable">Returnable</option>
                    <option value="Non-returnable">Non-returnable</option>
                </select>

                <select
                    className="select select-bordered"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="">Sort By</option>
                    <option value="name">Name (A–Z)</option>
                    <option value="availability">Availability</option>
                </select>
            </div>

            {/* EMPTY STATE */}
            {assets.length === 0 && (
                <p className="text-center text-gray-500 py-10">
                    No assets found.
                </p>
            )}

            {/* ASSETS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {assets.map(asset => (
                    <motion.div
                        key={asset._id}
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="bg-base-100 rounded-xl shadow border flex flex-col overflow-hidden"
                    >
                        <img
                            src={asset.productImage}
                            className="h-40 w-full object-cover"
                        />

                        <div className="p-4 flex flex-col flex-1">
                            <h3 className="text-lg font-semibold">
                                {asset.productName}
                            </h3>

                            <p className="text-sm text-gray-500 mb-2">
                                {asset.companyName}
                            </p>

                            <div className="flex gap-2 mb-3">
                                <span className="badge badge-primary badge-sm">
                                    {asset.productType}
                                </span>
                                <span className="badge badge-outline badge-sm">
                                    Available: {asset.availableQuantity}
                                </span>
                            </div>

                            <div className="mt-auto flex gap-2">
                                <Link
                                    to={`/assets/${asset._id}`}
                                    className="btn btn-outline btn-sm flex-1"
                                >
                                    View Details
                                </Link>

                                <button
                                    disabled={asset.availableQuantity === 0}
                                    className="btn btn-primary btn-sm flex-1"
                                    onClick={() => setSelectedAsset(asset)}
                                >
                                    Request
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* PAGINATION */}
            <div className="flex justify-center mt-10 gap-2">
                <button
                    className="btn btn-sm"
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                >
                    Previous
                </button>

                {[...Array(totalPages).keys()].map(n => (
                    <button
                        key={n}
                        className={`btn btn-sm ${page === n + 1 ? "btn-primary" : ""}`}
                        onClick={() => setPage(n + 1)}
                    >
                        {n + 1}
                    </button>
                ))}

                <button
                    className="btn btn-sm"
                    disabled={page === totalPages}
                    onClick={() => setPage(p => p + 1)}
                >
                    Next
                </button>
            </div>

            {/* REQUEST MODAL */}
            {selectedAsset && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-base-100 p-6 rounded-xl w-96">
                        <h3 className="text-xl font-bold mb-2">
                            Request Asset
                        </h3>

                        <p className="mb-3 text-gray-500">
                            {selectedAsset.productName}
                        </p>

                        <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="Write a note (optional)"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />

                        <div className="flex gap-3 mt-4">
                            <button
                                className="btn btn-primary flex-1"
                                onClick={handleRequest}
                            >
                                Submit
                            </button>
                            <button
                                className="btn flex-1"
                                onClick={() => setSelectedAsset(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}