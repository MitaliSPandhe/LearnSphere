import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const THEME = {
  main: "#4f46e5",
  lightBg: "#eef0ff",
  white: "#ffffff",
};

function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {
      const res = await api.post(`/forgot-password?email=${email}`);
      alert(res.data);
      navigate("/reset-password", {
        state: { email },
      });
    } 
    catch {
      alert("Failed to send OTP");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Forgot Password</h2>
        <p style={styles.subtitle}>
          Enter your registered email to receive OTP
        </p>

        <input
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={sendOtp}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            ...styles.button,
            background: hover ? "#3730a3" : THEME.main,
          }}
        >
          Send OTP
        </button>

        <p style={styles.back} onClick={() => navigate("/login")}>
          ← Back to Login
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
    marginBottom: "18px",
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

  back: {
    marginTop: "18px",
    textAlign: "center",
    color: THEME.main,
    fontSize: "14px",
    cursor: "pointer",
  },
};

export default ForgotPassword;
