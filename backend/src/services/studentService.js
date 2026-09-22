import supabase from "../config/supabase.js";

export const getStudentById = async (studentId) => {

    const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("student_id", studentId)
        .maybeSingle();

    if (error) {
        throw error;
    }

    return data;
};

export const getStudentsWithFaceEmbeddings = async () => {

    const { data, error } = await supabase
        .from("students")
        .select("student_id, face_embedding")
        .not("face_embedding", "is", null);

    if (error) {
        throw error;
    }

    return data;
};

export const createStudent = async (studentData) => {

    const { data, error } = await supabase
        .from("students")
        .insert(studentData)
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
};

export const getStudentSubjects = async (studentId) => {

    const { data, error } = await supabase
        .from("subject_students")
        .select(`
            subject_id,
            student_id,
            subjects (
                subject_id,
                subject_code,
                name,
                section,
                teacher_id
            )
        `)
        .eq("student_id", studentId);

    if (error) {
        throw error;
    }

    return data;
};

export const getStudentAttendance = async (studentId) => {

    const { data, error } = await supabase
        .from("attendance_logs")
        .select(`
            id,
            timestamp,
            subject_id,
            student_id,
            is_present
        `)
        .eq("student_id", studentId);

    if (error) {
        throw error;
    }

    return data;
};

export const enrollStudentInSubject = async ({
    studentId,
    subjectCode,
}) => {
    const { data: subject, error: subjectError } = await supabase
        .from("subjects")
        .select("subject_id, name, subject_code, section")
        .eq("subject_code", subjectCode)
        .maybeSingle();

    if (subjectError) {
        throw subjectError;
    }

    if (!subject) {
        const error = new Error("Subject not found.");
        error.statusCode = 404;
        throw error;
    }

    const { data: existingEnrollment, error: enrollmentCheckError } =
        await supabase
            .from("subject_students")
            .select("subject_id, student_id")
            .eq("subject_id", subject.subject_id)
            .eq("student_id", studentId)
            .maybeSingle();

    if (enrollmentCheckError) {
        throw enrollmentCheckError;
    }

    if (existingEnrollment) {
        const error = new Error(
            "You are already enrolled in this subject."
        );

        error.statusCode = 409;

        throw error;
    }

    const { data: enrollment, error: enrollmentError } =
        await supabase
            .from("subject_students")
            .insert({
                subject_id: subject.subject_id,
                student_id: studentId,
            })
            .select()
            .single();

    if (enrollmentError) {
        throw enrollmentError;
    }

    return {
        enrollment,
        subject,
    };
};