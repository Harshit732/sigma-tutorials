import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import styles from "@/styles/WhyChooseUs.module.css";

const POINTS = [
  "Application-Only, Capped Cohorts",
  "Corporate-Grade Error Forensics",
  "1:1 Strategic Cross-Exam Sessions",
  "Guided Directly by an NLU Alumnus",
];

const STATS = [
  {
    number: 30,
    prefix: "Max ",
    label: "Seats Per Mentorship Cohort",
    description: "Intake is capped every year so each mentee gets direct, uncompromised access — never a shared batch slot.",
  },
  {
    text: "NLU",
    label: "Alumnus-Led Mentorship",
    description: "Every strategy session is led personally by an NLU alumnus who has already been through the exam you're preparing for.",
  },
  {
    number: 100,
    suffix: "%",
    label: "Data-Driven Strategy",
    description: "Every recommendation traces back to your own mock performance data — never generic advice.",
  },
];

function useCountUp(target) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || target == null) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const duration = 1200;
        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(target * eased));
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return [value, ref];
}

function Stat({ stat, delay }) {
  const [value, counterRef] = useCountUp(stat.number);
  const display = stat.number != null ? `${stat.prefix || ""}${value}${stat.suffix || ""}` : stat.text;

  return (
    <Reveal className={`card ${styles.stat}`} delay={delay}>
      <strong ref={counterRef}>{display}</strong>
      <span>{stat.label}</span>
      <p>{stat.description}</p>
    </Reveal>
  );
}

export default function WhyChooseUs() {
  return (
    <section id="advantage" className="section">
      <div className="container">
        <Reveal className={styles.grid}>
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
        </Reveal>

        <div className={styles.statsRow}>
          {STATS.map((stat, i) => (
            <Stat key={stat.label} stat={stat} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
