import DashboardHeader from "../../components/DashboardHeader";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

function TeacherDashboard() {

    const navigate = useNavigate();

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
                        text="Go Back Home"
                        variant="secondary"
                        onClick={() => navigate("/")}
                    />

                </div>

                <h1
                    className="
                        mt-10
                        text-4xl
                        font-['Climate_Crisis']
                    "
                >
                    Teacher Dashboard
                </h1>

            </div>

        </div>

    );

}

export default TeacherDashboard;