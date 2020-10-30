import React, { useState, useRef } from "react";
import TodoList from "../todoList/TodoList";

function TodoForm() {
  const [todo, setTodo] = useState('');
  const inputText = useRef('');
  const handleOnClick = () => {
    setTodo(inputText.current.value);
    console.log(todo);
  }
  return (
    <>
      <textarea ref={inputText} />
      <button onClick={handleOnClick}>Add</button>
      <TodoList todo={todo} />
    </>
  )
}

export default TodoForm;