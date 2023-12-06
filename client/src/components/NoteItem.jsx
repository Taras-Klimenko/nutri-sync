import React from 'react';

function NoteItem({ note, onSelect, onDelete, isSelected }) {
  const itemClass = isSelected ? "noteItem active" : "noteItem";
  return (
    <div className={itemClass} >
      <span onClick={()=>{onSelect(note)}}>{note.title}</span>
      <button onClick={() => {onDelete(note.id)}}>X</button>
    </div>
  );
}

export default NoteItem;
