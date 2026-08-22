import { Fragment, useState } from "react";
import Reveal from "@/components/Reveal";
import styles from "@/styles/About.module.css";

const NODES = [
  {
    label: "Mock Deconstruction",
    description: "Every mock you take is broken down question-by-question — not just scored, but dissected for the reasoning gaps behind each miss.",
  },
  {
    label: "Error Diagnostics",
    description: "Mistakes are classified by root cause — conceptual, time pressure, or comprehension — so fixes target the actual problem, not the symptom.",
  },
  {
    label: "1:1 Cross-Exams",
    description: "Direct oral cross-examination on your reasoning, the same rigor used in legal case prep, to pressure-test your logic under scrutiny.",
  },
  {
    label: "Tactical Plans",
    description: "A section-wise attack plan calibrated to your own speed and accuracy profile — never a generic study schedule.",
  },
  {
    label: "Strategic Oversight",
    description: "Your mentor tracks your trajectory across every cycle, adjusting strategy as your performance data evolves.",
  },
  {
    label: "Score Audits",
    description: "Periodic deep audits compare your trajectory against target NLU cutoffs, so any drift gets caught early.",
  },
];

export default function About() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = NODES[activeIndex];

  return (
    <section id="methodology" className="section section-alt">
      <div className={`container ${styles.grid}`}>
        <Reveal>
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
        </Reveal>

        <Reveal delay={120} className={styles.diagramWrap}>
          <div className={styles.diagram}>
            <div className={styles.center}>THE BLUEPRINT</div>
            {NODES.map((node, i) => {
              const angle = (i / NODES.length) * 2 * Math.PI;
              // Percentages of the (square) diagram container, so the layout
              // scales down safely on narrow phones instead of overflowing —
              // a fixed pixel radius doesn't shrink with the container.
              const radiusPct = 36;
              const xPct = Math.cos(angle) * radiusPct;
              const yPct = Math.sin(angle) * radiusPct;
              const deg = (angle * 180) / Math.PI;
              const isActive = i === activeIndex;
              return (
                <Fragment key={node.label}>
                  <span
                    className={styles.branch}
                    style={{ width: `${radiusPct}%`, transform: `rotate(${deg}deg)` }}
                  />
                  <button
                    type="button"
                    className={`${styles.node} ${isActive ? styles.nodeActive : ""}`}
                    style={{ left: `${(50 + xPct).toFixed(2)}%`, top: `${(50 + yPct).toFixed(2)}%` }}
                    onClick={() => setActiveIndex(i)}
                    aria-pressed={isActive}
                  >
                    {node.label}
                  </button>
                </Fragment>
              );
            })}
          </div>

          <div className={styles.detail}>
            <strong>{active.label}</strong>
            <p>{active.description}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
