const BASE_URL = 'https://nutrition-o5ja.onrender.com';

export const getCategories = async () => {
  const response = await fetch(`${BASE_URL}/api/categories`);
  if (!response.ok) {
    throw new Error('Ошибка сетевого соединения');
  }
  return response.json();
};

export const getNotesByCategory = async (categoryId) => {
  const response = await fetch(
    `${BASE_URL}/api/categories/${categoryId}/notes`
  );
  if (!response.ok) {
    throw new Error('Ошибка сетевого соединения');
  }
  return response.json();
};

export const createNotebook = async (notebookData) => {
  const response = await fetch(`${BASE_URL}/api/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(notebookData),
  });

  if (!response.ok) {
    throw new Error('Ошибка сетевого соединения');
  }

  return response.json();
};

export const deleteNotebook = async (categoryId) => {
  const response = await fetch(`${BASE_URL}/api/categories/${categoryId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Ошибка сетевого соединения');
  }
};

export const createNote = async (categoryId, noteData) => {
  const response = await fetch(
    `${BASE_URL}/api/categories/${categoryId}/notes`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteData),
    }
  );

  if (!response.ok) {
    throw new Error('Ошибка сетевого соединения');
  }

  return response.json();
};

export const updateNote = async (noteId, updatedContent) => {
  const response = await fetch(`${BASE_URL}/api/categories/notes/${noteId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedContent),
  });

  if (!response.ok) {
    throw new Error('Ошибка сетевого соединения');
  }

  const updatedNote = await response.json();
  return updatedNote;
};

export const deleteNote = async (noteId) => {
  const response = await fetch(`${BASE_URL}/api/categories/notes/${noteId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Ошибка сетевого соединения');
  }
};
