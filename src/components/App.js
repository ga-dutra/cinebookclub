import GlobalStyle from "../styles/globalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserStorage } from "../contexts/userContext";
import Home from "../pages/Home/Home";
import Enroll from "../pages/Enroll/Enroll";
import SignIn from "../pages/SignIn/SignIn";

export default function App() {
  return (
    <>
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
