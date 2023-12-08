import React, { useState, useEffect }from 'react';
import NoteItem from './NoteItem';
import { getNotesByCategory, createNote, deleteNote } from '../api'

function NoteList({selectedNotebook, onSelectNote, selectedNote}) {
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
    

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm('Эта заметка будет удалена безвозвратно. Действительно хотите ее удалить?')) return;
    try {
      await deleteNote(noteId);
      setNotes(notes.filter(note => note.id !== noteId));
    } catch (error) {
      console.error('Не удалось удалить заметку:', error);
    }
  };


  return (
    <div className='note_list'>
      <h3 style={{marginTop: '-0.25rem'}}>Заметки</h3>
      <p className='editor_hint' style={{width: '93%', fontSize: '0.8rem', marginBottom: '3rem', marginTop: '-1rem'}}>Выберите или создайте новую заметку</p>
      <button onClick={() => setShowInput(true)} style={{width: '93%', height: '2rem'}}>Добавить</button>
      {showInput && (
        <form onSubmit={handleCreateNote}>
          <input 
            type="text" 
            value={newNoteTitle} 
            onChange={(event) => setNewNoteTitle(event.target.value)} 
            placeholder="Название заметки"
            style={{width: '93%'}}
          />
          <button type="submit" style={{width: '93%', height: '2rem' }}>Создать</button>
        </form>
      )}
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} onSelect={onSelectNote} onDelete={handleDeleteNote} isSelected={selectedNote && note.id === selectedNote.id}/>
      ))}
    </div>
  );
}

export default NoteList;
