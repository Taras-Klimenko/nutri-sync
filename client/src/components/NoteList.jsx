import React from 'react';
import NoteItem from './NoteItem';

function NoteList({selectedNotebook}) {
  // This will eventually be loaded from the server
  const notes = [
    { id: 1, title: 'Note 1', text: 'Note 1 text', categoryId: 1 },
    { id: 2, title: 'Note 2', text: 'Note 2 text', categoryId: 2},
    { id: 3, title: 'Note 3', text: 'Note 3 text', categoryId: 1}
  ];

  const filteredNotes = selectedNotebook ? notes.filter(note => note.categoryId === selectedNotebook.id) : [];

  return (
    <div>
      <h2>Notes</h2>
      {filteredNotes.map((note) => (
        <NoteItem key={note.id} note={note}/>
      ))}
    </div>
  );
}

export default NoteList;
