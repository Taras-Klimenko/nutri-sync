import React, { useState, useEffect, useRef } from 'react';
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import {updateNote} from '../api'

function Editor({ note, onNoteUpdate }) {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
  
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }], 
    [{ 'indent': '-1'}, { 'indent': '+1' }],
  
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']
  ];
  

  useEffect(() => {
    if (editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: toolbarOptions,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (quillRef.current && note) {
      quillRef.current.root.innerHTML = note.text || '';
    }
  }, [note]);

  const handleSave = async () => {
    if (note && quillRef.current) {
      const text = quillRef.current.root.innerHTML;
      try {
        const updatedNote = await updateNote(note.id, { text });
        onNoteUpdate(updatedNote); // Pass the updated note back to Knowledge
        alert('Сохранено успешно');
      } catch (error) {
        console.error('Ошибка при сохранении:', error);
        alert('Не удалось сохранить заметку');
      }
    }
  }
    
  return (
    <div>
      <div ref={editorRef}></div>
      {note && <button onClick={handleSave}>Сохранить</button>}
    </div>
  );
}
export default Editor;
