import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loading from "../../../Shared/Loading";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function AddAsset() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();
    const [preview, setPreview] = useState(null);

    const { data: hrData = {}, isLoading: hrLoading } = useQuery({
        queryKey: ["hr-profile", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

    useEffect(() => {
        if (hrData?.companyName) {
            reset({
                companyName: hrData.companyName
            })
        }
    }, [hrData, reset]);

    if (hrLoading) return <Loading />;

    const onSubmit = async (data) => {
        try {
            let imageURL = "";

            if (data.productImage && data.productImage.length > 0) {
                const formData = new FormData();
                formData.append("image", data.productImage[0]);

                const uploadURL =
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

                const res = await axios.post(uploadURL, formData);
                imageURL = res.data.data.url;
            }

            const assetData = {
                productName: data.productName,
                productType: data.productType,
                productQuantity: Number(data.productQuantity),
                productImage: imageURL,
                availableQuantity: Number(data.productQuantity),
                hrEmail: user.email,
                companyName: data.companyName,
                dateAdded: new Date(),
            };

            const response = await axiosSecure.post("/assets", assetData);

            if (response.data.insertedId) {
                Swal.fire({
                    title: "Success!",
                    text: "Asset added successfully.",
                    icon: "success",
                    confirmButtonColor: "#2563eb",
                });
                reset();
                setPreview(null);
            }

        } catch (error) {
            console.error(error);

            Swal.fire({
                title: "Error!",
                text: error.response?.data?.error || "Failed to add asset",
                icon: "error",
                confirmButtonColor: "#dc2626",
            });
        }
    };

    if (isSubmitting) return <Loading />;

    return (
        <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Add New Asset</h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-base-100 shadow-lg p-6 rounded-lg space-y-6"
            >
                {/* PRODUCT NAME */}
                <div>
                    <label className="label font-semibold">Asset Name</label>
                    <input
                        type="text"
                        {...register("productName", { required: true })}
                        className="input input-bordered w-full"
                        placeholder="Ex: Dell Laptop"
                        required
                    />
                </div>

                {/* COMPANY NAME */}
                <div>
                    <label className="label font-semibold">Company Name</label>
                    <input
                        type="text"
                        {...register("companyName")}
                        className="input input-bordered w-full"
                        placeholder="Company Name"
                        defaultValue={hrData.companyName}
                    />
                </div>

                {/* PRODUCT TYPE */}
                <div>
                    <label className="label font-semibold">Asset Type</label>
                    <select
                        {...register("productType", { required: true })}
                        className="select select-bordered w-full"
                        required
                    >
                        <option value="" disabled>Select type</option>
                        <option value="Returnable">Returnable</option>
                        <option value="Non-returnable">Non-returnable</option>
                    </select>
                </div>

                {/* QUANTITY */}
                <div>
                    <label className="label font-semibold">Quantity</label>
                    <input
                        type="number"
                        min="1"
                        {...register("productQuantity", { required: true })}
                        className="input input-bordered w-full"
                        placeholder="Ex: 10"
                        required
                    />
                </div>

                {/* IMAGE UPLOAD */}
                <div>
                    <label className="label font-semibold">Asset Image</label>

                    <input
                        type="file"
                        {...register("productImage")}
                        className="file-input w-full"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) setPreview(URL.createObjectURL(file));
                        }}
                    />

                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-32 h-32 object-cover mt-3 rounded-md border"
                        />
                    )}
                </div>

                {/* SUBMIT BUTTON */}
                <button className="btn btn-primary w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Adding..." : "Add Asset"}
                </button>
            </form>
        </div>
    );
}
