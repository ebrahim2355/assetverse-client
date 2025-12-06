import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Loading from "../../../Shared/Loading";
import { useState } from "react";

export default function EmployeeList() {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [search, setSearch] = useState("");

    // Fetch team members under this HR
    const { data: employees = [], isLoading } = useQuery({
        queryKey: ["employee-list", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/affiliations/team/${user.email}`);
            return res.data;
        }
    });

    if (isLoading) return <Loading />;

    // FILTER SEARCH
    const filtered = employees.filter((emp) =>
        emp.displayName?.toLowerCase().includes(search.toLowerCase()) ||
        emp.email?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full">
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

            {/* Count */}
            <p className="mb-4 text-sm text-gray-600">
                Total Employees: <span className="font-semibold">{filtered.length}</span>
            </p>

            {/* No employees */}
            {filtered.length === 0 && (
                <div className="text-center text-gray-500 py-10">
                    No employees found.
                </div>
            )}

            {/* =============== DESKTOP TABLE VIEW =============== */}
            <div className="hidden md:block overflow-x-auto bg-base-100 shadow rounded-lg">
                <table className="table w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date of Birth</th>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* =============== MOBILE CARD VIEW =============== */}
            <div className="grid md:hidden grid-cols-1 gap-4 mt-4">
                {filtered.map((emp) => (
                    <div
                        key={emp.email}
                        className="p-4 bg-base-100 shadow rounded-lg space-y-3"
                    >
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
                            {emp.dateOfBirth
                                ? new Date(emp.dateOfBirth).toLocaleDateString()
                                : "N/A"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
