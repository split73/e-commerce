import { Container } from "react-bootstrap";
import SignUp from "./SignUp"
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";

function AuthComp() {
  return (
    
    <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh"}}
    >
      <div className="w-100" style={{ maxWidth: "400px"}}>
      <BrowserRouter>
        <AuthProvider>
        <Routes>
          <Route path="/" element={
            <PrivateRoute>
            <Dashboard/>
            </PrivateRoute>
          }
          ></Route>
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/update-profile" element={
            <PrivateRoute>
            <UpdateProfile/>
            </PrivateRoute>
          }
          ></Route>
        </Routes>
        </AuthProvider>
      </BrowserRouter>
      </div>
    
    </Container>
    
  );
}

export default AuthComp;
