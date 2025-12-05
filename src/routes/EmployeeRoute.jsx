import { Navigate } from "react-router";
import { useAuth } from "../providers/AuthProvider";

export default function EmployeeRoute({ children }) {
    const { user } = useAuth();
    return user?.role === "employee" ? children : <Navigate to="/unauthorized" replace />;
}
