import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../Shared/Loading";
import Swal from "sweetalert2";
import axios from "axios";
import toast from "react-hot-toast";

export default function EditAsset() {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [preview, setPreview] = useState(null);

    // Fetch asset by ID
    const { data: asset = {}, isLoading, refetch } = useQuery({
        queryKey: ["asset", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/assets/id/${id}`);
            return res.data;
        }
    });

    const { register, handleSubmit, reset } = useForm({
        defaultValues: asset
    });

    useEffect(() => {
        if (asset) reset(asset);
    }, [asset, reset]);

    if (isLoading) return <Loading />;

    const onSubmit = async (data) => {
        const result = await Swal.fire({
            title: "Update Asset?",
            text: "Are you sure you want to update this asset?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Update",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33"
        });

        if (!result.isConfirmed) return;

        try {
            let imageURL = asset.productImage;

            if (
                data.productImage &&
                data.productImage.length > 0 &&
                data.productImage[0] instanceof File
            ) {
                const formData = new FormData();
                formData.append("image", data.productImage[0]);

                const uploadURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

                const imgRes = await axios.post(uploadURL, formData);

                imageURL = imgRes.data.data.url;
                console.log(imageURL)
            }

            const updated = {
                productName: data.productName,
                productType: data.productType,
                productQuantity: Number(data.productQuantity),
                productImage: imageURL,
            };

            const res = await axiosSecure.patch(`/assets/${id}`, { $set: updated });
            console.log(res.data.modifiedCount)
            if (res.data.modifiedCount > 0) {
                toast.success("Asset updated successfully!");
                refetch();
                navigate("/dashboard/hr/assets");
            } else {
                toast("No changes detected");
            }

        } catch {
            toast.error("Failed to update asset!");
        }
    };

    return (
        <div className="max-w-3xl mx-auto">

            <h2 className="text-3xl font-bold mb-6">Edit Asset</h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-6 bg-base-100 shadow rounded-lg space-y-6"
            >

                {/* Image Preview */}
                <div className="flex items-center gap-6">
                    <img
                        src={preview || asset.productImage}
                        className="w-24 h-24 rounded-lg object-cover border"
                    />
                    <input
                        type="file"
                        {...register("productImage")}
                        className="file-input file-input-bordered"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setPreview(URL.createObjectURL(file));
                            }
                        }}
                    />
                </div>

                {/* Product Name */}
                <div>
                    <label className="label font-semibold">Product Name</label>
                    <input
                        {...register("productName", { required: true })}
                        type="text"
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Type */}
                <div>
                    <label className="label font-semibold">Product Type</label>
                    <select
                        {...register("productType")}
                        className="select select-bordered w-full"
                    >
                        <option value="Returnable">Returnable</option>
                        <option value="Non-returnable">Non-returnable</option>
                    </select>
                </div>

                {/* Quantity */}
                <div>
                    <label className="label font-semibold">Quantity</label>
                    <input
                        {...register("productQuantity", { required: true })}
                        type="number"
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Submit */}
                <button className="btn btn-primary w-full mt-4">
                    Update Asset
                </button>
            </form>

        </div>
    );
}
