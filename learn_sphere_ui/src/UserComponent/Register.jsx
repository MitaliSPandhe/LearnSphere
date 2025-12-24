import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const THEME = {
  main: "#4f46e5",
  lightBg: "#eef0ff",
  white: "#ffffff",
};

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("register/users", user);
      alert(res.data || "Registration successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data || "Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>
          Join LearnSphere and start your learning journey 😎😎
        </p>
        <form onSubmit={registerUser}>
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            style={styles.input}
            pattern="^[A-Za-z ]{3,30}$"
            title="Name should contain only letters and spaces (min 3 characters)"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            style={styles.input}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$"
            title="Password must be at least 8 characters and include uppercase, lowercase, number and special character"
            required
          />
          <p style={{ fontSize: "12px", color: "#555", marginTop: "-10px" }}>
            Password must be 8+ chars, include uppercase, lowercase, number &
            special character
          </p>

          <button
            type="submit"
            style={{
              ...styles.button,
              background: hover ? "#3730a3" : THEME.main,
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Register
          </button>
        </form>
        <p style={styles.linkText}>
          Already have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
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
    fontSize: "15px",
    transition: "0.3s",
  },

  linkText: {
    marginTop: "18px",
    textAlign: "center",
    fontSize: "14px",
  },

  link: {
    color: THEME.main,
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Register;
