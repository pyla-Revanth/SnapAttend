import jwt from "jsonwebtoken";

export const generateToken = (user, role) => {

    return jwt.sign(
        {
            id: user.teacher_id || user.student_id || user.id,
            role,
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