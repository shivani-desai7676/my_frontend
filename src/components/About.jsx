import React from "react";
import "./About.css";

export default function About({ setStep }) {

  const handleClick = (step) => {
    if (setStep) {
      setStep(step);
    }
  };

  return (
    <>
      {/* HEADER */}
      <header className="header">

        <div className="logo">SnapShare</div>

        <nav className="nav">

          <button onClick={() => handleClick("home")}>
            Home
          </button>

          <button onClick={() => handleClick("about")}>
            About
          </button>

          <button className="header-btn" onClick={() => handleClick("dashboard")}>
            Profile
          </button>

          <button className="header-btn" onClick={() => handleClick("register")}>
            Register
          </button>

          <button className="header-btn" onClick={() => handleClick("login")}>
            Login
          </button>

          <button className="header-btn" onClick={() => handleClick("admin-login")}>
            Admin
          </button>

        </nav>

      </header>

      {/* ABOUT CONTENT */}
      <div className="about-container">

        <section className="about-hero">
          <h1>About SnapShare</h1>
          <p>
            SnapShare is a secure file sharing platform that allows users
            to upload files and share them instantly using shareable links.
          </p>
        </section>

        {/* FEATURES */}
        <section className="features">

          <h2>Key Features</h2>

          <div className="feature-grid">

            <div className="feature-card">
              <h3>🚀 Fast Upload</h3>
              <p>Upload files quickly with an easy interface.</p>
            </div>

            <div className="feature-card">
              <h3>🔗 Shareable Links</h3>
              <p>Generate secure links to share files instantly.</p>
            </div>

            <div className="feature-card">
              <h3>📥 Easy Download</h3>
              <p>Anyone with the link can download files easily.</p>
            </div>

            <div className="feature-card">
              <h3>🤖 Chatbot Support</h3>
              <p>Users get help and guidance through chatbot.</p>
            </div>

          </div>

        </section>

      </div>
    </>
  );
}
