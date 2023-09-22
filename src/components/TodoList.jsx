import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ isRefresh, setRefresh }) => {
  const [todos, setTodos] = useState([]);
  const [records, setRecords] = useState(todos);

  useEffect(() => {
    // memanggil API untuk mengambil data todos
    if (isRefresh) {
      fetch("http://localhost:8000/todos")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setRefresh(false);
          // ketika Rest API sukses, simpan data dari response ke dalam state lokal
          setTodos(data);
          setRecords(data);
        })
        .catch((err) => {
          setRefresh(false);
          if (err.name === "AbortError") {
            console.log("fetch aborted.");
          }
        });
    }
  }, [isRefresh, setRefresh]);

  const Filter = (event) => {
    setRecords(
      todos.filter((f) => f.task.toLowerCase().includes(event.target.value))
    );
  };

  const [filter, setFilter] = useState("all");
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <>
    <div className="todo-container">
      <div className="todo-search">
        <form>
          <input type="text" placeholder="Search Todo" onChange={Filter} className="input-search" />
        </form>
      </div>
      <div className="filter-todo">
        <button className="btn btn-secondary" onClick={() => handleFilterChange("all")}>
          All
        </button>
        <button className="btn btn-secondary" onClick={() => handleFilterChange("completed")}>
          Completed
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => handleFilterChange("incomplete")}
        >
          Todo
        </button>
      </div>
      </div>

      <ul id="todo-list">
        {records
          .filter((todo) => {
            if (filter === "completed" && !todo.complete) return false;
            if (filter === "incomplete" && todo.complete) return false;
            return true;
          })
          .map((todo) => (
            <TodoItem todo={todo} key={todo.id} setRefresh={setRefresh} />
          ))}
      </ul>
      
    </>
  );
};

export default TodoList;
