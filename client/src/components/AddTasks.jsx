import React, { useState } from "react";
import API from "../api";

const PENDING = "Pending";

const AddTasks = ({ showModal, setShowModal, token, onTaskAdded }) => {
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    startDate: "",
    dueDate: "",
    status: PENDING,
  });

  const [errors, setErrors] = useState({
    name: false,
    description: false,
    startDate: false,
    dueDate: false,
  });

  const addTask = async () => {
    const newErrors = {
      name: !newTask.name.trim(),
      description: !newTask.description.trim(),
      startDate: !newTask.startDate,
      dueDate: !newTask.dueDate,
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    try {
      const response = await API.post("/task/add", newTask, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setShowModal(false);
        setNewTask({
          name: "",
          description: "",
          startDate: new Date().toISOString().split("T")[0],
          dueDate: "",
          status: PENDING,
        });
        setErrors({
          name: false,
          description: false,
          startDate: false,
          dueDate: false,
        });
        onTaskAdded();
      }
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task. Please try again.");
    }
  };

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create New Task</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Task Name *</label>
              <input
                type="text"
                className={`form-control ${errors.name ? "border-danger" : ""}`}
                value={newTask.name}
                onChange={(e) =>
                  setNewTask({ ...newTask, name: e.target.value })
                }
                required
              />
              {errors.name && <small className="text-danger">Required</small>}
            </div>
            <div className="mb-3">
              <label className="form-label">Description *</label>
              <textarea
                className={`form-control ${
                  errors.description ? "border-danger" : ""
                }`}
                value={newTask.description}
                required
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                rows="3"
              ></textarea>
              {errors.description && (
                <small className="text-danger">Required</small>
              )}
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Start Date *</label>
                <input
                  type="date"
                  className={`form-control ${
                    errors.startDate ? "border-danger" : ""
                  }`}
                  required
                  value={newTask.startDate}
                  onChange={(e) =>
                    setNewTask({ ...newTask, startDate: e.target.value })
                  }
                />
                {errors.startDate && (
                  <small className="text-danger">Required</small>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Due Date *</label>
                <input
                  type="date"
                  className={`form-control ${
                    errors.dueDate ? "border-danger" : ""
                  }`}
                  value={newTask.dueDate}
                  onChange={(e) =>
                    setNewTask({ ...newTask, dueDate: e.target.value })
                  }
                  min={newTask.startDate}
                  required
                />
                {errors.dueDate && (
                  <small className="text-danger">Required</small>
                )}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button type="button" className="btn btn-danger" onClick={addTask}>
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTasks;
