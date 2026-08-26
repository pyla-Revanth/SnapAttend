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