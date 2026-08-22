import { useState } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import { QUESTIONS_PER_MOCK, ERROR_CODES, RIGHT_COLOR, BLANK_COLOR } from "@/lib/errorCodes";
import styles from "@/styles/MockChecklist.module.css";

const TABS = [
  { label: "Q1–30", start: 1, end: 30 },
  { label: "Q31–60", start: 31, end: 60 },
  { label: "Q61–90", start: 61, end: 90 },
  { label: "Q91–120", start: 91, end: 120 },
];

export default function MockChecklist({ mockNumber, refresh, onDone, onCancel }) {
  const [answers, setAnswers] = useState({}); // { [q]: { right, code } }
  const [activeTab, setActiveTab] = useState(0);
  const [openCell, setOpenCell] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const answeredCount = Object.keys(answers).length;
  const complete = answeredCount === QUESTIONS_PER_MOCK;

  const counts = Object.fromEntries(ERROR_CODES.map((c) => [c.code, 0]));
  let rightCount = 0;
  for (const a of Object.values(answers)) {
    if (a.right) rightCount++;
    else counts[a.code]++;
  }

  function selectAnswer(q, value) {
    setAnswers((prev) => ({ ...prev, [q]: value }));
    setOpenCell(null);
  }

  async function handleSubmit() {
    if (!complete) return;
    setSubmitting(true);
    setError("");
    try {
      const payload = Array.from({ length: QUESTIONS_PER_MOCK }, (_, i) => {
        const q = i + 1;
        const a = answers[q];
        return { q, right: !!a.right, code: a.right ? "" : a.code };
      });
      const res = await fetch("/api/user/mock-checklist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mockNumber, answers: payload }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Submission failed.");
        return;
      }
      await refresh();
      onDone();
    } catch {
      setError("Network error while submitting.");
    } finally {
      setSubmitting(false);
    }
  }

  const tab = TABS[activeTab];

  return (
    <>
      <Head>
        <title>Diagnostic Checklist — Mock {mockNumber} | Sigma Tutorials</title>
      </Head>
      <Navbar />
      <div className={styles.stickyHeader}>
        <div className="container">
          <button type="button" className={styles.backLink} onClick={onCancel}>
            ← Back to dashboard
          </button>
          <div className={styles.headRow}>
            <h1 className={styles.title}>Diagnostic Checklist — Mock {mockNumber}</h1>
            <span className={styles.counter}>
              {answeredCount}/{QUESTIONS_PER_MOCK} answered
            </span>
          </div>

          <div className={styles.tabRow}>
            {TABS.map((t, i) => (
              <button
                key={t.label}
                type="button"
                className={`${styles.tabBtn} ${i === activeTab ? styles.tabActive : ""}`}
                onClick={() => setActiveTab(i)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className={styles.codeCounts}>
            <span className={styles.codeCount} style={{ "--code-color": RIGHT_COLOR }}>
              Right: {rightCount}
            </span>
            {ERROR_CODES.map((c) => (
              <span key={c.code} className={styles.codeCount} style={{ "--code-color": c.color }}>
                {c.code}: {counts[c.code]}
              </span>
            ))}
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="button" className="btn btn-primary" disabled={!complete || submitting} onClick={handleSubmit}>
            {submitting ? "Submitting…" : complete ? "Submit Checklist" : `Answer all ${QUESTIONS_PER_MOCK} to submit`}
          </button>
        </div>
      </div>

      <main className="container section">
        <div className={styles.grid}>
          {Array.from({ length: tab.end - tab.start + 1 }, (_, i) => tab.start + i).map((q) => (
            <Cell
              key={q}
              q={q}
              value={answers[q]}
              open={openCell === q}
              onToggle={() => setOpenCell((prev) => (prev === q ? null : q))}
              onSelect={(value) => selectAnswer(q, value)}
            />
          ))}
        </div>
      </main>
    </>
  );
}

function Cell({ q, value, open, onToggle, onSelect }) {
  const color = value ? (value.right ? RIGHT_COLOR : ERROR_CODES.find((c) => c.code === value.code)?.color) : BLANK_COLOR;
  const label = value ? (value.right ? "✓" : value.code) : "";

  return (
    <div className={styles.cellWrap}>
      <button
        type="button"
        className={styles.cell}
        style={{ borderColor: color, background: value ? `${color}22` : "transparent", color }}
        onClick={onToggle}
      >
        <span className={styles.cellQ}>{q}</span>
        <span className={styles.cellLabel}>{label}</span>
      </button>

      {open && (
        <div className={styles.popover}>
          <button type="button" className={styles.popoverOption} style={{ "--opt-color": RIGHT_COLOR }} onClick={() => onSelect({ right: true, code: "" })}>
            Right
          </button>
          {ERROR_CODES.map((c) => (
            <button
              key={c.code}
              type="button"
              className={styles.popoverOption}
              style={{ "--opt-color": c.color }}
              onClick={() => onSelect({ right: false, code: c.code })}
            >
              {c.code} — {c.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
