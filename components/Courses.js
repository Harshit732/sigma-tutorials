import styles from "@/styles/Courses.module.css";

const COURSES = [
  { title: "Test Series", desc: "Full-length mock tests with detailed performance analytics.", featured: true, accent: "#c0392b" },
  { title: "IGCSE", desc: "Structured curriculum coverage across all core subjects.", accent: "#27ae60" },
  { title: "A-Level", desc: "In-depth subject mastery guided by experienced faculty.", accent: "#2e7dd1" },
  { title: "SAT", desc: "Strategy-driven prep to maximize your composite score.", accent: "#f1c40f" },
];

export default function Courses() {
  return (
    <section id="courses" className="section">
      <div className="container">
        <div className={styles.heading}>
          <span className="eyebrow">Course</span>
          <h2>Great Teachers Make Great Students.</h2>
        </div>

        <div className={styles.grid}>
          {COURSES.map((course) => (
            <div
              key={course.title}
              className={`card ${styles.card} ${course.featured ? styles.featured : ""}`}
              style={{ "--accent": course.accent }}
            >
              <span className={styles.bar} />
              <h3>{course.title}</h3>
              <p>{course.desc}</p>
              <a href="#contact" className={course.featured ? "btn btn-outline" : "btn btn-primary"}>
                View Details
              </a>
            </div>
          ))}
        </div>

        <div className={styles.moreRow}>
          <a href="#contact" className="btn btn-primary">
            Other Courses
          </a>
        </div>
      </div>
    </section>
  );
}
