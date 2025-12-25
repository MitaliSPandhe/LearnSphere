import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "../Logo";
import CourseCard from "./CourseCard";
import GeminiChat from "./GeminiChat";
import "./Dashboard.css";
import ForgotPassword from "../UserComponent/ForgotPassword";

function Dashboard() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userName = storedUser?.name || "Guest";
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [popularityFilter, setPopularityFilter] = useState("");
  const [courseTypeFilter, setCourseTypeFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [myCourses, setMyCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 9;
  const [openChat, setOpenChat] = useState(false);
  const userId = storedUser?.id;

  

  // User Enroll For Course
  const handleEnroll = async (course) => {
    if (!storedUser?.id) {
      alert("Please login again");
      return;
    }
    try {
      await axios.post(`http://localhost:8080/enrollments/enroll`, null, {
        params: {
          userId: storedUser.id,
          courseId: course.course_Id,
        },
      });
      setMyCourses([...myCourses, course]);
      alert("Course enrolled successfully");
    } catch (err) {
      if (err.response?.data?.message === "ALREADY_ENROLLED") {
        alert("Already enrolled");
      } else {
        alert("Enrollment failed");
      }
    }
  };

  //Fetch User Enrolled Courses
  useEffect(() => {
  if (!userId) return;

  const fetchMyCourses = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/enrollments/user/${userId}`
      );
      setMyCourses(res.data.map((e) => e.course));
    } catch (error) {
      console.error(error);
    }
  };

  fetchMyCourses();
}, [userId]); // ✅ ONLY userId


  // Fetch Filter wise Courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:8080/courses/filter");
        setCourses(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses
    .filter((course) =>
      searchTerm
        ? course.title?.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    )
    .filter((course) =>
      categoryFilter
        ? course.category?.cname?.toLowerCase() === categoryFilter.toLowerCase()
        : true
    )

    .filter((course) =>
      priceFilter
        ? course.price?.toLowerCase() === priceFilter.toLowerCase()
        : true
    )
    .filter((course) =>
      courseTypeFilter
        ? course.coursetype?.toLowerCase() === courseTypeFilter.toLowerCase()
        : true
    )
    .filter((course) =>
      popularityFilter
        ? course.popularity?.toLowerCase() === popularityFilter.toLowerCase()
        : true
    )
    .filter((course) =>
      levelFilter
        ? course.level?.toLowerCase() === levelFilter.toLowerCase()
        : true
    );
    // Pagination calculations
  const indexOfLast = currentPage * coursesPerPage;
  const indexOfFirst = indexOfLast - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <Logo />

        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchBar}
        />

        <div className="profile" onClick={() => setShowProfile(!showProfile)}>
          🧑🏻‍💻 {userName} ▼
          {showProfile && (
            <div className="profile-dropdown">
              <div style={{ padding: "10px 14px" }}>
                <p>
                  <strong>Name:</strong> {storedUser.name}
                </p>
                <p>
                  <strong>Email:</strong> {storedUser.email}
                </p>
              </div>

              <div
                className="dropdown-item"
                onClick={() => navigate("/forgot-password")}>
                Reset Password
              </div>

              <div
                className="dropdown-item"
                onClick={() => navigate("/my-courses")} >
                My Courses
              </div>

              <div
                className="dropdown-item logout"
                onClick={() => {
                  localStorage.removeItem("user");
                  navigate("/");
                }} >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={styles.filterRow}>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={styles.filterSelect} >
          <option value="">Category ▼</option>
          <option value="Programming">Programming</option>
          <option value="Web Development">Web Development</option>
          <option value="Data Science">Data Science</option>
          <option value="Cloud & DevOps">Cloud & DevOps</option>
          <option value="Cyber Security">Cyber Security</option>
        </select>

        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          style={styles.filterSelect}    >
          <option value="">Price ▼</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>

        <select
          value={popularityFilter}
          onChange={(e) => setPopularityFilter(e.target.value)}
          style={styles.filterSelect}  >
          <option value="">Popularity ▼</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={courseTypeFilter}
          onChange={(e) => setCourseTypeFilter(e.target.value)}
          style={styles.filterSelect} >
          <option value="">Course Type ▼</option>
          <option value="FREE">Free</option>
          <option value="PREMIUM">Premium</option>
        </select>

        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          style={styles.filterSelect}   >
          <option value="">Level ▼</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      {/* Course Cards */}
      {currentCourses.length > 0 ? 
      (
        <div style={styles.courseGrid}>
          {currentCourses.map((course) => (
            <CourseCard
              course={course}
              enrolled={myCourses.some((c) => c.course_Id === course.course_Id)}
              onEnroll={handleEnroll} />
           ))}
        </div>
      ) : 
      (<p>No courses available</p> )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              style={{
                ...styles.pageBtn,
                background: currentPage === i + 1 ? "#4f46e5" : "#fff",
                color: currentPage === i + 1 ? "#fff" : "#4f46e5",
              }}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

       {/* Gemini icon */}
      <div style={styles.chatIcon} onClick={() => setOpenChat(!openChat)}>
        🤖
      </div>

      {/* Chat Area*/}
      {openChat && (
        <div style={styles.chatWindow}>
          <GeminiChat onClose={() => setOpenChat(false)} />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f8fafc, #eef2ff)",
  },
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
    background: "#231f1fff",
    padding: "14px 18px",
    borderRadius: "14px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
  },

  searchBar: {
    flex: 1,
    margin: "0 20px",
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    outline: "none",
    fontSize: "14px",
  },

  profile: {
    cursor: "pointer",
    position: "relative",
    fontWeight: "600",
    backgroundColor: "#ffffff",
    zIndex: 10000, // 👈 dropdown se thoda zyada
  },
  dropdown: {
    position: "absolute",
    right: 0,
    top: "40px",
    background: "#ffffff",
    borderRadius: "10px",
    padding: "10px 14px",
    minWidth: "150px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    zIndex: 9999, // 🔥 MOST IMPORTANT
  },

  courseGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
    gap: "12px",
  },

  pageBtn: {
    padding: "8px 14px",
    border: "1px solid #4f46e5",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.2s ease",
  },
  filterRow: {
    display: "flex",
    gap: "12px",
    marginBottom: "20px",
    padding: "14px",
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(8px)",
    borderRadius: "14px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    flexWrap: "wrap",
  },

  filterSelect: {
    padding: "8px 12px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    background: "#fff",
    fontSize: "13px",
    cursor: "pointer",
  },
  chatbotWrapper: {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    zIndex: 99999, // 🔥 sabke upar
  },
  chatIcon: {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    width: "56px",
    height: "60px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #1209c9ff, #6366f1)",
    color: "#fff",
    fontSize: "26px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
    zIndex: 99999,
  },

  chatWindow: {
    position: "fixed",
    bottom: "90px",
    right: "24px",
    width: "360px",
    height: "430px",
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
    overflow: "hidden",
    zIndex: 99999,
  },
};

export default Dashboard;
