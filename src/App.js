import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopNavbar from "./components/TopNavbar";
import Cart from "./components/Cart";
import { Container } from "react-bootstrap";
import SignUp from "./auth/auth-components/SignUp"
import { AuthProvider } from "./auth/contexts/AuthContext";
import Dashboard from "./auth/auth-components/Dashboard";
import Login from "./auth/auth-components/Login";
import PrivateRoute from "./auth/auth-components/PrivateRoute";
import ForgotPassword from "./auth/auth-components/ForgotPassword";
import UpdateProfile from "./auth/auth-components/UpdateProfile";

function App() {
  return (
    <>
    <div className="App">
    <BrowserRouter>
      <AuthProvider>
        <TopNavbar></TopNavbar>
      </AuthProvider>
    <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh"}}
    >
    <AuthProvider>
      <Routes>
      <Route path="/cart" element={<Cart/>}/>
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
      </Container>
    </BrowserRouter>
    </div>
    </>
  );
}

export default App;
