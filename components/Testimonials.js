import styles from "@/styles/Testimonials.module.css";

export default function Testimonials() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className={styles.heading}>
          <span className="eyebrow">Testimonials</span>
          <h2>What Our Mentees Say</h2>
        </div>

        <div className={styles.singleWrap}>
          <div className={`card ${styles.card} ${styles.singleCard}`}>
            <span className={styles.quoteMark}>&ldquo;</span>
            <p>
              Mentorship is indeed the most important part of preparation.
              The 1:1 mentorship I had was not only inclined towards academic
              improvement but also helped me cope with self-doubt, manage
              pressure, balance subjects, and find where I lacked while
              staying on track. My mentor&apos;s advice helped me change my
              approach towards preparation — the availability of my mentor
              was worth it throughout my journey.
            </p>
            <div className={styles.author}>
              <span className={styles.avatar}>B</span>
              <div>
                <strong>CLAT Blueprint Mentee</strong>
                <span>1:1 Mentorship Program</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
