import React from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {

  const navigate = useNavigate();

  const userEmail = localStorage.getItem("email");

  return (
    <div className="profile-container">

      {/* Small Back Button */}
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back
      </button>

      <h2>User Profile</h2>

      <div className="profile-card">
        <p><strong>Email:</strong> {userEmail}</p>
      </div>

    </div>
  );
}
