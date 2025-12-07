import { Link } from "react-router";
import useAuth from "../../../../hooks/useAuth";
import { motion } from "framer-motion";
import {
    FaBoxOpen, FaUserTie, FaClipboardList, FaArrowUp, FaUsers
} from "react-icons/fa";
import {
    PieChart, Pie, Cell,
    BarChart, Bar, XAxis, YAxis, Tooltip,
    ResponsiveContainer, Legend, CartesianGrid
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

export default function HRDashboard() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: distribution = {} } = useQuery({
        queryKey: ["distribution", user?.email],
        queryFn: () =>
            axiosSecure
                .get(`/analytics/asset-distribution/${user.email}`)
                .then((res) => res.data),
    });

    const { data: topRequests = [] } = useQuery({
        queryKey: ["top-requests", user?.email],
        queryFn: () =>
            axiosSecure
                .get(`/analytics/top-requests/${user.email}`)
                .then((res) => res.data),
    });

    const PIE_COLORS = ["#4f46e5", "#06b6d4"];

    const { data: assets = [] } = useQuery({
        queryKey: ["assets", user?.email],
        enabled: !!user?.email,
        queryFn: () => axiosSecure.get(`/assets/${user.email}`).then(res => res.data)
    });

    const { data: employees = [] } = useQuery({
        queryKey: ["employees", user?.email],
        enabled: !!user?.email,
        queryFn: () => axiosSecure.get(`/affiliations/team/${user.email}`).then(res => res.data)
    });

    const { data: requests = [] } = useQuery({
        queryKey: ["requests", user?.email],
        enabled: !!user?.email,
        queryFn: () => axiosSecure.get(`/requests?hrEmail=${user.email}`).then(res => res.data)
    });

    const { data: profile = {} } = useQuery({
        queryKey: ["hr-profile", user?.email],
        enabled: !!user?.email,
        queryFn: () => axiosSecure.get(`/users/${user.email}`).then(res => res.data)
    });

    const totalAssets = assets.length;
    const totalEmployees = employees.length;
    const pendingRequests = requests.filter(req => req.requestStatus === "pending").length;

    const packageLimitText = `${profile.currentEmployees || 0} / ${profile.packageLimit || 0}`;


    return (
        <div className="space-y-12">

            {/* HEADER */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-base-100 p-6 rounded-xl shadow-sm border"
            >
                <h1 className="text-3xl md:text-4xl font-bold">
                    Welcome, {user?.displayName || "HR Manager"} 👋
                </h1>
                <p className="text-base-content/70 mt-2 max-w-xl">
                    Manage assets, employees, requests, and track insights with real-time analytics.
                </p>
            </motion.div>

            {/* STATS OVERVIEW */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <StatCard label="Total Assets" value={totalAssets} icon={<FaBoxOpen />} />
                <StatCard label="Employees" value={totalEmployees} icon={<FaUsers />} />
                <StatCard label="Pending Requests" value={pendingRequests} icon={<FaClipboardList />} />
                <StatCard label="Package Limit" value={packageLimitText} icon={<FaArrowUp />} />
            </div>

            {/* NAVIGATION CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <HRCard
                    icon={<FaBoxOpen size={32} />}
                    title="Asset List"
                    desc="View and manage all company assets."
                    link="/dashboard/hr/assets"
                />

                <HRCard
                    icon={<FaUserTie size={32} />}
                    title="Add Asset"
                    desc="Add new items to your company inventory."
                    link="/dashboard/hr/add-asset"
                />

                <HRCard
                    icon={<FaClipboardList size={32} />}
                    title="All Requests"
                    desc="Review and approve employee asset requests."
                    link="/dashboard/hr/requests"
                />

                <HRCard
                    icon={<FaUsers size={32} />}
                    title="Employee List"
                    desc="Manage employee affiliations under your company."
                    link="/dashboard/hr/employees"
                />

                <HRCard
                    icon={<FaArrowUp size={32} />}
                    title="Upgrade Package"
                    desc="Increase employee limits and unlock premium features."
                    link="/dashboard/hr/upgrade"
                />
            </div>

            {/* ANALYTICS SECTION */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="card bg-base-100 shadow-xl rounded-xl border"
            >
                <div className="card-body space-y-10">

                    <h2 className="text-xl font-semibold border-b pb-2">
                        Analytics Overview
                    </h2>

                    {/* PIE CHART */}
                    <div>
                        <h3 className="font-semibold mb-3 text-lg">
                            Returnable vs Non-returnable Assets
                        </h3>

                        <div className="w-full h-72">
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={[
                                            { name: "Returnable", value: distribution.returnable },
                                            { name: "Non-returnable", value: distribution.nonReturnable }
                                        ]}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={95}
                                        dataKey="value"
                                    >
                                        {PIE_COLORS.map((color, i) => (
                                            <Cell key={i} fill={color} />
                                        ))}
                                    </Pie>
                                    <Legend />
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* BAR CHART */}
                    <div>
                        <h3 className="font-semibold mb-3 text-lg">
                            Top 5 Most Requested Assets
                        </h3>

                        <div className="w-full h-72">
                            <ResponsiveContainer>
                                <BarChart data={topRequests}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </div>
            </motion.div>
        </div>
    );
}

/* POLISHED COMPONENTS */
function HRCard({ icon, title, desc, link }) {
    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="card bg-base-100 shadow-md hover:shadow-xl border rounded-xl transition-all"
        >
            <div className="card-body">
                <div className="text-primary">{icon}</div>
                <h2 className="card-title">{title}</h2>
                <p className="text-sm text-base-content/70">{desc}</p>
                <Link to={link} className="btn btn-primary btn-sm mt-3 w-fit">
                    Open
                </Link>
            </div>
        </motion.div>
    );
}

function StatCard({ label, value, icon }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-base-100 border shadow-md rounded-xl p-4 flex items-center gap-4"
        >
            <div className="text-primary text-3xl">{icon}</div>

            <div>
                <p className="text-sm text-base-content/70">{label}</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
        </motion.div>
    );
}
