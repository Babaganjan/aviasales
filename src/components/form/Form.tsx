// Form.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleAllCheckboxes,
  toggleIndividualCheckbox,
} from '../../slices/filterSlice';
import styles from './Form.module.scss';
import { RootState } from '../../store/store';

const Form: React.FC = () => {
  const dispatch = useDispatch();
  const checkboxes = useSelector(
    (state: RootState) => state.checkboxes.checkboxes,
  );

  const handleToggleAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    dispatch(toggleAllCheckboxes(isChecked));
  };

  const handleToggleCheckbox = (index: number) => {
    dispatch(toggleIndividualCheckbox(index));
  };

  return (
    <form className={styles.form}>
      <span className={styles.form_title}>Количество пересадок</span>
      <div className={styles.label_block}>
        <label className={styles.label_desc}>
          <input
            className={styles.checkbox}
            type="checkbox"
            checked={checkboxes[0]}
            onChange={handleToggleAll}
          />
          <span className={styles.check_style}></span>
          Все
        </label>
      </div>
      {checkboxes.slice(1).map((isChecked, index) => (
        <div className={styles.label_block} key={index}>
          <label className={styles.label_desc}>
            <input
              className={styles.checkbox}
              type="checkbox"
              checked={isChecked}
              onChange={() => handleToggleCheckbox(index + 1)}
            />
            <span className={styles.check_style}></span>
            {index === 0 ? 'Без пересадок' : `${index} пересадка`}
          </label>
        </div>
      ))}
    </form>
  );
};

export default Form;
