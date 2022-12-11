import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Layout from "./Components/Layout/Layout"
import Login from "./Pages/Login/Login"
import ValidateToken from "./Pages/ValidateToken/ValidateToken";
import Teacher from "./Pages/Teacher/Teacher";
import Admin from "./Pages/Admin/Admin";
import RequireAuth from "./Components/RequireAuth/RequireAuth";
import Unauthorized from "./Components/Unauthorized/Unauthorized";
import Missing from "./Components/Missing/Missing";
import useAuth from "./Hooks/useAuth";
import useAxiosPrivate from "./Hooks/useAxiosPrivate";

const ROLES = {
  'student': 'student',
  'teacher': 'teacher',
  'admin': 'admin'
}


function App() {

  const { auth, setAuth } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const location = useLocation();
  let from = location.pathname
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {

    const checkAuthStatus = async () => {
      if (JSON.stringify(auth) === '{}') {
        try {
          const res = await axiosPrivate.get("http://localhost:8000/api/auth/authStatus");
          setAuth({
            id: res.data.id,
            role: [res.data.role]
          })
          setIsConnected(true);
          console.log(from);
          if(from === undefined || from === "/"){
            navigate(res.data.role)
          }else{
            navigate(from,{replace:true})
          }
        } catch (error) {
          setIsConnected(false);
        }
      } else {
        setIsConnected(true);
      }
    }

    checkAuthStatus();

  }, [])

  return (
    <Routes>

      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        

        isConnected ?

        {/* Protected Routes */}

        {/* teacher page */}
        <Route element={<RequireAuth allowedRoles={[ROLES.teacher, ROLES.admin]} />}>
          <Route path="/teacher" element={<Teacher />} />
        </Route>

        {/* student pages */}
        <Route element={<RequireAuth allowedRoles={[ROLES.student]} />}>
          <Route path="/student" element={<ValidateToken />} />
        </Route>

        {/* admin page */}
        <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>

        :
        <Route path="/" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        

      </Route>
      {/* catch all */}
      <Route path="*" element={<Missing />} />
    </Routes>
  );
}

export default App;