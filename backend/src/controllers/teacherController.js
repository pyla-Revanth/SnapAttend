import { teacherExists, createTeacher, getTeacherByUsername } from "../services/teacherService.js";
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

         console.error("Error registering teacher:", error);
        
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
                message : "Invalid credentials"
            });
        };

        const isPasswordValid = await comparePassword(password, teacher.password);
        
        if(!isPasswordValid){
            return res.status(401).json({
                success : false,
                message : "Invalid credentials"
            });
        };

        const token = generateToken(teacher);

        return res.status(200).json({
            success : true,
            message : "Teacher logged in successfully",
            token
        });
        
    }
    catch (error) {

        console.error("Error logging in teacher:", error);
        
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