import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout"
import Login from "./Pages/Login/Login"
import ValidateToken from "./Pages/ValidateToken/ValidateToken";
import SuccessValidation from "./Pages/SuccessValidation/SuccessValidation";
import Teacher from "./Pages/Teacher/Teacher";
import Admin from "./Pages/Admin/Admin";
import RequireAuth from "./Components/RequireAuth/RequireAuth";
import Unauthorized from "./Components/Unauthorized/Unauthorized";
import Missing from "./Components/Missing/Missing";


const ROLES = {
  'student': 'student',
  'teacher': 'teacher',
  'admin': 'admin'
}

function App() {
  return (
    <Routes>

      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        
        {/* teacher page */}
        <Route element={<RequireAuth allowedRoles={[ROLES.teacher, ROLES.admin]} />}>
          <Route path="/teacher" element={<Teacher />} />
        </Route>

        {/* student pages */}
        <Route element={<RequireAuth allowedRoles={[ROLES.student]} />}>
          <Route path="/student" element={<ValidateToken />} />
          <Route path="/successValidation" element={<SuccessValidation />} />
        </Route>

        {/* admin page */}
        <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
          <Route path="/admin" element={<Admin/>} />
        </Route>

      </Route>
      {/* catch all */}
      <Route path="*" element={<Missing />} />
    </Routes>
  );
}

export default App;