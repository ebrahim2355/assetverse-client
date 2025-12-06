import { Link } from "react-router";
import useAuth from "../../../../hooks/useAuth";
import { motion } from "framer-motion";
import { FaLaptop, FaUsers, FaUserCircle, FaShoppingCart } from "react-icons/fa";

export default function EmployeeDashboard() {
    const { user } = useAuth();

    return (
        <div className="space-y-10">

            {/* HEADER */}
            <div className="text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold">
                    Welcome, {user?.displayName || "Employee"} 👋
                </h1>
                <p className="text-base-content/70 mt-2 text-sm md:text-base">
                    Your personalized workspace to manage assets, requests & team insights.
                </p>
            </div>

            {/* CARD GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* My Assets */}
                <DashboardCard
                    icon={<FaLaptop size={32} />}
                    title="My Assets"
                    desc="View all items assigned to you."
                    link="/dashboard/employee/my-assets"
                    btn="View Assets"
                />

                {/* Request Asset */}
                <DashboardCard
                    icon={<FaShoppingCart size={32} />}
                    title="Request Asset"
                    desc="Browse & request company items."
                    link="/dashboard/employee/request-asset"
                    btn="Request"
                />

                {/* My Team */}
                <DashboardCard
                    icon={<FaUsers size={32} />}
                    title="My Team"
                    desc="See team members across companies."
                    link="/dashboard/employee/my-team"
                    btn="View Team"
                />

                {/* Profile */}
                <DashboardCard
                    icon={<FaUserCircle size={32} />}
                    title="Profile"
                    desc="Update your personal information."
                    link="/dashboard/employee/profile"
                    btn="Edit Profile"
                />
            </div>

            {/* ACCOUNT INFO */}
            <motion.div
                className="card bg-base-100 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className="card-body">
                    <h2 className="text-xl font-semibold border-b pb-2">Account Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <p><span className="font-semibold">Email:</span> {user?.email}</p>
                        <p><span className="font-semibold">Name:</span> {user?.displayName || "N/A"}</p>
                        <p><span className="font-semibold">Joined:</span> {user?.metadata?.creationTime?.split(",")[0]}</p>
                    </div>
                </div>
            </motion.div>

        </div>
    );
}

/* Reusable Dashboard Card Component */
function DashboardCard({ icon, title, desc, link, btn }) {
    return (
        <motion.div
            className="card bg-base-100 shadow-md hover:shadow-xl transition-all cursor-pointer rounded-xl"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
        >
            <div className="card-body items-center text-center">
                <div className="text-primary">{icon}</div>
                <h2 className="card-title mt-2">{title}</h2>
                <p className="text-base-content/70 text-sm">{desc}</p>
                <Link to={link} className="btn btn-primary btn-sm mt-3">{btn}</Link>
            </div>
        </motion.div>
    );
}
