import React from 'react';

function NotebookItem({ notebook, onSelect, onDelete, isSelected }) {
  const itemClass = isSelected ? "notebookItem active" : "notebookItem";
  return (
    <div className={itemClass}>
      <span onClick={() => {onSelect(notebook)}}>{notebook.name}</span>
      <button onClick={() => {onDelete(notebook.id)}}>X</button>
    </div>
  );
}

export default NotebookItem;
