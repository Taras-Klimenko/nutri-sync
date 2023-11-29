import React from 'react';

function NoteItem({ note, onSelect, onDelete }) {
  return (
    <div className="noteItem" >
      <span onClick={()=>{onSelect(note)}}>{note.title}</span>
      <button onClick={() => {onDelete(note.id)}}>X</button>
    </div>
  );
}

export default NoteItem;
