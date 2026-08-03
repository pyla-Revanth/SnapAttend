import jwt from "jsonwebtoken";

export const generateToken = (teacher) => {
    
    return jwt.sign(
        { 
            id: teacher.teacher_id || teacher.id,
            username: teacher.username
        }, 
        process.env.JWT_SECRET, 
        {
            expiresIn: "1d"
        }
    );

};

export const verifyToken = (token) => {
    
    return jwt.verify(
        token, 
        process.env.JWT_SECRET
    );
    
}