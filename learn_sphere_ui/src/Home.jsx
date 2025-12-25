import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import Footer from "./Footer";
import { useState } from "react";

const THEME = {
  main: "#5249ffff",
  light: "#eef0ff",
  white: "#ffffff",
};

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div style={styles.container}>
        <div style={styles.left}>
          <Logo />
          <h1 style={styles.heading}>Empower Your Learning</h1>
          <p style={styles.tagline}>
            Learn skills. Build projects. Grow your career.
          </p>

          <HoverButton
            text="Get Started"
            onClick={() => navigate("/register")}
            primary
          />

          <HoverButton text="Login" onClick={() => navigate("/login")} />
        </div>

        <div style={styles.right}>
          <h2 style={styles.sectionTitle}>Popular Courses</h2>

          <div style={styles.cardGrid}>
            <HoverCard text="Java Full Stack & Programming" />
            <HoverCard text="Web Development" />
            <HoverCard text="Data Science" />
            <HoverCard text="Cyber Security" />
          </div>

          <div style={styles.extraSection}>
            <h2 style={styles.sectionTitle}>Why LearnSphere?</h2>

            <div style={styles.features}>
              <HoverCard text="🎓 Industry-Oriented Courses" />
              <HoverCard text="🧑‍💻 Hands-on Projects" />
              <HoverCard text="🚀 Career Guidance" />
              <HoverCard text="📜 Certification Support" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

function HoverButton({ text, onClick, primary }) {
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...styles.button,
        background: primary
          ? hover
            ? "#3730a3"
            : "#ffffff"
          : hover
          ? "#ffffff"
          : "transparent",
        color: primary
          ? hover
            ? "#ffffff"
            : THEME.main
          : hover
          ? THEME.main
          : "#ffffff",
        border: primary ? "none" : "1px solid #ffffff",
      }}
    >
      {text}
    </button>
  );
}

function HoverCard({ text }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...styles.card,
        transform: hover ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hover
          ? "0 15px 30px rgba(79,70,229,0.25)"
          : "0 8px 20px rgba(0,0,0,0.08)",
      }}
    >
      {text}
    </div>
  );
}

/* ---------- STYLES ---------- */

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Segoe UI, sans-serif",
  },

  left: {
    width: "35%",
    padding: "60px",
    background: THEME.main,
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  heading: {
    marginTop: "30px",
    fontSize: "36px",
  },

  tagline: {
    marginTop: "10px",
    fontSize: "16px",
    opacity: 0.9,
  },

  button: {
    marginTop: "20px",
    padding: "14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
    transition: "0.3s",
  },

  right: {
    width: "65%",
    padding: "60px",
    background: THEME.light,
  },

  sectionTitle: {
    color: THEME.main,
  },

  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    marginTop: "30px",
  },

  card: {
    padding: "25px",
    background: THEME.white,
    borderRadius: "12px",
    fontSize: "18px",
    fontWeight: "500",
    color: THEME.main,
    border: `1px solid ${THEME.main}`,
    transition: "0.3s",
  },

  extraSection: {
    marginTop: "60px",
  },

  features: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    marginTop: "20px",
  },
};

export default Home;
