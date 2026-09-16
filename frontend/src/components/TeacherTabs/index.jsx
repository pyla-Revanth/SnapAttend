import Button from "../Button";

function TeacherTabs({
    currentTab,
    setCurrentTab,
}) {
    return (
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            
            <Button
                text="Take Attendance"
                variant={
                    currentTab === "take_attendance"
                        ? "primary"
                        : "secondary"
                }
                onClick={() =>
                    setCurrentTab("take_attendance")
                }
            />

            <Button
                text="Manage Subjects"
                variant={
                    currentTab === "manage_subjects"
                        ? "primary"
                        : "secondary"
                }
                onClick={() =>
                    setCurrentTab("manage_subjects")
                }
            />

            <Button
                text="Attendance Records"
                variant={
                    currentTab === "attendance_records"
                        ? "primary"
                        : "secondary"
                }
                onClick={() =>
                    setCurrentTab("attendance_records")
                }
            />
        </div>
    );
}

export default TeacherTabs;