import React, { useEffect, useState, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import "../assets/css/styles.css";
import API from "../api";
import AddTasks from "./AddTasks";

const PENDING = "Pending";
const COMPLETED = "Completed";
const DONE = "Done";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const removeTask = async (id) => {
    const previousTasks = [...tasks];
    setTasks(tasks.filter((task) => task._id !== id));

    try {
      const response = await API.post(
        "/task/remove",
        { id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.data.success) {
        setTasks(previousTasks);
        alert("Failed to delete task. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting task:", error);

      setTasks(previousTasks);
      alert("Error deleting task. Please try again.");
    }
  };

  const handleDeleteClick = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmDelete) {
      removeTask(id);
    }
  };

  const handleDragEnd = useCallback(
    async (result) => {
      const { destination, source, draggableId } = result;

      if (!destination) return;

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      const updatedTasks = [...tasks];
      const taskToUpdate = updatedTasks.find(
        (task) => task._id === draggableId
      );

      if (!taskToUpdate) return;

      const previousStatus = taskToUpdate.status;
      taskToUpdate.status = destination.droppableId;

      setTasks(updatedTasks);

      try {
        const response = await API.post(
          "task/updateStatus",
          {
            id: draggableId,
            status: destination.droppableId,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.data.success) {
          taskToUpdate.status = previousStatus;
          setTasks([...updatedTasks]);
        }
      } catch (error) {
        console.error("Error updating task status:", error);

        taskToUpdate.status = previousStatus;
        setTasks([...updatedTasks]);
      }
    },
    [tasks, token]
  );

  useEffect(() => {
    fetchTasks();
    return () => {
      setTasks([]);
      setLoading(true);
    };
  }, [fetchTasks]);

  if (loading && !tasks) {
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

  return (
    <div className="task-board">
      <div className="d-flex justify-content-between align-items-center p-3 bg-light">
        <h1 className="h3">Task Board</h1>
        <button className="btn btn-danger" onClick={() => setShowModal(true)}>
          Create New
        </button>
      </div>

      {showModal && (
        <AddTasks
          showModal={showModal}
          setShowModal={setShowModal}
          token={token}
          onTaskAdded={fetchTasks}
        />
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="row p-3">
          {[PENDING, COMPLETED, DONE].map((status) => {
            const filteredTasks =
              tasks.filter((task) => task?.status === status) || [];

            return (
              <div className="col-md-4" key={status}>
                <div className="bg-light p-3 rounded h-100">
                  <h3 className="d-flex justify-content-between align-items-center mb-3">
                    {status}
                    <span className="badge bg-secondary">
                      {filteredTasks.length}
                    </span>
                  </h3>
                  <Droppable droppableId={status}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`task-column ${
                          snapshot.isDraggingOver ? "dragging-over" : ""
                        }`}
                      >
                        {filteredTasks.map((task, index) => (
                          <Draggable
                            key={task._id}
                            draggableId={String(task._id)}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  ...provided.draggableProps.style,
                                  opacity: snapshot.isDragging ? 0.5 : 1,
                                  marginBottom: "8px",
                                }}
                              >
                                <TaskCard
                                  task={task}
                                  onDelete={handleDeleteClick}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;
