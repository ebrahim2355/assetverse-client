import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Shared/Loading";
import toast from "react-hot-toast";
import axios from "axios";

export default function HRProfile() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [preview, setPreview] = useState(null);

    // Fetch HR data
    const { data: profile = {}, isLoading, refetch } = useQuery({
        queryKey: ["hr-profile", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
    });

    const { register, handleSubmit, reset } = useForm({
        defaultValues: profile,
    });

    // Sync form with fetched data
    useEffect(() => {
        if (profile) reset(profile);
    }, [profile, reset]);

    if (isLoading) return <Loading />;

    const onSubmit = async (data) => {
        try {
            let photoURL = profile.photoURL;

            // Upload new image if selected
            if (data.photo?.[0]) {
                const formData = new FormData();
                formData.append("image", data.photo[0]);

                const uploadURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
                const res = await axios.post(uploadURL, formData);
                photoURL = res.data.data.url;
            }

            const updatedInfo = {
                displayName: data.displayName,
                photoURL,
                dateOfBirth: data.dateOfBirth,
                companyName: data.companyName
            };

            const result = await axiosSecure.patch(`/users/${user.email}`, {$set: updatedInfo});

            if (result.data.modifiedCount > 0) {
                toast.success("Profile updated!");
                refetch();
                reset();
            } else {
                toast("No changes detected");
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">HR Profile</h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-6 bg-base-100 shadow-md rounded-lg space-y-5"
            >
                {/* PROFILE IMAGE */}
                <div className="flex items-center gap-6">
                    <img
                        src={preview || profile.photoURL || profile.companyLogo || "https://i.ibb.co/y0K6vBp/user.png"}
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover border"
                    />

                    <input
                        type="file"
                        {...register("photo")}
                        className="file-input w-full"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) setPreview(URL.createObjectURL(file));
                        }}
                    />
                </div>

                {/* FULL NAME */}
                <div>
                    <label className="label font-semibold">Full Name</label>
                    <input
                        {...register("displayName")}
                        type="text"
                        className="input input-bordered w-full"
                    />
                </div>

                {/* EMAIL (READ ONLY) */}
                <div>
                    <label className="label font-semibold">Email</label>
                    <input
                        type="email"
                        className="input input-bordered w-full bg-gray-200 cursor-not-allowed"
                        value={profile.email}
                        readOnly
                    />
                </div>

                {/* COMPANY NAME */}
                <div>
                    <label className="label font-semibold">Company Name</label>
                    <input
                        {...register("companyName")}
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Company Name"
                    />
                </div>

                {/* DATE OF BIRTH */}
                <div>
                    <label className="label font-semibold">Date of Birth</label>
                    <input
                        {...register("dateOfBirth")}
                        type="date"
                        className="input input-bordered w-full"
                    />
                </div>

                {/* HR ACCOUNT DETAILS (READ ONLY SECTION) */}
                <div className="bg-base-200 p-4 rounded-lg">
                    <h3 className="font-semibold text-2xl label mb-4">Account Details:</h3>

                    <p><strong>Subscription:</strong> {profile.subscription}</p>
                    <p><strong>Package Limit:</strong> {profile.packageLimit}</p>
                    <p><strong>Current Employees:</strong> {profile.currentEmployees}</p>
                </div>

                {/* SUBMIT BTN */}
                <button className="btn btn-primary w-full">Update Profile</button>
            </form>
        </div>
    );
}
