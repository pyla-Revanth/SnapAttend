import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import DashboardHeader from "../../components/DashboardHeader";
import Button from "../../components/Button";
import StudentSubjectCard from "../../components/StudentSubjectCard/StudentSubjectCard";
import EnrollSubject from "../../components/EnrollSubject/EnrollSubject";

import {
    getStudentSubjects,
    getStudentAttendance,
    unenrollStudentFromSubject,
} from "../../api/studentApi";

function StudentDashboard() {
    const navigate = useNavigate();

    const [subjects, setSubjects] = useState([]);
    const [attendance, setAttendance] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showEnrollSubject, setShowEnrollSubject] =
        useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");

        toast.success("Logged out successfully!");

        navigate("/student");
    };

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                setError("");

                const [
                    subjectsResponse,
                    attendanceResponse,
                ] = await Promise.all([
                    getStudentSubjects(),
                    getStudentAttendance(),
                ]);

                setSubjects(
                    subjectsResponse.subjects || []
                );

                setAttendance(
                    attendanceResponse.attendance || []
                );
            } catch (error) {
                console.error(
                    "Failed to load student dashboard:",
                    error
                );

                const backendMessage =
                    error.response?.data?.message;

                setError(
                    backendMessage ||
                        "Failed to load dashboard data."
                );

                toast.error(
                    backendMessage ||
                        "Failed to load dashboard data."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const statsMap = {};

    for (const log of attendance) {
        const subjectId = log.subject_id;

        if (!statsMap[subjectId]) {
            statsMap[subjectId] = {
                total: 0,
                attended: 0,
            };
        }

        statsMap[subjectId].total += 1;

        if (log.is_present) {
            statsMap[subjectId].attended += 1;
        }
    }

    const handleSubjectEnrolled = (subject) => {
        setSubjects((previous) => [
            ...previous,
            {
                subject_id: subject.subject_id,
                student_id: subject.student_id,
                subjects: subject,
            },
        ]);
    };

    const handleUnenroll = async (subjectId) => {
        const confirmed = window.confirm(
            "Are you sure you want to unenroll from this subject?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const response =
                await unenrollStudentFromSubject(subjectId);

            setSubjects((previous) =>
                previous.filter(
                    (subjectNode) =>
                        subjectNode.subjects.subject_id !==
                        subjectId
                )
            );

            toast.success(
                response.message ||
                    "Successfully unenrolled from subject."
            );
        } catch (error) {
            console.error(
                "Failed to unenroll from subject:",
                error
            );

            const backendMessage =
                error.response?.data?.message;

            toast.error(
                backendMessage ||
                    "Failed to unenroll from subject."
            );
        }
    };

    return (
        <div className="min-h-screen bg-[#E0E3FF] px-8 py-8">
            <div className="mx-auto max-w-6xl">

                <div className="flex items-center justify-between">
                    <DashboardHeader />

                    <Button
                        text="Logout"
                        variant="secondary"
                        onClick={handleLogout}
                    />
                </div>

                <h1 className="mt-10 text-4xl font-['Climate_Crisis']">
                    Student Dashboard
                </h1>

                <div className="my-8 h-px bg-black/10" />

                {loading && (
                    <div className="rounded-2xl bg-white p-8 text-center">
                        <p className="text-gray-500">
                            Loading your enrolled subjects...
                        </p>
                    </div>
                )}

                {!loading && error && (
                    <div className="rounded-2xl bg-white p-8 text-center">
                        <p className="text-red-500">
                            {error}
                        </p>
                    </div>
                )}

                {!loading && !error && (
                    <div className="rounded-2xl bg-white p-6">

                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-['Climate_Crisis']">
                                Your Enrolled Subjects
                            </h2>

                            <Button
                                text="Enroll in Subject"
                                variant="primary"
                                onClick={() =>
                                    setShowEnrollSubject(true)
                                }
                            />
                        </div>

                        {subjects.length === 0 ? (
                            <div className="mt-6 rounded-xl bg-[#F7F7FF] p-10 text-center">
                                <p className="text-xl font-semibold">
                                    📚 No enrolled subjects
                                </p>

                                <p className="mt-2 text-gray-500">
                                    Enroll using the subject code
                                    provided by your teacher.
                                </p>

                                <div className="mt-6 flex justify-center">
                                    <Button
                                        text="Enroll in Subject"
                                        variant="primary"
                                        onClick={() =>
                                            setShowEnrollSubject(
                                                true
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                                {subjects.map(
                                    (subjectNode) => {
                                        const subject =
                                            subjectNode.subjects;

                                        const stats =
                                            statsMap[
                                                subject.subject_id
                                            ] || {
                                                total: 0,
                                                attended: 0,
                                            };

                                        return (
                                            <StudentSubjectCard
                                                key={
                                                    subject.subject_id
                                                }
                                                subject={subject}
                                                stats={stats}
                                                onUnenroll={
                                                    handleUnenroll
                                                }
                                            />
                                        );
                                    }
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {showEnrollSubject && (
                <EnrollSubject
                    onClose={() =>
                        setShowEnrollSubject(false)
                    }
                    onSubjectEnrolled={
                        handleSubjectEnrolled
                    }
                />
            )}
        </div>
    );
}

export default StudentDashboard;