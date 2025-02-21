// filterSelectors.ts
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { Ticket } from '../../api/fetchApi';

// Селектор для фильтрации и сортировки билетов
const filteredAndSortedSelector = createSelector(
  // Получаем билеты с типом Ticket[]
  (state: RootState) => state.tickets.tickets,
  // Получаем текущее состояние чекбоксов
  (state: RootState) => state.checkboxes,
  // Получаем текущий активный режим сортировки
  (state: RootState): string => state.sort.activeSort,
  // Указываем типы параметров в коллбэке
  (tickets: Ticket[], filterState, activeSort: string): Ticket[] => {
    // Фильтруем билеты
    const filteredTickets = tickets.filter((ticket) => {
      // Получаем массив количества пересадок для каждого сегмента
      const stopsCounts = ticket.segments.map(
        (segment) => segment.stops.length,
      );

      // Проверяем условия для фильтрации
      const { checkboxes } = filterState; // Достаем состояние чекбоксов

      // Выполняем фильтрацию
      const isFiltered = stopsCounts.some(
        (stops) => (checkboxes[0] && stops >= 0)
          || (checkboxes[1] && stops === 0)
          || (checkboxes[2] && stops === 1)
          || (checkboxes[3] && stops === 2)
          || (checkboxes[4] && stops >= 3),
      );

      // Возвращаем true, если хотя бы один сегмент соответствует условиям
      return isFiltered;
    });

    // Сортируем отфильтрованные билеты
    switch (activeSort) {
      case 'cheapest':
        // Сортировка по цене
        return [...filteredTickets].sort((a, b) => a.price - b.price);
      case 'fastest':
        // Сортировка по общей продолжительности
        return [...filteredTickets].sort((a, b) => {
          const aDuration = a.segments.reduce(
            (total, segment) => total + segment.duration,
            0,
          );
          const bDuration = b.segments.reduce(
            (total, segment) => total + segment.duration,
            0,
          );
          return aDuration - bDuration;
        });
      case 'optimal':
      default:
        // Возвращаем без изменений
        return filteredTickets;
    }
  },
);

export default filteredAndSortedSelector;
