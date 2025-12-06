import useRole from "../hooks/useRole";
import Loading from "../pages/Shared/Loading";
import EmployeeDashboard from "../pages/Dashboard/Employee/EmployeeDashboard/EmployeeDashboard";
import HRDashboard from "../pages/Dashboard/HR/HRDashboard/HRDashboard";

export default function RoleBasedDashboard() {
    const { role, roleLoading } = useRole();

    if (roleLoading) return <Loading />;

    if (role === "hr") return <HRDashboard />;
    return <EmployeeDashboard />;
}
