import React, { useState } from 'react';

import Sidebar from '../components/Sidebar';
import Editor from '../components/Editor';
import Header from '../components/Header';

function Knowledge() {
  const [selectedNotebook, setSelectedNotebook] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notebookChanged, setNotebookChanged] = useState(false);

  const handleSelectNotebook = (notebook) => {
    setSelectedNotebook(notebook);
    setSelectedNote(null);
    setNotebookChanged(true);
  };

  return (
    <div className="knowledge">
      <Header />
      <div className="content">
        <Sidebar
          onSelectNotebook={handleSelectNotebook}
          onSelectNote={setSelectedNote}
          selectedNotebook={selectedNotebook}
        />
        <Editor note={selectedNote} onNotebookChange={notebookChanged} />
      </div>
    </div>
  );
}

export default Knowledge;
