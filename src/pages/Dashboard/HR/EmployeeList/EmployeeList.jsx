import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Loading from "../../../Shared/Loading";
import { useState } from "react";
import Swal from "sweetalert2";

export default function EmployeeList() {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [search, setSearch] = useState("");
    const queryClient = useQueryClient();

    // Fetch HR profile to get limits
    const { data: hrProfile = {} } = useQuery({
        queryKey: ["hr-profile", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

    // Fetch team members
    const { data: employees = [], isLoading } = useQuery({
        queryKey: ["employee-list", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/affiliations/team/${user.email}`);
            return res.data;
        }
    });

    // REMOVE EMPLOYEE MUTATION
    const removeMutation = useMutation({
        mutationFn: async (empEmail) => {
            await axiosSecure.delete(`/affiliations/remove/${empEmail}?hr=${user.email}`);
            await axiosSecure.patch(`/users/${user.email}`, { $inc: { currentEmployees: -1 } });
        },
        onSuccess: () => {
            Swal.fire("Removed!", "Employee removed from your team.", "success");
            queryClient.invalidateQueries(["employee-list", user?.email]);
            queryClient.invalidateQueries(["hr-profile", user?.email]);
        }
    });

    const handleRemove = (emp) => {
        Swal.fire({
            title: "Remove Employee?",
            text: `Are you sure you want to remove ${emp.displayName} from your team?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Remove",
            confirmButtonColor: "#dc2626"
        }).then((res) => {
            if (res.isConfirmed) {
                removeMutation.mutate(emp.email);
            }
        });
    };

    if (isLoading) return <Loading />;

    // SEARCH FILTER
    const filtered = employees.filter((emp) =>
        emp.displayName?.toLowerCase().includes(search.toLowerCase()) ||
        emp.email?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            {/* HEADER */}
            <div className="flex justify-between flex-col md:flex-row gap-4 mb-6">
                <h2 className="text-3xl font-bold">Employee List</h2>

                <input
                    type="text"
                    placeholder="Search employees..."
                    className="input input-bordered w-full md:w-72"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* EMPLOYEE COUNT */}
            <p className="mb-4 text-sm text-gray-600">
                Employees Used:{" "}
                <span className="font-semibold">
                    {employees.length}/{hrProfile.packageLimit}
                </span>
            </p>

            {/* IF NO EMPLOYEES */}
            {filtered.length === 0 && (
                <div className="text-center text-gray-500 py-10">No employees found.</div>
            )}

            {/* ================= DESKTOP TABLE ================= */}
            <div className="hidden md:block overflow-x-auto bg-base-100 shadow rounded-lg">
                <table className="table w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>DOB</th>
                            <th>Join Date</th>
                            <th>Assets</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((emp) => (
                            <tr key={emp.email}>
                                <td>
                                    <img
                                        src={emp.photoURL || "https://i.ibb.co/y0K6vBp/user.png"}
                                        className="w-14 h-14 rounded-full object-cover"
                                    />
                                </td>
                                <td className="font-semibold">{emp.displayName}</td>
                                <td>{emp.email}</td>
                                <td>{emp.dateOfBirth ? new Date(emp.dateOfBirth).toLocaleDateString() : "N/A"}</td>
                                <td>{new Date(emp.createdAt).toLocaleDateString()}</td>
                                <td>{emp.assetCount}</td>
                                <td className="text-center">
                                    <button
                                        onClick={() => handleRemove(emp)}
                                        className="btn btn-error btn-sm"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ================= MOBILE CARDS ================= */}
            <div className="grid md:hidden grid-cols-1 gap-4 mt-4">
                {filtered.map((emp) => (
                    <div key={emp.email} className="p-4 bg-base-100 shadow rounded-lg space-y-3">
                        <div className="flex items-center gap-4">
                            <img
                                src={emp.photoURL || "https://i.ibb.co/y0K6vBp/user.png"}
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="font-bold text-lg">{emp.displayName}</h3>
                                <p className="text-gray-600 text-sm">{emp.email}</p>
                            </div>
                        </div>

                        <p className="text-sm">
                            <span className="font-semibold">Birthday:</span>{" "}
                            {emp.dateOfBirth ? new Date(emp.dateOfBirth).toLocaleDateString() : "N/A"}
                        </p>
                        <p className="text-sm">
                            <span className="font-semibold">Join Date:</span>{" "}
                            {new Date(emp.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-sm">
                            <span className="font-semibold">Assets:</span> {emp.assetCount}
                        </p>


                        <button
                            onClick={() => handleRemove(emp)}
                            className="btn btn-error btn-sm w-full mt-2"
                        >
                            Remove from Team
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
