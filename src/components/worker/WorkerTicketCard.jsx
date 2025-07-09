import React, { useState } from "react";
import "../../styles/components/MyBooking.css";
import TicketStatusStepper from "../common/TicketStatusStepper";


export default function WorkerTicketCard({ ticket, onWorkDone, reqAction}) {
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
            <div className="ticket-status-container" key={ticket.id}>
                <div className="ticket-status-stepper" >
                    <TicketStatusStepper currentStatus={ticket.status} />
                </div>
                <p><strong>Scheduled:</strong> {ticket.scheduled_date}</p>
                <p><strong>Created:</strong> {ticket.created_at}</p>
            </div>
    
            {ticket.status === "requested" && (
              <div className="status-buttons">
                <button onClick={() => reqAction(ticket.id, "accept")}>✅ Accept</button>
                <button onClick={() => reqAction(ticket.id, "reject")}>❌ Reject</button>
              </div>
            )}
            <p>Status: {ticket.status}</p>
              {ticket.status === "accepted" && (
                <button onClick={() => onWorkDone(ticket.id)} className="apply-btn">
                  Mark Work as Done 🔧
                </button>
              )}
              {ticket.status === "paid" && (
                <p>💬 Waiting for user review</p>
              )}
              {ticket.status === "reviewed" && (
                <p>✅ Ticket Completed</p>
              )}
        </div>
      )}
    </div>
  );
}
