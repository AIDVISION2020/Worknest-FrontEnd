import React, { useEffect, useState } from 'react';
import { getWorkerHistory } from '../../api/services/adminAPI';
import '../../styles/components/WorkerRequest.css'; // Adjust the path as necessary


function WorkerHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await getWorkerHistory();
        setHistory(res.data);
      } catch (err) {
        console.error('Failed to fetch worker history:', err);
      }
    }
    fetchHistory();
  }, []);

  return (
    <div>
      <h2>Worker Approval History</h2>
      {history.map((worker) => (
        <div key={worker.id} className="worker-approval-card">
          <div className="worker-header">{worker.username}</div>
          <div className="worker-sub">({worker.email})</div>
          <div className="worker-bio">{worker.bio || "No bio available."}</div>
          <div className={`status-badge ${worker.approval_status === 'approved' ? 'status-approved' : 'status-rejected'}`}>
            {worker.approval_status === 'approved' ? '✔️ Approved' : '❌ Rejected'}
          </div>
        </div>
      ))}
    </div>
  );
}

export default WorkerHistory;
