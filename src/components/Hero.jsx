import "./Hero.css";
import heroImg from "../assets/body.png";
import { useEffect, useState } from "react";
import FeedbackModal from "./FeedbackModal"; // ⭐ feedback popup

export default function Hero({ children, goToLogin, goToRegister, goToAdmin, setStep }) {

  const [loggedIn, setLoggedIn] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false); // ⭐ popup control

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setLoggedIn(true);
  }, []);

  const openProfile = () => {
    setStep("dashboard");
  };

  return (
    <>
      {/* HEADER */}
      <header className="header">

        <div className="logo">SnapShare</div>

        <nav className="nav">

          <button
            className="nav-link"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Home
          </button>

          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("about").scrollIntoView({ behavior: "smooth" });
            }}
          >
            About
          </a>

          {loggedIn ? (
            <button className="header-btn" onClick={openProfile}>
              Profile
            </button>
          ) : (
            <button className="header-btn" onClick={goToLogin}>
              Login
            </button>
          )}

          <button className="header-btn" onClick={goToRegister}>
            Register
          </button>

          <button className="header-btn" onClick={goToAdmin}>
            Admin
          </button>

        </nav>

      </header>


      {/* HERO SECTION */}
      <section className="hero">

        <div className="hero-card">

          <div className="hero-left">

            <h1>Sharing <br /> Files</h1>

            <p>Fast and secure file sharing platform.</p>

            <button className="btn" onClick={goToRegister}>
              Get Started
            </button>

            {/* ⭐ FEEDBACK BUTTON */}
            <button
              className="btn"
              style={{ marginLeft: "10px", background: "#22c55e" }}
              onClick={() => setShowFeedback(true)}
            >
              Feedback
            </button>

            <div style={{ marginTop: "20px" }}>
              {children}
            </div>

          </div>

          <div className="hero-right">
            <img src={heroImg} alt="Sharing Files" />
          </div>

        </div>

      </section>


      {/* ABOUT SECTION */}
      <section id="about" className="about">

        <div className="about-container">

          <h2 className="about-title">About SnapShare</h2>

          <p className="about-desc">
            SnapShare is a modern and secure file sharing platform designed to
            make file transfers fast and simple. Users can upload files, generate
            shareable links, and share them instantly with anyone. Our platform
            focuses on speed, simplicity, and security.
          </p>

          <div className="features">

            <div className="feature-card">
              <div className="icon">🚀</div>
              <h3>Fast Upload</h3>
              <p>Upload files quickly with a smooth and easy interface.</p>
            </div>

            <div className="feature-card">
              <div className="icon">🔗</div>
              <h3>Shareable Links</h3>
              <p>Generate unique links to share files with anyone instantly.</p>
            </div>

            <div className="feature-card">
              <div className="icon">📥</div>
              <h3>Easy Download</h3>
              <p>Anyone with the link can download files without hassle.</p>
            </div>

            <div className="feature-card">
              <div className="icon">🤖</div>
              <h3>Chatbot Support</h3>
              <p>Users can get instant help through our smart chatbot assistant.</p>
            </div>

          </div>

        </div>

      </section>


      {showFeedback && <FeedbackModal closeModal={() => setShowFeedback(false)} />}


    </>
  );
}
