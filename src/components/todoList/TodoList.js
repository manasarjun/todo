import React, { useState, useEffect } from "react";
import firebase from "../../firebase";

import '../../App.css';

function TodoList() {
  const [todolist, setTodolist] = useState(['hello']);
  useEffect(() => {
    firebase
      .firestore()
      .collection('todolist')
      .onSnapshot((snapshot) => {
        const newList = snapshot.docs.map(doc => doc.data())
        setTodolist(newList);
      })

  }, []);

  function handleDelete(doc) {
    //console.log(todo.todo);
    /* firebase.firestore().collection('todolist').doc('todo.todo').delete().then(function () {
      console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    }); */

    firebase.firestore().collection("todolist").where("todo", "==", doc.todo).get()
      .then(querySnapshot => {
        querySnapshot.docs[0].ref.delete();
      });
  }

  return (
    <>
      <ul className='list-item'>
        {todolist.map((i, index) => <li key={index}>
          {i.todo}
          <button className='delete-button' onClick={() => handleDelete(i)}>x</button>
        </li>)}
      </ul>
    </>
  )
}

export default TodoList;