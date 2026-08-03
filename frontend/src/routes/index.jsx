import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Student from "../pages/Student";
import Teacher from "../pages/Teacher";
import TeacherDashboard from "../pages/Teacher/TeacherDashboard";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/student" element={<Student />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
