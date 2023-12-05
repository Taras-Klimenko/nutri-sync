import React, { useState } from 'react';
import MyButton from '../components/MyButton/MyButton'
import Sidebar from '../components/Sidebar';
import Editor from '../components/Editor';
import {Link} from 'react-router-dom'
import './Knowledge.css'

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
    <div className="knowledge">
      <Link to="/dashboard"><MyButton>На главную</MyButton></Link>
      <Sidebar onSelectNotebook={setSelectedNotebook} onSelectNote={handleSelectNote} selectedNotebook={selectedNotebook} />
        <Editor note={selectedNote} onNoteUpdate={handleNoteUpdate}/>
      </div>
  );
}

export default Knowledge;
