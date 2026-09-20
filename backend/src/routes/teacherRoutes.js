import express from "express";

import {registerTeacher, loginTeacher, getTeacherProfile, getSubjects, createSubject} from "../controllers/teacherController.js";

import {validateLogin, validateRegister, validateCreateSubject} from "../middleware/validationMiddleware.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { teacherOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/register", validateRegister, registerTeacher);

router.post("/login", validateLogin, loginTeacher);

router.get("/profile", authMiddleware, teacherOnly, getTeacherProfile);

router.get("/subjects", authMiddleware, teacherOnly, getSubjects);

router.post("/subjects", validateCreateSubject, authMiddleware, teacherOnly, createSubject);

export default router;