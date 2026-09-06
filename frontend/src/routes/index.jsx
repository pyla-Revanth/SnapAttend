import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Student from "../pages/Student";
import Teacher from "../pages/Teacher";
import TeacherDashboard from "../pages/TeacherDashboard";
import TeacherProtectedRoute from "./TeacherProtectedRoute";
import StudentProtectedRoute from "./StudentProtectedRoute";
import StudentDashboard from "../pages/StudentDashboard";

function AppRouter() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/teacher/dashboard" element={<TeacherProtectedRoute><TeacherDashboard /></TeacherProtectedRoute>} />
        <Route path="/student" element={<Student />} />
        <Route path="/student/dashboard" element={<StudentProtectedRoute><StudentDashboard /></StudentProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
