// fetchApi.tsx
import { createAsyncThunk } from '@reduxjs/toolkit';

const url = import.meta.env.VITE_API_BASE_URL;

export interface Ticket {
  price: number;
  carrier: string;
  segments: [
    {
      origin: string;
      destination: string;
      date: string;
      stops: string[];
      duration: number;
    },
    {
      origin: string;
      destination: string;
      date: string;
      stops: string[];
      duration: number;
    },
  ];
}

const fetchId = createAsyncThunk<string>('id/fetch', async () => {
  try {
    const response = await fetch(`${url}search`);
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data.searchId;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Ошибка при получении билетов: ${error.message}`);
    } else {
      throw new Error('Неизвестная ошибка при получении билетов');
    }
  }
});

const fetchPackTickets = createAsyncThunk<
  { tickets: Ticket[]; stop: boolean },
  string
>('tickets/fetch', async (searchId) => {
  try {
    if (!searchId) {
      throw new Error('searchId не может быть пустым.');
    }

    const response = await fetch(`${url}tickets?searchId=${searchId}`);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data = await response.json();

    return { tickets: data.tickets, stop: data.stop };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Ошибка при получении билетов: ${error.message}`);
    } else {
      throw new Error('Неизвестная ошибка при получении билетов');
    }
  }
});

export { fetchId, fetchPackTickets };
