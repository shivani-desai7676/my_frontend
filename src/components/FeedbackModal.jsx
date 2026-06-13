import { useState } from "react";
import "./FeedbackModal.css";
import API_URL from "../config";

export default function FeedbackModal({ closeModal }) {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const userId = localStorage.getItem("userId"); // get logged-in user id

  const submitFeedback = async () => {
    if (!rating) {
      alert("Please select a rating!");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/feedback/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, rating, message })
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);

        // auto close after 5 seconds
        setTimeout(() => closeModal(), 5000);
      } else {
        alert(data.message || "Error submitting feedback");
      }

    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="feedback-overlay">
      <div className="feedback-box">
        {!submitted ? (
          <>
            <h3>Give Your Feedback</h3>
            <div className="stars">
              {[1,2,3,4,5].map(star => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  className={star <= rating ? "active" : ""}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              placeholder="Write your feedback..."
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <button onClick={submitFeedback}>Submit Feedback</button>
            <button className="close-btn" onClick={closeModal}>Cancel</button>
          </>
        ) : (
          <div className="thankyou">
            <h3>✅ Thank You!</h3>
            <p>Your feedback has been submitted.</p>
            <p>This window will close automatically...</p>
          </div>
        )}
      </div>
    </div>
  );
}
