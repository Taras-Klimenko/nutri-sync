import React from 'react';

function NotebookItem({ notebook, onSelect, onDelete }) {
  return (
    <div className="notebookItem">
      <span onClick={() => {onSelect(notebook)}}>{notebook.name}</span>
      <button onClick={() => {onDelete(notebook.id)}}>X</button>
    </div>
  );
}

export default NotebookItem;
