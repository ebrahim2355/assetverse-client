import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../Shared/Loading";

export default function MyTeam() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [selectedHR, setSelectedHR] = useState("");

    const { data: affiliations = [], isLoading: loadingAffiliation } = useQuery({
        queryKey: ["affiliations", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/affiliations/employee/${user.email}`);
            return res.data;
        }
    });

    useEffect(() => {
        if (affiliations.length > 0 && !selectedHR) {
            setSelectedHR(affiliations[0].hrEmail);
        }
    }, [affiliations, selectedHR]);

    const { data: team = [], isLoading: loadingTeam } = useQuery({
        queryKey: ["team-members", selectedHR],
        enabled: !!selectedHR,
        queryFn: async () => {
            const res = await axiosSecure.get(`/affiliations/team/${selectedHR}`);
            return res.data;
        }
    });

    if (loadingAffiliation || loadingTeam) return <Loading />;

    // Birthdays this month
    const currentMonth = new Date().getMonth();
    const upcomingBirthdays = team.filter(member => {
        const dob = new Date(member.dateOfBirth);
        return dob.getMonth() === currentMonth;
    });

    return (
        <div className="w-full">
            <h2 className="text-3xl font-bold mb-6">My Team</h2>

            {/* Company Selector */}
            <div className="mb-6">
                <select
                    className="select select-bordered w-full max-w-sm"
                    value={selectedHR}
                    onChange={(e) => setSelectedHR(e.target.value)}
                >
                    {affiliations.map((a) => (
                        <option key={a.hrEmail} value={a.hrEmail}>
                            {a.companyName}
                        </option>
                    ))}
                </select>
            </div>

            {team.length === 0 && <p className="text-gray-500">No team members found.</p>}

            {/* Team Members */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {team.map(member => (
                    <div
                        key={member.email}
                        className="p-4 bg-base-100 shadow rounded-lg flex flex-col items-center text-center"
                    >
                        <img
                            src={member.photoURL || "https://i.ibb.co/y0K6vBp/user.png"}
                            className="w-20 h-20 rounded-full object-cover mb-3"
                        />

                        <h3 className="text-lg font-bold">{member.displayName}</h3>
                        <p className="text-gray-500 text-sm">{member.email}</p>

                        <div className="mt-2 text-sm">
                            <span className="font-semibold">Birthday:</span>{" "}
                            {new Date(member.dateOfBirth).toLocaleDateString()}
                        </div>
                    </div>
                ))}
            </div>

            {/* Birthdays Section */}
            <div className="mt-10">
                <h3 className="text-xl font-semibold mb-3">🎉 Upcoming Birthdays This Month</h3>

                {upcomingBirthdays.length === 0 ? (
                    <p className="text-gray-500 text-sm">No birthdays this month.</p>
                ) : (
                    <ul className="list-disc ml-6">
                        {upcomingBirthdays.map(m => (
                            <li key={m.email} className="text-sm">
                                {m.name} — {new Date(m.dateOfBirth).toLocaleDateString()}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
