import styles from "@/styles/About.module.css";

const NODES = [
  "Mock Deconstruction",
  "Error Diagnostics",
  "1:1 Cross-Exams",
  "Tactical Plans",
  "Strategic Oversight",
  "Score Audits",
];

export default function About() {
  return (
    <section id="methodology" className="section section-alt">
      <div className={`container ${styles.grid}`}>
        <div>
          <span className="eyebrow">Our Methodology · The CLAT Blueprint</span>
          <h2 className={styles.heading}>
            Personalized Mentorship Over Mass Production.
          </h2>
          <p>
            The traditional CLAT coaching ecosystem relies on a factory
            model: 500+ students crammed into single online batches,
            receiving generic lectures and unanalyzed mock tests. Most
            aspirants don&apos;t fail because they lack hard work — they fail
            because their individual cognitive gaps are never diagnosed.
          </p>
          <p>
            The CLAT Blueprint was built as the direct antidote to
            mass-market coaching. Founded by an NLU alumnus and legal
            consultant, we treat your exam preparation like a high-stakes
            strategic audit. We eliminate the noise of passive lectures and
            focus entirely on what actually drives ranks: 1:1 error
            forensics, time-allocation calibration, and behavioral
            performance under pressure.
          </p>
          <p>
            We strictly limit our student intake each year to ensure every
            mentee receives direct, uncompromised access to high-level
            strategic guidance.
          </p>
        </div>

        <div className={styles.diagram}>
          <div className={styles.center}>THE BLUEPRINT</div>
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
