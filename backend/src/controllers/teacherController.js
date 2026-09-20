import { teacherExists, createTeacher, getTeacherByUsername, getTeacherSubjects, createTeacherSubject } from "../services/teacherService.js";

import { generateToken } from "../utils/jwt.js";
import { hashPassword, comparePassword } from "../utils/password.js";

export const registerTeacher = async (req, res) => {
    
    try {

        const { username, password, name } = req.body;

        const exists = await teacherExists(username);

        if(exists){ 

            return res.status(409).json({
                success : false,
                message : "Username already exists"
            });

        };
        
        const hashedPassword = await hashPassword(password);

        const teacher = await createTeacher({
            username,
            password : hashedPassword,
            name
        });

        return res.status(201).json({
            success : true,
            message : "Teacher registered successfully"
        });
         
    } catch (error) {

        return res.status(500).json({
            success : false,
            message : "Internal server error"
         });

    }
};

export const loginTeacher = async(req, res) => {

    try {
        
        const { username, password } = req.body;

        const teacher = await getTeacherByUsername(username);
        
        if(!teacher){
            return res.status(401).json({
                success : false,
                message : "User Does Not Exist"
            });
        };

        const isPasswordValid = await comparePassword(password, teacher.password);
        
        if(!isPasswordValid){
            return res.status(401).json({
                success : false,
                message : "Invalid credentials"
            });
        };

        const token = generateToken(teacher,"teacher");

        return res.status(200).json({
            success : true,
            message : "Teacher logged in successfully",
            token
        });
        
    }
    catch (error) {

        return res.status(500).json({
            success : false,
            message : "Internal server error",
            error: error.message
        });

    }
};

export const getTeacherProfile = async (req, res) => {

    return res.status(200).json({
        success: true,
        user: req.user
    });

};

export const getSubjects = async (req, res) => {
    try {
        const teacherId = req.user.id;

        const subjects = await getTeacherSubjects(teacherId);

        res.status(200).json({
            success: true,
            subjects,
        });

    } catch (error) {
        console.error("Get teacher subjects error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch subjects",
        });
    }
};


export const createSubject = async (req, res) => {
    try {
        const teacherId = req.user.id;

        const {
            subjectCode,
            name,
            section,
        } = req.body;

        if (!subjectCode || !name || !section) {
            return res.status(400).json({
                success: false,
                message: "All subject fields are required",
            });
        }

        const subject = await createTeacherSubject({
            teacherId,
            subjectCode,
            name,
            section,
        });

        res.status(201).json({
            success: true,
            message: "Subject created successfully",
            subject,
        });
    } catch (error) {
        console.error("Create subject error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create subject",
        });
    }
};