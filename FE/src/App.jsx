import "./App.css";
import React, { useContext } from "react";
import Main from "./components/main/Main";
import Upload from "./pages/upload/Upload";
import Guildlines from "./pages/dashboard/Guildlines";
import Testarea from "./pages/dashboard/Testarea";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Login from "./pages/login/Login";
import Gptspace from "./pages/dashboard/Gptspace";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashboard/DashboardLayout";
import AuthContext from "./context/authcontext/AuthContext";


function App() {
  const ProtectedRoute = ({ allowedPaths, children }) => {
    const { currentUser } = useContext(AuthContext);
    if (!currentUser || !allowedPaths.includes(window.location.pathname)) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>


          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/upload"
            element={
              <ProtectedRoute allowedPaths={["/upload", "/dashboard"]}>
                <Upload />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedPaths={["/upload", "/dashboard"]}>
                <Gptspace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/guidelines"
            element={
              <ProtectedRoute allowedPaths={["/upload", "/dashboard", "/dashboard/guidelines"]}>
                <Guildlines />
              </ProtectedRoute>
            }
          />
           <Route
            path="/dashboard/testarea" 
            element={
              <ProtectedRoute allowedPaths={["/upload", "/dashboard", "/dashboard/testarea"]}>
                <Testarea /> 
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
