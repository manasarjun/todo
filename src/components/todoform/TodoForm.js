import React, { useState } from "react";
import TodoList from "../todoList/TodoList";
import firebase from '../../firebase';

function TodoForm() {
  const [todo, setTodo] = useState('');
  const handleOnClick = (e) => {
    e.preventDefault();
    firebase.firestore().collection('todolist').add(
      {
        todo: todo
      },
    ).then(
      setTodo(''),
    )


  }
  return (
    <>
      <span className='form'>
        <textarea placeholder='add todo...' cols='50' rows='3' onChange={(e) => { setTodo(e.target.value) }} />
        <button className='add-button' onClick={handleOnClick}>Add</button>
      </span>
      <TodoList />

    </>
  )
}

export default TodoForm;