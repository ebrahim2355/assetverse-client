import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Shared/Loading";
import toast from "react-hot-toast";
import axios from "axios";

export default function EmployeeProfile() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [preview, setPreview] = useState(null);

    // Fetch logged-in employee data
    const { data: profile = {}, isLoading, refetch } = useQuery({
        queryKey: ["employee-profile", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

    const { register, handleSubmit, reset } = useForm({
        defaultValues: profile
    });

    useEffect(() => {
        if (profile) {
            reset(profile);
        }
    }, [profile, reset])

    const { data: affiliations = [], isLoading: affLoading } = useQuery({
        queryKey: ["employee-affiliations", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/affiliations/employee/${user.email}`);
            return res.data;
        }
    });

    if (isLoading || affLoading) return <Loading />;

    const onSubmit = async (data) => {
        try {
            let photoURL = profile.photoURL;

            if (data.photo && data.photo.length > 0) {
                const profileImg = data.photo[0];
                const formData = new FormData();
                formData.append("image", profileImg);

                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
                const imgRes = await axios.post(image_API_URL, formData);

                photoURL = imgRes.data.data.url;
            }

            const userInfo = {
                displayName: data.displayName,
                dateOfBirth: data.dateOfBirth,
                photoURL,
            };

            const res = await axiosSecure.patch(`/users/${user.email}`, { $set: userInfo });

            if (res.data.modifiedCount > 0) {
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
            <h2 className="text-3xl font-bold mb-6">My Profile</h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-6 bg-base-100 shadow-md rounded-lg space-y-5"
            >

                {/* PROFILE IMAGE */}
                <div className="flex items-center gap-6">
                    <img
                        src={preview || profile.photoURL || "https://i.ibb.co/y0K6vBp/user.png"}
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover border"
                    />

                    <input type="file" {...register("photo")} className="w-full file-input"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                const url = URL.createObjectURL(file);
                                setPreview(url);
                            }
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
                        defaultValue={profile.displayName}
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

                {/* DATE OF BIRTH */}
                <div>
                    <label className="label font-semibold">Date of Birth</label>
                    <input
                        {...register("dateOfBirth")}
                        type="date"
                        className="input input-bordered w-full"
                        defaultValue={profile.dateOfBirth}
                    />
                </div>

                {/* COMPANY AFFILIATIONS */}
                <div className="bg-base-200 p-4 rounded-lg">
                    <h3 className="font-semibold text-xl mb-3">My Company Affiliations</h3>

                    {affiliations.length === 0 ? (
                        <p className="text-gray-600">You are not affiliated with any company yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {affiliations.map((hr, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-4 bg-base-100 p-3 rounded-lg shadow"
                                >
                                    <div>
                                        <h4 className="font-bold text-lg">{hr.companyName}</h4>
                                        <p className="text-sm text-gray-600">HR Email: {hr.hrEmail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* SUBMIT BTN */}
                <button className="btn btn-primary w-full mt-4">
                    Update Profile
                </button>
            </form>
        </div>
    );
}