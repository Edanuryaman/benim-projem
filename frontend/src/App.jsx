import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ComingSoon from "./pages/ComingSoon.jsx";
import EmployeeDetail from "./pages/EmployeeDetail";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/soon" element={<ComingSoon />} />
            <Route path="/employee/:id" element={<EmployeeDetail />} />
        </Routes>
    );
}

export default App;
