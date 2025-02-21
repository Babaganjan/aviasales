// AviaList;
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchPackTickets } from '../../api/fetchApi';
import {
  incrementVisibleTickets,
  setError,
  incrementProgress,
} from '../../slices/ticketsSlice';
import { RootState } from '../../store/store';
import filteredAndSortedSelector from '../../slices/selectors/filteredAndSortedSelector';
import AviaItem from '../aviaItem/AviaItem';
import styles from './AviaList.module.scss';

const TicketComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { visibleTickets, searchId, stop } = useAppSelector(
    (state: RootState) => state.tickets,
  );
  const tickets = useAppSelector(filteredAndSortedSelector);

  const handleVisibleTickets = () => {
    dispatch(incrementVisibleTickets(5));
  };

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const fetchTickets = async () => {
      if (searchId) {
        try {
          const result = await dispatch(fetchPackTickets(searchId)).unwrap();
          dispatch(incrementProgress(4.5));
          // Если остались билеты, можете увеличить еще прогресс
          if (result.tickets.length) {
            dispatch(incrementProgress(90 / result.tickets.length));
          }

          // Обработка останова для загрузки, если требуется
          if (result.stop) {
            dispatch(setError(null));
          }
        } catch (e) {
          if (e instanceof Error) {
            dispatch(setError(`Ошибка получения билетов: ${e.message}`));
          } else {
            dispatch(setError('Неизвестная ошибка при получении билетов'));
          }
        }
      }
    };

    // Если поиск не завершён, добавляем запросы
    if (!stop && searchId) {
      fetchTickets();
      intervalId = setInterval(() => {
        fetchTickets();
      }, 2000);

      return () => {
        if (intervalId) {
          clearInterval(intervalId);
        }
      };
    }

    return () => {};
  }, [searchId, stop, dispatch]);

  return (
    <div className={styles.cards_wrapper}>
      {tickets.length > 0 ? (
        <>
          <ul className={styles.aviaList}>
            {tickets.slice(0, visibleTickets).map((ticket, index) => (
              <AviaItem key={`${ticket.carrier}-${index}`} ticket={ticket} />
            ))}
          </ul>
          {visibleTickets < tickets.length && (
            <button
              className={styles.aviaList_btn}
              onClick={handleVisibleTickets}
            >
              Загрузить еще 5 билетов
            </button>
          )}
        </>
      ) : (
        <p className={styles.cards_absent}>
          "Рейсов, подходящих под заданные фильтры, не найдено"
        </p>
      )}
    </div>
  );
};

export default TicketComponent;
