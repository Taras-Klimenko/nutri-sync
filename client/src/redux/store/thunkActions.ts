import { createAsyncThunk } from '@reduxjs/toolkit';
import { Client, Task } from '../../types.ts';
import axios from 'axios';

export const getClients = createAsyncThunk('clients/all', async () => {
  const response = await axios.get('http://localhost:3000/clients');
  return response.data;
});
export const getClientsCurator = createAsyncThunk('clientsCurator/all', async (curatorId) => {
    const response = await axios.get(`http://localhost:3000/clients/curator/${curatorId}`);
    return response.data;
});

export const addClient = createAsyncThunk(
  'client/add',
  async (formData: Client) => {
    const response = await axios.post(
      'http://localhost:3000/clients',
      formData,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data;
  }
);
export const updateClient = createAsyncThunk(
  'client/updateStatus',
  async ({
    id,
    firstName,
    lastName,
    birthday,
    paidTill,
    phoneNumber,
    curatorId,
  }: {
    id: string | number;
    firstName: string;
    lastName: string;
    birthday: string;
    paidTill: string;
    phoneNumber: string;
    curatorId: string | number;
  }) => {
    const response = await axios.patch(
      `http://localhost:3000/clients/update/${id}`,
      {
        firstName,
        lastName,
        birthday,
        paidTill,
        phoneNumber,
        curatorId,
      }
    );
    return response.data;
  }
);
export const deleteClient = createAsyncThunk(
  'client/delete',
  async (id: string | number) => {
    await axios.delete(`http://localhost:3000/clients/update/${id}`);
    return id;
  }
);

export const getCurators = createAsyncThunk('curators/all', async () => {
  const response = await axios.get('http://localhost:3000/curator');
  return response.data;
});

export const checkSession = createAsyncThunk('checkSession', async () => {
  const response = await axios.get('http://localhost:3000/auth/check', {
    withCredentials: true,
  });
  return response.data;
});

export const getTodos = createAsyncThunk('todos/fetch', async () => {
  const result = await axios.get('http://localhost:3000/api/todos');
  return result.data;
});

export const addTodos = createAsyncThunk('todos/add', async (formData) => {
  const result = await axios.post('http://localhost:3000/api/todos', formData);
  return result.data;
});

export const updateTodoStatus = createAsyncThunk(
  'todos/updateStatus',
  async ({
    id,
    isCompleted,
    text,
  }: {
    id: string | number;
    text: string;
    isCompleted: boolean;
  }) => {
    const result = await axios.patch(`http://localhost:3000/api/todos/${id}`, {
      text,
      isCompleted,
    });
    return result.data;
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/delete',
  async (id: string | number) => {
    await axios.delete(`http://localhost:3000/api/todos/${id}`);
    return id;
  }
);

export const updateTodo = createAsyncThunk(
  'todos/update',
  async (todo: Task) => {
    const result = await axios.put(
      `http://localhost:3000/api/todos/${todo.id}`,
      todo
    );
    return result.data;
  }
);

export const getParameters = createAsyncThunk('parameters/get', async () => {
  const response = await axios.get('http://localhost:3000/api/parameters/1');
  return response.data;
});

export const addWeight = createAsyncThunk(
  'weight/add',
  async (weight: number) => {
    const response = await axios.post(
      'http://localhost:3000/api/parameters/1',
      {
        weight,
      }
    );
    return response.data;
  }
);

