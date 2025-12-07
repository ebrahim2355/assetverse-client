import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../Shared/Loading";
import toast from "react-hot-toast";

export default function RequestAsset() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [selectedAsset, setSelectedAsset] = useState(null);
    const [note, setNote] = useState("");

    // Fetch all assets (only those with availableQuantity > 0)
    const { data: assets = [], isLoading } = useQuery({
        queryKey: ["all-assets"],
        queryFn: async () => {
            const res = await axiosSecure.get("/assets?available=true");
            return res.data;
        }
    });

    if (isLoading) return <Loading />;

    // Submit asset request
    const handleRequest = async () => {
        if (!selectedAsset) return;

        const requestData = {
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
        };

        try {
            const res = await axiosSecure.post("/requests", requestData);

            if (res.data.insertedId) {
                toast.success("Request submitted!");
                setSelectedAsset(null);
                setNote("");
            }
        } catch {
            toast.error("Failed to submit request.");
        }
    };

    return (
        <div className="w-full">
            <h2 className="text-3xl font-bold mb-6">Request an Asset</h2>

            {/* If no assets available */}
            {assets.length === 0 && (
                <p className="text-center text-gray-500 py-10">
                    No available assets at the moment.
                </p>
            )}

            {/* Assets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {assets.map(asset => (
                    <div
                        key={asset._id}
                        className="bg-base-100 p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col"
                    >
                        <img
                            src={asset.productImage}
                            alt=""
                            className="w-full h-40 object-cover rounded-md"
                        />

                        <h3 className="text-xl font-semibold mt-3 flex-1">
                            {asset.productName}
                        </h3>

                        <p className="text-sm text-gray-500 flex-1">Company: {asset.companyName}</p>

                        <p className="text-sm mt-1">
                            Type:{" "}
                            <span className="badge badge-outline">
                                {asset.productType}
                            </span>
                        </p>

                        <p className="text-sm mt-1">
                            Available:{" "}
                            <span className="font-semibold">
                                {asset.availableQuantity}
                            </span>
                        </p>

                        <button
                            className="btn btn-primary w-full mt-4"
                            onClick={() => setSelectedAsset(asset)}
                        >
                            Request
                        </button>
                    </div>
                ))}
            </div>

            {/* MODAL */}
            {selectedAsset && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-base-100 p-6 rounded-lg shadow w-96">
                        <h3 className="text-xl font-bold mb-2">Request Asset</h3>
                        <p className="text-gray-600 mb-4">
                            <strong>{selectedAsset.productName}</strong>
                        </p>

                        <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="Write a note (optional)"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />

                        <div className="mt-4 flex gap-3">
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
