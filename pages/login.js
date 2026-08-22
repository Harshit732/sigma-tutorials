import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/Auth.module.css";
import { useAuth } from "@/context/AuthContext";

const GOOGLE_ERROR_MESSAGES = {
  google: "Google sign-in failed. Please try again.",
  pending: "Your registration is still pending admin approval. Please check back soon.",
};

export default function Login() {
  const router = useRouter();
  const { refresh } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    const code = router.query.error;
    if (code && GOOGLE_ERROR_MESSAGES[code]) {
      setError(GOOGLE_ERROR_MESSAGES[code]);
    }
  }, [router.isReady, router.query.error]);

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

            <div className={styles.divider}>or</div>

            <a href="/api/auth/google" className={styles.googleBtn}>
              <GoogleIcon />
              Continue with Google
            </a>

            <p className={styles.footer}>
              Don&apos;t have an account? <Link href="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.81.54-1.85.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.96v2.33A9 9 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.03z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.97L3.95 7.3C4.66 5.17 6.65 3.58 9 3.58z" />
    </svg>
  );
}
