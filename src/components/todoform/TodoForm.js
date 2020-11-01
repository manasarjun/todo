import React, { useRef } from "react";
import TodoList from "../todoList/TodoList";
import firebase from '../../firebase';

function TodoForm() {
  const textRef = useRef(null);
  const handleOnClick = (e) => {
    e.preventDefault();
    const todo = textRef.current.value;
    todo && firebase.firestore()
      .collection('todolist')
      .add({ todo: todo })
      .then(() => { textRef.current.value = '' })
  }

  return (
    <>
      <span className='container'>
        <form onSubmit={handleOnClick}>
          <input className='text-input' placeholder='add todo...' ref={textRef} />
          <button className='add-button' onClick={handleOnClick}>Add</button>
        </form>
        <TodoList />
      </span>
    </>
  )
}

export default TodoForm;