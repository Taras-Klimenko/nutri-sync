import React, { useState, useEffect, useRef } from 'react';
import { OpenAI } from "openai";
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import {updateNote} from '../api'



function Editor({ note, onNoteUpdate }) {
  const openai = new OpenAI({apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true})

  const appendTextToEditor = (text, index = 0) => {
    if (index < text.length) {
      const position = quillRef.current.getLength() - 1;
      quillRef.current.insertText(position, text[index]);
      setTimeout(() => appendTextToEditor(text, index + 1), 50);
    }
  };

  const getSuggestions = async (text) => {
    try {const response = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'Ты опытный советчик и помощник, встроенный в текстовый редактор. Ты обладаешь экспертными знаниями в области психологии и нутрициологии. Как отличный помощник, ты всегда дружелюбен и положительно настроен. Ты стараешься сделать свои ответы аргументированными, обоснованными и мотивирующими.',
        },
        {
          role: 'user',
          content: `Основываясь на этом тексте: ## ${text} ##, помоги закончить начатую мысль, сохраняя изначальный стиль текста.`,
        },
      ],
      model: 'gpt-3.5-turbo',
    });
    return response.choices[0].message.content;
      
    } catch (error) {
      console.error("Error getting suggestions:", error);
    }
  }

  const handleGetSuggestions = async () => {
    if (quillRef.current) {
      const editorContent = quillRef.current.getText();
      const words = editorContent.split(/\s+/);
      const last30Words = words.slice(-30).join(' ');
      const suggestions = await getSuggestions(last30Words);
      appendTextToEditor(suggestions)
    }
  };

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
      <button onClick={handleGetSuggestions}>Автодополнение</button>
    </div>
  );
}
export default Editor;
