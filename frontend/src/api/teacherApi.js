import api from "./api.js";

export const registerTeacher = async (teacherData) => {

    const response = await api.post(
        "/teacher/register",
        teacherData
    );

    return response.data;

};

export const loginTeacher = async (loginData) => {

    const response = await api.post(
        "/teacher/login",
        loginData
    );

    return response.data;

};