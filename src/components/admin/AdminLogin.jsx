
import { useState } from "react";
import API_URL from "../../config";
export default function AdminLogin({ onNext }) {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const sendOtp = async () => {

    if (!email) {
      setMessage("Please enter your email");
      return;
    }

    setLoading(true);
    setMessage("");

    try {

      const res = await fetch(`${API_URL}/api/admin/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {

        setMessage("OTP Sent Successfully");

       
        setTimeout(() => {
          onNext(email);
        }, 1500);

      } else {

        setMessage(data.message || "Failed to send OTP");

      }

    } catch (error) {

      console.error("Error sending OTP:", error);
      setMessage("Something went wrong. Please try again.");

    } finally {

      setLoading(false);

    }

  };

  return (
    <div style={{ padding: "30px" }}>

      <h2>Admin Login</h2>

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
        type="email"
        placeholder="Enter Admin Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <button onClick={sendOtp} disabled={loading}>
        {loading ? "Sending..." : "Send OTP"}
      </button>

    </div>
  );
}

