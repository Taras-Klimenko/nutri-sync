import React, {useState} from 'react';

import Sidebar from '../components/Sidebar';
import Editor from '../components/Editor';
import Header from '../components/Header';

function Knowledge() {
  const [selectedNotebook, setSelectedNotebook] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
 
  const handleNoteUpdate = (updatedNote) => {
    setSelectedNote(updatedNote); // Update the selected note with the updated data
  };
  const handleSelectNote = (note) => {
    setSelectedNote(note);
  };


  return (
    <div className="knowledge">
      <Header />
      <div className="content">
      <Sidebar onSelectNotebook={setSelectedNotebook} onSelectNote={handleSelectNote} selectedNotebook={selectedNotebook} />
        <Editor note={selectedNote} onNoteUpdate={handleNoteUpdate}/>
      </div>
    </div>
  );
}

export default Knowledge;