import axios from "axios";

const AI_SERVICE_URL = "http://localhost:8000";

export const predictFace = async (imageFile, students) => {

    const formData = new FormData();

    const imageBlob = new Blob(
        [imageFile.buffer],
        { type: imageFile.mimetype }
    );

    formData.append(
        "image",
        imageBlob,
        imageFile.originalname
    );

    formData.append(
        "students",
        JSON.stringify(students)
    );

    try {
        const response = await axios.post(
            `${AI_SERVICE_URL}/face/predict`,
            formData,
        );

        return response.data;

    } catch (error) {
        console.error(
            "AI service error:",
            error.response?.data || error.message
        );

        throw error;
    }
};

export const generateFaceEmbedding = async (imageFile) => {

    const formData = new FormData();

    const imageBlob = new Blob(
        [imageFile.buffer],
        { type: imageFile.mimetype }
    );

    formData.append(
        "image",
        imageBlob,
        imageFile.originalname
    );

    const response = await axios.post(
        `${AI_SERVICE_URL}/face/embedding`,
        formData,
    );

    return response.data;
};

export const generateVoiceEmbedding = async (audioBuffer) => {
    const formData = new FormData();

    const audioBlob = new Blob(
        [audioBuffer.buffer],
        { type: "audio/webm" }
    );

    formData.append(
        "audio",
        audioBlob,
        "voice.webm"
    );

    const response = await axios.post(
        `${AI_SERVICE_URL}/voice/embedding`,
        formData,
    );

    return response.data;
};