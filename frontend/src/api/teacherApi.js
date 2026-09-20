import api from "./api";

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

export const getTeacherProfile = async () => {

    const response = await api.get(
        "/teacher/profile"
    );

    return response.data;
};

export const getTeacherSubjects = async () => {

    const response = await api.get(
        "/teacher/subjects"
    );

    return response.data;
};

export const createTeacherSubject = async (subjectData) => {
    
    const response = await api.post(
        "/teacher/subjects",
        subjectData
    );

    return response.data;
};