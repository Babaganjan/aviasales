import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSort } from '../../slices/sortSlice';
import styles from './ToggleGroup.module.scss';
import { RootState } from '../../store/store';

const ToggleGroup: React.FC = () => {
  const dispatch = useDispatch();
  const sort = useSelector((state: RootState) => state.sort.activeSort);

  const toggleButtons = [
    { id: 'cheapest', label: 'Самый дешевый' },
    { id: 'fastest', label: 'Самый быстрый' },
    { id: 'optimal', label: 'Оптимальный' },
  ];
  return (
    <div>
      {toggleButtons.map((button) => (
        <button
          key={button.id}
          className={`${styles.btn_toggle} ${sort === button.id ? styles.active : ''}`}
          onClick={() => {
            dispatch(setActiveSort(button.id));
          }}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default ToggleGroup;
