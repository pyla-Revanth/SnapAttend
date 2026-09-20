import { useState } from "react";
import toast from "react-hot-toast";

import Button from "../Button";
import Input from "../Input";
import { createTeacherSubject } from "../../api/teacherApi";

function CreateSubject({ onClose, onSubjectCreated }) {
    const [formData, setFormData] = useState({
        subjectCode: "",
        name: "",
        section: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const subjectCode = formData.subjectCode.trim();
        const name = formData.name.trim();
        const section = formData.section.trim();

        if (!subjectCode) {
            toast.error("Subject code is required.");
            return;
        }

        if (!name) {
            toast.error("Subject name is required.");
            return;
        }

        if (!section) {
            toast.error("Section is required.");
            return;
        }

        try {
            setLoading(true);

            const response = await createTeacherSubject({
                subjectCode,
                name,
                section,
            });

            toast.success(
                response.message || "Subject created successfully!"
            );

            onSubjectCreated(response.subject);
            onClose();
        } catch (error) {
            const backendMessage =
                error.response?.data?.errors?.[0]?.msg ||
                error.response?.data?.message;

            toast.error(
                backendMessage || "Failed to create subject."
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
                        📚 Create New Subject
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-2xl text-gray-500 hover:text-black"
                    >
                        ×
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-6 space-y-5"
                >
                    <Input
                        label="Subject Code"
                        name="subjectCode"
                        value={formData.subjectCode}
                        onChange={handleChange}
                        placeholder="Example: CS302"
                    />

                    <Input
                        label="Subject Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Example: Database Management Systems"
                    />

                    <Input
                        label="Section"
                        name="section"
                        value={formData.section}
                        onChange={handleChange}
                        placeholder="Example: A"
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
                            text={loading ? "Creating..." : "Create Subject"}
                            variant="primary"
                            disabled={loading}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateSubject;