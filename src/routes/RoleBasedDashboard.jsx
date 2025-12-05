import useRole from "../hooks/useRole";
import Loading from "../pages/Shared/Loading";
// import HRDashboard from "../pages/HR/HRDashboard";
import EmployeeDashboard from "../pages/Dashboard/Employee/EmployeeDashboard/EmployeeDashboard";

export default function RoleBasedDashboard() {
    const { role, roleLoading } = useRole();

    if (roleLoading) return <Loading />;

    // if (role === "hr") return <HRDashboard />;
    return <EmployeeDashboard />;
}
