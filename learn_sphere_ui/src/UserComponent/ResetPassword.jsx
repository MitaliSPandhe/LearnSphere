import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const THEME = {
  main: "#4f46e5",
  lightBg: "#eef0ff",
  white: "#ffffff",
};

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const resetPassword = async () => {
    if (!email || !otp || !newPassword) {
      alert("All fields are required");
      return;
    }
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!regex.test(newPassword)) {
      alert(
        "Password must be 8+ chars with uppercase, lowercase, number & special character"
      );
      return;
    }

    const res = await api.post(
      `/reset-password?email=${email}&otp=${otp}&newPassword=${newPassword}`
    );

    alert(res.data);

    if (res.data === "Password reset successful") {
      navigate("/login");
    }
    else {
    alert("Password reset failed");
  }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Reset Password</h2>
        <p style={styles.subtitle}>
          Enter your registered email, OTP and new password
        </p>

        <input
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$"
          title="Password must be at least 8 characters and include uppercase, lowercase, number and special character"
          required
        />
        <p style={{ fontSize: "12px", color: "#555", marginTop: "-10px" }}>
          Password must be 8+ chars, include uppercase, lowercase, number &
          special character
        </p>

        <button
          style={{
            ...styles.button,
            background: hover ? "#3730a3" : THEME.main,
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={resetPassword}
        >
          Reset Password
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

  back: {
    marginTop: "18px",
    textAlign: "center",
    color: THEME.main,
    fontSize: "14px",
    cursor: "pointer",
  },
};

export default ResetPassword;
