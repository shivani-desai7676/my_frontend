import { useState } from "react";
import axios from "axios";
import API_URL from "../config";
export default function Login({ onNext }) {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSendOtp = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        `${API_URL}/api/auth/login`,
        { email }
      );

      setMessage("OTP sent to your email 📧");

      // move to OTP page
      setTimeout(() => {
        onNext(email);
      }, 1000);

    } catch (err) {

      setMessage("Failed to send OTP ❌");

    }

  };

  return (

    <div className="auth-container">

      <h2>Login</h2>

      <form onSubmit={handleSendOtp}>

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">
          Send OTP
        </button>

      </form>

      <p>{message}</p>

    </div>

  );

}
