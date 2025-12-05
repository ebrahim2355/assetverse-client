import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Forbidden from "../pages/Shared/Forbidden";
import Loading from "../pages/Shared/Loading";

const AdminRoute = ({ children }) => {
    const { loading } = useAuth();
    const { role, roleLoading } = useRole();

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== "hr") {
        return <Forbidden />
    }

    return children;
};

export default AdminRoute;