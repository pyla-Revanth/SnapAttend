import express from "express";

import { registerTeacher, loginTeacher, getTeacherProfile } from "../controllers/teacherController.js";
import { validateLogin, validateRegister } from "../middleware/validationMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/register", validateRegister, registerTeacher);

router.post("/login", validateLogin, loginTeacher);

router.get("/profile", authMiddleware, getTeacherProfile);

export default router;