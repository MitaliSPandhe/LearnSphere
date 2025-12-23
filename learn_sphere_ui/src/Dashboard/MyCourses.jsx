import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "./CourseCard";

function MyCourses() {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [myCourses, setCourses] = useState([]);

  useEffect(() => {
     axios
      .get(`http://localhost:8080/enrollments/user/${storedUser.id}`)
      .then((res) => {
        setCourses(res.data.map((e) => e.course));
      });
  }, [storedUser.id]);

  return (
    <div style={{ padding: "30px" }}>
      <h2>📚 My Courses</h2>

      {myCourses.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "20px",
          }}
        >
          {myCourses.map((course) => (
            <CourseCard
              key={course.course_Id}
              course={course}
              enrolled={true}
            />
          ))}
        </div>
      ) : (
        <div style={{ marginTop: "40px" }}>
          <h3>No courses purchased yet 😒</h3>
          <p>Explore courses and enroll now</p>
        </div>
      )}
    </div>
  );
}

export default MyCourses;
