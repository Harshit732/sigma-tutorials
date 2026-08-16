import { useState } from "react";
import styles from "@/styles/ContactFooter.module.css";

export default function ContactFooter() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <section id="admissions" className="section">
        <div className={`container ${styles.grid}`}>
          <div>
            <span className="eyebrow">Admissions &amp; Contact</span>
            <h2 className={styles.heading}>Ready to Break Your Score Plateau?</h2>
            <p className={styles.sub}>
              Mentorship cohorts are strictly capped to ensure 1:1 quality.
              Apply for the upcoming batch to secure your NLU trajectory.
            </p>
            <p className={styles.contactLine}>info@sigmatutorials.com</p>
            <a
              href="mailto:info@sigmatutorials.com?subject=Mentorship%20Application"
              className={`btn btn-primary ${styles.applyBtn}`}
            >
              Apply for Mentorship
            </a>
          </div>

          <form className={`card ${styles.form}`} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
            </div>
            <textarea placeholder="Your Message" rows={4} required />
            <button type="submit" className="btn btn-primary btn-block">
              {sent ? "Message Sent ✓" : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={`container ${styles.footerGrid}`}>
          <div>
            <div className={styles.footerBrand}>Sigma Tutorials</div>
            <p>
              We engineer 1:1 CLAT mentorship for aspirants targeting a top
              NLU seat — not mass-market coaching.
            </p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <a href="#home">Home</a>
            <a href="#methodology">Methodology</a>
            <a href="#advantage">Advantage</a>
          </div>

          <div>
            <h4>Our Programs</h4>
            <span>The Master Blueprint</span>
            <span>Structural Audit Pack</span>
            <span>Strategy Retainer</span>
            <span>10-Mock Schematics</span>
          </div>

          <div>
            <h4>Support</h4>
            <span>Help Center</span>
            <span>FAQs</span>
            <span>Terms &amp; Conditions</span>
          </div>

          <div>
            <h4>Newsletter</h4>
            <p>Subscribe to get updates and the latest news.</p>
            <form className={styles.newsletter} onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address" required />
              <button type="submit" aria-label="Subscribe">
                →
              </button>
            </form>
          </div>
        </div>

        <div className={styles.bottomBar}>
          © {new Date().getFullYear()} Sigma Tutorials — The CLAT Blueprint. All rights reserved.
        </div>
      </footer>
    </>
  );
}
