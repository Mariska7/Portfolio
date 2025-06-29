import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingpage";
import SignupTest from "./testEnv/SignupTest";
import Login from "./pages/login"; // <- this is login.tsx
import Dashboard from "./pages/dashboardgebruiker";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/st" element={<SignupTest />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
