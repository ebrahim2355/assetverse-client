import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Forbidden from "../pages/Shared/Forbidden";
import Loading from "../pages/Shared/Loading";

const EmployeeRoute = ({children}) => {
    const {loading, user} = useAuth();
    const {role, roleLoading} = useRole();

    if(loading || !user || roleLoading){
        return <Loading></Loading>
    }

    if(role !== "employee"){
        return <Forbidden/>
    }

    return children;
};

export default EmployeeRoute;