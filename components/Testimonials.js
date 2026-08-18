import styles from "@/styles/Testimonials.module.css";

const TESTIMONIALS = [
  {
    quote:
      "Mentorship is indeed the most important part of preparation. The 1:1 mentorship I had was not only inclined towards academic improvement but also helped me cope with self-doubt, manage pressure, balance subjects, and find where I lacked while staying on track. My mentor's advice helped me change my approach towards preparation — the availability of my mentor was worth it throughout my journey.",
    name: "CLAT Blueprint Mentee",
    role: "1:1 Mentorship Program",
    photo: "/images/testimonial-1.jpg",
  },
  {
    quote:
      "I used to have a lot of basic and complicated doubts due to which my preparation felt stuck. Taking mentorship from Shubhendra Sir felt like a way out of all those confusions. He broke down the most complex topics into simple, understandable terms and patiently cleared every single doubt. Not only CLAT but his mentorship also guided me to excel in academics and extracurriculars such as Moot Court Competitions, writing skills, and internships. I highly recommend his mentorship to any CLAT aspirant!",
    name: "CLAT Blueprint Mentee",
    role: "1:1 Mentorship Program",
    photo: "/images/testimonial-2.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className={styles.heading}>
          <span className="eyebrow">Testimonials</span>
          <h2>What Our Mentees Say</h2>
        </div>

        <div className={styles.grid}>
          {TESTIMONIALS.map((t) => (
            <div key={t.quote} className={`card ${styles.card}`}>
              <span className={styles.quoteMark}>&ldquo;</span>
              <p>{t.quote}</p>
              <div className={styles.author}>
                <img src={t.photo} alt="" className={styles.avatarPhoto} />
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
