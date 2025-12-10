import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ComingSoon from "./pages/ComingSoon.jsx";
import EmployeeDetail from "./pages/EmployeeDetail";
import DepartmentPage from "./pages/DepartmentPage.jsx";
import EmployeeAdd from "./pages/EmployeeAdd.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/soon" element={<ComingSoon />} />
            <Route path="/employee/:id" element={<EmployeeDetail />} />
            <Route path="/department" element={<DepartmentPage />} />
            <Route path="/employee/add" element={<EmployeeAdd />} />
        </Routes>
    );
}

export default App;
