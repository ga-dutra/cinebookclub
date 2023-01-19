import GlobalStyle from "../styles/globalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<>App</>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
