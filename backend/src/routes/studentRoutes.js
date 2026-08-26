import express from "express";

import { getStudentProfile } from "../controllers/studentController.js";

const router = express.Router();

router.get("/:studentId", getStudentProfile);

export default router;