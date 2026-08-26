import express from "express";
import cors from "cors";

import teacherRoutes from "./routes/teacherRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/teacher", teacherRoutes);
app.use("/api/student", studentRoutes);

export default app;