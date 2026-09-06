import { useNavigate } from "react-router-dom";

import DashboardHeader from "../../components/DashboardHeader";
import Button from "../../components/Button";

function StudentDashboard() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/student");
    };

    return (
        <div
            className="
                min-h-screen
                bg-[#E0E3FF]
                px-8
                py-8
            "
        >

            <div
                className="
                    max-w-6xl
                    mx-auto
                "
            >

                <div
                    className="
                        flex
                        justify-between
                        items-center
                    "
                >

                    <DashboardHeader />

                    <Button
                        text="Logout"
                        variant="secondary"
                        onClick={handleLogout}
                    />

                </div>

                <h1
                    className="
                        mt-10
                        text-4xl
                        font-['Climate_Crisis']
                    "
                >
                    Student Dashboard
                </h1>

            </div>

        </div>
    );
}

export default StudentDashboard;