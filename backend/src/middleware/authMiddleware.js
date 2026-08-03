import { verifyToken } from "../utils/jwt.js";

export const authMiddleware = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {

            return res.status(401).json({
                success: false,
                message: "Authorization header is missing.",
            });

        };

        const token = authHeader.split(" ")[1];

        if (!token) {

            return res.status(401).json({
                success: false,
                message: "Token is missing.",
            });

        };

        const decoded = verifyToken(token);

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });

    }

};