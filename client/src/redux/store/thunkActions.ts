import { createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from '../../types.ts';
import axios from 'axios';

export const getClients = createAsyncThunk('clients/all', async () => {
  const response = await axios.get('http://localhost:3000/clients');
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
    birthday: string; // Заменил на строку, предполагая, что ты используешь строку для представления даты
    paidTill: string; // То же самое здесь
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
