function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        

        <div style={styles.section}>
          <h2 style={styles.logo}>LearnSphere</h2>
          <p style={styles.text}>
            LearnSphere is an online learning platform focused on real-world
            skills, hands-on projects, and career growth.
          </p>
        </div>

        <div style={styles.section}>
          <h3 style={styles.title}>Contact</h3>

          <p style={styles.text}>👤 Mitali Pandhe</p>

          <a href="tel:+918767949656" style={styles.link}>
            📞 +91 87679 49656
          </a>

          <a href="mailto:mitalipandhe@gmail.com" style={styles.link}>
            📩 mitalipandhe@gmail.com
          </a>
        </div>


        <div style={styles.section}>
          <h3 style={styles.title}>Connect With Me</h3>

          <a
            href="https://github.com/MitaliSPandhe"
            target="_blank"
            rel="noreferrer"
            style={styles.link}
          >
            🐙 GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/mitali-pandhe-2a387b251/"
            target="_blank"
            rel="noreferrer"
            style={styles.link}
          >
            💼 LinkedIn
          </a>

          <a href="#" style={styles.link}>
            📸 Instagram
          </a>

          <a href="#" style={styles.link}>
            🐦 Twitter
          </a>
        </div>
      </div>


      <div style={styles.bottom}>
        © 2025 LearnSphere. All Rights Reserved.
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    width: "100%",
    background: "#4f46e5",
    color: "#ffffff",
    marginTop: "80px",
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "50px 30px",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "30px",
  },

  section: {
    flex: "1",
    minWidth: "250px",
  },

  logo: {
    marginBottom: "10px",
  },

  title: {
    marginBottom: "10px",
  },

  text: {
    fontSize: "14px",
    lineHeight: "1.6",
    opacity: 0.9,
  },

  link: {
    display: "block",
    color: "#ffffff",
    textDecoration: "none",
    marginTop: "8px",
    fontSize: "14px",
    transition: "0.3s",
  },

  bottom: {
    textAlign: "center",
    padding: "15px",
    fontSize: "13px",
    background: "rgba(0,0,0,0.15)",
    opacity: 0.9,
  },
};

export default Footer;
