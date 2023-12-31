import React, {useEffect, useState} from 'react';
import NotebookItem from './NotebookItem';
import { getCategories, createNotebook, deleteNotebook } from '../api'

function NotebookList({onSelectNotebook, selectedNotebook}) {

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
      console.error('Не удалось создать категорию:', error);
    }
  }
}

const handleDeleteNotebook = async (notebookId) => {
  if (!window.confirm('Эта категория будет удалена безвозвратно со всеми принадлежащими ей заметками. Действительно хотите ее удалить?')) return;
  try {
    await deleteNotebook(notebookId);
    setNotebooks(notebooks.filter(notebook => notebook.id !== notebookId))
    
  } catch (error) {
    console.error('Не удалось удалить категорию:', error);
  }
}



  return (
    <div className='notebook_list'>
      <h3 style={{marginTop: '-0.25rem'}}>Категории</h3>
      <p className='editor_hint' style={{width: '93%', fontSize: '0.8rem', marginBottom: '3rem', marginTop: '-1rem'}}>Выберите или создайте категорию для заметок</p>
      <button onClick={() => setShowInput(true)} style={{ backgroundColor:'#4caf50', color:'white', border:'none', width: '93%', height: '2rem'}}>Добавить</button>
      {showInput && (
        <form onSubmit={handleCreateNotebook}>
          <input 
            type="text"
            value={newNotebookName}
            onChange={(event) => setNewNotebookName(event.target.value)}
            placeholder="Название категории"
            style={{width: '93%'}}
          />
          <button type="submit" style={{backgroundColor:'#4caf50', color:'white', border:'none', width: '93%', height: '2rem'}}>Создать</button>
        </form>
      )}
      {notebooks.map((notebook) => (
        <NotebookItem key={notebook.id} notebook={notebook} onSelect={onSelectNotebook} onDelete={handleDeleteNotebook} isSelected={selectedNotebook && notebook.id === selectedNotebook.id}/>
      ))}
    </div>
  );
}

export default NotebookList;
