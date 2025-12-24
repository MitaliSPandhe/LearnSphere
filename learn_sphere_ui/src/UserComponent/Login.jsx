import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const THEME = {
  main: "#4f46e5",
  lightBg: "#eef0ff",
  white: "#ffffff",
};

function Login() {

  const [login, setLogin] = useState({ email: "", password: "" });
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    try {
      const res = await api.post("login/users", login);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/dashboard");
    } 
    catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Login to continue learning</p>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          style={styles.input}
        />

        <button
          onClick={loginUser}
          style={{
            ...styles.button,
            background: hover ? "#3730a3" : THEME.main,
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Login
        </button>

        <p onClick={() => navigate("/forgot-password")} style={styles.link}>
          Forgot Password?
        </p>

        <div style={styles.footer}>
          Don’t have an account?{" "}
          <span style={styles.register} onClick={() => navigate("/register")}>
            Register
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: THEME.lightBg,
    fontFamily: "Segoe UI, sans-serif",
  },

  card: {
    width: "360px",
    padding: "35px",
    background: THEME.white,
    borderRadius: "12px",
    boxShadow: "0 12px 30px rgba(79,70,229,0.2)",
    borderTop: `6px solid ${THEME.main}`,
  },

  title: {
    textAlign: "center",
    marginBottom: "5px",
    color: THEME.main,
  },

  subtitle: {
    textAlign: "center",
    fontSize: "14px",
    marginBottom: "25px",
    color: "#555",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "16px",
    borderRadius: "6px",
    border: `1px solid ${THEME.main}`,
    outline: "none",
    fontSize: "14px",
  },

  button: {
    width: "100%",
    padding: "12px",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },

  link: {
    textAlign: "center",
    marginTop: "14px",
    color: THEME.main,
    cursor: "pointer",
    fontSize: "14px",
  },

  footer: {
    marginTop: "18px",
    textAlign: "center",
    fontSize: "13px",
    color: "#444",
  },

  register: {
    color: THEME.main,
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Login;
