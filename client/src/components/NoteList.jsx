import React, { useState, useEffect }from 'react';
import NoteItem from './NoteItem';
import { getNotesByCategory, createNote, deleteNote } from '../api'

function NoteList({selectedNotebook, onSelectNote}) {
  const [notes, setNotes] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');

  useEffect(() => {
    if (selectedNotebook) {
      getNotesByCategory(selectedNotebook.id).then(setNotes);
    }
  }, [selectedNotebook, onSelectNote]);

  const handleCreateNote = async (event) => {
    event.preventDefault();
    if (selectedNotebook && newNoteTitle) {
      try {
        const newNote = await createNote(selectedNotebook.id, { title: newNoteTitle });
        setNotes([...notes, newNote]);
        setNewNoteTitle('');
        setShowInput(false);
      } catch (error) {
        console.error('Не удалось создать заметку:', error);
      }
    }
  };
    
  if (!selectedNotebook) {
    return <div>Выберите категорию для создания заметки</div>;
  }

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId);
      setNotes(notes.filter(note => note.id !== noteId));
    } catch (error) {
      console.error('Не удалось удалить заметку:', error);
    }
  };


  return (
    <div>
      <h2>Заметки</h2>
      <button onClick={() => setShowInput(true)}>Добавить</button>
      {showInput && (
        <form onSubmit={handleCreateNote}>
          <input 
            type="text" 
            value={newNoteTitle} 
            onChange={(event) => setNewNoteTitle(event.target.value)} 
            placeholder="Название заметки"
          />
          <button type="submit">Создать</button>
        </form>
      )}
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} onSelect={onSelectNote} onDelete={handleDeleteNote}/>
      ))}
    </div>
  );
}

export default NoteList;
