import express from "express";
import cors from "cors";
import teacherRoutes from "./routes/teacherRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/teacher", teacherRoutes);

export default app;