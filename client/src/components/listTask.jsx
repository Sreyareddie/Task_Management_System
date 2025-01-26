import React, { useEffect, useState } from "react";
import API from "../api";

const ListTask = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.get("/task/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        const sortedTasks = response.data.tasks.sort((a, b) => {
          if (a.status === "Pending" && b.status !== "Pending") return -1;
          if (a.status !== "Pending" && b.status === "Pending") return 1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        });
        setTasks(sortedTasks);
      }
    } catch (error) {
      console.error("Error occurred while fetching tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-CA");
  };

  const currentDate = new Date();

  return (
    <div className="container mt-4">
      <div className="table-responsive">
        <table className="table table-hover table-bordered">
          <thead className="table-danger">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Start Date</th>
              <th scope="col">Due Date</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No tasks found
                </td>
              </tr>
            ) : (
              tasks.map((task, index) => {
                const isOverdue =
                  new Date(task.dueDate) < currentDate &&
                  task.status === "Pending";
                const daysRemaining = Math.ceil(
                  (new Date(task.dueDate) - currentDate) / (1000 * 60 * 60 * 24)
                );

                return (
                  <tr key={index}>
                    <td>{task.name}</td>
                    <td>{task.description}</td>
                    <td>{formatDate(task.startDate)}</td>
                    <td>
                      <div className={isOverdue ? "text-danger fw-bold" : ""}>
                        {formatDate(task.dueDate)}
                      </div>
                      {task.status === "Pending" && (
                        <small
                          className={`d-block ${
                            isOverdue ? "text-danger" : "text-muted"
                          }`}
                        >
                          {isOverdue
                            ? `Overdue by ${Math.abs(daysRemaining)} days`
                            : `${daysRemaining} days remaining`}
                        </small>
                      )}
                    </td>
                    <td>
                      <span
                        className={`badge rounded-pill ${
                          task.status === "Pending"
                            ? "bg-warning text-light"
                            : task.status === "Completed"
                            ? "bg-success"
                            : "bg-info"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListTask;
