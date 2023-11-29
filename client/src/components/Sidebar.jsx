import React from 'react';
import NotebookList from './NotebookList';
import NoteList from './NoteList';

function Sidebar({onSelectNotebook, onSelectNote, selectedNotebook}) {
  return (
    <aside>
      <NotebookList onSelectNotebook={onSelectNotebook}/>
      <NoteList selectedNotebook={selectedNotebook} onSelectNote={onSelectNote}/>
    </aside>
  );
}

export default Sidebar;
