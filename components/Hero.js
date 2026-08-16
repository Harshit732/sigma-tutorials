import styles from "@/styles/Hero.module.css";

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={`container ${styles.grid}`}>
        <div>
          <span className="eyebrow">Sigma Tutorials · The CLAT Blueprint</span>
          <h1 className={styles.heading}>
            The Most Elite 1:1 Mentorship
            <br /> for CLAT Preparation.
          </h1>
          <p className={styles.sub}>
            Designed by an NLU alumnus. Master the exam through structured,
            data-driven mock deconstructions and cross-examinations — not
            crowded batch lectures. We audit your cognitive performance, fix
            your score bottlenecks, and engineer your path to a top NLU.
          </p>
          <div className={styles.ctaRow}>
            <a href="#programs" className="btn btn-primary">
              View Programs
            </a>
            <a href="#methodology" className="btn btn-outline">
              Our Methodology
            </a>
          </div>
        </div>

        <div className={styles.art}>
          <svg viewBox="0 0 400 340" className={styles.svg} role="img" aria-label="Stack of books with a graduation cap">
            <ellipse cx="200" cy="300" rx="150" ry="20" fill="var(--color-border)" opacity="0.6" />
            <rect x="90" y="230" width="220" height="34" rx="6" fill="#c0392b" />
            <rect x="100" y="196" width="200" height="34" rx="6" fill="#2e7dd1" />
            <rect x="112" y="162" width="176" height="34" rx="6" fill="#f1c40f" />
            <rect x="120" y="128" width="160" height="34" rx="6" fill="#27ae60" />
            <rect x="132" y="96" width="136" height="32" rx="6" fill="#0b3d6b" />
            <g transform="translate(200 70)">
              <polygon points="0,-8 78,20 0,48 -78,20" fill="#17233b" />
              <polygon points="0,-8 78,20 0,48 -78,20" fill="var(--color-primary)" opacity="0.9" />
              <circle cx="60" cy="30" r="4" fill="#f1c40f" />
              <line x1="60" y1="30" x2="60" y2="58" stroke="#f1c40f" strokeWidth="2" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
