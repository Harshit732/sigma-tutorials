import Link from "next/link";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import styles from "@/styles/Navbar.module.css";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#programs", label: "Programs" },
  { href: "#methodology", label: "Methodology" },
  { href: "#advantage", label: "Advantage" },
  { href: "#admissions", label: "Admissions" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, setUser } = useAuth();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setOpen(false);
    window.location.href = "/";
  }

  const authButtons = user ? (
    <>
      <Link href="/dashboard" className="btn btn-outline" onClick={() => setOpen(false)}>
        {user.firstName}
      </Link>
      <button className="btn btn-primary" onClick={handleLogout}>
        Logout
      </button>
    </>
  ) : (
    <>
      <Link href="/login" className="btn btn-outline" onClick={() => setOpen(false)}>
        Login
      </Link>
      <Link href="/register" className="btn btn-primary" onClick={() => setOpen(false)}>
        Register
      </Link>
    </>
  );

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand}>
          <span className={styles.logoMark}>ST</span>
          <span>
            Sigma Tutorials
            <small>The CLAT Blueprint</small>
          </span>
        </Link>

        <nav className={`${styles.nav} ${open ? styles.navOpen : ""}`}>
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <div className={styles.mobileAuth}>{authButtons}</div>
        </nav>

        <div className={styles.actions}>
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            title="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <div className={styles.desktopAuth}>{authButtons}</div>

          <button
            className={styles.burger}
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
