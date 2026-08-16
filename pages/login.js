import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/Auth.module.css";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { refresh } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed.");
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
        <title>Login | Sigma Tutorials</title>
      </Head>
      <div className={styles.wrap}>
        <div className={styles.side}>
          <div className={styles.brand}>
            <span className={styles.logoMark}>ST</span>
            Sigma Tutorials
          </div>
          <h1>Welcome back to the CLAT Blueprint.</h1>
          <p>Log in to continue your 1:1 mentorship, mock deconstructions, and score audits.</p>
        </div>

        <div className={styles.formSide}>
          <form className={`card ${styles.card}`} onSubmit={handleSubmit}>
            <h2>Log in</h2>
            <p className={styles.muted}>Welcome back! Please enter your details.</p>

            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" required value={form.email} onChange={update("email")} />
            </div>

            <div className={styles.field}>
              <label htmlFor="password">Password</label>
              <input id="password" type="password" required value={form.password} onChange={update("password")} />
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? "Logging in…" : "Login"}
            </button>

            <p className={styles.footer}>
              Don&apos;t have an account? <Link href="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
