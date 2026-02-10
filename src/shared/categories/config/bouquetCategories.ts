export type BouquetCategory = {
  key: string;        // то, что хранится в БД и летит в API
  title: string;      // человекочитаемое
  description?: string;
};

export const BOUQUET_CATEGORIES = {
  POP: {
    key: "pop",
    title: "Популярное",
  },
  ROSES: {
    key: "Розы",
    title: "Розы",
  },
  CHRYSANTHEMUMS: {
    key: "Хризантемы",
    title: "Хризантемы",
  },
  STABLE: {
    key: "Стойкие",
    title: "Стойкие",
  },
  AUTHORS: {
    key: "Авторские букеты",
    title: "Авторские",
  },
} as const;

export type BouquetCategoryKey =
  typeof BOUQUET_CATEGORIES[keyof typeof BOUQUET_CATEGORIES]["key"];