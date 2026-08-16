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
            <defs>
              <linearGradient id="bookRed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e0574a" />
                <stop offset="100%" stopColor="#a4271e" />
              </linearGradient>
              <linearGradient id="bookBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5b9ee6" />
                <stop offset="100%" stopColor="#1e63a8" />
              </linearGradient>
              <linearGradient id="bookYellow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f7d549" />
                <stop offset="100%" stopColor="#d1a30f" />
              </linearGradient>
              <linearGradient id="bookGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4fc47b" />
                <stop offset="100%" stopColor="#1e8a4c" />
              </linearGradient>
              <linearGradient id="bookNavy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#164a7e" />
                <stop offset="100%" stopColor="#072a4a" />
              </linearGradient>
              <linearGradient id="capGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#22344f" />
                <stop offset="100%" stopColor="#0b1a2e" />
              </linearGradient>
              <radialGradient id="shadowGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
              </radialGradient>
            </defs>

            <ellipse cx="200" cy="300" rx="150" ry="20" fill="url(#shadowGrad)" className={styles.shadow} />

            <g className={styles.float}>
              <rect x="90" y="230" width="220" height="34" rx="6" fill="url(#bookRed)" />
              <rect x="100" y="196" width="200" height="34" rx="6" fill="url(#bookBlue)" />
              <rect x="112" y="162" width="176" height="34" rx="6" fill="url(#bookYellow)" />
              <rect x="120" y="128" width="160" height="34" rx="6" fill="url(#bookGreen)" />
              <rect x="132" y="96" width="136" height="32" rx="6" fill="url(#bookNavy)" />
              <g transform="translate(200 70)">
                <polygon points="0,-8 78,20 0,48 -78,20" fill="url(#capGrad)" />
                <polygon points="0,-8 78,20 0,48 -78,20" fill="var(--color-primary)" opacity="0.85" />
                <g className={styles.tassel}>
                  <circle cx="60" cy="30" r="4" fill="#f1c40f" />
                  <line x1="60" y1="30" x2="60" y2="58" stroke="#f1c40f" strokeWidth="2" />
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
