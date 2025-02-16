import { useEffect } from 'react';
import { fetchId } from '../../api/fetchApi';
import { useAppDispatch } from '../../store/hooks';
import Form from '../form/Form';
import ToggleGroup from '../toggle/ToggleGroup';
import AviaList from '../aviaList/AviaList';
import styles from './Main.module.scss';

const Main = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Получение searchId
    const getSearchId = async () => {
      try {
        await dispatch(fetchId()).unwrap();
      } catch (err) {
        throw new Error(`Ошибка получения searchId: ${err}`);
      }
    };

    getSearchId();
  }, [dispatch]);

  return (
  <main>
        <div className={styles.main__container}>
            <Form />
            <div className={styles.main_right}>
                <ToggleGroup />
                <AviaList />
            </div>
        </div>
    </main>
  );
};

export default Main;
