// filterSlice.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Определяем интерфейс для состояния
export interface CheckboxState {
  checkboxes: boolean[];
}

// Инициализируем начальное состояние с типом CheckboxState
const initialState: CheckboxState = {
  checkboxes: [false, false, false, false, false],
};

const checkboxSlice = createSlice({
  name: 'checkboxes',
  initialState,
  reducers: {
    toggleAllCheckboxes: (state, action: PayloadAction<boolean>) => {
      const isChecked: boolean = action.payload;
      state.checkboxes.fill(isChecked);
    },
    toggleIndividualCheckbox: (state, action: PayloadAction<number>) => {
      const index: number = action.payload;
      const isChecked: boolean = !state.checkboxes[index];
      state.checkboxes[index] = isChecked;

      // Если изменен чекбокс "Все", обновляем состояния остальных
      if (index === 0) {
        state.checkboxes.fill(isChecked);
      } else if (state.checkboxes[0]) {
        state.checkboxes[0] = false;
      }

      // Проверяем, установлены ли все остальные чекбоксы
      const allChecked: boolean = state.checkboxes
        .slice(1)
        .every((checkbox) => checkbox);
      // Обновляем состояние чекбокса "Все"
      state.checkboxes[0] = allChecked;
    },
  },
});

// Экспортируем действия и редюсер
export const { toggleAllCheckboxes, toggleIndividualCheckbox } = checkboxSlice.actions;
export default checkboxSlice.reducer;
