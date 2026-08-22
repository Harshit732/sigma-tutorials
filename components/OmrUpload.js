import { useRef, useState } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import { resizeImageToDataUrl } from "@/lib/imageCompression";
import styles from "@/styles/OmrUpload.module.css";

export default function OmrUpload({ mockNumber, refresh, onUploaded, onCancel }) {
  const fileInputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file) {
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const dataUrl = await resizeImageToDataUrl(file);
      const res = await fetch("/api/user/omr-upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mockNumber, image: dataUrl }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Upload failed.");
        return;
      }
      setDone(true);
      await refresh();
      setTimeout(onUploaded, 700);
    } catch {
      setError("Couldn't process that image. Please try another.");
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  }

  return (
    <>
      <Head>
        <title>Upload OMR — Mock {mockNumber} | Sigma Tutorials</title>
      </Head>
      <Navbar />
      <main className="container section">
        <button type="button" className={styles.backLink} onClick={onCancel}>
          ← Back to dashboard
        </button>
        <h1>Upload OMR — Mock {mockNumber}</h1>
        <p className={styles.muted}>Upload a clear photo of your completed answer sheet to continue.</p>

        {error && <div className={styles.error}>{error}</div>}

        <div
          className={`${styles.dropZone} ${dragging ? styles.dragging : ""} ${done ? styles.done : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => !uploading && !done && fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
        >
          {done ? (
            <>
              <span className={styles.checkmark}>✓</span>
              <p>Uploaded! Moving to the diagnostic checklist…</p>
            </>
          ) : uploading ? (
            <p>Uploading…</p>
          ) : (
            <>
              <p className={styles.dropTitle}>Drag &amp; drop your OMR photo here</p>
              <p className={styles.muted}>or click to browse</p>
            </>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className={styles.hiddenInput}
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </div>
      </main>
    </>
  );
}
