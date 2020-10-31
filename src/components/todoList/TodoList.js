import React, { useState, useEffect } from "react";
import firebase from "../../firebase";

function TodoList() {
  const [todolist, setTodolist] = useState(['hello']);
  useEffect(() => {
    firebase
      .firestore()
      .collection('todolist')
      .onSnapshot((snapshot) => {
        const newList = snapshot.docs.map(doc => doc.data())
        setTodolist(newList)
      })

  }, []);


  return (
    <>
      {todolist.map(i => i.todo)}
    </>
  )
}

export default TodoList;