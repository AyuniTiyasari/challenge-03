import { useState } from "react";

const Header = ({ setRefresh }) => {
  const [task, setTask] = useState("");

  // fungsi untuk menambah data todo melalui API ketika tombol "Add" di klik
  const addTodo = () => {
    const newTodo = { task, complete: false };

    fetch("http://localhost:8000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    }).then(() => {
      // ketika sukses menambah data, reset form dengan mengeset state title menjadi empty string
      setTask("");
      setRefresh(true);
      setTimeout(() => {
        alert("new todo added.");
      }, 500);
    });
  };

  return (
    <>
      <div className="header">
        <div className="todo-input">
          <h3>Todo List</h3>
          <form className="form-group">
            <input
              type="text"
              placeholder="Input/Edit Todo"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              style={{ height: "30px", width: "500px" }}
            />
            <button onClick={addTodo} style={{ height: "30px" }}>
              ADD
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Header;
