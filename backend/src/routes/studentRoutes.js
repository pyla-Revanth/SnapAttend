import express from "express";

import {getStudentProfile, faceLogin, registerStudent} from "../controllers/studentController.js";

import upload from "../middleware/uploadMiddleware.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { studentOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, studentOnly, getStudentProfile);

router.post("/face-login", upload.single("image"), faceLogin);

router.post("/register", upload.single("image"), registerStudent);

export default router;