import React, { useEffect, useState } from 'react';
import { getPendingWorkers, updateWorkerStatus } from '../../api/services/adminAPI';
import '../../styles/components/WorkerRequest.css'; // Adjust the path as necessary


function PendingWorkers() {
  const [workers, setWorkers] = useState([]);

  const fetchWorkers = async () => {
    try {
      const res = await getPendingWorkers();
      setWorkers(res.data);
    } catch (err) {
      console.error('Failed to fetch pending workers:', err);
    }
  };

  const handleAction = async (id, actionType) => {
    try {
      const action = actionType === "accept" ? "approve" : "reject";
      const reason = action === "reject" ? prompt("Enter rejection reason") : null;
      console.log("Sending to backend:", {
        id,
        action,
        reason,
        token: localStorage.getItem("access"),
      });
      await updateWorkerStatus(id, action, reason);
      fetchWorkers(); // refresh list
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  return (
    <div>
      <h2>Pending Worker Requests</h2>
      {workers.map((worker) => (
        <div className="worker-approval-card" key={worker.id} >
          <div className="worker-header">{worker.username}</div>
          <div className="worker-sub">({worker.email})</div>
          <div className="worker-bio">
            <strong>Document:</strong>{" "}
            {worker.verification_document ? (
              <a
                href={`http://localhost:8000${worker.verification_document}`}
                target="_blank"
                rel="noopener noreferrer"
                className="doc-link"
              >
                View Document
              </a>
            ) : (
              "Not uploaded"
            )}
          </div>
          <div className="worker-bio">{worker.bio || "No bio provided."}</div>
          <div className="action-btns">
            <button className="approve-btn" onClick={() => handleAction(worker.id, 'accept')}>
              ✅ Approve
            </button>
            <button className="reject-btn" onClick={() => handleAction(worker.id, 'reject')}>
              ❌ Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PendingWorkers;
