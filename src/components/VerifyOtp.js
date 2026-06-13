import { useState } from "react";
import axios from "axios";
import API_URL from "../config";

export default function VerifyOtp({ email, onVerified }) {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/verify-otp`, {
        email,
        otp,
        password
      });

      setMessage(res.data.message); // show message instead of alert

      setTimeout(() => {
        onVerified(); // move to login
      }, 1500);

    } catch (error) {
      setMessage("Invalid OTP ❌");
    }
  };

  return (
    <>
      <h2>Verify OTP</h2>

      <input
        placeholder="OTP"
        onChange={e => setOtp(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleVerify}>Verify</button>

      {message && (
        <p style={{ color: "green", marginTop: "10px" }}>
          {message}
        </p>
      )}
    </>
  );
}
