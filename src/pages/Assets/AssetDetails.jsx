import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Shared/Loading";
import { motion } from "framer-motion";

export default function AssetDetails() {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: asset = {}, isLoading } = useQuery({
        queryKey: ["asset-details", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/assets/id/${id}`);
            return res.data;
        }
    });

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

                <p className="text-gray-600">
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

                <p className="leading-relaxed text-gray-700">
                    This asset is used across the organization to support
                    employee productivity and operational efficiency.
                </p>

                <Link to="/" className="btn btn-outline mt-6">
                    ← Back to Home
                </Link>
            </div>
        </motion.div>
    );
}