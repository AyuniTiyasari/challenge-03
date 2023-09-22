import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { useState } from "react"; 
import { useNavigate } from "react-router-dom";

const TodoItem = ({ todo, setRefresh }) => {
  const [isChecked, setIsChecked] = useState(todo.complete);
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    fetch("http://localhost:8000/todos/" + todo.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...todo, complete: !isChecked }), // Update status
    }).then(() => {
      console.log("todo updated.");
      setRefresh(true);
    });
  };

  const deleteTodo = () => {
    fetch("http://localhost:8000/todos/" + todo.id, {
      method: "DELETE",
    }).then(() => {
      console.log("todo deleted.");
      setRefresh(true);
    });
  };

  return (
    <div className="todo-item">
      <li className={`${isChecked ? "complete" : ""} form-control`}>
        {todo.task}
        <div className="list-item-list"></div>
        <span>
          <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
          <AiFillEdit className="list-item-icons" onClick={() => navigate(`/editTask/${todo.id}`)}/>
          <AiFillDelete
            className="list-item-icons"
            id="delete"
            onClick={deleteTodo}
          />
        </span>
      </li>
    </div>
  );
};

export default TodoItem;
