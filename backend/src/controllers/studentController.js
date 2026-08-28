import { getStudentById } from "../services/studentService.js";
import { predictFace } from "../services/aiService.js";

export const getStudentProfile = async (req, res) => {

    try {

        const { studentId } = req.params;

        const student = await getStudentById(studentId);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        return res.status(200).json({
            success: true,
            student,
        });

    } catch (error) {

        console.error("Error fetching student profile:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const faceLogin = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is required",
            });
        }

        const aiResult = await predictFace(req.file);

        console.log("AI result:", aiResult);

        return res.status(200).json({
            success: true,
            message: "Face sent to AI service successfully",
            ai: aiResult,
        });

    } catch (error) {

        console.error("Face login error:", error);

        return res.status(500).json({
            success: false,
            message: "Face login failed",
        });

    }
};