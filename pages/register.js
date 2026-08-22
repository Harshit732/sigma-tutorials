import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/Auth.module.css";

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
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [googlePending, setGooglePending] = useState(null);
  const [checkingGoogle, setCheckingGoogle] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;
    if (router.query.google !== "1") {
      setCheckingGoogle(false);
      return;
    }
    fetch("/api/auth/google-pending")
      .then((res) => res.json())
      .then((data) => {
        if (data.pending) {
          setGooglePending(data.pending);
          setForm((f) => ({ ...f, firstName: data.pending.firstName, lastName: data.pending.lastName, email: data.pending.email }));
        } else {
          setError("Your Google sign-in session expired. Please try continuing with Google again.");
        }
      })
      .finally(() => setCheckingGoogle(false));
  }, [router.isReady, router.query.google]);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function updatePhone(e) {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm((f) => ({ ...f, phone: digits }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!googlePending && form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.phone.length !== 10) {
      setError("Enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);
    try {
      const endpoint = googlePending ? "/api/auth/register-google" : "/api/auth/register";
      const body = googlePending
        ? { firstName: form.firstName, lastName: form.lastName, phone: `+91${form.phone}`, dob: form.dob }
        : { ...form, phone: `+91${form.phone}` };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed.");
        return;
      }

      setSubmitted(true);
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
            Create an account to track your mentorship program, mock
            schematics, and score progress in one place.
          </p>
        </div>

        <div className={styles.formSide}>
          {checkingGoogle ? (
            <div className={`card ${styles.card}`}>
              <p className={styles.muted}>Loading…</p>
            </div>
          ) : submitted ? (
            <div className={`card ${styles.card}`}>
              <h2>Registration submitted</h2>
              <p className={styles.muted}>
                Thanks, {form.firstName}! Your account is pending admin
                approval. {googlePending
                  ? "You'll be able to sign in with Google once it's approved."
                  : "You'll be able to sign in with the password you set once it's approved."}
              </p>
              <Link href="/login" className="btn btn-primary btn-block">
                Go to Login
              </Link>
            </div>
          ) : (
          <form className={`card ${styles.card}`} onSubmit={handleSubmit}>
            <h2>Create your account</h2>
            <p className={styles.muted}>
              {googlePending ? "Just a couple more details to finish signing up." : "It only takes a minute."}
            </p>

            {error && <div className={styles.error}>{error}</div>}

            {!googlePending && (
              <>
                <a href="/api/auth/google" className={styles.googleBtn}>
                  <GoogleIcon />
                  Continue with Google
                </a>
                <div className={styles.divider}>or</div>
              </>
            )}

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
              {googlePending ? (
                <p className={styles.readOnlyField}>{form.email}</p>
              ) : (
                <input id="email" type="email" required value={form.email} onChange={update("email")} />
              )}
            </div>

            <div className={styles.row2}>
              <div className={styles.field}>
                <label htmlFor="phone">Phone Number</label>
                <div className={styles.phoneRow}>
                  <span className={styles.countryCode}>+91</span>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    placeholder="10-digit number"
                    maxLength={10}
                    required
                    value={form.phone}
                    onChange={updatePhone}
                  />
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="dob">Date of Birth</label>
                <input id="dob" type="date" required value={form.dob} onChange={update("dob")} />
              </div>
            </div>

            {!googlePending && (
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
            )}

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? "Creating account…" : "Register"}
            </button>

            <p className={styles.footer}>
              Already have an account? <Link href="/login">Log in</Link>
            </p>
          </form>
          )}
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
