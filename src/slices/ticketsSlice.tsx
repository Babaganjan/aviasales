// ticketsSlice.tsx
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchId,
  fetchPackTickets,
  Ticket,
} from '../api/fetchApi';

export interface TicketsState {
  tickets: Ticket[];
  visibleTickets: number;
  loading: boolean;
  error: string | null;
  searchId: string;
  stop: boolean;
}

// Начальное состояние
const initialState: TicketsState = {
  tickets: [],
  visibleTickets: 5,
  loading: false,
  error: null,
  searchId: '',
  stop: false,
};

// Создание среза
const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    incrementVisibleTickets: (state, action) => {
      state.visibleTickets = Math.min(state.visibleTickets + action.payload, state.tickets.length);
    },
    setError(state, action) {
      state.error = action.payload; // Установка ошибки
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchId.fulfilled, (state, action) => {
        state.loading = false;
        state.searchId = action.payload;
      })
      .addCase(fetchId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при получении searchId';
      })
      .addCase(fetchPackTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPackTickets.fulfilled, (state, action) => {
        state.tickets = [...state.tickets, ...action.payload.tickets];
        state.loading = false;
        if (!fetchPackTickets.fulfilled) {
          state.visibleTickets += 5;
        }
        // Обработка условия завершения поиска
        if (action.payload.stop) {
          state.stop = true;
        }
        if (state.stop !== true) {
          state.loading = true;
        }
      })
      .addCase(fetchPackTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при получении билетов';
      });
  },
});

// Экспорт редьюсера по умолчанию
export const { incrementVisibleTickets, setError } = ticketsSlice.actions;
export default ticketsSlice.reducer;
