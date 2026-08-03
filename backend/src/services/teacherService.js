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