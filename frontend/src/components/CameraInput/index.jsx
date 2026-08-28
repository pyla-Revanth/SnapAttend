import { useEffect, useRef, useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import Button from "../Button";

function CameraInput({ onCapture }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);

    const [capturedImage, setCapturedImage] = useState(null);
    const [error, setError] = useState("");
    const [isCameraReady, setIsCameraReady] = useState(false);

    useEffect(() => {
        startCamera();

        return () => {
            stopCamera();
        };
    }, []);

    const startCamera = async () => {
        try {
            setError("");
            setIsCameraReady(false);

            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: "user",
                },
            });

            streamRef.current = mediaStream;

            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;

                videoRef.current.onloadedmetadata = async () => {
                    await videoRef.current.play();
                    setIsCameraReady(true);
                };
            }
        } catch (error) {
            console.error(error);
            setError("Unable to access camera.");
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }

        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.srcObject = null;
        }

        setIsCameraReady(false);
    };

    const captureImage = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (!video || !canvas) return;

        if (video.readyState !== HTMLMediaElement.HAVE_ENOUGH_DATA) {
            return;
        }

        const context = canvas.getContext("2d");

        if (!context) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        context.drawImage(video, 0, 0);

        const imageData = canvas.toDataURL("image/png");
        setCapturedImage(imageData);
        onCapture(imageData);
    };

    const retakePhoto = () => {
        setCapturedImage(null);
    };

    return (
        <div
            className="
                mt-1
                flex
                w-full
                flex-col
                items-center
                gap-6
            "
        >
            {error && (
                <p
                    className="
                        font-['Outfit']
                        text-red-600
                    "
                >
                    {error}
                </p>
            )}

            <div
                className="
                    relative
                    flex
                    aspect-video
                    w-full
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-2xl
                    border-4
                    border-white
                    bg-gray-900
                    shadow-xl
                "
            >
                {!isCameraReady && !capturedImage && (
                    <p
                        className="
                            absolute
                            font-['Outfit']
                            text-white
                        "
                    >
                        Starting camera...
                    </p>
                )}

                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`
                        h-full
                        w-full
                        rounded-2xl
                        object-cover
                        ${capturedImage ? "hidden" : "block"}
                    `}
                />

                {capturedImage && (
                    <img
                        src={capturedImage}
                        alt="Captured face"
                        className="
                            absolute
                            inset-0
                            h-full
                            w-full
                            rounded-2xl
                            object-cover
                        "
                    />
                )}
            </div>

            <Button
                text={capturedImage ? "Retake" : "Capture"}
                icon={<CameraAltIcon />}
                className="w-52"
                onClick={
                    capturedImage
                        ? retakePhoto
                        : captureImage
                }
            />

            <canvas
                ref={canvasRef}
                className="hidden"
            />
        </div>
    );
}

export default CameraInput;