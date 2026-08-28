import express from "express";

import { getStudentProfile, faceLogin } from "../controllers/studentController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/:studentId", getStudentProfile);

router.post("/face-login",upload.single("image"), faceLogin);

export default router;

