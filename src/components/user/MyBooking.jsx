import React, { useEffect, useState } from "react";
import axios from "axios";
import ReviewModal from "./ReviewModal";
import TicketStatusStepper from "../common/TicketStatusStepper";
import "../../styles/components/MyBooking.css";
import TicketCard from "./TicketCard";

  
function MyBookings() {
  const [tickets, setTickets] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const BASE_URL = "http://localhost:8000/appointment/";

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = () => {
    axios.get(`${BASE_URL}my-tickets/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("access")}` }
    }).then(res => setTickets(res.data));
  };

  const handleConfirm = async (id) => {
    try{
      await axios.post(`${BASE_URL}ticket/${id}/confirm-completion/`, {}, auth());
      alert("✅ Work completion confirmed!");
    }catch(error){
      console.error("Error confirming completion:", error);
      alert("❌ Could not confirm completion");
    }
  
    fetchTickets();
  };

  const handlePay = async (id) => {
    try{
      await axios.post(`${BASE_URL}ticket/${id}/pay/`, {}, auth());
      alert("✅ Payment completed!");
    }catch(error){
      console.error("Error in Payment:", error);
      alert("❌ Could not complete payment");
    }
    fetchTickets();
  };

  const handleReviewOpen = (ticket) => {
    setSelectedTicket(ticket);
    setShowReviewModal(true);
  };

  const submitReview = async (ticketId, rating, comment, refresh) => {
    try {
      await axios.post(`${BASE_URL}ticket/${ticketId}/submit-review/`, {
        rating,
        comment,
      }, auth());
      alert("Review Updated on DB!");
      refresh(); // refresh bookings
    } catch (error) {
      console.error("Review Updated on DB!:", error);
      alert("❌ Could not Update Review on DB!");
    }
  };

  const auth = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("access")}` }
  });

  return (
    <div className="ticket-list">
      <h2>My Bookings</h2>
      {tickets.length === 0 && <p>No bookings found.</p>}
      {tickets.map(ticket => (

        <TicketCard
          key={ticket.id}
          ticket={ticket}
          onConfirm={handleConfirm}
          onPay={handlePay}
          onReview={handleReviewOpen}
        />

      ))}
      ({selectedTicket && showReviewModal && (
          <ReviewModal
            ticketId={selectedTicket.id}
            onClose={() => {
              setShowReviewModal(false);
            }}
            onSubmit={submitReview}
            refresh={fetchTickets}
          />
        )})
    </div>
  );
}

export default MyBookings;