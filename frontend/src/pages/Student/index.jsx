import { useNavigate } from "react-router-dom";
import DashboardHeader from "../../components/DashboardHeader";
import Button from "../../components/Button";
import CameraInput from "../../components/CameraInput";
import { faceLogin } from "../../api/studentApi";
import FaceRegister from "../../components/FaceRegister";
import { useState } from "react";

function Student() {

    const [capturedImage, setCapturedImage] = useState(null);
    const [showRegistration, setShowRegistration] = useState(false);

    const handleFaceCapture = async (imageData) => {

        setCapturedImage(imageData);
        setShowRegistration(true);

        const response = await fetch(imageData);
        const blob = await response.blob();

        const formData = new FormData();

        formData.append(
            "image",
            blob,
            "face.png"
        );

        try {
            const data = await faceLogin(formData);

            console.log("Face login response:", data);

            if (data.success) {
                localStorage.setItem("token", data.token);
                navigate("/student/dashboard");
            }

        } catch (error) {

            if (error.response?.status === 401) {
                console.log("Face not recognized");

                setShowRegistration(true);

                return;
            }

            console.error("Face login failed:", error);
        }
    };

    const navigate = useNavigate();

    return (
        <div
            className="
            min-h-screen
            bg-[#E0E3FF]
            px-8
            py-8
            flex
            flex-col
            items-center
            "
        >
            <div
                className="
                w-full
                max-w-2xl
                flex
                justify-between
                items-center
                
                "
            >
                <DashboardHeader />

                <Button
                    text="Go Back Home (⌘ + 🔙)"
                    variant="secondary"
                    onClick={() => navigate("/")}
                />

            </div>

            <h2
                className="
                    mt-8
                    mb-6
                    text-center
                    text-2xl
                    text-black
                    font-['Climate_Crisis']
                "
            >
                Login using Face ID
            </h2>

            <div
                className="
                    w-full
                    max-w-2xl
                "
            >

                <CameraInput onCapture={handleFaceCapture}/>
                <FaceRegister showRegistration={showRegistration} />
            </div>
        
        </div>
    );
}

export default Student;