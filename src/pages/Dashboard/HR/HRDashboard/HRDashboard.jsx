import { Link } from "react-router";
import useAuth from "../../../../hooks/useAuth";
import { motion } from "framer-motion";
import { FaBoxOpen, FaUserTie, FaClipboardList, FaArrowUp, FaUsers } from "react-icons/fa";

export default function HRDashboard() {
    const { user } = useAuth();

    return (
        <div className="space-y-10">

            {/* HEADER */}
            <div className="text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold">
                    Welcome, {user?.displayName || "HR Manager"} 👋
                </h1>
                <p className="text-base-content/70 mt-2 text-sm md:text-base">
                    Manage company assets, employees & requests efficiently.
                </p>
            </div>

            {/* STATS OVERVIEW */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <StatCard label="Total Assets" value="34" icon={<FaBoxOpen />} />
                <StatCard label="Employees" value="12" icon={<FaUsers />} />
                <StatCard label="Pending Requests" value="5" icon={<FaClipboardList />} />
                <StatCard label="Package Limit" value="5 / 10" icon={<FaArrowUp />} />
            </div>

            {/* NAVIGATION CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <HRCard
                    icon={<FaBoxOpen size={30} />}
                    title="Asset List"
                    desc="View and manage all company assets."
                    link="/dashboard/hr/assets"
                />

                <HRCard
                    icon={<FaUserTie size={30} />}
                    title="Add Asset"
                    desc="Add new assets to the company inventory."
                    link="/dashboard/hr/add-asset"
                />

                <HRCard
                    icon={<FaClipboardList size={30} />}
                    title="All Requests"
                    desc="Review and process employee asset requests."
                    link="/dashboard/hr/requests"
                />

                <HRCard
                    icon={<FaUsers size={30} />}
                    title="Employee List"
                    desc="See and manage affiliated employees."
                    link="/dashboard/hr/employees"
                />

                <HRCard
                    icon={<FaArrowUp size={30} />}
                    title="Upgrade Package"
                    desc="Upgrade your subscription package."
                    link="/dashboard/hr/upgrade"
                />
            </div>

            {/* CHARTS PLACEHOLDER */}
            <motion.div
                className="card bg-base-100 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className="card-body">
                    <h2 className="text-xl font-semibold border-b pb-3">Analytics Overview</h2>
                    <p className="text-base-content/70 mt-4">
                        Charts will appear here (Returnable vs Non-Returnable, Most Requested Assets, etc.)
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

/* HR Components */
function HRCard({ icon, title, desc, link }) {
    return (
        <motion.div
            className="card bg-base-100 shadow-md hover:shadow-xl transition-all cursor-pointer rounded-xl"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
        >
            <div className="card-body">
                <div className="text-primary">{icon}</div>
                <h2 className="card-title">{title}</h2>
                <p className="text-base-content/70 text-sm">{desc}</p>
                <Link to={link} className="btn btn-primary btn-sm mt-3">Open</Link>
            </div>
        </motion.div>
    );
}

function StatCard({ label, value, icon }) {
    return (
        <motion.div
            className="card bg-base-100 shadow-md rounded-xl p-4 flex items-center gap-4"
            whileHover={{ scale: 1.05 }}
        >
            <div className="text-primary text-3xl">{icon}</div>
            <div>
                <p className="text-sm text-base-content/70">{label}</p>
                <p className="text-xl font-bold">{value}</p>
            </div>
        </motion.div>
    );
}
