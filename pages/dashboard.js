import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import PackageTracker from "@/components/PackageTracker";
import OmrUpload from "@/components/OmrUpload";
import MockChecklist from "@/components/MockChecklist";
import { useAuth } from "@/context/AuthContext";
import { resizeImageToDataUrl } from "@/lib/imageCompression";
import styles from "@/styles/Dashboard.module.css";

export default function Dashboard() {
  const { user, loading, refresh } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const [view, setView] = useState("overview"); // "overview" | "upload" | "checklist"
  const [activeMock, setActiveMock] = useState(null);

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

  function handleSelectMock(mockNumber) {
    const mock = user.mocks.find((m) => m.number === mockNumber);
    if (!mock) return;
    setActiveMock(mockNumber);
    setView(mock.status === "pending" ? "upload" : "checklist");
  }

  function backToOverview() {
    setView("overview");
    setActiveMock(null);
  }

  if (loading || !user) {
    return (
      <div className={styles.center}>
        <p>Loading…</p>
      </div>
    );
  }

  if (view === "upload") {
    return (
      <OmrUpload
        mockNumber={activeMock}
        refresh={refresh}
        onUploaded={() => setView("checklist")}
        onCancel={backToOverview}
      />
    );
  }

  if (view === "checklist") {
    return (
      <MockChecklist mockNumber={activeMock} refresh={refresh} onDone={backToOverview} onCancel={backToOverview} />
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

        <PackageTracker user={user} onSelectMock={handleSelectMock} />

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
