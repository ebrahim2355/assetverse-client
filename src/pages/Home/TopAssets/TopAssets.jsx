import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Shared/Loading";
import { motion } from "framer-motion";
import { Link } from "react-router";

export default function TopAssets() {
    const axiosSecure = useAxiosSecure();

    const { data: assets = [], isLoading } = useQuery({
        queryKey: ["top-assets"],
        queryFn: async () => {
            const res = await axiosSecure.get("/assets/top-used?limit=6");
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-64 bg-base-200 rounded-xl animate-pulse"></div>
                ))}
            </div>
        );
    }

    return (
        <section className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-10">
                Most Used Assets
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assets.map((asset, index) => (
                    <motion.div
                        key={asset._id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.08 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.03 }}
                        className="bg-base-100 rounded-xl shadow p-5 flex flex-col"
                    >
                        <img
                            src={asset.assetImage}
                            alt={asset.assetName}
                            className="h-36 w-full object-cover rounded-lg"
                        />

                        <h3 className="text-xl font-semibold mt-4">
                            {asset.assetName}
                        </h3>

                        <p className="text-sm text-gray-500">
                            Company: {asset.companyName}
                        </p>

                        <div className="mt-4 flex items-center justify-between">
                            <span className="badge badge-outline">
                                {asset.assetType}
                            </span>

                            <span className="font-semibold text-primary">
                                Used {asset.count}×
                            </span>
                        </div>

                        <Link
                            to={`/assets/${asset._id}`}
                            className="btn btn-primary btn-sm mt-5 w-full"
                        >
                            View Details
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}