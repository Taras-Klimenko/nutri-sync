import React from 'react';
import NotebookList from './NotebookList';
import NoteList from './NoteList';

function Sidebar({onSelectNotebook, selectedNotebook}) {
  return (
    <aside>
      <NotebookList onSelectNotebook={onSelectNotebook}/>
      <NoteList selectedNotebook={selectedNotebook}/>
    </aside>
  );
}

export default Sidebar;
