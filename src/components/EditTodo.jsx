import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditTodo() {
  const { id } = useParams();
  const [task, setTask] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/todos/" + id)
      .then((response) => response.json())
      .then((data) => {
        setTask(data.task);
      })
      .catch((error) => {
        console.error("Failed to fetch todo:", error);
      });
  }, [id]);

  const handleSaveEdit = () => {
    fetch("http://localhost:8000/todos/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: task }),
    })
      .then(() => {
        console.log("Todo updated.");
      })
      .catch((error) => {
        console.error("Failed to edit task:", error);
      });
  };

  return (
    <div className="card w-50 mb-3">
      <div className="card-body">
        <h5 className="card-title">EDIT TODO</h5>
        <div className="card-text">
          <form className="form-group">
            <input
              type="text"
              placeholder="Input/Edit Todo"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              style={{ height: "30px", width: "500px" }}
            />
            <button onClick={handleSaveEdit} style={{ height: "30px" }}>
              SAVE
            </button>
          </form>
        </div>
        <button className="btn btn-secondary" onClick={() => navigateTo("/")}>
          back
        </button>
      </div>
    </div>
  );
}
