import { useEffect, useRef, useState } from "react";
import styles from "@/styles/Courses.module.css";

const PROGRAMS = [
  {
    tag: "1-Year Mentorship + 10 Mocks",
    title: "The Master Blueprint",
    badge: "Flagship Retainer",
    tagline: "Continuous 1:1 strategic oversight until CLAT Day.",
    desc: "A complete year-long strategic partnership. Includes bi-weekly 1:1 performance audits to constantly realign your execution strategy, error forensics, and time management, plus the complete 10-Mock physical box delivered to your desk.",
    accentNote: "Guided directly by an AIR 492 NLU alumnus & corporate consultant.",
    button: "Apply for the Masterplan",
    featured: true,
    accent: "#0b3d6b",
  },
  {
    tag: "4 Sessions + 10 Mocks",
    title: "The Structural Audit Pack",
    badge: "Most Popular",
    tagline: "Diagnose, deconstruct, and break your score plateau.",
    desc: "Designed for aspirants stuck at a score plateau. Includes 10 Consortium-calibrated physical test booklets and 4 targeted 1:1 deconstruction sessions to systematically eliminate your top 3 error patterns.",
    accentNote: "Includes pre-call Error Log forensics and custom remediation blueprints.",
    button: "Book the Audit",
    accent: "#2e7dd1",
  },
  {
    tag: "Only Mentorship (No Mocks)",
    title: "The Strategy Retainer",
    badge: "Pure Mentorship",
    tagline: "Elite 1:1 oversight for your existing prep materials.",
    desc: "For students already enrolled in mass institutions who feel ignored in batches of 500. Keep your existing study material, but leverage 1:1 consulting calls to fix your attempt strategy and reading fatigue.",
    accentNote: "The ultimate anti-coaching add-on for self-studiers and institute retakers.",
    button: "Secure Your Mentor",
    accent: "#27ae60",
  },
  {
    tag: "Only Mocks (No Mentorship)",
    title: "The 10-Mock Schematics",
    badge: "Simulated Tests",
    tagline: "10 battle-tested mock simulations delivered in our Blueprint Box.",
    desc: 'Pure execution. 10 physical A4 test booklets formatted strictly to the 120-question, 450-word passage pattern, complete with OMR sheets and line-by-line "Mocks Deconstruction" solution keys for independent self-analysis.',
    accentNote: "Sealed booklets engineered to replicate real exam pressure.",
    button: "Order the Schematics",
    accent: "#f1c40f",
  },
  {
    tag: "Session & Mock Top-Ups (On-Demand)",
    title: "The Tactical Expansion",
    badge: "On-Demand Add-On",
    tagline: "Emergency strategic intervention and additional mock simulations.",
    desc: "Need extra firepower right before the exam? Whether you require a single, emergency 1:1 cross-exam session to fix a sudden score collapse, or you just want to unlock an additional bundle of 5 physical mock schematics for weekend practice, this module scales exactly to your immediate needs.",
    accentNote: "Flexible, high-intensity resources activated only when you need them.",
    button: "Customize Your Top-Up",
    accent: "#c0392b",
  },
];

const N = PROGRAMS.length;
// Render three consecutive copies of the deck so there's always a real card
// to scroll to in either direction — the middle copy (indices N..2N-1) is
// "home base"; landing in an outer copy triggers a silent, instant jump
// back to the equivalent card in the middle copy so the loop feels seamless.
const LOOPED = [...PROGRAMS, ...PROGRAMS, ...PROGRAMS];

export default function Courses() {
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const settleTimer = useRef(null);
  const [fullIndex, setFullIndex] = useState(N);
  const [flipped, setFlipped] = useState(() => new Set());

  function toggleFlip(i) {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });
  }

  function jumpTo(index, smooth) {
    const el = cardRefs.current[index];
    if (!el || !trackRef.current) return;
    if (smooth) {
      el.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    } else {
      trackRef.current.scrollLeft = el.offsetLeft;
    }
  }

  function handlePrev() {
    const next = fullIndex - 1;
    setFullIndex(next);
    jumpTo(next, true);
  }

  function handleNext() {
    const next = fullIndex + 1;
    setFullIndex(next);
    jumpTo(next, true);
  }

  function goToProgram(i) {
    const next = N + i;
    setFullIndex(next);
    jumpTo(next, true);
  }

  // Center the track on the middle copy on first mount, instantly.
  useEffect(() => {
    jumpTo(N, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function onScroll() {
      clearTimeout(settleTimer.current);
      settleTimer.current = setTimeout(() => {
        const { scrollLeft } = track;
        let closest = 0;
        let closestDist = Infinity;
        cardRefs.current.forEach((el, i) => {
          if (!el) return;
          const dist = Math.abs(el.offsetLeft - scrollLeft);
          if (dist < closestDist) {
            closestDist = dist;
            closest = i;
          }
        });

        if (closest < N || closest >= N * 2) {
          const remapped = N + (((closest % N) + N) % N);
          setFullIndex(remapped);
          jumpTo(remapped, false);
        } else {
          setFullIndex(closest);
        }
      }, 120);
    }

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      clearTimeout(settleTimer.current);
    };
  }, []);

  const active = ((fullIndex % N) + N) % N;

  return (
    <section id="programs" className="section">
      <div className="container">
        <div className={styles.heading}>
          <span className="eyebrow">Programs &amp; Modules</span>
          <h2>Engineered for Every Stage of Your Preparation.</h2>
          <p className={styles.headingSub}>
            From comprehensive year-round cohorts to targeted 1:1 mock
            deconstruction sessions — choose the exact pathway to your target
            NLU.
          </p>
        </div>

        <div className={styles.carouselHead}>
          <button className={styles.navBtn} onClick={handlePrev} aria-label="Previous program">
            ‹
          </button>
          <button className={styles.navBtn} onClick={handleNext} aria-label="Next program">
            ›
          </button>
        </div>

        <div className={styles.track} ref={trackRef}>
          {LOOPED.map((program, i) => (
            <div key={`${program.title}-${i}`} ref={(el) => (cardRefs.current[i] = el)} className={styles.slide}>
              <div className={`${styles.flipCard} ${flipped.has(i) ? styles.flipped : ""}`}>
                <div
                  className={`card ${styles.face} ${styles.front} ${program.featured ? styles.featured : ""}`}
                  style={{ "--accent": program.accent }}
                >
                  <span className={styles.bar} />
                  <span className={styles.badge}>{program.badge}</span>
                  <span className={styles.tag}>{program.tag}</span>
                  <h3>{program.title}</h3>
                  <p className={styles.tagline}>{program.tagline}</p>
                  <div className={styles.faceFooter}>
                    <a href="#admissions" className="btn btn-primary">
                      {program.button}
                    </a>
                    <button type="button" className={styles.readMore} onClick={() => toggleFlip(i)}>
                      Read More →
                    </button>
                  </div>
                </div>

                <div className={`card ${styles.face} ${styles.back}`} style={{ "--accent": program.accent }}>
                  <span className={styles.bar} />
                  <h3>{program.title}</h3>
                  <p className={styles.desc}>{program.desc}</p>
                  <p className={styles.accentNote}>{program.accentNote}</p>
                  <div className={styles.faceFooter}>
                    <a href="#admissions" className="btn btn-primary">
                      {program.button}
                    </a>
                    <button type="button" className={styles.readMore} onClick={() => toggleFlip(i)}>
                      ← Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.dots}>
          {PROGRAMS.map((program, i) => (
            <button
              key={program.title}
              className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
              onClick={() => goToProgram(i)}
              aria-label={`Go to ${program.title}`}
            />
          ))}
        </div>

        <div className={styles.moreRow}>
          <p>Not sure which pathway fits your prep stage?</p>
          <a href="#admissions" className="btn btn-primary">
            Talk to Admissions
          </a>
        </div>
      </div>
    </section>
  );
}
