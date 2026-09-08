import { useRef, useState } from "react";

import Button from "./Button";

function VoiceInput({ onVoiceCapture }) {

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [error, setError] = useState("");

    const startRecording = async () => {
        try {
            setError("");

            const stream =
                await navigator.mediaDevices.getUserMedia({
                    audio: true,
                });

            const mediaRecorder =
                new MediaRecorder(stream);

            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(
                    audioChunksRef.current,
                    {
                        type: "audio/webm",
                    }
                );

                setAudioBlob(blob);
                onVoiceCapture(blob);

                stream
                    .getTracks()
                    .forEach((track) => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);

        } catch (error) {
            console.error(error);
            setError("Unable to access microphone.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current = null;
        }

        setIsRecording(false);
    };

    const clearRecording = () => {
        setAudioBlob(null);
        onVoiceCapture(null);
    };

    return (
        <div className="mt-6">

            <label className="block text-sm font-medium text-black">
                Voice <span className="text-gray-500">(Optional)</span>
            </label>

            <div className="mt-3 flex gap-3">

                {!isRecording ? (
                    <Button
                        text={
                            audioBlob
                                ? "Record Again"
                                : "Start Recording"
                        }
                        variant="secondary"
                        onClick={startRecording}
                    />
                ) : (
                    <Button
                        text="Stop Recording"
                        variant="primary"
                        onClick={stopRecording}
                    />
                )}

                {audioBlob && !isRecording && (
                    <Button
                        text="Remove"
                        variant="secondary"
                        onClick={clearRecording}
                    />
                )}

            </div>

            {isRecording && (
                <p className="mt-2 text-sm text-gray-600">
                    Recording... Speak clearly.
                </p>
            )}

            {audioBlob && !isRecording && (
                <p className="mt-2 text-sm text-green-600">
                    Voice recorded successfully.
                </p>
            )}

            {error && (
                <p className="mt-2 text-sm text-red-500">
                    {error}
                </p>
            )}

        </div>
    );
}

export default VoiceInput;