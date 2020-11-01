import React, { useState, useEffect } from "react";
import firebase from "../../firebase";

import '../../App.css';

function TodoList() {
  const [todolist, setTodolist] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [currentTodoValue, setCurrentTodoValue] = useState('');

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

    firebase.firestore().collection("todolist").where("todo", "==", doc.todo).get()
      .then(querySnapshot => {
        querySnapshot.docs[0].ref.delete();
      }).catch((error) => console.log('error deleting the document', error));
  }

  const handleEdit = () => {
    setIsEditable(true)
    console.log(currentTodoValue);

  };

  const handleSave = (doc) => {
    firebase.firestore()
      .collection('todolist')
      .where("todo", "==", doc.todo)
      .get().then(
        snapshot => snapshot.docs[0].ref.update({ todo: currentTodoValue })
      ).catch((error) => console.log('error updating the document', error));

    setCurrentTodoValue(null);
    setIsEditable(false);
  }

  const renderList = () => {
    return (
      <ul className='list-item'>
        {todolist.map((i, index) => <li key={index}>
          {isEditable ? <><textarea defaultValue={i.todo} onChange={(e) => setCurrentTodoValue(e.target.value)} />
            <button onClick={() => handleSave(i)}>save</button> </> :
            <>
              {i.todo}
              <button className='delete-button' onClick={() => handleDelete(i)}>x</button>
              <button className='edit-button' onClick={handleEdit}>edit</button></>}
        </li>)}
      </ul>
    )
  }

  return renderList();

}

export default TodoList;