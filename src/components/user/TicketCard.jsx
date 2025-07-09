import React, { useState } from "react";
import "../../styles/components/MyBooking.css";
import TicketStatusStepper from "../common/TicketStatusStepper";


export default function TicketCard({ ticket, onConfirm, onPay, onReview }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded(!expanded);

  return (
    <div className="ticket-card">
      <div className="ticket-summary" onClick={toggleExpand}>
        <h4>{ticket.description}</h4>
        <span className={`status-badge ${ticket.status}`}>
          {ticket.status.toUpperCase()}
        </span>
      </div>

      {expanded && (
        <div className="ticket-details">
            <div className="ticket-status-container" key={ticket.user_id}>
                <div className="ticket-status-stepper" key={ticket.id}>
                    <TicketStatusStepper currentStatus={ticket.status} />
                </div>

                <p><strong>Worker:</strong> {ticket.worker}</p>
                <p><strong>Scheduled:</strong> {ticket.scheduled_date}</p>
                <p><strong>Created:</strong> {ticket.created_at}</p>
                <p><strong>Updated:</strong> {ticket.updated_at}</p>
            </div>
          {/* Conditional Actions */}
          {ticket.status === "awaiting_user_confirmation" && (
            <button className="apply-btn" onClick={() => onConfirm(ticket.id)}>Confirm Work ✅</button>
          )}
          {ticket.status === "completed" && (
            <button className="apply-btn" onClick={() => onPay(ticket.id)}>Pay Now 💸</button>
          )}
          {ticket.status === "paid" && (
            <button className="apply-btn" onClick={() => {
              onReview(ticket)
            }}>Leave Review ✍️</button>
          )}
        </div>
      )}
    </div>
  );
}
