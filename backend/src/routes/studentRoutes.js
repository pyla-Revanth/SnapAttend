import express from "express";

import { getStudentProfile, faceLogin, registerStudent, getSubjects, getAttendance, enrollSubject } from "../controllers/studentController.js";

import upload from "../middleware/uploadMiddleware.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { studentOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, studentOnly, getStudentProfile);

router.post("/face-login", upload.single("image"), faceLogin);

router.post(
    "/register",
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "voice", maxCount: 1 },
    ]),
    registerStudent
);

router.get("/subjects", authMiddleware, studentOnly, getSubjects);

router.get("/attendance", authMiddleware, studentOnly, getAttendance);

router.post("/subjects/enroll", authMiddleware, studentOnly, enrollSubject);

export default router;