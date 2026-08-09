import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import styles from "@/styles/Dashboard.module.css";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className={styles.center}>
        <p>Loading…</p>
      </div>
    );
  }

  const dob = new Date(user.dob).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Head>
        <title>Dashboard | Sigma Tutorials</title>
      </Head>
      <Navbar />
      <main className="container section">
        <h1>Welcome, {user.firstName}!</h1>
        <p className={styles.muted}>Here&apos;s the information on your account.</p>

        <div className={`card ${styles.infoCard}`}>
          <Row label="First Name" value={user.firstName} />
          <Row label="Last Name" value={user.lastName} />
          <Row label="Email" value={user.email} />
          <Row label="Phone Number" value={user.phone} />
          <Row label="Date of Birth" value={dob} />
        </div>
      </main>
    </>
  );
}

function Row({ label, value }) {
  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}</span>
      <span>{value}</span>
    </div>
  );
}
