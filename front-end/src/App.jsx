import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import FileUploadPage from "./pages/FileUploadPage";
import FileDataPage from "./pages/FileDataPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FileUploadPage />} />
        <Route path="/data" element={<FileDataPage />} />
      </Routes>
    </Router>
  );
}

export default App;
