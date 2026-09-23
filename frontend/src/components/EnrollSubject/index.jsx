import { useState } from "react";

import toast from "react-hot-toast";

import Button from "../Button";
import Input from "../Input";

import { enrollStudentInSubject } from "../../api/studentApi";

function EnrollSubject({ onClose, onSubjectEnrolled }) {
    const [subjectCode, setSubjectCode] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const trimmedSubjectCode = subjectCode.trim();

        if (!trimmedSubjectCode) {
            toast.error("Subject code is required.");
            return;
        }

        try {
            setLoading(true);

            const response = await enrollStudentInSubject(
                trimmedSubjectCode
            );

            toast.success(
                response.message ||
                    "Successfully enrolled in subject!"
            );

            onSubjectEnrolled(response.subject);

            onClose();
        } catch (error) {
            console.error(
                "Failed to enroll in subject:",
                error
            );

            const backendMessage =
                error.response?.data?.message;

            toast.error(
                backendMessage ||
                    "Failed to enroll in subject."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-['Climate_Crisis']">
                        📚 Enroll in Subject
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-2xl text-gray-500 hover:text-black"
                    >
                        ×
                    </button>
                </div>

                <p className="mt-3 text-sm text-gray-500">
                    Enter the subject code provided by your
                    teacher to enroll.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-6 space-y-5"
                >
                    <Input
                        label="Subject Code"
                        name="subjectCode"
                        value={subjectCode}
                        onChange={(event) =>
                            setSubjectCode(event.target.value)
                        }
                        placeholder="Example: CS301"
                    />

                    <div className="flex justify-end gap-3 pt-2">
                        <Button
                            type="button"
                            text="Cancel"
                            variant="secondary"
                            onClick={onClose}
                        />

                        <Button
                            type="submit"
                            text={
                                loading
                                    ? "Enrolling..."
                                    : "Enroll Now"
                            }
                            variant="primary"
                            disabled={loading}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EnrollSubject;