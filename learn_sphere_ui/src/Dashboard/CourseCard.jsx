function CourseCard({ course, enrolled, onEnroll }) {
  return (
    <div style={styles.card}>
      <img src={course.thumbnail_url} alt={course.title} style={styles.img} />
      <div style={styles.body}>
        <span style={styles.category}>{course.categoryName}</span>
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <p>👨‍🏫 {course.teacherName}</p>
        <div style={styles.footer}>
          <span style={styles.level}>{course.level}</span>
          <div style={styles.imgWrapper}>
            {course.coursetype !== "FREE" && (
              <div style={styles.kingBadge}>👑</div>
            )}
          </div>
        </div>

        {enrolled ? (
          <button
            style={{ ...btnStyle, background: "green", color: "#fff" }}
            disabled
          >
            Enrolled ✅
          </button>
        ) : (
          <button
            style={{ ...btnStyle, background: "#4f46e5", color: "#fff" }}
            onClick={() => onEnroll(course)}
          >
            Enroll Now
          </button>
        )}
      </div>
    </div>
  );
}
const btnStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
  marginTop: "10px",
};

const styles = {
  card: {
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },

  imgWrapper: {
    position: "relative", 
  },

  img: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
  },

  kingBadge: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    borderRadius: "50%",
    background: "#ff8205ff",
    width: "34px",
    height: "34px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  },

  body: { padding: "14px" },
  category: { color: "#4f46e5", fontSize: "12px", fontWeight: "600" },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "8px",
  },

  level: {
    fontSize: "12px",
    background: "#eef2ff",
    padding: "4px 8px",
    borderRadius: "20px",
  },

  type: {
    fontSize: "12px",
    padding: "4px 10px",
    borderRadius: "20px",
  },

  btn: {
    width: "100%",
    marginTop: "10px",
    padding: "8px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
  },
};

export default CourseCard;
