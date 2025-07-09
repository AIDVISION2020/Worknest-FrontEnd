import React, { useEffect, useState } from "react";
import axios from "axios";
import TicketStatusStepper from "../common/TicketStatusStepper";
import WorkerTicketCard from "./WorkerTicketCard";


function WorkerTickets() {
  const [tickets, setTickets] = useState([]);

  const fetchWorkerTickets = () => {
    axios.get("http://localhost:8000/appointment/worker/tickets/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`
      }
    }).then(res => setTickets(res.data));
  }
  
  useEffect(() => {
    fetchWorkerTickets();
  }, []);

  const handleAction = async (ticketId, action) => {
    await axios.post(`http://localhost:8000/appointment/worker/ticket/${ticketId}/${action}/`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem("access")}` }
    });
    alert(action+"ed");
    //setTickets(t => t.filter(ticket => ticket.id !== ticketId));
  };

  const handleWorkDone = async (ticketId) => {
    try {
      await axios.post(`http://localhost:8000/appointment/ticket/${ticketId}/complete-work/`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      alert("✅ Work marked as done!");
      fetchWorkerTickets(); // refresh ticket list
    } catch (error) {
      console.error("Error marking work done:", error);
    }
  };

  return (
    <div className="ticket-list">
          <h2>My Bookings</h2>
          {tickets.length === 0 && <p>No bookings found.</p>}
          {tickets.map(ticket => (
    
            <WorkerTicketCard
              key={ticket.id}
              ticket={ticket}
              reqAction={handleAction}
              onWorkDone={handleWorkDone}
            />
    
          ))}
    </div>
  );
}

export default WorkerTickets;
