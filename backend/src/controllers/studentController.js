import { getStudentById, getStudentsWithFaceEmbeddings, createStudent } from "../services/studentService.js";
import { predictFace, generateFaceEmbedding } from "../services/aiService.js";
import { generateToken } from "../utils/jwt.js";

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

        const students = await getStudentsWithFaceEmbeddings();

        const aiResult = await predictFace(req.file, students);

        if (!aiResult.recognized) {
            return res.status(401).json({
                success: false,
                message: "Face not recognized",
            });
        }

        const studentId = aiResult.student_id;

        const student = await getStudentById(studentId);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        const token = generateToken(student,"student");

        return res.status(200).json({
            success: true,
            message: "Student logged in successfully",
            token,
        });

    } catch (error) {

        console.error("Face login error:", error);

        return res.status(500).json({
            success: false,
            message: "Face login failed",
        });
    }
};

export const registerStudent = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is required",
            });
        }

        const { name } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Name is required",
            });
        }

        const embeddingResult = await generateFaceEmbedding(req.file);

        if (!embeddingResult.embedding) {
            return res.status(500).json({
                success: false,
                message: "Failed to generate face embedding",
            });
        }

        const studentData = {
            name: name.trim(),
            face_embedding: embeddingResult.embedding,
        };

        const student = await createStudent(studentData);

        return res.status(201).json({
            success: true,
            message: "Student registered successfully",
            student,
        });

    } catch (error) {

        console.error("Student registration error:", error);

        return res.status(500).json({
            success: false,
            message: "Student registration failed",
        });
    }
};