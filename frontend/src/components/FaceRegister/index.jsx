import React from 'react'
import { registerStudent } from "../../api/studentApi";
import Button from "../Button";

const FaceRegister = ({ showRegistration, capturedImage, studentName, setStudentName, setRegistrationError, registrationError }) => {

    const handleRegistration = async () => {

        if (!studentName.trim()) {
            setRegistrationError("Please enter your name.");
            return;
        }

        if (!capturedImage) {
            setRegistrationError("Face image is missing.");
            return;
        }

        setRegistrationError("");

        const response = await fetch(capturedImage);
        const blob = await response.blob();

        const formData = new FormData();

        formData.append(
            "name",
            studentName.trim()
        );

        formData.append(
            "image",
            blob,
            "face.png"
        );

        try {
            const data = await registerStudent(formData);

            if (data.success) {
                setRegistrationError("");
                setStudentName("");
                setShowRegistration(false);
                alert("Registration successful! Please try logging in again.");
            }
        } catch (error) {
            console.error("Registration failed:", error);
            setRegistrationError(error.response?.data?.message || "Registration failed. Please try again.");
        }
    };
    
    return (
        <div >
            {showRegistration && (
                <div className="w-full max-w-2xl mt-8 rounded-2xl border border-black/10 bg-white p-6">

                    <h3 className="text-xl text-black font-['Climate_Crisis']">
                        Register New Profile
                    </h3>

                    <p className="mt-2 text-gray-600">
                        Face not recognized. Create a new student profile.
                    </p>

                    {capturedImage && (
                        <div className="mt-6">
                            <img 
                                src={capturedImage} 
                                alt="Captured face" 
                                className="w-32 h-32 rounded-lg border border-gray-300"
                            />
                        </div>
                    )}

                    <div className="mt-6">
                        <label className="block text-sm font-medium text-black">
                            Enter your name
                        </label>

                        <input
                            type="text"
                            value={studentName}
                            onChange={(event) => setStudentName(event.target.value)}
                            placeholder="E.g. Hamza Rizvi"
                            className="
                                mt-2
                                w-full
                                rounded-lg
                                border
                                border-gray-300
                                px-4
                                py-3
                                outline-none
                                focus:border-black
                            "
                        />
                    </div>
                    <div className="mt-6">
                        <Button
                            text="Create Account"
                            variant="primary"
                            onClick={handleRegistration}
                        />  
                    </div>
                    {registrationError && (
                        <p className="mt-2 text-red-500 text-sm">
                            {registrationError}
                        </p>
                    )}

                </div>
            )}
        </div>
    )
}

export default FaceRegister