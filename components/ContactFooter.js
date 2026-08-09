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
      <section id="contact" className="section">
        <div className={`container ${styles.grid}`}>
          <div>
            <span className="eyebrow">Contacts</span>
            <h2 className={styles.heading}>Let&apos;s Work Together</h2>
            <p className={styles.sub}>
              Have a project in mind? Let&apos;s talk and turn your ideas into
              reality.
            </p>
            <p className={styles.contactLine}>info@sigmatutorials.com</p>
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
              We build modern learning experiences that help students grow
              and succeed academically.
            </p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <a href="#home">Home</a>
            <a href="#about">About Us</a>
            <a href="#courses">Services</a>
          </div>

          <div>
            <h4>Our Services</h4>
            <span>Test Series</span>
            <span>IGCSE &amp; A-Level</span>
            <span>SAT Prep</span>
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
          © {new Date().getFullYear()} Sigma Tutorials. All rights reserved.
        </div>
      </footer>
    </>
  );
}
