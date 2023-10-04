import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopNavbar from "./components/TopNavbar";
import SignUp from "./auth/auth-components/SignUp"
import { AuthProvider } from "./auth/contexts/AuthContext";
import Dashboard from "./auth/auth-components/Dashboard";
import Login from "./auth/auth-components/Login";
import PrivateRoute from "./auth/auth-components/PrivateRoute";
import ForgotPassword from "./auth/auth-components/ForgotPassword";
import UpdateProfile from "./auth/auth-components/UpdateProfile";
import Content from "./components/Content";

function App() {
  return (
    <>
    <div className="App">
    <BrowserRouter>
      <AuthProvider>
        <TopNavbar></TopNavbar>
      </AuthProvider>
    <AuthProvider>
      <Routes>
      
      <Route path="/profile-settings" element={
              <PrivateRoute>
              <Dashboard/>
              </PrivateRoute>
      }/>
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/update-profile" element={
        <PrivateRoute>
          <UpdateProfile/>
        </PrivateRoute>
      }/>
    </Routes>
      </AuthProvider>
    </BrowserRouter>
    </div>
    </>
  );
}

export default App;
