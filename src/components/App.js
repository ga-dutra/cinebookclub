import GlobalStyle from "../styles/globalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserStorage } from "../contexts/userContext";
import Home from "../pages/Home/Home";
import Enroll from "../pages/Enroll/Enroll";
import SignIn from "../pages/SignIn/SignIn";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <>
      <ToastContainer />
      <GlobalStyle />
      <UserStorage>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<Enroll />} />
            <Route path="/login" element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </UserStorage>
    </>
  );
}
