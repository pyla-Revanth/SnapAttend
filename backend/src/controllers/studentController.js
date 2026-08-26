import { getStudentById } from "../services/studentService.js";

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