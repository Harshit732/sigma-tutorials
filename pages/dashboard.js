import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import styles from "@/styles/Dashboard.module.css";

const MAX_DIMENSION = 480;

function resizeImageToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > MAX_DIMENSION) {
          height = Math.round((height * MAX_DIMENSION) / width);
          width = MAX_DIMENSION;
        } else if (height > MAX_DIMENSION) {
          width = Math.round((width * MAX_DIMENSION) / height);
          height = MAX_DIMENSION;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

export default function Dashboard() {
  const { user, loading, refresh } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError("");
    setUploading(true);
    try {
      const dataUrl = await resizeImageToDataUrl(file);
      const res = await fetch("/api/user/profile-picture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: dataUrl }),
      });
      const data = await res.json();
      if (!res.ok) {
        setUploadError(data.error || "Upload failed.");
        return;
      }
      await refresh();
    } catch {
      setUploadError("Couldn't process that image. Please try another.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

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
          <div className={styles.avatarRow}>
            <div className={styles.avatarWrap}>
              {user.profilePicture ? (
                <img src={user.profilePicture} alt="Your profile" className={styles.avatarImg} />
              ) : (
                <span className={styles.avatarPlaceholder}>
                  {user.firstName?.charAt(0)}
                  {user.lastName?.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? "Uploading…" : "Change Photo"}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className={styles.hiddenInput}
              />
              {uploadError && <p className={styles.uploadError}>{uploadError}</p>}
            </div>
          </div>

          <Row label="First Name" value={user.firstName} />
          <Row label="Last Name" value={user.lastName} />
          <Row label="Email" value={user.email} />
          <Row label="Phone Number" value={user.phone} />
          <Row label="Date of Birth" value={dob} />
        </div>

        {user.feedback && (
          <div className={`card ${styles.feedbackCard}`}>
            <h2 className={styles.feedbackHeading}>Feedback from Your Mentor</h2>
            <p>{user.feedback}</p>
          </div>
        )}
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
