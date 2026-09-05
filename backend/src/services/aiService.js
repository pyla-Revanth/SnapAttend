import axios from "axios";

const AI_SERVICE_URL = "http://localhost:8000";

export const predictFace = async (imageBuffer, students) => {

    const formData = new FormData();

    const imageBlob = new Blob(
        [imageBuffer.buffer],
        { type: "image/png" }
    );

    formData.append(
        "image",
        imageBlob,
        "face.png"
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

export const generateFaceEmbedding = async (imageBuffer) => {

    const formData = new FormData();

    const imageBlob = new Blob(
        [imageBuffer.buffer],
        { type: "image/png" }
    );

    formData.append(
        "image",
        imageBlob,
        "face.png"
    );

    const response = await axios.post(
        `${AI_SERVICE_URL}/face/embedding`,
        formData,
    );

    return response.data;
};