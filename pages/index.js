import { useEffect, useState } from "react";
import Todo from "../components/Todo";
import {
  IconCheck,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
} from "@tabler/icons";

export default function Home() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [isFirst, setIsFirst] = useState(true);
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed === true).length;
  const incompletedTodos = totalTodos - completedTodos;

  useEffect(() => {
    loadTodo();
  }, []);

  useEffect(() => {
    if (isFirst) {
      setIsFirst(false);
      return;
    }
    saveTodo();
  }, [todos]);

  const addTodo = () => {
    setTodos([{ title: input, completed: false }, ...todos]);
    setInput("");
  };

  const deleteTodo = (idx) => {
    todos.splice(idx, 1);
    setTodos([...todos]);
  };

  const markTodo = (idx) => {
    todos[idx].completed = !todos[idx].completed;
    setTodos([...todos]);
  };

  const moveUp = (idx) => {
    if (idx !== 0) {
      const temp = todos[idx - 1];
      todos[idx - 1] = todos[idx];
      todos[idx] = temp;
      setTodos([...todos]);
    }
  };

  const moveDown = (idx) => {
    if (idx !== todos.length - 1) {
      const temp = todos[idx + 1];
      todos[idx + 1] = todos[idx];
      todos[idx] = temp;
      setTodos([...todos]);
    }
  };

  const saveTodo = () => {
    localStorage.setItem("TodoList", JSON.stringify(todos));
  };

  const loadTodo = () => {
    const todosJSON = localStorage.getItem("TodoList");
    setTodos(JSON.parse(todosJSON));
  };

  return (
    <div>
      {/* Entire App container (required for centering) */}
      <div style={{ maxWidth: "700px" }} className="mx-auto">
        {/* App header */}
        <p className="display-4 text-center fst-italic m-4">
          Minimal Todo List <span className="fst-normal">☑️</span>
        </p>
        {/* Input */}
        <input
          className="form-control mb-1 fs-4"
          placeholder="insert todo here..."
          onKeyUp={(event) => {
            if (event.key != "Enter") {
              return;
            }
            if (input === "") {
              alert("Todo cannot be empty");
              return;
            }
            addTodo();
          }}
          onChange={(event) => {
            setInput(event.target.value);
          }}
          value={input}
        />
        {/* Todos */}
        {todos.map((todo, i) => (
          <Todo
            title={todo.title}
            completed={todo.completed}
            key={i}
            onMark={() => {
              markTodo(i);
            }}
            onDelete={() => {
              deleteTodo(i);
            }}
            onMoveUp={() => {
              moveUp(i);
            }}
            onMoveDown={() => {
              moveDown(i);
            }}
          />
        ))}

        {/* Example 1 */}
        {/* <div className="border-bottom p-1 py-2 fs-2 d-flex gap-2">
          <span className="me-auto">Todo</span>
        </div> */}
        {/* Example 2 */}
        {/* <div className="border-bottom p-1 py-2 fs-2 d-flex gap-2">
          <span className="me-auto">Todo with buttons</span>

          <button className="btn btn-success">
            <IconCheck />
          </button>
          <button className="btn btn-secondary">
            <IconArrowUp />
          </button>
          <button className="btn btn-secondary">
            <IconArrowDown />
          </button>
          <button className="btn btn-danger">
            <IconTrash />
          </button>
        </div> */}

        {/* summary section */}
        <p className="text-center fs-4">
          <span className="text-primary">All ({totalTodos}) </span>
          <span className="text-warning">Pending ({incompletedTodos}) </span>
          <span className="text-success">Completed ({completedTodos})</span>
        </p>

        {/* Made by section */}
        <p className="text-center mt-3 text-muted fst-italic">
          made by Chayanin Suatap 12345679
        </p>
      </div>
    </div>
  );
}
