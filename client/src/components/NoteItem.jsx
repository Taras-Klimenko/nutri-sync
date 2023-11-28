import React from 'react';

function NoteItem({ note }) {
  return (
    <div className="noteItem">
      {note.title}
    </div>
  );
}

export default NoteItem;
