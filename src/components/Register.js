import { useState } from "react";
import axios from "axios";
import API_URL from "../config";
export default function Register({ setEmail, setStep }) {
  const [name, setName] = useState("");
  const [email, setLocalEmail] = useState("");

  const handleSubmit = async () => {
    await axios.post("${API_URL}/api/auth/send-otp", {
      name,
      email
    });

    setEmail(email);
    setStep("verify");
  };

  return (
    <>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Email" onChange={e => setLocalEmail(e.target.value)} />
      <button onClick={handleSubmit}>Send OTP</button>

       {/* LOGIN LINK */}
      <p style={{ marginTop: "10px" }}>
        Already registered?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => setStep("login")}
        >
          Login
        </span>
      </p>
    </>
  );
}
