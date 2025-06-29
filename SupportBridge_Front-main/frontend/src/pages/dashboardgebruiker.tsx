import { useEffect, useState, useCallback } from "react"; // Added useCallback
import { useNavigate } from "react-router-dom";

import "./dashboardgebruiker.css";
import lightModeImage from './55dd404a3d07df549704ea46f2ea2715.webp'; // Your current image
import darkModeImage from './ChatGPT Image May 22, 2025, 11_18_48 AM.png'; // <--- **YOU STILL NEED TO REPLACE THIS WITH YOUR DARK MODE IMAGE PATH**

import Headerdashboard from "../components/dashboardcomponenten/headerdashboard/headerdashboard";

const Dashboardgebruiker = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === "dark" ? "dark" : "light";
  });

  // Memoize the toggleTheme function to prevent unnecessary re-renders of children
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme); // Save preference immediately
      return newTheme;
    });
  }, []); // Empty dependency array means this function is created once

  // Effect to apply the theme class to the body
  useEffect(() => {
    document.body.className = theme;
  }, [theme]); // Only update body class when theme changes

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { replace: true });
    } else {
      setLoading(false);
    }
  }, [navigate]);

  const currentBackgroundImage = theme === 'light' ? lightModeImage : darkModeImage;

  if (loading) return null;

  return (
    <div className={`dashboard-container ${theme}`}>
      <img src={currentBackgroundImage} alt="Dashboard Background" className="dashboard-image" />
      <Headerdashboard currentTheme={theme} onToggleTheme={toggleTheme} />
    </div>
  );
};

export default Dashboardgebruiker;