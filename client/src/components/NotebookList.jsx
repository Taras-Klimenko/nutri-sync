import React, {useEffect, useState} from 'react';
import NotebookItem from './NotebookItem';
import { getCategories, createNotebook, deleteNotebook } from '../api'

function NotebookList({onSelectNotebook}) {

 const [notebooks, setNotebooks] = useState([]);
 const[newNotebookName, setNewNotebookName] = useState('')
 const [showInput, setShowInput] = useState(false);

 useEffect(() => {
  getCategories().then(setNotebooks).catch(error => {
    console.error('Failed to fetch categories:', error);
    
  });
}, []);

const handleCreateNotebook = async(event) => {
  event.preventDefault();
  if(newNotebookName) {
    try {
      const newNotebook = await createNotebook({name: newNotebookName});
      setNotebooks([...notebooks, newNotebook]);
      setNewNotebookName('');
      setShowInput(false);
      
    } catch (error) {
      console.error('Failed to create notebook:', error);
    }
  }
}

const handleDeleteNotebook = async (notebookId) => {
  try {
    await deleteNotebook(notebookId);
    setNotebooks(notebooks.filter(notebook => notebook.id !== notebookId))
    
  } catch (error) {
    console.error('Failed to delete notebook:', error);
  }
}



  return (
    <div>
      <h2>Рубрики</h2>
      <button onClick={() => setShowInput(true)}>Добавить</button>
      {showInput && (
        <form onSubmit={handleCreateNotebook}>
          <input 
            type="text"
            value={newNotebookName}
            onChange={(event) => setNewNotebookName(event.target.value)}
            placeholder="Название новой рубрики"
          />
          <button type="submit">Создать</button>
        </form>
      )}
      {notebooks.map((notebook) => (
        <NotebookItem key={notebook.id} notebook={notebook} onSelect={onSelectNotebook} onDelete={handleDeleteNotebook}/>
      ))}
    </div>
  );
}

export default NotebookList;
