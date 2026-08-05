import { useEffect, useRef, useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Button from "../Button";

function CameraInput() {
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

                videoRef.current.onloadedmetadata = () => {
                    videoRef.current.play();
                    setIsCameraReady(true);
                };
            }
        } catch (err) {
            console.error(err);
            setError("Unable to access camera.");
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => {
                track.stop();
            });

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

    if (video.readyState < 2) {
        return;
    }

    const context = canvas.getContext("2d");

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0);

    const image = canvas.toDataURL("image/png");

    console.log(image.substring(0, 50));

    setCapturedImage(image);
};

    const retakePhoto = () => {
        setCapturedImage(null);
    };

    return (
        <div
            className="
                w-full
                mt-8
                flex
                flex-col
                items-center
                gap-6
            "
        >
            {error && (
                <p
                    className="
                        text-red-600
                        font-['Outfit']
                    "
                >
                    {error}
                </p>
            )}

            <div
                className="
                    relative
                    w-full
                    max-w-2xl
                    aspect-video
                    rounded-2xl
                    bg-gray-900
                    border-4
                    border-white
                    shadow-xl
                    overflow-hidden
                    flex
                    items-center
                    justify-center
                "
            >
                {!isCameraReady && !capturedImage && (
                    <p
                        className="
                            absolute
                            text-white
                            font-['Outfit']
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
                        w-full
                        h-full
                        object-cover
                        rounded-2xl
                        ${capturedImage ? "hidden" : "block"}
                    `}
                />

                {capturedImage && (
                    <img
                        src={capturedImage}
                        alt="Captured"
                        className="
                            absolute
                            inset-0
                            w-full
                            h-full
                            object-cover
                            rounded-2xl
                        "
                    />
                )}
            </div>

            {!capturedImage ? (
                <Button
                    text="Capture"
                    icon={<CameraAltIcon />}
                    className="w-52"
                    onClick={captureImage}
                />
            ) : (
                <Button
                    text="Retake"
                    icon={<CameraAltIcon />}
                    className="w-52"
                    onClick={retakePhoto}
                />
            )}

            <canvas
                ref={canvasRef}
                className="hidden"
            />
        </div>
    );
}

export default CameraInput;