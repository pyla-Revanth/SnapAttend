import { useNavigate } from "react-router-dom";
import { useState,useEffect} from "react";

import DashboardHeader from "../../components/DashboardHeader";
import Button from "../../components/Button";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";
import { getTeacherProfile } from "../../api/teacherApi";

function Teacher() {

    const navigate = useNavigate();

    const [authMode, setAuthMode] = useState("login");

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            return;
        }

        const checkAuthentication = async () => {

            try {

                await getTeacherProfile();

                navigate("/teacher/dashboard", {
                    replace: true
                });

            } catch (error) {

                localStorage.removeItem("token");

            }

        };

        checkAuthentication();

    }, [navigate]);

    return (
        <div
            className="
                min-h-screen
                bg-[#E0E3FF]
                px-8
                py-8
                flex
                flex-col
                items-center
            "
        >
            <div
                className="
                    w-full
                    max-w-2xl
                    flex
                    justify-between
                    items-center
                "
            >
                <DashboardHeader />

                <Button
                    text="Go Back Home (⌘ + 🔙)"
                    variant="secondary"
                    onClick={() => navigate("/")}
                />
            </div>

            <div className="w-full max-w-2xl">
                {authMode === "login" ? (
                    <LoginForm
                        setAuthMode={setAuthMode}
                        onLoginSuccess={() => navigate("/teacher/dashboard")}
                    />
                ) : (
                    <RegisterForm
                        setAuthMode={setAuthMode}
                    />
                )}
            </div>
        </div>
    );
}

export default Teacher;