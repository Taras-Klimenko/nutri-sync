import React, {useState} from 'react';

import Sidebar from '../components/Sidebar';
import Editor from '../components/Editor';
import Header from '../components/Header';

function Knowledge() {
  const [selectedNotebook, setSelectedNotebook] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  console.log(selectedNotebook)

  return (
    <div className="knowledge">
      <Header />
      <div className="content">
        <Sidebar onSelectNotebook={setSelectedNotebook} selectedNotebook={selectedNotebook} />
        <Editor note={selectedNote}/>
      </div>
    </div>
  );
}

export default Knowledge;