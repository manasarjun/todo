import React, { useState, useEffect } from "react";
import firebase from "../../firebase";

import '../../App.css';

function TodoList() {
  const [todolist, setTodolist] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [currentTodoValue, setCurrentTodoValue] = useState('');
  const [currentIndex, setCurrentIndex] = useState(null);

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

  const handleEdit = (index) => {
    setIsEditable(true);
    setCurrentIndex(index);
    console.log(currentTodoValue);

  };

  const handleSave = (doc) => {
    currentTodoValue && firebase.firestore()
      .collection('todolist')
      .where("todo", "==", doc.todo)
      .get().then(
        snapshot => snapshot.docs[0].ref.update({ todo: currentTodoValue })
      ).catch((error) => console.log('error updating the document', error));

    setCurrentTodoValue(null);
    setCurrentIndex(null);
    setIsEditable(false);
  }

  const renderList = () => {
    return (
      <ul className='list-container'>
        {todolist.map((i, index) => <li key={index}>
          {index === currentIndex && isEditable ? <><textarea defaultValue={i.todo} onChange={(e) => setCurrentTodoValue(e.target.value)} />
            <button onClick={() => handleSave(i)}>save</button> </> :
            <>
              {i.todo}
              <button className='edit-button' onClick={() => handleEdit(index)}>edit</button>
              <button className='delete-button' onClick={() => handleDelete(i)}>x</button></>}
        </li>)}
      </ul>
    )
  }

  return renderList();

}

export default TodoList;