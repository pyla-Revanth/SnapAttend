import { getStudentById, getStudentsWithFaceEmbeddings, createStudent, getStudentSubjects, getStudentAttendance } from "../services/studentService.js";
import { predictFace, generateFaceEmbedding,generateVoiceEmbedding } from "../services/aiService.js";
import { generateToken } from "../utils/jwt.js";

export const getStudentProfile = async (req, res) => {

    try {

        const studentId = req.user.id;

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

        // If AI service returned a specific error, propagate it
        if (error.response?.status && error.response?.data?.detail) {
            return res.status(error.response.status).json({
                success: false,
                message: error.response.data.detail,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Face login failed",
        });
    }
};

export const registerStudent = async (req, res) => {
    try {
        const imageFile = req.files?.image?.[0];
        const voiceFile = req.files?.voice?.[0];

        if (!imageFile) {
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

        // Generate face embedding
        const embeddingResult =
            await generateFaceEmbedding(imageFile);

        if (!embeddingResult.embedding) {
            return res.status(400).json({
                success: false,
                message: "No face detected in the image. Please capture a clear face image.",
            });
        }

        const studentData = {
            name: name.trim(),
            face_embedding: embeddingResult.embedding,
        };

        // Voice is optional
        if (voiceFile) {
            const voiceEmbeddingResult =
                await generateVoiceEmbedding(voiceFile);

            if (!voiceEmbeddingResult.embedding) {
                return res.status(500).json({
                    success: false,
                    message: "Failed to generate voice embedding",
                });
            }

            studentData.voice_embedding =
                voiceEmbeddingResult.embedding;
        }

        const student = await createStudent(studentData);

        const token = generateToken(student,"student");

        return res.status(201).json({
            success: true,
            message: "Student registered successfully",
            token,
            student,
        });

    } catch (error) {

        // If AI service returned a specific error, propagate it
        if (error.response?.status && error.response?.data?.detail) {
            return res.status(error.response.status).json({
                success: false,
                message: error.response.data.detail,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Student registration failed",
        });
    }
};

export const getSubjects = async (req, res) => {

    try {
        const studentId = req.user.id;

        const subjects = await getStudentSubjects(studentId);

        res.status(200).json({
            success: true,
            subjects,
        });

    } catch (error) {
        console.error("Get student subjects error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch enrolled subjects",
        });
    }
};

export const getAttendance = async (req, res) => {

    try {
        const studentId = req.user.id;

        const attendance = await getStudentAttendance(studentId);

        res.status(200).json({
            success: true,
            attendance,
        });
        
    } catch (error) {
        console.error("Get student attendance error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch attendance",
        });
    }
};