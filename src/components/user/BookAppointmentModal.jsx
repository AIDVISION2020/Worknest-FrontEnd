import React, { useState } from "react";
import axios from "axios";

export default function BookAppointmentModal({ workerId, onClose }) {
  const [description, setDescription] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");

  const handleSubmit = async () => {
    try {
      console.log("Booking appointment for worker:", workerId);
      console.log("Description:", description); 
      console.log("Scheduled Date:", scheduledDate);
      const response = await axios.post(
        "http://localhost:8000/appointment/book-appointment/",
        {
          worker: workerId,
          description,
          scheduled_date: scheduledDate,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      alert("Appointment request sent ✅");
      onClose(); // close modal
    } catch (err) {
      console.error(err);
      alert("Booking failed ❌");
    }
  };

  return (
    <div className="filter-modal-backdrop">
      <div className="filter-modal">
        <h3>Book Appointment</h3>
        <textarea
          placeholder="Describe your issue..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={scheduledDate}
          onChange={(e) => setScheduledDate(e.target.value)}
        />
        <div className="filter-button-group">
          <button className="apply-btn" onClick={handleSubmit}>Send Request</button>
          <button className="reset-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
