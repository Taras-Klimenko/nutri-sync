import React, { useState, useEffect, useRef } from 'react';
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import {updateNote} from '../api'

function Editor({ note, onNotebookChange }) {
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
    if (quillRef.current && note && note.text) {
      quillRef.current.root.innerHTML = note.text;
    }
    else if (onNotebookChange) {
      quillRef.current.root.innerHTML = ''; 
    }
  }, [note, onNotebookChange]);

  const handleSave = async () => {
    if (note && quillRef.current) {
      const text = quillRef.current.root.innerHTML
      try {
        await updateNote(note.id, {text});
        alert('Сохранено успешно')
      } catch (error) {
        console.error('Error saving note:', error);
        alert('Failed to save note');
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
