import React, { useRef } from "react";
import TodoList from "../todoList/TodoList";
import firebase from '../../firebase';

function TodoForm() {
  const textRef = useRef(null);
  const handleOnClick = (e) => {
    e.preventDefault();
    const todo = textRef.current.value;
    firebase.firestore()
      .collection('todolist')
      .add({ todo: todo })
      .then(() => { textRef.current.value = '' })
  }

  return (
    <>
      <span className='form'>
        <input className='text-input' placeholder='add todo...' ref={textRef} />
        <button className='add-button' onClick={handleOnClick}>Add</button>
      </span>
      <TodoList />

    </>
  )
}

export default TodoForm;