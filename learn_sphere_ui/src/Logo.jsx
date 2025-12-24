function Logo() {
  return (
    <div style={styles.container}>
      <svg width="48" height="48" viewBox="0 0 100 100" style={styles.svg}>
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#667eea" />
            <stop offset="100%" stopColor="#764ba2" />
          </linearGradient>
        </defs>

        <circle cx="50" cy="50" r="46" fill="url(#grad)" />

        <circle cx="50" cy="50" r="36" fill="rgba(255,255,255,0.95)" />

        <text
          x="50%"
          y="62%"
          textAnchor="middle"
          fill="#5a67d8"
          fontSize="42"
          fontWeight="800"
          fontFamily="Poppins, Arial"
        >
          L
        </text>
      </svg>

      <h2 style={styles.text}>
        Learn<span style={styles.highlight}>Sphere</span>
      </h2>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
  },
  svg: {
    filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.2))",
  },
  text: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "700",
    color: "#ffffff",
    textShadow: "0 2px 6px rgba(0,0,0,0.3)",
    fontFamily: "Poppins, Arial",
  },
  highlight: {
    color: "#a3bffa",
  },
};

export default Logo;
