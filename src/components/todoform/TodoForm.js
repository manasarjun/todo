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
      <textarea onChange={(e) => { setTodo(e.target.value) }} />
      <button onClick={handleOnClick}>Add</button>
      <TodoList />
    </>
  )
}

export default TodoForm;