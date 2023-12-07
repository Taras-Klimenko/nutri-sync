import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Editor from '../components/Editor';


function Knowledge() {
  const [selectedNotebook, setSelectedNotebook] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);

  const handleNoteUpdate = (updatedNote) => {
    setSelectedNote(updatedNote);
  };
  const handleSelectNote = (note) => {
    setSelectedNote(note);
  };

  return (
    <div className='knowledge_container'>
      <Sidebar onSelectNotebook={setSelectedNotebook} onSelectNote={handleSelectNote} selectedNotebook={selectedNotebook} selectedNote={selectedNote}/>
        <Editor note={selectedNote} onNoteUpdate={handleNoteUpdate}/>
      </div>
  );
}

export default Knowledge;
