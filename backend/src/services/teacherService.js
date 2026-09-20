import supabase from "../config/supabase.js";

export const teacherExists = async (username) => {
    
    const {data, error } = await supabase
        .from("teachers")
        .select("teacher_id")
        .eq("username", username);

    if(error) {
        throw error;
    }

    return data.length > 0;
        
};

export const createTeacher = async (teacherData) => {

    const { data, error } = await supabase
        .from("teachers")
        .insert(teacherData)
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;

};

export const getTeacherByUsername = async (username) => {

    const { data, error } = await supabase
        .from("teachers")
        .select("*")
        .eq("username", username)
        .maybeSingle();

    if (error) {
        throw error;
    }

    return data;

};

export const getTeacherSubjects = async (teacherId) => {
    const { data, error } = await supabase
        .from("subjects")
        .select(`
            subject_id,
            subject_code,
            name,
            section,
            teacher_id,
            subject_students(count),
            attendance_logs(timestamp)
        `)
        .eq("teacher_id", teacherId);

    if (error) {
        throw error;
    }

    return data.map((subject) => {
        const totalStudents =
            subject.subject_students?.[0]?.count ?? 0;

        const timestamps =
            subject.attendance_logs?.map(
                (log) => log.timestamp
            ) ?? [];

        const totalClasses =
            new Set(timestamps).size;

        return {
            subject_id: subject.subject_id,
            subject_code: subject.subject_code,
            name: subject.name,
            section: subject.section,
            teacher_id: subject.teacher_id,
            total_students: totalStudents,
            total_classes: totalClasses,
        };
    });
};

export const createTeacherSubject = async ({
    teacherId,
    subjectCode,
    name,
    section,
}) => {
    const { data, error } = await supabase
        .from("subjects")
        .insert({
            subject_code: subjectCode,
            name,
            section,
            teacher_id: teacherId,
        })
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
};