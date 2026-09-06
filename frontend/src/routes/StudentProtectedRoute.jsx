import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getStudentProfile } from "../api/studentApi";

function StudentProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setIsAuthenticated(false);
            return;
        }

        const verifyToken = async () => {
            try {
                await getStudentProfile();
                setIsAuthenticated(true);
            } catch (error) {
                localStorage.removeItem("token");
                setIsAuthenticated(false);
            }
        };

        verifyToken();
    }, []);

    if (isAuthenticated === null) {
        return <div>Checking authentication...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/student" replace />;
    }

    return children;
}

export default StudentProtectedRoute;