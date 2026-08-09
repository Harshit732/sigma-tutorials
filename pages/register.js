import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/Auth.module.css";
import { useAuth } from "@/context/AuthContext";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dob: "",
  password: "",
  confirmPassword: "",
};

export default function Register() {
  const router = useRouter();
  const { refresh } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed.");
        return;
      }

      await refresh();
      router.push("/dashboard");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Register | Sigma Tutorials</title>
      </Head>
      <div className={styles.wrap}>
        <div className={styles.side}>
          <div className={styles.brand}>
            <span className={styles.logoMark}>ST</span>
            Sigma Tutorials
          </div>
          <h1>Start your journey with the CLAT Blueprint.</h1>
          <p>
            Create an account to track your courses, test series, and
            progress in one place.
          </p>
        </div>

        <div className={styles.formSide}>
          <form className={`card ${styles.card}`} onSubmit={handleSubmit}>
            <h2>Create your account</h2>
            <p className={styles.muted}>It only takes a minute.</p>

            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.row2}>
              <div className={styles.field}>
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" required value={form.firstName} onChange={update("firstName")} />
              </div>
              <div className={styles.field}>
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" required value={form.lastName} onChange={update("lastName")} />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" required value={form.email} onChange={update("email")} />
            </div>

            <div className={styles.row2}>
              <div className={styles.field}>
                <label htmlFor="phone">Phone Number</label>
                <input id="phone" type="tel" required value={form.phone} onChange={update("phone")} />
              </div>
              <div className={styles.field}>
                <label htmlFor="dob">Date of Birth</label>
                <input id="dob" type="date" required value={form.dob} onChange={update("dob")} />
              </div>
            </div>

            <div className={styles.row2}>
              <div className={styles.field}>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" minLength={8} required value={form.password} onChange={update("password")} />
              </div>
              <div className={styles.field}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input id="confirmPassword" type="password" minLength={8} required value={form.confirmPassword} onChange={update("confirmPassword")} />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? "Creating account…" : "Register"}
            </button>

            <p className={styles.footer}>
              Already have an account? <Link href="/login">Log in</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
