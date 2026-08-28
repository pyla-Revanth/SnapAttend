import api from "./api";

export const faceLogin = async (formData) => {

    const response = await api.post(
        "/student/face-login",
        formData
    );

    return response.data;
};