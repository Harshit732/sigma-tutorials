import styles from "@/styles/PackageTracker.module.css";

const STATUS_LABEL = { pending: "Pending", uploaded: "OMR Uploaded", analyzed: "Analyzed" };

export default function PackageTracker({ user, onSelectMock }) {
  const pkg = user.package || {};
  const mocks = user.mocks || [];

  if (!pkg.totalMocks) {
    return (
      <div className={`card ${styles.card}`}>
        <h2 className={styles.heading}>Your Mock Package</h2>
        <p className={styles.empty}>
          No mock package assigned yet. Check in with your mentor once you&apos;ve enrolled in a program that
          includes mocks.
        </p>
      </div>
    );
  }

  const half = Math.ceil(pkg.totalMocks / 2);
  const phases = [
    { label: "Phase 1: Foundation", mocks: mocks.filter((m) => m.number <= half) },
    { label: "Phase 2: Advanced", mocks: mocks.filter((m) => m.number > half) },
  ].filter((p) => p.mocks.length > 0);

  const analyzed = mocks.filter((m) => m.status === "analyzed").length;

  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.headRow}>
        <h2 className={styles.heading}>{pkg.name}</h2>
        <span className={styles.counter}>
          Attempted: {analyzed} / Remaining: {pkg.totalMocks - analyzed}
        </span>
      </div>
      <div className={styles.progressTrack}>
        <div
          className={styles.progressFill}
          style={{ width: `${pkg.totalMocks ? (analyzed / pkg.totalMocks) * 100 : 0}%` }}
        />
      </div>

      {phases.map((phase) => (
        <div key={phase.label} className={styles.phase}>
          <h3 className={styles.phaseLabel}>{phase.label}</h3>
          <div className={styles.mockGrid}>
            {phase.mocks.map((mock) => {
              const clickable = mock.status !== "analyzed";
              return (
                <button
                  key={mock.number}
                  type="button"
                  className={`${styles.mockChip} ${styles[mock.status]}`}
                  onClick={() => clickable && onSelectMock(mock.number)}
                  disabled={!clickable}
                >
                  <span className={styles.mockNumber}>Mock {mock.number}</span>
                  <span className={styles.mockStatus}>{STATUS_LABEL[mock.status]}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
