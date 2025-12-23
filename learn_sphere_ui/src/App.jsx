import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Register from "./UserComponent/Register";
import Login from "./UserComponent/Login";
import ForgotPassword from "./UserComponent/ForgotPassword";
import ResetPassword from "./UserComponent/ResetPassword";
import Dashboard from "./Dashboard/DashBoard";
import MyCourses from "./Dashboard/MyCourses";


function App() {
   
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/my-courses" element={<MyCourses />} />
 
    </Routes>
  );
}

export default App;
