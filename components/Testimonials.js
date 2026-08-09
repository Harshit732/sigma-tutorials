import styles from "@/styles/Testimonials.module.css";

const REVIEWS = [
  { quote: "Professional, creative and always deliver on time. Highly recommend.", name: "Ali Khan", role: "CEO, TechCorp." },
  { quote: "WebCraft transformed our learning experience. Their work is exceptional.", name: "Sara Ahmed", role: "Marketing Head" },
  { quote: "Amazing experience! They understand our needs and exceed expectations.", name: "Usman Raza", role: "Founder, ShopEasy" },
];

export default function Testimonials() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className={styles.heading}>
          <span className="eyebrow">Testimonials</span>
          <h2>What Our Clients Say</h2>
        </div>

        <div className={styles.grid}>
          {REVIEWS.map((review) => (
            <div key={review.name} className={`card ${styles.card}`}>
              <span className={styles.quoteMark}>&ldquo;</span>
              <p>{review.quote}</p>
              <div className={styles.author}>
                <span className={styles.avatar}>{review.name.charAt(0)}</span>
                <div>
                  <strong>{review.name}</strong>
                  <span>{review.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
