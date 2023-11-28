import React from 'react';
import NotebookItem from './NotebookItem';

function NotebookList({onSelectNotebook}) {
  // This will eventually be loaded from the server
  const notebooks = [
    { id: 1, name: 'Notebook 1' },
    { id: 2, name: 'Notebook 2' },
  ];

  return (
    <div>
      <h2>Notebooks</h2>
      {notebooks.map((notebook) => (
        <NotebookItem key={notebook.id} notebook={notebook} onSelect={onSelectNotebook}/>
      ))}
    </div>
  );
}

export default NotebookList;
