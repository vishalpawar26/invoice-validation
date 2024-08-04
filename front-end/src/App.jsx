import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import FileUploadPage from "./pages/FileUploadPage";
import FileDataPage from "./pages/FileDataPage";
import Table from "./components/Table";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FileUploadPage />} />
        <Route path="/invoices" element={<FileDataPage />} />
        <Route path="/validation-errors" element={<Table />} />
      </Routes>
    </Router>
  );
}

export default App;
