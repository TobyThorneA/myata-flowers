import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@store/app/store';

const selectBouquetState = (state: RootState) => state.bouquet;

export const selectBouquetsByCategory = createSelector(
  [selectBouquetState, (_, category) => category],
  (bouquetState, category) => {
    if (!category) return bouquetState.items;
    const bouquetsByCategory = bouquetState.bouquetsByCategory[category];

    if (!bouquetsByCategory) return [];
    return bouquetsByCategory.filter(bouquet => bouquet.categories?.includes(category));
  }
);
