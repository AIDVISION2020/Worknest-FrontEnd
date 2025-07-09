import React from "react";
import "../../styles/components/TicketStatusStepper.css";

const STATUS_STEPS = [
  "requested",
  "accepted",
  "in_progress",
  "work_done",
  "work_confirmed",
  "paid",
  "reviewed",
];

const stepLabels = {
  requested: "Requested",
  accepted: "Accepted",
  in_progress: "In Progress",
  work_done: "Work Done",
  work_confirmed: "Work Confirmed",
  paid: "Paid",
  reviewed: "Reviewed",
};

const TicketStatusStepper = ({ currentStatus }) => {
  const currentIndex = STATUS_STEPS.indexOf(currentStatus);
  const progress = currentIndex / (STATUS_STEPS.length - 1);
  document.documentElement.style.setProperty('--progress', progress);

    React.useEffect(() => {
  const progress = STATUS_STEPS.indexOf(currentStatus) / (STATUS_STEPS.length - 1);
  document.documentElement.style.setProperty('--progress', progress);
}, [currentStatus]);

  return (
    <div className="stepper-wrapper">
      {STATUS_STEPS.map((step, index) => (
        <div className={`stepper-item ${index <= currentIndex ? "active" : ""}`} key={step}>
          <div className="step-circle">{index + 1}</div>
          <div className="step-title">{stepLabels[step]}</div>
        </div>
      ))}
    </div>
  );
};

export default TicketStatusStepper;
