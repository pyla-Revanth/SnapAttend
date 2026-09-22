import Button from "../Button";

function StudentSubjectCard({
    subject,
    stats,
    onUnenroll,
}) {
    return (
        <div className="rounded-2xl bg-[#F7F7FF] p-6 shadow-sm">
            <div>
                <h3 className="text-xl font-semibold">
                    📚 {subject.name}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                    🔑 {subject.subject_code} • 🏫 Section{" "}
                    {subject.section}
                </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white p-4">
                    <p className="text-sm text-gray-500">
                        📅 Total
                    </p>

                    <p className="mt-1 text-2xl font-semibold">
                        {stats.total}
                    </p>
                </div>

                <div className="rounded-xl bg-white p-4">
                    <p className="text-sm text-gray-500">
                        ✅ Attended
                    </p>

                    <p className="mt-1 text-2xl font-semibold">
                        {stats.attended}
                    </p>
                </div>
            </div>

            <div className="mt-6">
                <Button
                    text="Unenroll"
                    variant="secondary"
                    onClick={() => onUnenroll(subject.subject_id)}
                />
            </div>
        </div>
    );
}

export default StudentSubjectCard;