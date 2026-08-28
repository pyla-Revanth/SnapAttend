import axios from "axios";

const AI_SERVICE_URL = "http://localhost:8000";

export const predictFace = async (imageBuffer) => {

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
        `${AI_SERVICE_URL}/face/predict`,
        formData
    );

    return response.data;
};
