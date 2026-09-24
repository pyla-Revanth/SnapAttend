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

export const getStudentProfile = async () => {
    const response = await api.get(
        "/student/profile"
    );

    return response.data;
};

export const getStudentSubjects = async () => {
    const response = await api.get(
        "/student/subjects"
    );

    return response.data;
};

export const getStudentAttendance = async () => {
    const response = await api.get(
        "/student/attendance"
    );

    return response.data;
};

export const enrollStudentInSubject = async (subjectCode) => {
    const response = await api.post(
        "/student/subjects/enroll",
        {
            subjectCode,
        }
    );

    return response.data;
};

export const unenrollStudentFromSubject = async (subjectId) => {
    const response = await api.delete(
        `/student/subjects/${subjectId}/enroll`
    );

    return response.data;
};