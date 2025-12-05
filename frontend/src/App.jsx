import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ComingSoon from "./pages/ComingSoon.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/soon" element={<ComingSoon />} />
        </Routes>
    );
}

export default App;
