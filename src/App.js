import GlobalStyle from "./styles/globalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserStorage } from "./contexts/userContext";
import Home from "./pages/Home/Home";
import Enroll from "./pages/Enroll/Enroll";
import SignIn from "./pages/SignIn/SignIn";
import { ToastContainer } from "react-toastify";
import useToken from "./hooks/useToken";
import { Navigate } from "react-router-dom";

export default function App() {
  return (
    <>
      <ToastContainer />
      <GlobalStyle />
      <UserStorage>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LinkToHome />} />
            <Route
              path="/home"
              element={
                <ProtectedRouteGuard>
                  <Home />
                </ProtectedRouteGuard>
              }
            />
            <Route path="/sign-up" element={<Enroll />} />
            <Route path="/login" element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </UserStorage>
    </>
  );
}

function ProtectedRouteGuard({ children }) {
  const token = useToken();
  if (!token) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

function LinkToHome() {
  return <Navigate to="/home" />;
}
