import api from "./api";

export const faceLogin = async (formData) => {

    const response = await api.post(
        "/student/face-login",
        formData
    );

    return response.data;
};

export const registerStudent = async (formData) => {
    const response = await api.post(
        "/student/register",
        formData
    );

    return response.data;
};