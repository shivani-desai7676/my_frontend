import { useState } from "react";
import axios from "axios";
import API_URL from "../config";
export default function LoginOtp({ email, onVerified }) {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const verifyOtp = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/api/auth/verify-login-otp`,
        {
          email,
          otp
        }
      );

      // ✅ GET DATA FROM BACKEND
      const { token, userId } = res.data;

      // 🔥 IMPORTANT FIX (THIS WAS MISSING)
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      localStorage.setItem("userId", userId);

      // ✅ Continue
      onVerified(token);

    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Error verifying OTP");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Enter OTP sent to {email}</h2>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button onClick={verifyOtp}>Verify OTP</button>

      {message && <p style={{ color: "red" }}>{message}</p>}
    </div>
  );
}