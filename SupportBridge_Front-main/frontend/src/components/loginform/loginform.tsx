import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginform.css";

const Loginform = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Inactivity timer setup
  useEffect(() => {
    if (!loggedIn) return;

    let timer: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
        alert("Logged out due to inactivity.");
        setLoggedIn(false);
        navigate("/login");
      }, 5 * 60 * 1000); // 5 minutes
    };

    const events = ["click", "mousemove", "keydown", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer(); // start timer on login

    return () => {
      clearTimeout(timer);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [loggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:500/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("tokenExpiry", Date.now().toString()); // Optional if you want expiry tracking
        setLoggedIn(true);
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Failed to connect to server");
    }
  };

  return (
    <form className="loginform" onSubmit={handleSubmit}>
      <div className="login-container">
        <h2>Log In</h2>
        <div className="input-group">
          <p className="formtext">Email</p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <p className="formtext">Password</p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
          {error && (
            <p className="error-message" style={{ color: "red", marginTop: "8px" }}>
              {error}
            </p>
          )}
          <p className="registerlink">
            Don't have an account? <a href="/">Register</a>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Loginform;
