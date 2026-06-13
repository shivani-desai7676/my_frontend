
import { useState } from "react";
import API_URL from "../../config";
export default function AdminOtp({ email, onVerified }) {

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const verifyOtp = async () => {

    setMessage("");

    try {

      const res = await fetch(`${API_URL}/api/admin/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          otp
        })
      });

      const data = await res.json();

      if (data.success) {

        localStorage.setItem("admin", email);

        setMessage("Login successful");

        setTimeout(() => {
          onVerified();
        }, 1000);

      } else {

        setMessage("Invalid OTP");

      }

    } catch (error) {

      console.error(error);
      setMessage("Verification failed");

    }

  };

  return (
    <div style={{ padding: "30px" }}>

      <h2>Enter OTP</h2>

      {/* Message */}
      {message && (
        <div
          style={{
            background: "#e0f2fe",
            color: "#0369a1",
            padding: "10px",
            borderRadius: "6px",
            marginBottom: "15px"
          }}
        >
          {message}
        </div>
      )}

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <br /><br />

      <button onClick={verifyOtp}>
        Verify OTP
      </button>

    </div>
  );
}

