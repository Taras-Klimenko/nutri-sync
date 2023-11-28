import React from 'react';

function NotebookItem({ notebook, onSelect }) {
  return (
    <div className="notebookItem" onClick={() => {onSelect(notebook)}}>
      {notebook.name}
    </div>
  );
}

export default NotebookItem;
