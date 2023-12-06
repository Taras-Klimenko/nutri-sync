import React from 'react';
import NotebookList from './NotebookList';
import NoteList from './NoteList';

function Sidebar({onSelectNotebook, onSelectNote, selectedNotebook, selectedNote}) {
  return (
    <aside>
      <NotebookList onSelectNotebook={onSelectNotebook} selectedNotebook={selectedNotebook}/>
      <div className='divider'></div>
      <NoteList selectedNotebook={selectedNotebook} onSelectNote={onSelectNote} selectedNote={selectedNote}/>
      <div className='divider'></div>
    </aside>
  );
}

export default Sidebar;
