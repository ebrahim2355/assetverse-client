import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Shared/Loading";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AssetDetails() {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { role, roleLoading } = useRole();
    const [requesting, setRequesting] = useState(false);

    const { data: asset = {}, isLoading } = useQuery({
        queryKey: ["asset-details", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/assets/id/${id}`);
            return res.data;
        }
    });

    const { data: relatedAssets = [] } = useQuery({
        queryKey: ["related-assets", asset?.productType],
        enabled: !!asset?.productType,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/assets?search=&page=1&limit=6`
            );
            return res.data.assets.filter(
                a => a.productType === asset.productType && a._id !== asset._id
            );
        }
    });

    const handleRequestAsset = async () => {
        if (!user) {
            toast.error("Please login to request an asset");
            return;
        }

        if (role !== "employee") {
            toast.error("Only employees can request assets");
            return;
        }

        try {
            setRequesting(true);

            const requestData = {
                assetId: asset._id,
                assetName: asset.productName,
                assetType: asset.productType,
                assetImage: asset.productImage,
                requesterName: user.displayName,
                requesterEmail: user.email,
                hrEmail: asset.hrEmail,
                companyName: asset.companyName,
                requestDate: new Date(),
                requestStatus: "pending",
            };

            const res = await axiosSecure.post("/requests", requestData);

            if (res.data.insertedId) {
                toast.success("Asset request submitted!");
            }
        } catch {
            toast.error("Failed to submit request");
        } finally {
            setRequesting(false);
        }
    };

    if (isLoading) return <Loading />;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto px-6 py-10"
        >
            <img
                src={asset.productImage}
                alt={asset.productName}
                className="w-full h-80 object-cover rounded-xl shadow"
            />

            <div className="mt-6 space-y-4">
                <h1 className="text-3xl font-bold">{asset.productName}</h1>

                <p className="text-gray-500">
                    Company: {asset.companyName}
                </p>

                <div className="flex gap-4">
                    <span className="badge badge-primary">
                        {asset.productType}
                    </span>
                    <span className="badge badge-outline">
                        Available: {asset.availableQuantity}
                    </span>
                </div>

                <p className="leading-relaxed text-primary font-mono">
                    This asset is used across the organization to support
                    employee productivity and operational efficiency.
                </p>

                {/* REQUEST ACTION */}
                {!roleLoading && (
                    <>
                        {user && role === "employee" && (
                            <button
                                onClick={handleRequestAsset}
                                disabled={requesting || asset.availableQuantity === 0}
                                className="btn btn-primary mt-4 w-full"
                            >
                                {requesting ? "Requesting..." : "Request This Asset"}
                            </button>
                        )}

                        {user && role === "hr" && (
                            <p className="text-sm text-gray-500 mt-4">
                                HR managers cannot request assets.
                            </p>
                        )}

                        {!user && (
                            <p className="text-sm text-gray-500 mt-4">
                                Please login as an employee to request this asset.
                            </p>
                        )}
                    </>
                )}

                <Link to="/" className="btn btn-outline mt-6">
                    ← Back to Home
                </Link>

                {/* RELATED ASSETS */}
                {relatedAssets.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold mb-6">
                            Related Assets
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedAssets.slice(0, 3).map(item => (
                                <motion.div
                                    key={item._id}
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="bg-base-100 rounded-xl shadow border overflow-hidden flex flex-col"
                                >
                                    <img
                                        src={item.productImage}
                                        alt={item.productName}
                                        className="h-40 w-full object-cover"
                                    />

                                    <div className="p-4 flex flex-col flex-1">
                                        <h3 className="font-semibold text-lg">
                                            {item.productName}
                                        </h3>

                                        <p className="text-sm text-gray-500 mb-2">
                                            {item.companyName}
                                        </p>

                                        <div className="flex gap-2 mb-3">
                                            <span className="badge badge-primary badge-sm">
                                                {item.productType}
                                            </span>
                                            <span className="badge badge-outline badge-sm">
                                                Available: {item.availableQuantity}
                                            </span>
                                        </div>

                                        <Link
                                            to={`/assets/${item._id}`}
                                            className="btn btn-sm btn-primary mt-auto"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}