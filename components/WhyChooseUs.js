import styles from "@/styles/WhyChooseUs.module.css";

const POINTS = [
  "Application-Only, Capped Cohorts",
  "Corporate-Grade Error Forensics",
  "1:1 Strategic Cross-Exam Sessions",
  "Guided Directly by an NLU Alumnus",
];

const STATS = [
  { value: "Max 30", label: "Seats Per Mentorship Cohort" },
  { value: "NLU", label: "Alumnus-Led Mentorship" },
  { value: "100%", label: "Data-Driven Strategy" },
];

export default function WhyChooseUs() {
  return (
    <section id="advantage" className="section">
      <div className={`container ${styles.grid}`}>
        <div>
          <span className="eyebrow">The Blueprint Advantage</span>
          <h2 className={styles.heading}>The Anti-Factory Coaching Model.</h2>
          <p className={styles.sub}>
            We don&apos;t sell recorded lectures to thousands of students at
            once. We operate as a high-stakes consulting wing, combining
            legal rigor, cognitive analytics, and corporate strategy to
            engineer your rank.
          </p>
          <ul className={styles.points}>
            {POINTS.map((point) => (
              <li key={point}>
                <span className={styles.dot} />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.photo} aria-hidden="true">
          <svg viewBox="0 0 320 240" className={styles.photoSvg}>
            <rect width="320" height="240" rx="20" fill="var(--color-bg-alt)" />
            <circle cx="120" cy="120" r="52" fill="#0b3d6b" opacity="0.85" />
            <circle cx="200" cy="120" r="52" fill="#2e7dd1" opacity="0.85" />
            <circle cx="160" cy="170" r="52" fill="#8fb6de" opacity="0.85" />
            <text x="90" y="95" fontSize="12" fontWeight="700" fill="#ffffff">Accuracy</text>
            <text x="205" y="95" fontSize="12" fontWeight="700" fill="#ffffff">Speed</text>
            <text x="140" y="215" fontSize="12" fontWeight="700" fill="#0b3d6b">Strategy</text>
            <text x="128" y="150" fontSize="10" fontWeight="700" fill="#ffffff">Top NLU Seat</text>
          </svg>
        </div>

        <div className={styles.stats}>
          {STATS.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
