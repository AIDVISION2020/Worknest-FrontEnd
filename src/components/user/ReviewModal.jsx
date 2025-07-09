import React, { useState } from "react";
import axios from "axios";

export default function ReviewModal({ ticketId, onClose, onSubmit, refresh }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post(`http://localhost:8000/appointment/ticket/${ticketId}/submit-review/`, {
        rating,
        comment,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`
        }
      });
      alert("✅ Review submitted!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("❌ Could not submit review");
    }
  };

  return (
    <div className="filter-modal-backdrop">
      <div className="filter-modal">
        <h3>Rate This Worker</h3>
        <input
          type="number"
          max={5}
          min={1}
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <textarea
          placeholder="Write a review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="filter-button-group">
          <button className="apply-btn" onClick={() => {onSubmit(ticketId, rating, comment, refresh)}}>Submit Review</button>
          <button className="reset-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
