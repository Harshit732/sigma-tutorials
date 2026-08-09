import styles from "@/styles/WhyChooseUs.module.css";

const POINTS = [
  "Modern & Unique Design",
  "100% Client Satisfaction",
  "On-Time Project Delivery",
  "24/7 Dedicated Support",
];

const STATS = [
  { value: "500+", label: "Happy Clients" },
  { value: "1000+", label: "Projects Done" },
  { value: "5+", label: "Awards Won" },
];

export default function WhyChooseUs() {
  return (
    <section className="section">
      <div className={`container ${styles.grid}`}>
        <div>
          <span className="eyebrow">About Us</span>
          <h2 className={styles.heading}>Why Choose Us?</h2>
          <p className={styles.sub}>
            We combine creativity, technology and strategy to deliver
            exceptional educational experiences.
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
            <circle cx="110" cy="120" r="46" fill="var(--color-primary)" opacity="0.85" />
            <circle cx="200" cy="100" r="38" fill="var(--color-accent)" opacity="0.85" />
            <circle cx="230" cy="150" r="30" fill="#f1c40f" opacity="0.9" />
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
