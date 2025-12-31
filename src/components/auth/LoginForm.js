"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "@/styles/login.css";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [notification, setNotification] = useState({
    show: false,
    type: "success",
    message: "",
  });

  useEffect(() => {
    // already logged in → dashboard
    const isLoggedIn = localStorage.getItem("admin_login");
    if (isLoggedIn) {
      router.push("/dashboard");
      return;
    }

    const timer = setTimeout(() => setLoading(false), 800);

    const remembered = localStorage.getItem("rememberMe") === "true";
    if (remembered) {
      setRememberMe(true);
      setEmail(localStorage.getItem("email") || "");
    }

    return () => clearTimeout(timer);
  }, [router]);

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  //  fake auth (replace with real API later)
  const fakeAuth = async (email, password) => {
    await new Promise((res) => setTimeout(res, 1200));
    return email === "demo@demo.com" && password === "admin";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showNotification("error", "Please fill in all fields");
      return;
    }

    setSubmitting(true);

    const success = await fakeAuth(email, password);

    if (!success) {
      showNotification("error", "Invalid email or password");
      setSubmitting(false);
      return;
    }

    showNotification("success", "Login successful");

    /* 🔐 AUTH STATE */
    localStorage.setItem("admin_login", "true");

    if (rememberMe) {
      document.cookie = "admin_login=true; path=/; max-age=604800";
    } else {
      document.cookie = "admin_login=true; path=/";
    }

    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("email");
    }

    setTimeout(() => router.push("/dashboard"), 1200);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="auth-container">
        <div className="auth-card animate-bounceIn">
          <div className="auth-logo animate-wave">
            <i className="fas fa-bolt"></i>
          </div>

          <h1 className="auth-title">Admin Login</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="demo@demo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-check">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>

            <button
              type="submit"
              className="btn btn-block"
              disabled={submitting}
            >
              {submitting ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>

      {notification.show && (
        <div className={`notification ${notification.type} show`}>
          <i
            className={`fas ${
              notification.type === "success"
                ? "fa-check-circle"
                : notification.type === "error"
                ? "fa-exclamation-circle"
                : "fa-info-circle"
            }`}
          ></i>

          <div className="notification-content">
            <div className="notification-title">
              {notification.type.toUpperCase()}
            </div>
            <div className="notification-message">{notification.message}</div>
          </div>

          <button
            className="notification-close"
            onClick={() =>
              setNotification((prev) => ({ ...prev, show: false }))
            }
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}
    </>
  );
}
