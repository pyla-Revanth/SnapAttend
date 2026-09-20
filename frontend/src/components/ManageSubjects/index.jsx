import { useEffect, useState } from "react";

import Button from "../../components/Button";
import { getTeacherSubjects } from "../../api/teacherApi";
import CreateSubject from "../../components/CreateSubject";
import ShareSubject from "../../components/ShareSubject";

function ManageSubjects() {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);   
    const [showCreateSubject, setShowCreateSubject] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState(null);

    const fetchSubjects = async () => {
        try {
            const response = await getTeacherSubjects();

            setSubjects(response.subjects);
        } catch (error) {
            console.error("Failed to fetch subjects:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubjects();
    }, []);

    if (loading) {
        return (
            <div>
                <h2 className="text-2xl font-['Climate_Crisis']">
                    Manage Subjects
                </h2>

                <p className="mt-4 text-gray-500">
                    Loading subjects...
                </p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-['Climate_Crisis']">
                    📚Manage Subjects
                </h2>

                <Button
                    text="Create New Subject"
                    variant="primary"
                    onClick={() => setShowCreateSubject(true)}
                />
            </div>

            {subjects.length === 0 ? (
                <div className="mt-8 rounded-2xl border border-dashed border-black/20 p-10 text-center">
                    <p className="font-['Climate_Crisis'] text-lg">
                        NO SUBJECTS FOUND
                    </p>

                    <p className="mt-2 text-gray-500">
                        CREATE ONE ABOVE
                    </p>
                </div>
            ) : (
                <div className="mt-8 grid gap-5 md:grid-cols-2">
                    {subjects.map((subject) => (
                        <div
                            key={subject.subject_id}
                            className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm"
                        >
                            <h3 className="text-xl font-semibold">
                                📚 {subject.name}
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                🔑 {subject.subject_code} • 🏫 Section {subject.section}
                            </p>

                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <div className="rounded-xl bg-gray-50 p-4">
                                    <p className="text-sm text-gray-500">
                                        👨🏻‍🎓Students
                                    </p>

                                    <p className="mt-1 text-2xl font-semibold">
                                        {subject.total_students}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-4">
                                    <p className="text-sm text-gray-500">
                                        🏛️Classes
                                    </p>

                                    <p className="mt-1 text-2xl font-semibold">
                                        {subject.total_classes}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-5">
                                <Button
                                    text="🔗 Share Subject"
                                    variant="secondary"
                                    onClick={() => setSelectedSubject(subject)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            {showCreateSubject && (
                <CreateSubject
                    onClose={() => setShowCreateSubject(false)}
                    onSubjectCreated={(subject) => {
                        setSubjects((previous) => [
                            ...previous,
                            {
                                ...subject,
                                total_students: 0,
                                total_classes: 0,
                            },
                        ]);
                    }}
                />
            )}

            {selectedSubject && (
                <ShareSubject
                    subject={selectedSubject}
                    onClose={() => setSelectedSubject(null)}
                />
            )}
        </div>
    );
}

export default ManageSubjects;