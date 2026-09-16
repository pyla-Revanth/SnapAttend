import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardHeader from "../../components/DashboardHeader";
import Button from "../../components/Button";
import TeacherTabs from "../../components/TeacherTabs";

import TakeAttendance from "../../components/TakeAttendance";
import ManageSubjects from "../../components/ManageSubjects";
import AttendanceRecords from "../../components/AttendanceRecords";

import toast from "react-hot-toast";

function TeacherDashboard() {
    const navigate = useNavigate();

    const [currentTab, setCurrentTab] = useState(
        "take_attendance"
    );

    const handleLogout = () => {
        localStorage.removeItem("token");

        toast.success("Logged out successfully!");

        navigate("/teacher");
    };

    const renderActiveTab = () => {
        if (currentTab === "take_attendance") {
            return <TakeAttendance />;
        }

        if (currentTab === "manage_subjects") {
            return <ManageSubjects />;
        }

        if (currentTab === "attendance_records") {
            return <AttendanceRecords />;
        }

        return <TakeAttendance />;
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
                    mx-auto
                    max-w-6xl
                "
            >
                <div
                    className="
                        flex
                        items-center
                        justify-between
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
                    Teacher Dashboard
                </h1>

                <div className="col-span-1 sm:col-span-3">
                    <TeacherTabs
                        currentTab={currentTab}
                        setCurrentTab={setCurrentTab}
                    />
                </div>

                <div className="my-8 h-px bg-black/10" />

                <div className="rounded-2xl bg-white p-6">
                    {renderActiveTab()}
                </div>
                
            </div>
        </div>
    );
}

export default TeacherDashboard;