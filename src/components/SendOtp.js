import { useState } from "react";
import axios from "axios";
import "../styles/auth.css";
import API_URL from "../config";
function SendOtp({ onNext, goToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendOtp = async (e) => {
    e.preventDefault();

    try {
       await axios.post(
        `${API_URL}/api/auth/send-otp`,
        {
          name,
          email
        }
      );

      setMessage("OTP sent to your email 📩");

      onNext(email);

    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <div className="auth-container">

      <div className="brand">SnapShare</div>

      <h2 className="auth-title">Create account</h2>

      <p className="auth-subtitle">
        Enter your details to continue
      </p>

      <form className="auth-form" onSubmit={sendOtp}>

        <input
          placeholder="Full name"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Send OTP</button>

      </form>

      {/* MESSAGE */}
      {message && (
        <p className="auth-message">{message}</p>
      )}

      {/* LOGIN LINK */}
<p>
  Already registered?{" "}
  <span
    style={{ color: "#4f46e5", cursor: "pointer", fontWeight: "600" }}
    onClick={goToLogin}
  >
    Login
  </span>
</p>


    </div>
  );
}

export default SendOtp;
