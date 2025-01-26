import React from "react";
import "../assets/css/styles.css";
const TaskCard = ({ task, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Completed":
        return "success";
      case "Done":
        return "info";
      default:
        return "secondary";
    }
  };

  return (
    <div className="card mb-2 task-card">
      <div className="card-body">
        <h5 className="card-title">{task.name}</h5>
        <p className="card-text">{task.description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span className={`badge bg-${getStatusColor(task.status)} me-2`}>
              {task.status}
            </span>
            <br />
            {task.dueDate && (
              <small className="text-muted">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </small>
            )}
          </div>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task._id);
            }}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
