import { Navigate } from "react-router";
import { useAuth } from "../providers/AuthProvider";

export default function AdminRoute({ children }) {
    const { user } = useAuth();
    return user?.role === "hr" ? children : <Navigate to="/unauthorized" replace />;
}
