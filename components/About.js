import styles from "@/styles/About.module.css";

const NODES = ["Curriculum", "Databases", "Mentorship", "Frameworks", "Practice Tests", "Doubt Support"];

export default function About() {
  return (
    <section id="about" className="section section-alt">
      <div className={`container ${styles.grid}`}>
        <div>
          <span className="eyebrow">About Us</span>
          <h2 className={styles.heading}>A better future starts with good education.</h2>
          <p>
            The Planner Education wants to see you accomplish your dreams. Our
            major goal is to maximize your educational success. We always
            believe the pursuit of higher education is the most valuable
            investment you can make.
          </p>
          <p>
            We guarantee the quality of teaching and learning, as our
            experienced instructors are highly trained professionals
            dedicated to bringing out the best in every student.
          </p>
          <p>
            Don&apos;t just take our word for it &mdash; the success of our
            students shows everything.
          </p>
        </div>

        <div className={styles.diagram}>
          <div className={styles.center}>CLAT</div>
          {NODES.map((node, i) => {
            const angle = (i / NODES.length) * 2 * Math.PI;
            const radius = 165;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <div
                key={node}
                className={styles.node}
                style={{ transform: `translate(calc(-50% + ${x.toFixed(1)}px), calc(-50% + ${y.toFixed(1)}px))` }}
              >
                {node}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
