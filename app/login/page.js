"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!username) {
      alert("Enter username");
      return;
    }

    const token = btoa(username);
    localStorage.setItem("token", token);
    router.push("/dashboard");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* Logo / Icon */}
        <div style={styles.iconWrapper}>
          <span style={styles.icon}>💸</span>
        </div>

        <h1 style={styles.title}>Welcome back</h1>
        <p style={styles.subtitle}>Sign in to your expense tracker</p>

        <input
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />

        <button style={styles.button} onClick={handleLogin}>
          Sign In →
        </button>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f0f4ff 0%, #fafaff 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Georgia', serif",
  },
  card: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "48px 40px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
  },
  iconWrapper: {
    background: "#f0f4ff",
    borderRadius: "50%",
    width: "64px",
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "4px",
  },
  icon: {
    fontSize: "28px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#1a1a2e",
    margin: 0,
  },
  subtitle: {
    fontSize: "14px",
    color: "#888",
    margin: "0 0 8px 0",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1.5px solid #e0e0e0",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
    color: "#1a1a2e",
    transition: "border 0.2s",
  },
  button: {
    width: "100%",
    padding: "13px",
    background: "#3b5bdb",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "4px",
    letterSpacing: "0.3px",
  },
};