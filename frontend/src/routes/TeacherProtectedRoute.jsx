import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { getTeacherProfile } from "../api/teacherApi";

function ProtectedRoute({ children }) {

    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            setIsAuthenticated(false);
            return;
        }

        const verifyToken = async () => {

            try {

                await getTeacherProfile();

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
        return <Navigate to="/teacher" replace />;
    }

    return children;
}

export default ProtectedRoute;