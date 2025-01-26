// Dashboard.jsx
import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import TaskBoard from "../components/TaskBoard";
import Feed from "../components/Feed";
import API from "../api";
import ListTask from "../components/listTask";

const PENDING = "Pending";
const COMPLETED = "Completed";
const DONE = "Done";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePage, setActivePage] = useState("dashboard");
  const [refreshKey, setRefreshKey] = useState(0);

  const token = localStorage.getItem("token");

  const fetchTasks = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    try {
      const response = await API.get("/task/list", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const fetchedTasks = response.data.tasks || [];
      const formattedTasks = fetchedTasks.map((task) => ({
        ...task,
        _id: String(task._id),
        status: task.status || PENDING,
      }));

      setTasks(formattedTasks);
      setError(null);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError(err.message || "Failed to fetch tasks");
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const handleNavChange = (page) => {
    setActivePage(page);
    if (page === "dashboard") {
      fetchTasks();
      setRefreshKey((prevKey) => prevKey + 1);
    }
  };

  useEffect(() => {
    fetchTasks();
    return () => {
      setTasks([]);
      setLoading(true);
    };
  }, [fetchTasks, refreshKey]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading tasks...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-3" role="alert">
        Error: {error.message || "Failed to load tasks."}
      </div>
    );
  }

  const pendingCount = tasks.filter((task) => task.status === PENDING).length;
  const completedCount = tasks.filter(
    (task) => task.status === COMPLETED
  ).length;
  const doneCount = tasks.filter((task) => task.status === DONE).length;
  const totalCount = tasks.length;

  return (
    <div>
      <Navbar onNavChange={handleNavChange} activePage={activePage} />

      <div className="p-4">
        {activePage === "dashboard" && (
          <div key={refreshKey}>
            <h3 className="text-2xl font-bold">Dashboard</h3>
            <div>
              <p>Welcome, </p>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="card gradient-card-total shadow-lg p-4 text-center">
                  <i className="bi bi-list-task pb-3"></i>
                  <h5>Total Tasks</h5>
                  <p className="count-size pt-3">{totalCount}</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card gradient-card-pending shadow-lg p-4 text-center">
                  <i className="bi bi-hourglass pb-3"></i>
                  <h5>Pending Tasks</h5>
                  <p className="count-size pt-3">{pendingCount}</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card gradient-card-completed shadow-lg p-4 text-center">
                  <i className="bi bi-calendar pb-3"></i>
                  <h5>Completed Tasks</h5>
                  <p className="count-size pt-3">{completedCount}</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card gradient-card-done shadow-lg p-4 text-center">
                  <i className="bi bi-check2-square pb-3"></i>
                  <h5>Done Tasks</h5>
                  <p className="count-size pt-3">{doneCount}</p>
                </div>
              </div>
            </div>
            <div className="pt-5">
              <h3 className="mb-4">My Tasks</h3>
              <ListTask />
            </div>
          </div>
        )}

        {activePage === "tasks" && (
          <TaskBoard
            tasks={tasks}
            setTasks={setTasks}
            token={token}
            onTasksChange={fetchTasks}
          />
        )}
        {activePage === "feed" && <Feed />}
      </div>
    </div>
  );
};

export default Dashboard;
